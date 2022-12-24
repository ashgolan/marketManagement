import { model, Schema } from "mongoose";

const clientSchema = new Schema({
  firstName: { type: String, required: true },
  fatherName: { type: String },
  lastName: { type: String, required: true },
  phone: {
    type: String,
    validate(value) {
      if (!value > 9 && /^\d+$/.test(value))
        throw Error("please insert a number of 9 digits minimum");
    },
  },
  comment: { type: String },
  isContractor: { type: Boolean, default: false },
});

export const Client = model("Client", clientSchema);
