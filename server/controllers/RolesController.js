import Roles from '../models/Roles.js';

const createRoles = async (req, res) => {
  try {
    const { name } = req.body;

    const result = await Roles.create({
      name: name,
    });

    return res.status(200).json({
      message: 'Create roles',
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const allRoles = async (req, res) => {
  try {
    const result = await Roles.find();

    return res.status(200).json({
      message: 'All Roles',
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const oneRoles = async (req, res) => {
  try {
    const result = await Roles.findOne({
      _id: req.params.id,
    });

    return res.status(200).json({
      message: 'Find One Roles',
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const editRoles = async (req, res) => {
  try {
    const { name } = req.body;
    const result = await Roles.findOneAndUpdate(
      {
        _id: req.params.id, // Assuming 'req.params.id' contains the ID to update
      },
      {
        name: name, // Update the 'name' field with the new value
      },
      {
        new: true, // Return the updated document
      },
    );

    return res.status(200).json({
      message: 'Update Roles',
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const deleteRoles = async (req, res) => {
  try {
    const result = await Roles.deleteOne({
      _id: req.params.id,
    });

    return res.status(200).json({
      message: 'Delete Roles',
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export default {
  createRoles,
  allRoles,
  oneRoles,
  editRoles,
  deleteRoles,
};
