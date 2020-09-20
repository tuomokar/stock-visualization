import React from 'react'
import Highcharts, { Options } from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import data from './webapi/mock.json'
import './App.css'

const timeSeriesObjects = data['Time Series (Daily)']

const openValues = Object.keys(timeSeriesObjects)
  .map(key => timeSeriesObjects[key as keyof typeof timeSeriesObjects])
  .map(timeSeriesObject => Number(timeSeriesObject['1. open']))

const testChartOptions: Options = {
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
  },
  // Typecast to any here as the types seem to require a type property in the object
  // with 'area' value, but giving that, it paints the area and we don't really want
  // that in a simple line chart
  series: [{ data: openValues, name: '' } as any]
}

const App = () => {
  return (
    <div className='App'>
      <h1>Apple stockprices:</h1>
      <HighchartsReact highcharts={Highcharts} options={testChartOptions} />
    </div>
  )
}

export default App
