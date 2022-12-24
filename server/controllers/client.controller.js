import { Client } from "../models/client.model.js";

export const addClient = async (req, res) => {
  try {
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
