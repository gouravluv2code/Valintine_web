const express = require('express')
const connection = require('./config')
const AuthRouter = require('./Routes/Auth.route')
const app = express()
const cors = require('cors')
const productRoute = require('./Routes/Product.route')
const CartRoute = require('./Routes/Cart.route')
const OrdersRoute = require('./Routes/Orders.route')
const AdminRouter = require('./Routes/Admin.route')
const PaymentRouter = require('./Routes/payment')
const SlidersRouter = require('./Routes/Sliders')
const BlogsRouter = require('./Routes/Blogs.Route')
const AwsRouter = require('./Routes/AwsRoute')
const TestimonialRouter = require('./Routes/Testimonials')
const payrouter = require('./Routes/payment')
const totalRouter = require('./Routes/TotalRoute')
const bodyParser = require('body-parser');
const path = require('path');

app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb'}));
app.use(cors())
app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello World!')
})
const ccavReqHandler = require('./Routes/ccRequestHandler.js');
const ccavResHandler = require('./Routes/ccResponseHanlder.js');
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
const crypto = require('crypto');


app.use("/auth",AuthRouter)
app.use("/ccavRequestHandler",ccavReqHandler.postReq)
app.use("/ccavResponseHandler",ccavResHandler.postRes)
app.use("/products",productRoute)
app.use("/cart",CartRoute)
app.use("/orders",OrdersRoute)
app.use("/admin",AdminRouter)
app.use("/aws",AwsRouter)
app.use("/pay",payrouter)
app.use("/sliders",SlidersRouter)
app.use("/testimonials",TestimonialRouter)
app.use("/blogs",BlogsRouter)
app.use("/total",totalRouter)


app.listen(8080, async () => {
    try {
         await connection
         console.log('connection established')
    } catch (error) {
        console.log(error.message,"Error")
    }
  console.log('Example app listening on port 8080!')
})