import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
//import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function ViewAllEmployee() {
  const [employees, setEmployees] = useState([]);

    let navigate = useNavigate();

  useEffect(() => {
    function getEmployees() {
      axios
        .get(`http://localhost:7070/employees/`)
        .then((res) => {
          console.log(res.data);
          setEmployees(res.data); //set employees array
        })
        .catch((err) => {
          alert(err);
          console.log(err);
        });
    }
    getEmployees();
  }, []);

  function viewEmployee(id) {
    navigate(`/viewEmployee/${id}`);
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

      <Grid container spacing={2} sx={{ m: 3 }}>
        {employees.map((item, key) => (
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
                  Code   : <b>{item.code}</b>
                </Typography>
                
                <Typography
                  sx={{ fontSize: 20 }}
                  color="text.primary"
                  gutterBottom
                >
                  First Name  : <b>{item.firstName}</b>
                </Typography>
              </CardContent>

              <CardActions>
              <Button variant="contained"
              onClick={()=>{
                viewEmployee(item._id)
              }}>
                View</Button>
              </CardActions>
            </Card>
          </div>
        ))}
      </Grid>
    </div>
  );
}

export default ViewAllEmployee;
