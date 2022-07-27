import "./Login.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";


const Input = styled("input")({
    display: "none",
  });
  
  export default function Login(props) {
  
    let navigate = useNavigate();
  
    const [loginForm, setloginForm] = useState({
      email: "",
      password: ""
    })
  
    useEffect(() => {
      console.log(loginForm.email)
      console.log(loginForm.password)
    }, [loginForm]);
  
  
    function logMeIn(event) {
      axios({
        method: "POST",
        url: "/token",
        data: {
          email: loginForm.email,
          password: loginForm.password
        }
      })
        .then((response) => {
          let result = response.data;
          console.log(result);
          console.log(response.data.message)
          console.log("access token :", response.data.access_token)
          if (response.data.message !== undefined) {
            props.setToken(response.data.access_token);
            localStorage.setItem('email', loginForm.email);
            navigate("/homepage", { replace: true })
          };
        }).catch((error) => {
          if (error.response) {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
          }
        })
      setloginForm(({
        email: "",
        password: ""
      }))
      event.preventDefault()
    }
  
    function handleChange(event) {
      const { value, name } = event.target
      setloginForm(prevNote => ({
        ...prevNote, [name]: value
      })
      )
    }
  
  
    return (
      <div className="Login">
        <div className="ContainerLogin">
          <Card className="FormLogin" variant="outlined">
            <div className="HeaderLogo-Login">
            </div>
            <div className="LoginTitle">
              <h1>Bienvenue !</h1>
            </div>
            <Box component="form" noValidate onSubmit={logMeIn} sx={{ mt: 3 }}>
  
              <Grid item xs={12}>
                <TextField
                  onChange={handleChange}
                  fullWidth
                  id="email"
                  label="E-mail"
                  name="email"
                  className="FormStyleLogin"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={handleChange}
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  className="FormStyleLogin"
                />
              </Grid>
              <div className="LoginText">
                <a className="ForgetPassword" href="/password">Mot de passe oublié ?</a>
              </div>
              <Stack direction="column" spacing={2}>
                <Button type="submit" className="ButtonLogin" variant="contained">
                  Connexion
                </Button>
  
              </Stack>
              <div className="NoLogin">
                <a className="loginCompteText" href="/signup">Vous n'avez pas de compte ? <br></br> Inscrivez-vous</a>
              </div>
            </Box>
          </Card>
        </div>
      </div>
    );
  }