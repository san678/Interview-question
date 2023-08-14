import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { TextField, Select, MenuItem, Container, Paper } from "@mui/material";
import dayjs from "dayjs"; // Import the dayjs library
import Box from "@mui/material/Box";
//import { DatePicker, LocalizationProvider } from "@mui/lab";
//import AdapterDayjs from "@mui/lab/AdapterDayjs";
import { styled } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function EditEmployeeWithFamily() {
  const [employee, setEmployee] = useState({});
  const [familyMembers, setFamilyMembers] = useState([]);
  const [editedEmployee, setEditedEmployee] = useState({});
  const [addFamilyMember, setAddFamilyMember] = useState({});
  const [dateOfBirth, setDateOfBirth] = React.useState(dayjs());

  const [familyMemberFirstName, setFamilyMemberFirstName] = useState("");
  const [familyMemberSurName, setFamilyMemberSurName] = useState("");
  const [familyMemberRelationship, setFamilyMemberRelationship] = useState("");

  const [statusOptions, setStatusOptions] = useState([0, 1]); // Define status options

  const currentDate = dayjs();
  /// Function to handle date change
  const handleDateChange = (newValue) => {
    // Extract only the date part (year, month, day) and set it to the state
    setDateOfBirth(newValue.startOf("day")); // Set to the beginning of the day
    editedEmployee.dateOfBirth = dateOfBirth;
  };

  const paramID = useParams();
  const navigate = useNavigate();

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
        setEditedEmployee(res.data.employee); // Set the initial state of the edited employee
        console.log(dateOfBirth);
        setDateOfBirth(dayjs(res.data.employee.dateOfBirth)); // Set the date of birth to the state
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEmployee({
      ...editedEmployee,
      [name]: value,
    });
  };

  // const handleFamilyInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setAddFamilyMember({
  //     ...addFamilyMember, // This is the state of the family members
  //     [name]: value, // This is the state of the family member being edited
  //   });
  // };

  const handleSaveEmployee = () => {
    axios
      .put(
        `http://localhost:7070/employees/update/${paramID.id}`,
        editedEmployee
      )
      .then((res) => {
        console.log(res.data);
        navigate(`/viewEmployee/${paramID.id}`); // Navigate back to view the updated employee details
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSaveFamilyMember = (familyMemberId) => {
    const editedFamilyMember = familyMembers.find(
      (member) => member._id === familyMemberId
    );
    axios
      .put(
        `http://localhost:7070/employeeFamilies/update/${familyMemberId}`,
        editedFamilyMember
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteFamilyMember = (familyMemberId) => {
    axios
      .delete(`http://localhost:7070/employeeFamilies/${familyMemberId}`)
      .then((res) => {
        console.log(res.data);
        // Remove the deleted family member from the state
        const updatedFamilyMembers = familyMembers.filter(
          (member) => member._id !== familyMemberId
        );
        setFamilyMembers(updatedFamilyMembers);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  async function addFamilyMemberToDatabase(id) {
    const familyData = {
      firstName: familyMemberFirstName,
      surName: familyMemberSurName,
      relationshipToEmployee: familyMemberRelationship,
      employee: id,
    };
    axios
      .post(`http://localhost:7070/employeeFamilies/add`, familyData)
      .then((response) => {
        console.log(response.data);
        if (response.data.status == 200) {
          console.log(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div>
      <Container>
        <Paper elevation={3} sx={{ p: 2, m: 2 }}>
          <form>
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
              <h1>Edit Employee Details</h1>
            </Box>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 2, width: "30ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <Box>
                <div>
                  <h3>Code</h3>
                  <TextField
                    id="code"
                    variant="outlined"
                    name="code"
                    value={editedEmployee.code}
                    onChange={handleInputChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <h3>Initials</h3>
                  <TextField
                    id="initials"
                    variant="outlined"
                    name="initials"
                    value={editedEmployee.initials}
                    onChange={handleInputChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                </div>
                <div>
                  <h3>First Name</h3>
                  <TextField
                    id="firstName"
                    variant="outlined"
                    name="firstName"
                    value={editedEmployee.firstName}
                    onChange={handleInputChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <h3>Surname</h3>
                  <TextField
                    id="surName"
                    variant="outlined"
                    name="surName"
                    value={editedEmployee.surName}
                    onChange={handleInputChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                </div>

                <div>
                  <h3>Address 1</h3>
                  <TextField
                    id="address1"
                    variant="outlined"
                    name="address1"
                    value={editedEmployee.address1}
                    onChange={handleInputChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <h3>Address 2</h3>
                  <TextField
                    id="address2"
                    variant="outlined"
                    name="address2"
                    value={editedEmployee.address2}
                    onChange={handleInputChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                </div>
                <div>
                  <h3>Date of Birth</h3>
                  <TextField
                    id="dateOfBirth"
                    variant="outlined"
                    name="dateOfBirth"
                    value={editedEmployee.dateOfBirth}
                    onChange={handleInputChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Date of Birth"
                      value={dateOfBirth}
                      onChange={handleDateChange}
                      maxDate={currentDate}
                    />
                  </LocalizationProvider>

                  <TextField
                    id="age"
                    label="Age"
                    variant="outlined"
                    value={calculateAge(editedEmployee.dateOfBirth)}
                    disabled // Disable the textbox for age input
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                </div>
                <div>
                  <h3>Status</h3>
                  <Select
                    id="status"
                    variant="outlined"
                    name="status"
                    value={editedEmployee.status}
                    onChange={handleInputChange}
                    fullWidth
                    defaultValue={editedEmployee.status}
                    sx={{ maxWidth: 200 }}
                  >
                    {statusOptions.map((status, index) => (
                      <MenuItem key={index} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
                <Button
                  variant="contained"
                  sx={{ m: 1 }}
                  onClick={handleSaveEmployee}
                >
                  Update Employee
                </Button>
              </Box>
            </Box>
          </form>
        </Paper>
      </Container>

      <div>
        <Container>
          <Paper elevation={3} sx={{ p: 2, m: 2 }}>
            <form>
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
                <h1>Add Family Members</h1>
              </Box>

              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                  <h3>First Name</h3>
                <TextField
                  id="firstName"
                  variant="outlined"
                  name="firstName"
                  value={familyMemberFirstName}
                  onChange={(e) => {
                    setFamilyMemberFirstName(e.target.value);
                  }}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                  </Grid>
                  <Grid item xs={4}>
                  <h3>Surname</h3>
                <TextField
                  id="surName"
                  variant="outlined"
                  name="surName"
                  value={familyMemberSurName}
                  onChange={(e) => {
                    setFamilyMemberSurName(e.target.value);
                  }}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                  </Grid>
                  <Grid item xs={4}>
                  <h3>Relationship to Employee</h3>
                <TextField
                  id="relationshipToEmployee"
                  variant="outlined"
                  name="relationshipToEmployee"
                  value={familyMemberRelationship}
                  onChange={(e) => {
                    setFamilyMemberRelationship(e.target.value);
                  }}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                  </Grid>
                </Grid>
              </Box> 
              <Box sx={{alignContent: "center"}}>
              <Button
                  variant="contained"
                  sx={{ alignItems: "center", justifyContent: "center" }}
                  onClick={() => {
                    addFamilyMemberToDatabase(paramID.id);
                  }}
                >
                  Add Family Member
                </Button>

              </Box>
                
            </form>
          </Paper>
        </Container>
      </div>

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
        <h1>Edit Family Members</h1>
      </Box>
      <Grid container spacing={2} sx={{ m: 3 }}>
        {familyMembers.map((item, key) => (
          <div key={key} className>
            <Card
              sx={{ m: 2, p: 1, backgroundColor: "grey", textAlign: "left" }}
            >
              <CardContent>
                <TextField
                  id={`familyFirstName${key}`}
                  label="First Name"
                  variant="outlined"
                  name="firstName"
                  value={item.firstName}
                  onChange={(e) => {
                    const updatedFamilyMembers = familyMembers.map(
                      (member, index) => {
                        if (index === key) {
                          return {
                            ...member,
                            firstName: e.target.value,
                          };
                        }
                        return member;
                      }
                    );
                    setFamilyMembers(updatedFamilyMembers);
                  }}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  id={`familySurName${key}`}
                  label="Surname"
                  variant="outlined"
                  name="surName"
                  value={item.surName}
                  onChange={(e) => {
                    const updatedFamilyMembers = familyMembers.map(
                      (member, index) => {
                        if (index === key) {
                          return {
                            ...member,
                            surName: e.target.value,
                          };
                        }
                        return member;
                      }
                    );
                    setFamilyMembers(updatedFamilyMembers);
                  }}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  id={`familyRelationship${key}`}
                  label="Relationship to Employee"
                  variant="outlined"
                  name="relationshipToEmployee"
                  value={item.relationshipToEmployee}
                  onChange={(e) => {
                    const updatedFamilyMembers = familyMembers.map(
                      (member, index) => {
                        if (index === key) {
                          return {
                            ...member,
                            relationshipToEmployee: e.target.value,
                          };
                        }
                        return member;
                      }
                    );
                    setFamilyMembers(updatedFamilyMembers);
                  }}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <Button
                  variant="contained"
                  sx={{ m: 1 }}
                  onClick={() => {
                    handleSaveFamilyMember(item._id);
                  }}
                >
                  Save
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  sx={{ m: 1 }}
                  onClick={() => {
                    handleDeleteFamilyMember(item._id);
                  }}
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          </div>
        ))}
      </Grid>
    </div>
  );
}

export default EditEmployeeWithFamily;
