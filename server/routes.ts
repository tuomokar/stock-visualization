import express, { Request, Response } from 'express'
import axios from 'axios'

// TODO: needs a better solution (though this one works for now locally)
import { alphavantageApiKey } from './apikey'
import AlphaVantageApiResponse from './types/AlphaVantageApiResponse'
import StockData from '../common/types/StockData'

// TODO: make it possible to have other time series
type AlphaVantageApiResponseForDailyTimeSeries = AlphaVantageApiResponse<
  'Time Series (Daily)'
>

const router = express.Router()

router.get(
  '/api/stockprices/:company',
  async (req: Request<{ company: string }>, res: Response<StockData>) => {
    const company = req.params.company

    const { data: fetchedStockData } = await axios.get<
      AlphaVantageApiResponseForDailyTimeSeries
    >(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${company}&apikey=${alphavantageApiKey}`
    )

    const timeSeries = fetchedStockData['Time Series (Daily)']

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
