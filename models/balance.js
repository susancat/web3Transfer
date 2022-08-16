import mongoose from "mongoose"

const BalanceSchema = new mongoose.Schema({
    account: { type: String, unique: true },
    balances: Array
})

export default mongoose.models.Balance || mongoose.model("Balance", BalanceSchema);