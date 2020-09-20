import StockDataValues from './StockDataValues'
import StockMetadata from './StockMetadata'

export default interface StockData {
  meta: StockMetadata
  values: StockDataValues[]
}
