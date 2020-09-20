import React, { useEffect, useState } from 'react'
import Highcharts, { Options } from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import { fetchStockData } from './webapi/stock-data'
import './App.css'
import StockData from './types/StockData'

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

const App = () => {
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

  return (
    <div className='App'>
      <h1>Apple stockprices:</h1>

      {stocksData && (
        <HighchartsReact
          highcharts={Highcharts}
          options={{
            ...testChartBaseOptions,
            series: [{ data: stocksData.values.map(({ data }) => data.high) }]
          }}
        />
      )}
    </div>
  )
}

export default App
