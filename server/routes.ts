import express, { Request } from 'express'
import axios from 'axios'

// TODO: needs a better solution (though this one works for now locally)
import { alphavantageApiKey } from './apikey'
import AlphaVantageApiResponse from './types/AlphaVantageApiResponse'

// TODO: make it possible to have other time series
type AlphaVantageApiResponseForDailyTimeSeries = AlphaVantageApiResponse<
  'Time Series (Daily)'
>

const router = express.Router()

router.get(
  '/api/stockprices/:company',
  async (req: Request<{ company: string }>, res) => {
    const company = req.params.company

    const { data: stockPrices } = await axios.get<
      AlphaVantageApiResponseForDailyTimeSeries
    >(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${company}&apikey=${alphavantageApiKey}`
    )

    return res.send(stockPrices)
  }
)

export default router
