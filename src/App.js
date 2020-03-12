import React from 'react';
import './App.css';

const RevenueCard = (props) => {

  return (
    <>
      <div className="card">
        <div className="card-title">{props.title}</div>
        <div className="card-stat"><span style={{ fontSize: '1.5rem' }}>$ </span>{props.stat}k</div>
      </div>
    </>
  )
}

const PieCard = (props) => {

  return (
    <>
      <div>{props.title}</div>
      <div>{props.stat}</div>
    </>
  )
}

const PieCardBox = () => {
  const purchase = 11
  const checkout = 8
  const abandon = 88

  return (
    <>
    <PieCard title="Purchase Rate" stat={purchase} />
    <PieCard title="Checkout Rate" stat={checkout} />
    <PieCard title="Cart Abandon Rate" stat={abandon} />

    </>
  )
}

const App = () => {

  return (
    <>

      <RevenueCard title="Total Revenue" stat="9.02" />
      <RevenueCard title="Revenue from Amazon" stat="5.75" />
      <RevenueCard title="Revenue from Ebay" stat="1.91" />
      <RevenueCard title="Revenue from Etsy" stat="1.36" />
      {/* <SmallCard title="Product Views" stat="2.67k views"/> */}
    </>
  )
}

export default App;
