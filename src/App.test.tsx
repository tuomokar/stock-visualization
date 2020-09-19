import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

test('renders Stockprices title', () => {
  const { getByText } = render(<App />)

  const title = getByText('Apple stockprices:')
  expect(title).toBeInTheDocument()
})
