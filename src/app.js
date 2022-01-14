const fs = require('fs')
const path = require('path')
const express = require('express')
const { accounts, users, writeJSON } = require('./data')

const app = express()

app.set("views", path.join(__dirname, "/views"))
app.set("view engine", "ejs")

app.use(express.static(path.join(__dirname, "/public")))
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    return res.render("index", {
        title: "Account Summary",
        accounts
    })
})

app.get("/savings", (req, res) => {
    return res.render("account", {
        account: accounts.savings
    })
})

app.get("/checking", (req, res) => {
    return res.render("account", {
        account: accounts.checking
    })
})

app.get("/credit", (req, res) => {
    return res.render("account", {
        account: accounts.credit
    })
})

app.get("/profile", (req, res) => {
    return res.render("profile", {
        user: users[0]
    })
})

app.get("/payment", (req, res) => {
    return res.render("payment", {
        account: accounts.credit
    })
})

app.post("/payment", (req, res) => {
    const { amount } = req.body
    
    accounts.credit.balance = parseInt(accounts.credit.balance) - parseInt(amount)

    accounts.credit.available = parseInt(amount) + parseInt(accounts.credit.available)

    writeJSON()

    return res.render("payment", {
        message: "Payment Successful",
        account: accounts.credit
    })
})

app.get("/transfer", (req, res) => {
    return res.render("transfer")
})

app.post("/transfer", (req, res) => {
    const { from, to, amount } = req.body

    const calcFrom = +accounts[from].balance - +amount
    accounts[from].balance = calcFrom

    const calcTo = parseInt(accounts[to].balance) + parseInt(amount)
    accounts[to].balance = calcTo

    writeJSON()

    return res.render("transfer", {
        message: "Transfer Completed"
    })
})

app.listen(3000, () => {
    console.log("PS Project Running on port 3000!")
})