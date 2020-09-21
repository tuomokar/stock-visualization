## Apple stocks visualization

A simple application with Next.js, Express, TypeScript and React.

Displays the Apple stock price as a line chart (with the help of [Highcharts](https://www.highcharts.com/)).
For now displays only the daily prices.

The application uses API from [Alpha Vantage](https://www.alphavantage.co) to get the stock prices.

### To run

After cloning the repo, first, you need an API key from Alpha Vantage. For now there's a very ugly solution with using the API
key:

- Create a file `server/apikey.ts`
- From it, export the API key in a variable `alphavantageApiKey`, e.g. `export const alphavantageApiKey = "<YourApiKeyHere>";`

Then run:

- `npm i`
- `npm run dev`

Now you should find the application running in localhost:3000

Tested on the current LTS version of node.
