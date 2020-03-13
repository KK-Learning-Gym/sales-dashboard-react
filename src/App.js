import React from 'react';
import './App.css';
import { ResponsivePie } from '@nivo/pie'
import { ResponsiveBar } from '@nivo/bar'
import { ResponsiveBubble } from '@nivo/circle-packing'

const RevenueCard = (props) => {

  return (
    <div className="card">
      <div className="card-title left-margin">{props.title}</div>
      <div className="card-stat left-margin"><span style={{ fontSize: '1.5rem' }}>$ </span>{props.stat}k</div>
    </div>
  )
}

const RevenueCardBox = () => {
  return (
    <div className="flexbox">
      <RevenueCard title="Total Revenue" stat="9.02" />
      <RevenueCard title="Revenue from Amazon" stat="5.75" />
      <RevenueCard title="Revenue from Ebay" stat="1.91" />
      <RevenueCard title="Revenue from Etsy" stat="1.36" />
    </div>
  )
}

const PieChart = ({ data }) => {

  const dimension = 300
  const margins = { top: 0, left: dimension * 0.8 / 3, bottom: 0, right: dimension * 0.8 / 3 }
  return (
    <div style={{
      height: dimension,
      width: dimension,
      position: "relative"
    }}>
      <ResponsivePie
        data={data}
        colors={data => data.color}
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
        <span>{data[0].value}%</span>
      </div>
    </div>
  )
}

const PieCard = (props) => {
  const data = [
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

  return (
    <>
      <div className="card">
        <div className="card-title center top-margin">{props.title}</div>
        <div className="piebox">
          <PieChart data={data} />
        </div>
      </div>
    </>
  )
}

const PieCardBox = () => {
  return (
    <div className="flexbox">
      <PieCard title="Purchase Rate" stat={11} color="hsl(216, 54%, 49%)" />
      <PieCard title="Checkout Rate" stat={8} color="hsl(186, 53%, 51%)" />
      <PieCard title="Cart Abandon Rate" stat={88} color="hsl(69, 83%, 84%)" />
    </div>
  )
}

const BubbleChart = ({ data }) => {
  return (
    <div style={{ height: '300px', width: '550px' }}>
      <ResponsiveBubble
        root={data}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
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

const BarChart = ({ data }) => {

  return (
    <div style={{ height: '350px', width: '550px' }} className="left-margin">
      <ResponsiveBar
        colors="hsl(216, 54%, 49%)"
        data={data}
        keys={['hot dog']}
        indexBy="country"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        layout="horizontal"
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          legend: 'Orders',
          legendPosition: 'middle',
          legendOffset: 32
        }}
        axisLeft={{
          tickSize: 5,
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

const OrderCardBar = () => {
  const bardata = [
    {
      "country": "Etsy",
      "hot dog": 8,
    },
    {
      "country": "Ebay",
      "hot dog": 12,
    },
    {
      "country": "Amazon",
      "hot dog": 44
    }
  ]

  return (
    <div className="card">
      <div className="card-title center top-margin">Orders Trend<br />by Stores</div>
      <BarChart data={bardata} />
    </div>
  )
}

const OrderCardBubble = () => {
  const bubbledata = {
    "name": "chart",
    "children": [
      {
        "name": "NW",
        "loc": 4
      },
      {
        "name": "SW",
        "loc": 2
      },
      {
        "name": "CR",
        "loc": 3
      },
      {
        "name": "SE",
        "loc": 1
      },
      {
        "name": "NE",
        "loc": 5
      }
    ]
  }

  return (
    <div className="card">
      <div className="card-title center top-margin">Orders Trend<br />by Region</div>
      <BubbleChart data={bubbledata} />
    </div>
  )
}

const OrderCardBox = () => {
  return (
    <div className="flexbox">
      <OrderCardBar />
      <OrderCardBubble />
    </div>
  )
}

const App = () => {

  return (
    <>
      <RevenueCardBox />
      <PieCardBox />
      <OrderCardBox />
    </>
  )

}

export default App;