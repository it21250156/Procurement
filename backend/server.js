require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const siteManagersRoutes = require('./routes/siteManagers');
const suppliersRoutes = require('./routes/suppliers');
const orderRequestsRoutes = require('./routes/orderRequests');

//express app
const app = express();

// middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use('/api/industry/sitemanagers', siteManagersRoutes);
app.use('/api/industry/suppliers', suppliersRoutes);
app.use('/api/industry/orderrequests', orderRequestsRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for reqs
    app.listen(process.env.PORT, () => {
      console.log('Connected to DB. Listening on port', process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
