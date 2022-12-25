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
// export const getSum = async (req, res) => {
//   Transaction.aggregate(
//     [
//       {
//         $group: {
//           _id: "$_id",
//           total: {
//             $sum: "Object.values(data)",
//           },
//         },
//       },
//     ],
//     function (err, result) {
//       if (err) {
//         res.send(err);
//       } else {
//         res.json(result);
//       }
//     }
//   );
// };
