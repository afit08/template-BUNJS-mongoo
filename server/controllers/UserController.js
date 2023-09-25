import Users from '../models/User.js';
import Roles from '../models/Roles.js';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
const SALT_ROUND = 10;

const createUsers = async (req, res) => {
  try {
    // const { name, password, role_id } = req.body;
    const { files, fields } = req.fileAttrb;

    let hashPassword = fields[1].value;
    hashPassword = await bcrypt.hash(hashPassword, SALT_ROUND);

    const result = await Users.create({
      name: fields[0].value,
      password: hashPassword,
      role_id: fields[2].value,
      avatar: files[0].file.originalFilename,
    });

    return res.status(200).json({
      message: 'Create Users',
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const allUsers = async (req, res) => {
  try {
    const query = [
      {
        $lookup: {
          from: 'roles', // Name of the "roles" collection
          localField: 'role_id', // Field in the "users" collection
          foreignField: '_id', // Field in the "roles" collection
          as: 'user_roles', // Alias for the joined data
        },
      },
      {
        $unwind: '$user_roles', // Unwind the array created by $lookup
      },
      {
        $project: {
          _id: 0,
          user_id: '$_id',
          user_name: '$name',
          user_password: '$password',
          role_id: '$role_id',
          role_name: '$user_roles.name',
        },
      },
    ];

    const result = await Users.aggregate(query);

    return res.status(200).json({
      message: 'All Users',
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message, // Send the error message to the client for debugging (optional)
    });
  }
};

const oneUsers = async (req, res) => {
  try {
    const query = [
      {
        $match: {
          _id: req.params.id,
        },
      },
      {
        $lookup: {
          from: 'roles',
          localField: 'role_id',
          foreignField: '_id',
          as: 'user_roles',
        },
      },
      {
        $unwind: '$user_roles', // Unwind the array created by $lookup
      },
      {
        $project: {
          _id: 0,
          user_id: '$_id',
          user_name: '$name',
          user_password: '$password',
          role_id: '$role_id',
          role_name: '$user_roles.name',
        },
      },
    ];
    const result = await Users.aggregate(query);

    return res.status(200).json({
      message: 'Find One Users',
      data: result,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

const signin = async (req, res) => {
  const { username, password } = req.body;
  try {
    // const query = [
    //   {
    //     $match: {
    //       _id: req.params.id,
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: 'roles',
    //       localField: 'role_id',
    //       foreignField: '_id',
    //       as: 'user_roles',
    //     },
    //   },
    //   {
    //     $unwind: '$user_roles', // Unwind the array created by $lookup
    //   },
    //   {
    //     $project: {
    //       _id: 0,
    //       user_id: '$_id',
    //       user_name: '',
    //       user_password: '$password',
    //       role_id: '$role_id',
    //       role_name: '$user_roles.name',
    //     },
    //   },
    // ];
    const result = await Users.findOne({ name: username });

    const { user_id, user_name, user_password } = result;
    const compare = await bcrypt.compare(password, user_password);

    if (compare) {
      return res.send({ user_id, user_name, user_email });
    } else {
      return res.sendStatus(404);
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export default {
  createUsers,
  allUsers,
  oneUsers,
  signin,
};
