import express, { Request } from 'express'
import next from 'next'
import axios from 'axios'

// TODO: needs a better solution (though this one works for now locally)
import { alphavantageApiKey } from './apikey'
import AlphaVantageApiResponse from './types/AlphaVantageApiResponse'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const port = process.env.PORT || 3000

// TODO: make it possible to have other time series
type AlphaVantageApiResponseForDailyTimeSeries = AlphaVantageApiResponse<
  'Time Series (Daily)'
>
;(async () => {
  try {
    await app.prepare()
    const server = express()

    server.get(
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

    server.all('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, (err?: any) => {
      if (err) throw err
      console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`)
    })
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
})()
