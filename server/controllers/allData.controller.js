import { Client } from "../models/client.model.js";
import { Transaction } from "../models/transaction.model.js";

export const getAllData = async (req, res) => {
  try {
    const clients = await Client.find();
    const transaction = await Transaction.find();
    if (!clients || !transaction) throw Error("data not found!!");
    res.status(200).send({
      clients: clients,
      transaction: transaction,
    });
  } catch (e) {
    res.status(404).send(e.message);
  }
};
