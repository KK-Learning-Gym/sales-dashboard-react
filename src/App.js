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
  const dimensions = { height: 350, width: 600 }
  return (
    <div style={{ height: dimensions.height, width: dimensions.width }}>
      <ResponsiveBar
        colors="hsl(216, 54%, 49%)"
        data={data}
        keys={['value']}
        indexBy="store"
        margin={{ top: dimensions.height * 0.8 / 3, right: dimensions.width * 0.8 / 3, bottom: dimensions.height * 0.8 / 3, left: dimensions.width * 0.8 / 3 }}
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
  const dimensions = { height: 350, width: 600 }
  return (
    <div style={{ height: dimensions.height, width: dimensions.width }}>
      <ResponsiveBubble
        root={data}
        margin={{ top: 20, right: dimensions.width * 0.8 / 3, bottom: 20, left: dimensions.width * 0.8 / 3 }}
        identity="name"
        value="loc"
        colors={{ scheme: 'spectral' }}
        padding={9}
        enableLabel={true}
        isZoomable={false}
        leavesOnly={true}
        isInteractive={false}
      />
    </div>
  )
}

const DynamicBoxes = () => {

  const baseUrl = 'https://sales-dashboard-react.herokuapp.com/db/'

  const [period, setPeriod] = useState({})

  const hook = () => {
    const getData = async () => {
      const { data } = await axios('https://sales-dashboard-react.herokuapp.com/db/2019/Jan')
      setPeriod({
        'responseData': data,
      })

    }

    getData()
  }

  useEffect(hook, [])
  const truthValue = period.responseData === undefined ? false : true
  
  return  !truthValue ? (<div>Loading...</div>):(
    <>
      {console.log("boxes loaded")}
      <Box>
        <RevenueCard title="Revenue from Amazon" stat={(period.responseData.Revenues.AM / 1000).toFixed(2)} />
        <RevenueCard title="Revenue from Ebay" stat={(period.responseData.Revenues.EB / 1000).toFixed(2)} />
        <RevenueCard title="Revenue from Etsy" stat={(period.responseData.Revenues.ET / 1000).toFixed(2)} />
        <RevenueCard title="Total Revenue" stat={(period.responseData.Revenues.total / 1000).toFixed(2)} />
      </Box>
      <Box>
        <PieChart title="Purchase Rate" stat={period.responseData.Rates.purchase} color="hsl(216, 54%, 49%)" />
        <PieChart title="Checkout Rate" stat={period.responseData.Rates.checkout} color="hsl(186, 53%, 51%)" />
        <PieChart title="Cart Abandon Rate" stat={period.responseData.Rates.abandoned} color="hsl(69, 83%, 84%)" />
      </Box>
      <Box>
        <Card title="Orders Trend by Stores">
          <BarChart data={
            [
              {
                "store": "Etsy",
                "value": period.responseData.OrdersByStore.ET
              },
              {
                "store": "Ebay",
                "value": period.responseData.OrdersByStore.EB
              },
              {
                "store": "Amazon",
                "value": period.responseData.OrdersByStore.AM
              }
            ]
          } />
        </Card>
        <Card title="Orders Trend by Region">
          <BubbleChart data={
            {
              "name": "chart",
              "children": [
                {
                  "name": "NW",
                  "loc": period.responseData.OrdersByRegion.nw
                },
                {
                  "name": "SW",
                  "loc": period.responseData.OrdersByRegion.sw
                },
                {
                  "name": "CR",
                  "loc": period.responseData.OrdersByRegion.c
                },
                {
                  "name": "SE",
                  "loc": period.responseData.OrdersByRegion.se
                },
                {
                  "name": "NE",
                  "loc": period.responseData.OrdersByRegion.ne
                }
              ]
            }
          } />
        </Card>
      </Box>
    </>
  )
}

const App = () => {


  // const periodSplit = period.split(" ")
  // const requestUrl = baseUrl + periodSplit[1] + "/" + periodSplit[0]

  return (
    <>
      <nav>
        <span>
          <select id="month">
            <option value="Jan 2019">Jan 2019</option>
            <option value="Dec 2018">Dec 2018</option>
            <option value="Nov 2018">Nov 2018</option>
            <option value="Oct 2018">Oct 2018</option>
            <option value="Sep 2018">Sep 2018</option>
            <option value="Aug 2018">Aug 2018</option>
            <option value="July 2018">July 2018</option>
            <option value="Jun 2018">Jun 2018</option>
            <option value="May 2018">May 2018</option>
            <option value="Apr 2018">Apr 2018</option>
            <option value="Mar 2018">Mar 2018</option>
            <option value="Feb 2018">Feb 2018</option>
            <option value="Jan 2018">Jan 2018</option>
          </select>
        </span>
        <span>Sales Summary</span>
        <span>Hey, you!</span>
      </nav>
      <DynamicBoxes />
    </>
  )

}

export default App;