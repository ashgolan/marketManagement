import { Transaction } from "../models/transaction.model.js";
import { Client } from "../models/client.model.js";
export const newTransaction = async (req, res) => {
  try {
    const owner = await Client.findById({ _id: req.body.owner });
    if (!owner) throw Error("client not found!!");
    const transaction = await Transaction.create(req.body);
    if (!transaction) throw Error("No data");
    res.status(200).send(transaction);
  } catch (e) {
    res.status(404).send(e.message);
  }
};
export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    if (!transactions) throw Error("No data");
    res.status(200).send(transactions);
  } catch (e) {
    res.status(404).send(e.message);
  }
};
export const findTransactionsByOwner = async (req, res) => {
  try {
    const transactions = await Transaction.find({ owner: req.body.owner });
    if (!transactions) throw Error("No data");
    res.status(200).send(transactions);
  } catch (e) {
    res.status(404).send(e.message);
  }
};
export const deleteTransaction = async (req, res) => {
  try {
    const transactions = await Transaction.findByIdAndDelete({
      _id: req.body._id,
    });
    if (!transactions) throw Error("No data");
    res.status(200).send(transactions);
  } catch (e) {
    res.status(404).send(e.message);
  }
};
export const findTransactionsByDate = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      date: req.body.date,
    });
    if (!transactions) throw Error("No data");
    res.status(200).send(transactions);
  } catch (e) {
    res.status(404).send(e.message);
  }
};
export const updateTransaction = async (req, res) => {
  try {
    const newData = req.body.data;
    let count = 0;
    newData.forEach((element) => {
      count += element.price;
    });
    console.log(count);
    // const update = [
    //   { data: newData, new: false, overwrite: true },
    //   { totalAmount: count, new: false, overwrite: true },
    // ];

    const transaction1 = await Transaction.findOneAndUpdate(
      { _id: req.body.id },
      { data: newData, new: false, overwrite: true }
    );
    const transaction = await Transaction.findOneAndUpdate(
      { _id: req.body.id },
      { totalAmount: count, absert: true, new: false }
    );
    console.log(count);
    if (!transaction) throw Error("No data");
    res.status(200).send(transaction);
  } catch (e) {
    res.status(404).send(e.message);
  }
};
