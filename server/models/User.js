import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const Schema = mongoose.Schema;

const Users = new Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
    name: {
      type: String,
    },
    password: {
      type: String,
    },
    avatar: {
      type: String,
    },
    role_id: {
      type: String,
    },
  },
  { timestamps: true },
);

const User = mongoose.model('User', Users); // Change 'Users' to 'User' for consistency and clarity

export default User; // Export 'User' instead of 'Users'
