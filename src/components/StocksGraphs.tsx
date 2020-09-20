import React, { useEffect, useState } from 'react'
import Highcharts, { Options } from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import { fetchStockData } from '../webapi/stock-data'
import StockData from '../types/StockData'
import StockPriceType from '../types/StockPriceType'

const testChartBaseOptions: Options = {
  title: {
    text: ''
  },
  yAxis: {
    title: {
      text: 'Cost'
    }
  },
  xAxis: {
    title: {
      text: 'Day'
    }
  }
}

const priceTypes: StockPriceType[] = ['open', 'high', 'low', 'close', 'volume']

const StocksGraphs: React.FC = () => {
  const [stocksData, setStocksData] = useState<null | StockData>(null)

  useEffect(() => {
    if (stocksData !== null) {
      return
    }

    ;(async () => {
      const data = await fetchStockData()

      setStocksData(data)
    })()
  }, [stocksData])

  if (!stocksData) {
    return null
  }

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={{
        ...testChartBaseOptions,
        series: priceTypes.map(priceType => ({
          data: stocksData.values.map(({ data, time }) => ({
            y: data[priceType],
            name: time
          })),
          name: priceType
        }))
      }}
    />
  )
}

export default StocksGraphs
