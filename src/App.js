import React, { useState, useEffect } from 'react'
import './App.css';

import { ResponsivePie } from '@nivo/pie'
import { ResponsiveBar } from '@nivo/bar'
import { ResponsiveBubble } from '@nivo/circle-packing'

import axios from 'axios'

const Box = (props) => {
  return (
    <div className="flexbox">
      {props.children}
    </div>
  )
}

const Card = (props) => {
  return (
    <div className="card">
      <div className="card-title center top-margin">{props.title}</div>
      {props.children}
    </div>
  )
}

const RevenueCard = (props) => {
  return (
    <div className="card">
      <div className="card-title center">{props.title}</div>
      <div className="card-stat center"><span style={{ fontSize: '1.5rem' }}>$ </span>{props.stat}k</div>
    </div>
  )
}

const PieChart = (props) => {
  const pieData = [
    {
      "id": props.title,
      "label": props.title,
      "value": props.stat,
      "color": props.color
    },
    {
      "id": "empty",
      "label": "empty",
      "value": 100 - props.stat,
      "color": "hsl(217, 33%, 14%)"
    }
  ]

  const dimension = 300
  const margins = { top: 0, left: dimension * 0.8 / 3, bottom: 0, right: dimension * 0.8 / 3 }
  return (
    <div className="card">
      <div className="card-title center top-margin">{props.title}</div>
      <div className="piebox">
        <div style={{
          height: dimension,
          width: dimension,
          position: "relative"
        }}>
          <ResponsivePie
            data={pieData}
            colors={pieData => pieData.color}
            margin={margins}
            innerRadius={0.5}
            enableRadialLabels={false}
            enableSlicesLabels={false}
            isInteractive={false}
            style={{
              display: 'flex',
            }}
          />
          <div style={{
            position: "absolute",
            top: '0',
            bottom: '0',
            right: dimension / 2,
            left: dimension / 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center"
          }}>
            <span>{pieData[0].value}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const BarChart = ({ data }) => {
  const dimension = 300
  const margins = { top: dimension * 0.8 / 3, left: dimension * 0.8 / 3, bottom: dimension * 0.8 / 3, right: dimension * 0.8 / 3 }
  const dimensions = { height: '40vh', width: '45vw' }
  return (
    <div style={{ height: dimensions.height, width: dimensions.width, minHeight: 300, minWidth: 250 }} className="trickyChart">
      <ResponsiveBar
        colors="hsl(216, 54%, 49%)"
        data={data}
        keys={['value']}
        indexBy="store"
        margin={margins}
        padding={0.3}
        layout="horizontal"
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          legend: 'Orders',
          legendPosition: 'middle',
          legendOffset: 50
        }}
        axisLeft={{
          tickSize: 10,
          tickPadding: 5
        }}
        enableGridX={true}
        enableGridY={false}
        enableLabel={false}
        isInteractive={false}

      />
    </div>
  )
}

const BubbleChart = ({ data }) => {
  const dimensions = { height: '40vh', width: '45vw' }
  return (
    <div style={{ height: dimensions.height, width: dimensions.width, minHeight: 300, minWidth: 250 }} className="trickyChart">
      <ResponsiveBubble
        root={data}
        margin={{ top: 20, right: 0, bottom: 20, left: 0 }}
        identity="name"
        value="loc"
        colors={{ scheme: 'spectral' }}
        padding={9}
        enableLabel={true}
        isZoomable={false}
        leavesOnly={true}
        isInteractive={false}
        className="trickyChart"
      />
    </div>
  )
}

const DynamicBoxes = ({ response }) => {

  console.log("loading dynamic boxes")
  console.log("checking response received in component:")
  console.log(response)

  const truthValue = Object.keys(response).length === 0 && response.constructor === Object ? false : true

  console.log("truthValue")
  console.log(truthValue)


  return !truthValue ? (
    <>
      <div className="loading"><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>

    </>
  ) : (
      <>
        <Box>
          <RevenueCard title="Revenue from Amazon" stat={(response.Revenues.AM / 1000).toFixed(2)} />
          <RevenueCard title="Revenue from Ebay" stat={(response.Revenues.EB / 1000).toFixed(2)} />
          <RevenueCard title="Revenue from Etsy" stat={(response.Revenues.ET / 1000).toFixed(2)} />
          <RevenueCard title="Total Revenue" stat={(response.Revenues.total / 1000).toFixed(2)} />
        </Box>
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
const OptionList = () => {


  return (
    <>

    </>
  )
}
const App = () => {
  const baseUrl = 'https://sales-dashboard-react.herokuapp.com/db'
  // const baseUrl = 'http://localhost:3001/db'
  const initialQuery = 'https://sales-dashboard-react.herokuapp.com/db/2019/Ja'
  // const initialQuery = 'http://localhost:3001/db/2019/Jan'

  const [response, setResponse] = useState({})
  const [query, setQuery] = useState(initialQuery)

  const handleChange = (event) => {

    console.log("event received")

    const valueArray = event.target.value.split(" ")
    const requestUrl = baseUrl + "/" + valueArray[1] + "/" + valueArray[0]

    console.log("setting query")
    console.log(requestUrl)

    setQuery(requestUrl)
  }

  const hook = () => {
    const getData = async () => {
      console.log("the effect is being used")
      console.log("received query as:")
      console.log(query)
      console.log("fetching data now...")

      try {
        const { data } = await axios(query)

        console.log("got data as:")
        console.log(data)
        console.log("setting response")

        setResponse(data)
      }
      catch {
        setResponse({})
        document.querySelector('.loading').innerHTML = `
        <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div><br />
        <p>Psst! the thing is: the backend server is down on Heroku.<br />
      You could try refreshing the page.<br /><br />
      If it still doesn't load then I've crossed my Heroku usage limit.<br /><br />
      But...<br /><br />
      You can check out the code for this repository here :<br /><br />
        <a href="">Frontend</a>&nbsp;&nbsp;&nbsp;
      <a href="">Backend</a></p>`
      }
    }




    getData()
  }
  // see : https://daveceddia.com/useeffect-hook-examples/ under Prevent useEffect From Running Every Render
  // You can provide a second argument – an array of values. Think of them as the dependencies for that effect.
  // If one of the dependencies has changed since the last time, the effect will run again.
  // (It will also still run after the initial render)
  // From FullStackOpen:
  // The second parameter of useEffect is used to specify how often the effect is run.
  // If the second parameter is an empty array [],
  // then the effect is only run along with the first render of the component.

  useEffect(hook, [query])


  const options = ["Jan 2019", "Dec 2018", "Nov 2018", "Oct 2018", "Sep 2018", "Aug 2018", "Jul 2018", "Jun 2018", "May 2018", "Apr 2018", "Mar 2018", "Feb 2018", "Jan 2018"]

  return (
    <>
      <nav>
        <span>
          <select id="month" onChange={handleChange} autocomplete>
            {options.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </span>
        <span>Sales Summary</span>
        <span>Hey, you!</span>
      </nav>
      <DynamicBoxes response={response} />
    </>
  )

}

export default App;