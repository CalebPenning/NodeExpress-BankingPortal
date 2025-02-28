const express = require('express')
const router = express.Router()
const { accounts, writeJSON } = require('../data')

router.get("/payment", (req, res) => {
    return res.render("payment", {
        account: accounts.credit
    })
})

router.post("/payment", (req, res) => {
    const { amount } = req.body
    
    accounts.credit.balance = parseInt(accounts.credit.balance) - parseInt(amount)

    accounts.credit.available = parseInt(amount) + parseInt(accounts.credit.available)

    writeJSON()

    return res.render("payment", {
        message: "Payment Successful",
        account: accounts.credit
    })
})

router.get("/transfer", (req, res) => {
    return res.render("transfer")
})

router.post("/transfer", (req, res) => {
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

module.exports = router