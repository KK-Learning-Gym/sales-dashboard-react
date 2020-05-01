import React, { useState, useEffect } from 'react'
import axios from 'axios'

import './App.css'

import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import BubbleChart from './components/BubbleChart'

import Failed from './components/Failed'

import { baseUrl, initialQuery } from './config'

const Box = (props) => {
  return (
    <div className="box flex-row">
      {props.children}
    </div>
  )
}

const Card = (props) => {
  return (
    <div className="card flex-col">
      <div className="card-title center top-margin">{props.title}</div>
      {props.children}
    </div>
  )
}

const RevenueCard = (props) => {
  return (
    <div className="card flex-col">
      <div className="card-title center">{props.title}</div>
      <div className="card-stat center"><span style={{ fontSize: '1.5rem' }}>$ </span>{props.stat}k</div>
    </div>
  )
}

const Loading = () => {
  return (
    <>
      <div className="loading flex-col"><div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>
    </>
  )
}

const DynamicBoxes = ({ response, page }) => {

  const truthValue = Object.keys(response).length === 0 && response.constructor === Object ? false : true

  if (page === 'loading') {
    return (
      <Loading />
    )
  }
  else if (page === 'main' && truthValue) {
    return (
      <>
        <Box>
          <RevenueCard title="Revenue from Amazon" stat={(response.Revenues.AM / 1000).toFixed(2)} />
          <RevenueCard title="Revenue from Ebay" stat={(response.Revenues.EB / 1000).toFixed(2)} />
          <RevenueCard title="Revenue from Etsy" stat={(response.Revenues.ET / 1000).toFixed(2)} />
          <RevenueCard title="Total Revenue" stat={(response.Revenues.total / 1000).toFixed(2)} />
        </Box >
        <Box>
          <PieChart title="Purchase Rate" stat={response.Rates.purchase} color="hsl(216, 54%, 49%)" />
          <PieChart title="Checkout Rate" stat={response.Rates.checkout} color="hsl(186, 53%, 51%)" />
          <PieChart title="Cart Abandon Rate" stat={response.Rates.abandoned} color="hsl(69, 83%, 84%)" />
        </Box>
        <Box>
          <Card title="Orders Trend by Stores">
            <BarChart data={
              [
                {
                  "store": "Etsy",
                  "value": response.OrdersByStore.ET
                },
                {
                  "store": "Ebay",
                  "value": response.OrdersByStore.EB
                },
                {
                  "store": "Amazon",
                  "value": response.OrdersByStore.AM
                }
              ]
            } />
          </Card>
        </Box>
        <Box>
          <Card title="Orders Trend by Region">
            <BubbleChart data={
              {
                "name": "chart",
                "children": [
                  {
                    "name": "NW",
                    "loc": response.OrdersByRegion.nw
                  },
                  {
                    "name": "SW",
                    "loc": response.OrdersByRegion.sw
                  },
                  {
                    "name": "CR",
                    "loc": response.OrdersByRegion.c
                  },
                  {
                    "name": "SE",
                    "loc": response.OrdersByRegion.se
                  },
                  {
                    "name": "NE",
                    "loc": response.OrdersByRegion.ne
                  }
                ]
              }
            } />
          </Card>
        </Box>
      </>
    )
  }
  if (page === 'failed') {
    return (
      <Failed />
    )
  }
}

const App = () => {

  const [response, setResponse] = useState({})
  const [query, setQuery] = useState(initialQuery)
  const [page, setPage] = useState('loading')

  const handleChange = (event) => {

    const valueArray = event.target.value.split(" ")
    const requestUrl = baseUrl + "/" + valueArray[1] + "/" + valueArray[0]

    setQuery(requestUrl)
  }

  const hook = () => {
    const getData = async () => {
      console.log("received query as:")
      console.log(query)

      try {
        const { data } = await axios(query)

        setResponse(data)
        setPage('main')
      }
      catch {
        setResponse({})
        setPage('failed')
      }
    }

    getData()
  }

  useEffect(hook, [query])


  const options = ["Jan 2019", "Dec 2018", "Nov 2018", "Oct 2018", "Sep 2018", "Aug 2018", "Jul 2018", "Jun 2018", "May 2018", "Apr 2018", "Mar 2018", "Feb 2018", "Jan 2018"]

  return (
    <>
      <nav className="flex-row">
        <span>
          <select id="month" onChange={handleChange} autoComplete="true">
            {options.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </span>
        <span>Sales Summary</span>
        <span>Hey, you!</span>
      </nav>
      <DynamicBoxes response={response} page={page} />
    </>
  )

}

export default App;