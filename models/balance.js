import mongoose from "mongoose"

const BalanceSchema = new mongoose.Schema({
    account: String,
    balances: Array
})

export default mongoose.models.Balance || mongoose.model("Balance", BalanceSchema);