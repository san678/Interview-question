const router = require("express").Router();
let EmployeeFamily = require("../models/EmployeeFamily");

//create new employee family
router.route("/add").post((req, res) => {
  const firstName = req.body.firstName;
  const surName = req.body.surName;
  const relationshipToEmployee = req.body.relationshipToEmployee;
  const employee = req.body.employee;

  const newEmployeeFamily = new EmployeeFamily({
    firstName,
    surName,
    relationshipToEmployee,
    employee,
  });

  newEmployeeFamily
    .save()
    .then(() => res.json("Employee Family added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

//get one employee family
router.route("/:id").get((req, res) => {
  let empId = req.params.id;
  EmployeeFamily.find({ employee: empId })
    .then((employeeFamily) => res.json(employeeFamily))
    .catch((err) => res.status(400).json("Error: " + err));
});

//update employee family
router.route("/update/:id").put(async (req, res) => {
  let empId = req.params.id;
  const { firstName, surName, relationshipToEmployee, employee } = req.body;

  const updateEmployeeFamily = {
    firstName,
    surName,
    relationshipToEmployee,
    employee,
  };

  const update = await EmployeeFamily.findByIdAndUpdate(
    empId,
    updateEmployeeFamily
  )
    .then(() => {
      res.status(200).send({ status: "Employee Family updated" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with updating data", error: err.message });
    });
});

//delete employee family
router.route("/:id").delete(async (req, res) => {
  let empId = req.params.id;

  await EmployeeFamily.findByIdAndDelete(empId)
    .then(() => {
      res.status(200).send({ status: "Employee Family deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({
          status: "Error with delete employee family",
          error: err.message,
        });
    });
});

module.exports = router;
