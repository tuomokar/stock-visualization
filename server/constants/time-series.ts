import TimeSeriesFunction from '../../common/types/TimeSeriesFunction'
import { TimeSeriesFunctionFromApi } from '../types/AlphaVantageApiResponse'

export const timeSeriesFunctionsForApi: {
  [key in TimeSeriesFunction]: string
} = {
  Daily: 'TIME_SERIES_DAILY',
  Weekly: 'TIME_SERIES_WEEKLY',
  Monthly: 'TIME_SERIES_MONTHLY'
}

export const timeSeriesFunctionInApiResponse: {
  [key in TimeSeriesFunction]: TimeSeriesFunctionFromApi
} = {
  Daily: 'Time Series (Daily)',
  Weekly: 'Weekly Time Series',
  Monthly: 'Monthly Time Series'
}
