import { Bid } from "../models/bid.model.js";

export const addBid = async (req, res) => {
  try {
    const bid = await Bid.create(req.body);
    if (!bid) throw Error("bad inserted data !!");
    res.status(200).send(bid);
  } catch (e) {
    res.status(404).send(e.message);
  }
};
export const getBids = async (req, res) => {
  try {
    const bids = await Bid.find();
    if (!bids) throw Error("bad inserted data !!");
    res.status(200).send(bids);
  } catch (e) {
    res.status(404).send(e.message);
  }
};
export const deleteBid = async (req, res) => {
  try {
    const bid = await Bid.findByIdAndDelete({ _id: req.body._id });
    if (!bid) throw Error("bad inserted data !!");
    res.status(200).send(bid);
  } catch (e) {
    res.status(404).send(e.message);
  }
};
export const updateBid = async (req, res) => {
  try {
    const bid = await Bid.findByIdAndUpdate(
      { _id: req.body._id },
      { $set: req.body },
      { new: true }
    );
    if (!bid) throw Error("bad inserted data !!");
    res.status(200).send(bid);
  } catch (e) {
    res.status(404).send(e.message);
  }
};
