const express = require("express");
const router = express.Router();
const UserModel = require("../Model/UserModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose")

let validator = require('email-validator')
let passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9!@#$%^&*]{8,100})$/

router.post("/register", async (req, res) => {
  try {
    let reqBody = req.body;
    let { Fname, Lname, email,title, phone, password } = reqBody;

    if (Object.keys(data).length == 0) {
        return res.status(400).send({ status: false, msg: "Please enter data in the request body" })
      }
  
      if (!Fname) {
        return res.status(400).send({ status: false, msg: "firstname is required" })
      }
  
      if (!/^([a-zA-Z ]){1,100}$/.test(fname)) {
        return res.status(400).send({ status: false, msg: "please enter firstname in valid format" })
      }
      
      if (!Lname) {
        return res.status(400).send({ status: false, msg: "lastname is required" })
      }
  
      if (!/^([a-zA-Z ]){1,100}$/.test(fname)) {
        return res.status(400).send({ status: false, msg: "please enter lastname in valid format" })
      }
  
      if (!title) {
        return res.status(400).send({ status: false, msg: "title is not present" })
      }
  
      if (["Mr", "Mrs", "Miss"].includes(title) == false) {
        return res.status(400).send({ status: false, msg: `title should be either "Mr" or "Mrs" or "Miss"` })
      }
      if (!phone) {
        return res.status(400).send({ status: false, msg: "Phone number is required" })
    }
    if (!validMobile.test(phone)) {
        return res.status(400).send({ status: false, msg: "Phone number should be 10 digits only" })
    }
    
  
    if (!password) {
        return res.status(400).send({ status: false, msg: "password is required" })
      }
  
      if (!passwordRegex.test(password)) {
        return res.status(400).send({ status: false, msg: "password isn't validate, please make sure length is minimum 8, should have one uppercase and lowercase character and Number also and don't use space and have a special character" })
      }
  
      if (!email) {
        return res.status(400).send({ status: false, msg: "Email is required" })
      }
  
      if (!validator.validate(email)) {
        return res.status(400).send({ status: false, msg: "please enter valid email" })
      }
  
      let uniqueMail = await authorModel.findOne({ email: email })
  
      if (uniqueMail) {
        return res.status(409).send({ status: false, msg: "email already present...Try different email" })
      }
    let user = await UserModel.create(reqBody);
    res.status(200).send({ message: "User resistered sucessfully", data: user });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/login",  async (req, res) => {
    try {
        let { email, password, phone } = req.body
        if (!email && !phone) {
            return res.status(400).send({ status: false, msg: "please enter your email or phone number to login" })
        }
        if (!password) {
            return res.status(400).send({ status: false, msg: "please enter your password to login" })
        }
        let findData = await userModel.findOne({ $and: [{ $or: [{ email: email }, { phone: phone }] }, { password: password },{isDeleted: false}] })
        if (!findData) {
            return res.status(404).send({ status: false, msg: "either email or password is incorrect" })
        }
        let token = jwt.sign({ userId: findData._id }, 'Secret_Key')
        res.setHeader("token", token)
        return res.status(200).send({ status: true, msg: "LoggedIn successfully", token: token })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
})

module.exports = router