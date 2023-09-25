import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
const Schema = mongoose.Schema;

let employeeSchema = new Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
    name: {
      type: String,
    },
    designation: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    age: {
      type: Number,
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true },
);
const Employee = mongoose.model('Employee', employeeSchema);
export default Employee;
