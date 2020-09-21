export type TimeSeriesFunctionFromApi =
  | 'Time Series (Daily)'
  | 'Weekly Time Series'
  | 'Monthly Time Series'

// due to how TypeScript works, we can't put the meta data together
// with the time series data directly, so we circumvent the issue
// through an intersection type.
type AlphaVantageApiResponse = {
  [key in TimeSeriesFunctionFromApi]: {
    [key: string]: {
      '1. open': string
      '2. high': string
      '3. low': string
      '4. close': string
      '5. volume': string
    }
  }
} & {
  'Meta Data': {
    '1. Information': string
    '2. Symbol': string
    '3. Last Refreshed': string
    '4. Output Size': string
    '5. Time Zone': string
  }
}

export default AlphaVantageApiResponse
