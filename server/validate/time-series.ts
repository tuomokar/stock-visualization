import TimeSeriesFunction from '../../common/types/TimeSeriesFunction'

export const isTimeSeriesFunctionValid = (
  timeSeriesFunction: TimeSeriesFunction | undefined | unknown
): timeSeriesFunction is TimeSeriesFunction => {
  return Boolean(
    (timeSeriesFunction && timeSeriesFunction === 'Daily') ||
      timeSeriesFunction === 'Weekly' ||
      timeSeriesFunction === 'Monthly'
  )
}
