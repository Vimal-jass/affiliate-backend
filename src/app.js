
const express = require('express')
const cors = require('cors')
const app = express()
const category = require('./models/category')
const categoryRoutes = require('./routes/category.route')

const storeRoutes = require('./routes/store.routes')
const dealRoutes = require('./routes/deal.routes');
const homeRoutes = require('./routes/home.routes')
const dashboardRoutes = require('./routes/dashboard.routes')
const authRoute = require('./routes/auth.routes')

app.use(cors())
app.use(express.json())


app.get('/', (req, res)=>{
    res.json({
        success:true,
        message: 'api running successfully'
    })
})



// category routes
app.use('/api', categoryRoutes)

// store routes
app.use('/api',storeRoutes)

// deal post 
app.use('/api', dealRoutes);

// get all data together 
app.use('/api', homeRoutes)

// get dashbaord 
app.use('/admin', dashboardRoutes)

// admin dashboard login
app.use('/admin', authRoute)


module.exports = app;
