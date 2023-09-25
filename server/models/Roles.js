import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
const Schema = mongoose.Schema;

let Roles = new Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
    name: {
      type: String,
    },
  },
  { timestamps: true },
);
const Role = mongoose.model('Roles', Roles);
export default Role;
