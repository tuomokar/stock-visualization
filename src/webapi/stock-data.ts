import StockData from '../../common/types/StockData'
import axios from 'axios'

export const fetchStockData = async (): Promise<StockData> => {
  const { data } = await axios.get('/api/stockprices/AAPL')

  return data
}
