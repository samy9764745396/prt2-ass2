const express = require('express')
const mongoose = require("mongoose");
const inventoryRoutes =  require('./routes/inventory')
// const userRoutes = require('./routes/user')
const Inventory = require('./models/inventory')
const Customer = require("./models/user");
const { rawListeners } = require('./models/order');
 const app = express()

app.use(express.json())


mongoose.connect('mongodb://localhost:27017/web_tech_assignments')
.then(console.log("Connected to database successfully"))
  .catch(console.error);

// app.get('/', (req, res)=>{
//     let (name, email,) = req.body
// })

app.use("/api/inventory", inventoryRoutes)
// app.use("/api/users", userRoutes);
// app.use('/api/customer' , Customer)

app.get('/customers', (req, res) => {
    Customer.find({}, (err, customers) => {
      if (err) {
        res.send(err);
      } else {
        res.render('customers', { customers });
      }
    });
  })

  app.post('/placeOrder', (req, res) => {
    const customer_id = req.body.customer_id;
    const item_name = req.body.item_name;
    const quantity = req.body.quantity;
  
    Customer.findOne({ customer_id }, (err, customer) => {
      if (err) {
        res.send(err);
      } else {
        Inventory.findOne({ item_name }, (err, inventory) => {
          if (err) {
            res.send(err);
          } else {
            if (inventory.available_quantity >= quantity) {
              customer.orders.push({ item_name, quantity });
              customer.save((err) => {
                if (err) {
                  res.send(err);
                } else {
                  inventory.available_quantity -= quantity;
                  inventory.save((err) => {
                    if (err) {
                      res.send(err);
                    } else {
                      res.send('Order placed successfully');
                    }
                  });
                }
              });
            } else {
              res.send('Out of stock');
            }
          }
        });
      }
    });
  });




 app.listen(3005, console.log(`Server running on port 3005`))