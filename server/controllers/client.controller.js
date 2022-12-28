import { Client } from "../models/client.model.js";
import { Transaction } from "../models/transaction.model.js";
export const addClient = async (req, res) => {
  try {
    const check = await Client.findOne({
      firstName: req.body.firstName,
      fatherName: req.body.fatherName,
      lastName: req.body.lastName,
    });
    if (check) throw Error("client was excist!!");
    const client = await Client.create(req.body);
    if (!client) throw Error("incorrect data !!");
    res.status(200).send(client);
  } catch (e) {
    res.status(404).send(e.message);
  }
};
export const getClients = async (req, res) => {
  try {
    const clients = await Client.find();
    if (!clients) throw Error("incorrect data !!");
    res.status(200).send(clients);
  } catch (e) {
    res.status(404).send(e.message);
  }
};
export const getClientById = async (req, res) => {
  try {
    const client = await Client.findOne({ _id: req.body._id });
    if (!client) throw Error("incorrect data !!");
    res.status(200).send(client);
  } catch (e) {
    res.status(404).send(e.message);
  }
};
export const deleteClient = async (req, res) => {
  try {
    const client = await Client.deleteOne({ _id: req.body._id });
    const transactionsFound = await Transaction.find({
      owner: req.body._id,
    });
    if (transactionsFound) {
      await Transaction.deleteMany({ owner: req.body._id });
    }
    if (!client) throw Error("incorrect data !!");
    res.status(200).send(client);
  } catch (e) {
    res.status(404).send(e.message);
  }
};
export const updateClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(
      { _id: req.body._id },
      { $set: req.body },
      { new: true }
    );
    // const newClientDetails = await Client.updateOne(
    //   { _id: client._id },
    //   {
    //     ...client,
    //     firstName: req.body.firstName,
    //     fatherName: req.body.fatherName,
    //     lastName: req.body.lastName,
    //   }
    // );
    if (!client) throw Error("incorrect data !!");
    res.status(200).send(client);
  } catch (e) {
    res.status(404).send(e.message);
  }
};
