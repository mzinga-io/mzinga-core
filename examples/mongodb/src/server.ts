import express from 'express'
import payload from 'mzinga'
import path from 'path'

const cookieParser = require('cookie-parser')
require('dotenv').config()
const app = express()
app.use(
  express.json({
    limit: process.env.JSON_LIMITS_SIZE || '20mb',
  }),
)
app.use(cookieParser())
// Redirect root to Admin panel
app.get('/', (_, res) => {
  res.redirect('/admin')
})

app.use('/assets', express.static(path.resolve(__dirname, '../assets')))

const start = async () => {
  app.listen(process.env.PORT || 3000)
  await payload.init({
    secret: process.env.PAYLOAD_SECRET || '',
    express: app,
    onInit: () => {
      payload.logger.info(`MZinga Admin URL: ${payload.getAdminURL()}`)
    },
  })
}
start()
