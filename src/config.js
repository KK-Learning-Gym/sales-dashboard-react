require('dotenv').config()

let baseUrl = 'https://sales-dashboard-react.herokuapp.com/db'
let initialQuery = 'https://sales-dashboard-react.herokuapp.com/db/2019/Jan'

if (process.env.NODE_ENV === 'development') {
    baseUrl = 'http://localhost:3001/db'
    initialQuery = 'http://localhost:3001/db/2019/Jan'

}

module.exports = {
  baseUrl,
  initialQuery
}