import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { Container, FormControl, Paper } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

function AddEmployee() {
  const [familyMembers, setFamilyMembers] = React.useState([]);
  const [firstName, setFirstName] = React.useState("");
  const [surName, setSurname] = React.useState("");
  const [relationship, setRelationship] = React.useState("");
  const [code, setCode] = React.useState("");
  const [initials, setInitials] = React.useState("");
  const [empFirstName, setEmpFirstName] = React.useState("");
  const [empSurName, setEmpSurName] = React.useState("");
  const [address1, setAddress1] = React.useState("");
  const [address2, setAddress2] = React.useState("");
  const [dateOfBirth, setDateOfBirth] = React.useState(dayjs());
  const [status, setStatus] = React.useState("");

  const currentDate = dayjs();
  /// Function to handle date change
  const handleDateChange = (newValue) => {
    // Extract only the date part (year, month, day) and set it to the state
    setDateOfBirth(newValue.startOf("day")); // Set to the beginning of the day
  };

  // Define a boolean variable to check if the code length is valid
  const isCodeValid = code.length === 3;

  const handleEmpFirstNameChange = (e) => {
    const value = e.target.value;
    if (value.length <= 50) {
      setEmpFirstName(value);
    }
  };

  const handleEmpSurNameChange = (e) => {
    const value = e.target.value;
    if (value.length <= 50) {
      setEmpSurName(value);
    }
  };

  const handleFamilyFirstNameChange = (e) => {
    const value = e.target.value;
    if (value.length <= 50) {
      setFirstName(value);
    }
  };

  const handleFamilySurNameChange = (e) => {
    const value = e.target.value;
    if (value.length <= 50) {
      setSurname(value);
    }
  };

  const handleAddress1Change = (e) => {
    const value = e.target.value;
    if (value.length <= 100) {
      setAddress1(value);
    }
  };

  const handleAddress2Change = (e) => {
    const value = e.target.value;
    if (value.length <= 100) {
      setAddress2(value);
    }
  };

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  let navigate = useNavigate();

  const addFamilyMember = () => {
    // Create a new family member object
    const newFamilyMember = {
      firstName: firstName,
      surName: surName,
      relationship: relationship,
    };

    // Append the new family member to the existing array
    setFamilyMembers([...familyMembers, newFamilyMember]);

    // Clear the input field after adding the family member
    setFirstName("");
    setSurname("");
    setRelationship("");
  };

  async function addEmployee() {
    const data = {
      code: code,
      initials: initials,
      firstName: empFirstName,
      surName: empSurName,
      address1: address1,
      address2: address2,
      dateOfBirth: dateOfBirth,
      status: status,
    };
    axios
      .post(`http://localhost:7070/employees/add`, data)
      .then(async (response) => {
        console.log(response.data);

        familyMembers.forEach((element) => {
          const familyData = {
            firstName: element.firstName,
            surName: element.surName,
            relationshipToEmployee: element.relationship,
            employee: response.data.data._id,
          };
          axios
            .post(`http://localhost:7070/employeeFamilies/add`, familyData)
            .then((response) => {
              console.log(response.data);
              if (response.data.status == 200) {
                console.log(response.data);
              }
              navigate("/viewAllEmployee");
            })
            .catch((err) => {
              console.log(err);
            });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function addFamilyMemberToDatabase(item, id) {
    const familyData = {
      firstName: item.firstName,
      surName: item.surName,
      relationshipToEmployee: "mother",
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
        <Paper elevation={2}>
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
              <h1>Add Employee</h1>
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
                <br />
                <div>
                  <TextField
                    id="code"
                    label="Code"
                    variant="outlined"
                    helperText={"Code must be 3 characters"}
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value);
                    }}
                  />

                  <TextField
                    id="initials"
                    label="Initials"
                    variant="outlined"
                    value={initials}
                    onChange={(e) => {
                      setInitials(e.target.value);
                    }}
                  />
                </div>

                <div>
                  <TextField
                    id="empFirstName"
                    label="First Name"
                    variant="outlined"
                    value={empFirstName}
                    onChange={handleEmpFirstNameChange}
                  />

                  <TextField
                    id="empSurName"
                    label="Surname"
                    variant="outlined"
                    value={empSurName}
                    onChange={handleEmpSurNameChange}
                  />
                </div>

                <div>
                  <TextField
                    id="address1"
                    label="Address 1"
                    variant="outlined"
                    value={address1}
                    onChange={handleAddress1Change}
                  />
                  <TextField
                    id="address2"
                    label="Address 2"
                    v
                    ariant="outlined"
                    value={address2}
                    onChange={handleAddress2Change}
                  />
                </div>

                <div>
                  <Grid container spacing={2}>
                    <Grid item xs={3.7}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Date of Birth"
                      value={dateOfBirth}
                      onChange={handleDateChange}
                      maxDate={currentDate}
                    />
                  </LocalizationProvider>
                    </Grid>
                    <Grid item xs={2}>
                      
                    <Box sx={{ maxWidth: 120, m:2 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Status
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={status}
                        label="Status"
                        onChange={handleChange}
                      >
                        <MenuItem value={0}>0</MenuItem>
                        <MenuItem value={1}>1</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                    </Grid>
                  </Grid>
                  

                  
                </div>
              </Box>
            </Box>

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
              <h1>Add Family Member</h1>
            </Box>

            <div>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TextField
                  id="familyFirstName"
                  label="First Name"
                  variant="outlined"
                  sx={{ m: 2 }}
                  value={firstName}
                  onChange={handleFamilyFirstNameChange}
                />
                <TextField
                  id="surname"
                  label="Surname"
                  variant="outlined"
                  sx={{ m: 2 }}
                  value={surName}
                  onChange={handleFamilySurNameChange}
                />
                <TextField
                  id="relationship"
                  label="Relationship to Employee"
                  variant="outlined"
                  sx={{ m: 2 }}
                  value={relationship}
                  onChange={(e) => {
                    setRelationship(e.target.value);
                  }}
                />
              </Box>
            </div>
            <div>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  variant="contained"
                  sx={{ m: 3 }}
                  onClick={() => {
                    addFamilyMember();
                  }}
                >
                  Add Family Member
                </Button>
                <Button
                  variant="contained"
                  sx={{ m: 3 }}
                  onClick={() => {
                    addEmployee();
                  }}
                  disabled={!isCodeValid} // Disable the button if the code is not valid
                >
                  Add Employee
                </Button>
              </Box>

              <Grid container spacing={2} sx={{ m: 3 }}>
                {familyMembers.map((item, key) => (
                  <div key={key} className>
                    {/* <h1>First Name : {item.firstName}</h1>
              <h1>Sur Name : {item.surName}</h1>
              <h1>Relationship : {item.relationship}</h1> */}
                    <Card
                      sx={{
                        maxWidth: 340,
                        m: 2,
                        p: 1,
                        backgroundColor: "grey",
                        textAlign: "left",
                      }}
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
                          Relationship : {item.relationship}
                        </Typography>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </Grid>
            </div>
          </form>
        </Paper>
      </Container>
    </div>
  );
}

export default AddEmployee;
