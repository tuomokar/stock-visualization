import express, { Request, Response } from 'express'
import axios from 'axios'

// TODO: needs a better solution (though this one works for now locally)
import { alphavantageApiKey } from './apikey'
import AlphaVantageApiResponse, {
  TimeSeriesFunctionFromApi
} from './types/AlphaVantageApiResponse'
import StockData from '../common/types/StockData'
import TimeSeriesFunction from '../common/types/TimeSeriesFunction'
import {
  timeSeriesFunctionsForApi,
  timeSeriesFunctionInApiResponse
} from './constants/time-series'
import { isTimeSeriesFunctionValid } from './validate/time-series'

type TimeSeriesFromApi =
  | 'Time Series (Daily)'
  | 'Time Series (Monthly)'
  | 'Time Series (Yearly)'

const router = express.Router()

interface RouteParams {
  company: string
}

interface QueryParams {
  timeSeriesFunction?: TimeSeriesFunction
}

router.get(
  '/api/stockprices/:company',
  async (
    req: Request<RouteParams, any, any, QueryParams>,
    res: Response<StockData>,
    next
  ) => {
    const { company } = req.params
    const { timeSeriesFunction = 'Daily' } = req.query

    if (!isTimeSeriesFunctionValid(timeSeriesFunction)) {
      next(new Error('Time series function was not valid!'))
      return
    }

    const timeSeriesFunctionForApi =
      timeSeriesFunctionsForApi[timeSeriesFunction]

    if (!timeSeriesFunctionForApi) {
      next(new Error('timeSeriesFunction not'))
      return
    }

    let fetchedStockData: AlphaVantageApiResponse | null = null

    try {
      const { data } = await axios.get<AlphaVantageApiResponse>(
        `https://www.alphavantage.co/query?function=${timeSeriesFunctionForApi}&symbol=${company}&apikey=${alphavantageApiKey}`
      )
      fetchedStockData = data
    } catch (e) {
      next(new Error('Failed to read data from external API'))
      return
    }

    const timeSeriesInApiResponse =
      timeSeriesFunctionInApiResponse[timeSeriesFunction]
    const timeSeries = fetchedStockData[timeSeriesInApiResponse]

    const stocksData: StockData['values'] = Object.keys(timeSeries).map(day => {
      const stocksForDay = timeSeries[day as keyof typeof timeSeries]

      return {
        time: day,
        data: {
          open: Number(stocksForDay['1. open']),
          high: Number(stocksForDay['2. high']),
          low: Number(stocksForDay['3. low']),
          close: Number(stocksForDay['4. close']),
          volume: Number(stocksForDay['5. volume'])
        }
      }
    })

    const originalMetadata = fetchedStockData['Meta Data']

    const meta: StockData['meta'] = {
      company: originalMetadata['2. Symbol'],
      time: {
        unit: 'day',
        zone: originalMetadata['5. Time Zone']
      }
    }

    return res.send({
      meta,
      values: stocksData
    })
  }
)

export default router
