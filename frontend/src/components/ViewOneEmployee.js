import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs"; // Import the dayjs library
import Box from "@mui/material/Box";

function ViewOneEmployeeWithFamily() {
  const [employee, setEmployee] = useState({});
  const [familyMembers, setFamilyMembers] = useState([]);
  const paramID = useParams();

  let navigate = useNavigate();

  const calculateAge = (birthDate) => {
    const today = dayjs();
    const dob = dayjs(birthDate);
    const age = today.year() - dob.year();
    const monthDifference = today.month() - dob.month();

    // Adjust age if the birth month hasn't occurred yet
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.date() < dob.date())
    ) {
      return age - 1;
    }

    return age;
  };

  useEffect(() => {
    // Fetch employee details
    axios
      .get(`http://localhost:7070/employees/get/${paramID.id}`)
      .then((res) => {
        console.log(res.data);
        setEmployee(res.data.employee);
      })
      .catch((err) => {
        console.log(err);
      });

    // Fetch associated family members
    axios
      .get(`http://localhost:7070/employeeFamilies/${paramID.id}`)
      .then((res) => {
        console.log(res.data);
        setFamilyMembers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [paramID.id]);

  function editEmployeeNavigate() {
    navigate(`/editEmployee/${paramID.id}`);
  }
  function deleteEmployee(){
    axios
    .delete(`http://localhost:7070/employees/delete/${paramID.id}`)
    .then((res) => {
      console.log(res.data);
      navigate(`/viewAllEmployee`);
    })
    .catch((err) => {
      console.log(err);
    });
  }
  return (
    <div>
      <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                p: 2,
                m: 0.5,
              }}
            >
              <h1>All Employees</h1>
            </Box>
      <Card
        sx={{
          maxWidth: 400,
          m: 2,
          p: 1,
          backgroundColor: "grey",
          textAlign: "left",
        }}
      >
        <CardContent>
          <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>
            Code : {employee.code}
          </Typography>
          <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>
            Initials : {employee.initials}
          </Typography>
          <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>
            First Name : {employee.firstName}
          </Typography>
          <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>
            Surname : {employee.surName}
          </Typography>
          <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>
            Address 1: {employee.address1}
          </Typography>
          <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>
            Address 2: {employee.address2}
          </Typography>
          {/* Display the formatted date of birth */}
          <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>
            Date of Birth: {dayjs(employee.dateOfBirth).format("YYYY-MM-DD")}
          </Typography>
          <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>
            Status: {employee.status}
          </Typography>
          {/* Display the current age */}
          <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>
            Age: {calculateAge(employee.dateOfBirth)} years
          </Typography>
          <Button
            variant="contained"
            sx={{ m: 1 }}
            onClick={() => {
              editEmployeeNavigate();
            }}
          >
            Edit
          </Button>

          <Button
            variant="contained"
            color="error"
            sx={{ m: 1 }}
            onClick={deleteEmployee}
          >
            Delete
          </Button>
        </CardContent>
      </Card>

      <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                p: 2,
                m: 0.5,
              }}
            >
              <h1>Family Members</h1>
            </Box>
      <Grid container spacing={2} sx={{ m: 3 }}>
        {familyMembers.map((item, key) => (
          <div key={key} className>
            <Card
              sx={{ m: 2, p: 1, backgroundColor: "grey", textAlign: "left" }}
            >
              <CardContent>
                <Typography
                  sx={{ fontSize: 20 }}
                  color="text.primary"
                  gutterBottom
                >
                  First Name : {item.firstName}
                </Typography>
                <Typography
                  sx={{ fontSize: 20 }}
                  color="text.primary"
                  gutterBottom
                >
                  Surname : {item.surName}
                </Typography>
                <Typography
                  sx={{ fontSize: 20 }}
                  color="text.primary"
                  gutterBottom
                >
                  Relationship : {item.relationshipToEmployee}
                </Typography>
                {/* <Button variant="contained" sx={{m:1}}>Edit</Button>
                <Button variant="contained" color="error" sx={{m:1}}>Delete</Button> */}
              </CardContent>
            </Card>
          </div>
        ))}
      </Grid>
    </div>
  );
}

export default ViewOneEmployeeWithFamily;
