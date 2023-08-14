const router = require("express").Router();
const Employee = require("../models/Employee");

//create new employee
router.route("/add").post((req, res) => {
  const code = req.body.code;
  const initials = req.body.initials;
  const firstName = req.body.firstName;
  const surName = req.body.surName;
  const address1 = req.body.address1;
  const address2 = req.body.address2;
  const dateOfBirth = req.body.dateOfBirth;
  const status = req.body.status;

  const newEmployee = new Employee({
    code,
    initials,
    firstName,
    surName,
    address1,
    address2,
    dateOfBirth,
    status,
  });

  newEmployee
    .save()
    .then(() =>
      res.json({
        message: "Employee added!",
        data: newEmployee,
      })
    )
    .catch((err) => res.status(400).json("Error: " + err));
});

//get all employees
router.route("/").get((req, res) => {
  Employee.find()
    .then((employees) => res.json(employees))
    .catch((err) => res.status(400).json("Error: " + err));
});

//update employee
router.route("/update/:id").put(async (req, res) => {
  let empId = req.params.id;
  const {
    code,
    initials,
    firstName,
    surName,
    address1,
    address2,
    dateOfBirth,
    status,
  } = req.body;

  const updateEmployee = {
    code,
    initials,
    firstName,
    surName,
    address1,
    address2,
    dateOfBirth,
    status,
  };

  const update = await Employee.findByIdAndUpdate(empId, updateEmployee)
    .then(() => {
      res.status(200).send({ status: "Employee updated" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with updating data", error: err.message });
    });
});

//delete employee
router.route("/delete/:id").delete(async (req, res) => {
  let empId = req.params.id;

  await Employee.findByIdAndDelete(empId)
    .then(() => {
      res.status(200).send({ status: "Employee deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with delete employee", error: err.message });
    });
});

//get one employee
router.route("/get/:id").get(async (req, res) => {
  let empId = req.params.id;

  const employee = await Employee.findById(empId)
    .then((employee) => {
      res.status(200).send({ status: "Employee fetched", employee });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with get employee", error: err.message });
    });
});

module.exports = router;
