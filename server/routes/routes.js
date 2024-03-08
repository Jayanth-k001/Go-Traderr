const express = require('express');
const router = new express.Router();
const db = require('../model/userSchema');
const stkdb = require('../model/stock');
const historydb=require('../model/his')
const bcrypt = require("bcryptjs");
const authenticate = require('../middleware/middleware')


router.post('/register', async (req, res) => {
  const { name, email, password, cpassword, balance } = req.body;
  if (!name || !email || !password || !cpassword)
    res.status(422).json({ error: "enter all the details" });

  try {
    const preuser = await db.findOne({ email: email });
    if (preuser) {
      res.status(422).json({ error: "already registered with this email , plzzz login!!!" });
    }
    else if (password != cpassword)
      res.status(422).json({ error: "password doesn't match" });
    else {
      const user = new db({ name, email, password, cpassword, balance });

      const newuserdata = await user.save();
      res.status(201).json({ status: 201, newuserdata })
    }
  }
  catch (error) {
    res.status(422).json(error);
  }

})

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    res.status(422).json({ error: "enter all the details" });
  try {
    const userValid = await db.findOne({ email: email });

    if (userValid) {

      const isMatch = await bcrypt.compare(password, userValid.password);

      if (!isMatch) {
        res.status(422).json({ error: "invalid details" })
      }
      else {
        const token = await userValid.generateAuthtoken();
        res.cookie("usercookie", token, {
          expires: new Date(Date.now() + 9000000),
          httpOnly: true
        });

        const result = {
          userValid,
          token
        }

        res.status(201).json({ status: 201, result, email })
      }
    } else {
      res.status(422).json({ error: "invalid details" })
    }

  } catch (error) {

  }

})

router.get("/validuser", authenticate, async (req, res) => {
  try {
    const ValidUserOne = await db.findOne({ _id: req.userId });
    res.status(201).json({ status: 201, ValidUserOne });
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
});

router.get("/logout", authenticate, async (req, res) => {
  try {
    req.rootUser.tokens = req.rootUser.tokens.filter((curr) => {
      return curr.token !== req.token
    });

    res.clearCookie("usercookie", { path: "/" });

    req.rootUser.save();

    res.status(201).json({ status: 201 })

  } catch (error) {
    res.status(401).json({ status: 401, error })
  }
})

router.get('/getcash/:email', async (req, res) => {
  const email = req.params.email;
  try {
    const data = await db.findOne({ email: email });
    let bal = data.balance;
    res.status(201).json({ status: 201, data });
  } catch (error) {
    res.status(401).json({ status: 401, error })
  }
})

router.post('/buy', async (req, res) => {
  const { email, name, price, quantity, totalAmount, balance } = req.body;
  const ramt = balance - totalAmount;
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const day = new Date().getDate();
  const hours = new Date().getHours();
  const minutes = new Date().getMinutes();
  const seconds = new Date().getSeconds();
  const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  const stock = { name, price, quantity, totalAmount, formattedDate };
  const action="Bought";
  const his={name, price, quantity, totalAmount, formattedDate,action};

  try {

    let user_exist = await stkdb.findOne({ email: email });
    if (!user_exist) {
      const new_user = new stkdb({ email, stock });
      await new_user.save()
      const his1= new historydb({email,his});
      await his1.save();
    }
    const saved = await stkdb.updateOne({ email: email }, { $push: { stocks: stock } });
    const saved1 = await db.findOneAndUpdate(
      { email },
      { $set: { balance: ramt } },
      { new: true }
    );
    const saved2=await historydb.updateOne({ email: email }, { $push: { history: his } });
    res.status(201).json({ status: 201, message: "success" });
  } catch (err) {
    console.log(err);
  }
})

router.post('/sell', async (req, res) => {
  const { email, name, price, quantity, totalAmount,balance } = req.body;
  const ramt = balance + totalAmount;
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const day = new Date().getDate();
  const hours = new Date().getHours();
  const minutes = new Date().getMinutes();
  const seconds = new Date().getSeconds();
  const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  const stock = { name, price, quantity, totalAmount, formattedDate };
  const action="sold";
  const his={name, price, quantity, totalAmount, formattedDate,action};

  try {
    const userStock = await stkdb.findOne({ email });
    console.log(userStock);
        if (!userStock) {
            return res.status(404).json({message:"User's stock not found"});
        }
        const index = userStock.stocks.findIndex(stock => stock.name === name);

        if (index === -1) {
            return res.status(404).json({message:"Stock not found"});
        }

        const stockToSell = userStock.stocks[index];
        console.log(stockToSell)
        console.log(quantity);
        console.log(stockToSell.quantity);
        if (stockToSell.quantity == quantity) {
         const update_stock= await stkdb.updateOne({ email }, { $pull: { stocks: { name: name } } });
         console.log(update_stock);
      } else if (stockToSell.quantity > quantity) {
          stockToSell.quantity -= quantity;
          stockToSell.totalAmount -= quantity * price;
      } else {
          return res.status(400).json({message:"Invalid quantity"});
      }
    const stksave= await userStock.save();
    console.log(stksave);
    const saved1 = await db.findOneAndUpdate(
      { email },
      { $set: { balance: ramt } },
      { new: true }
    );
    const saved2=await historydb.updateOne({ email: email }, { $push: { history: his } });
    res.status(201).json({ status: 201, message: "sold success" });
  } catch (err) {
    console.log(err);
  }
})


router.get('/transhis/:email',async(req,res)=>{
  const email=req.params.email;
  try{
    const data=await historydb.findOne({email:email})
    res.status(201).json({ status: 201, data });
  }catch(error){
    res.status(401).json({ status: 401, error })
  }
})

router.get('/getstocks/:email', async (req, res) => {
  const email = req.params.email;
  try {
    const data = await stkdb.findOne({ email: email });
    res.status(201).json({ status: 201, data });
  } catch (error) {
    res.status(401).json({ status: 401, error })
  }
})


module.exports = router;