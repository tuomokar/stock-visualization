import StockData from '../types/StockData'
import mockdata from './mock.json'

// Although this doesn't do anyhing asynchronously at the moment, make it an async
// function already so that at some point when we do actually call some API here,
// we don't need to do any changes to the caller of this function regarding that
export const fetchStockData = async (): Promise<StockData> => {
  const timeSeries = mockdata['Time Series (Daily)']

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

  const originalMetadata = mockdata['Meta Data']

  const meta: StockData['meta'] = {
    company: originalMetadata['2. Symbol'],
    time: {
      unit: 'day',
      zone: originalMetadata['5. Time Zone']
    }
  }

  return {
    meta,
    values: stocksData
  }
}
