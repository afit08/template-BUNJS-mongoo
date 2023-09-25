// const logger = require('../minddleware/logger');
import Employee from '../models/Employee.js';

const index = async (req, res, next) => {
  try {
    const result = await Employee.find();
    return res.status(200).json({
      message: 'Successfully fetched employees',
      timestamp: new Date(),
      data: result,
    });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const show = async (req, res) => {
  try {
    let employeeID = req.params.id;
    const result = await Employee.findById(employeeID);

    return res.status(200).json([result]);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const store = async (req, res) => {
  let employee = new Employee({
    name: req.body.name,
    designation: req.body.designation,
    email: req.body.email,
    phone: req.body.phone,
    age: req.body.age,
  });

  try {
    const result = await employee.save();

    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    let employeeID = req.params.id;

    let updatedData = {
      name: req.body.name,
      designation: req.body.designation,
      email: req.body.email,
      phone: req.body.phone,
      age: req.body.age,
    };

    const result = await Employee.findByIdAndUpdate(employeeID, updatedData, {
      new: true,
    });

    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const destroy = async (req, res) => {
  try {
    let employeeID = req.params.id;
    const result = await Employee.findByIdAndRemove(employeeID);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const store_file = async (req, res) => {
  let employee = new Employee({
    name: req.body.name,
    designation: req.body.designation,
    email: req.body.email,
    phone: req.body.phone,
    age: req.body.age,
  });
  if (req.file) {
    employee.avatar = req.file.path;
  }

  try {
    const result = await employee.save();

    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const store_file_multi = async (req, res) => {
  let employee = new Employee({
    name: req.body.name,
    designation: req.body.designation,
    email: req.body.email,
    phone: req.body.phone,
    age: req.body.age,
  });
  if (req.files) {
    let path = '';
    req.files.forEach(function (files, index, arr) {
      path = path + files.path + ',';
    });
    path = path.substring(0, path.lastIndexOf(','));
    employee.avatar = path;
  }

  try {
    const result = await employee.save();

    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export default {
  index,
  show,
  store,
  update,
  destroy,
  store_file,
  store_file_multi,
};
