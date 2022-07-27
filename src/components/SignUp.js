import React from "react";
import "./SignUp.css";
import Card from "@mui/material/Card";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import Modal from '@mui/material/Modal';

const Input = styled("input")({
    display: "none",
  });

  export default function SignUp() {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    const [checked, setChecked] = React.useState(false);
  
    const handleChangeRGPD = (event) => {
      setChecked(event.target.checked);
      console.log(checked)
    };
  
    let navigate = useNavigate();
  
    const handleSubmit = (event) => {
      event.preventDefault();
        if (checked === true) {
        const data = new FormData(event.currentTarget);
        console.log({
          email: data.get('email'),
          password: data.get('password'),
          username: data.get('username'),
          birthdate: data.get('birthdate')
        });
  
        axios.post('/api/signup',
        {
          email: data.get('email'),
          password: data.get('password'),
          username: data.get('username'),
          birthdate: data.get('birthdate')})
            .then(
              (response) => {
                let result = response.data;
                console.log(result.message);
                if (result.message !== "Email already exists !"){
                  navigate("/", { replace: true })
                }
              },
              (error) => {
                console.log(error);
              }
            );}
            else {
            console.log("Veuillez accepter les RGPD")}
  
    };

    return (
        <div className="SignUp">
          <div className="ContainerSignUp">
            <Button className="ButtonReturn" href="/">
            <ArrowBackIosIcon style={{color:"black"}}></ArrowBackIosIcon>
            </Button>
            <Card className="FormSignUp" variant="outlined">
            <div className="HeaderLogo-Signup">
            </div>
              <div className="SignUpTitle">
                <h1>Inscription</h1>
              </div>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid item xs={12} sm={3}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Pseudo"
                  name="username"
                  autoComplete="test"
                  className="FormStyleSignUp"
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  required
                  fullWidth
                  id="birthdate"
                  label="Date de naissance"
                  name="birthdate"
                  autoComplete="test"
                  className="FormStyleSignUp"
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  className="FormStyleSignUp"
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Mot de passe"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  className="FormStyleSignUp"
                />
              </Grid>
              <FormGroup className="CheckBoxRGPD">
      <FormControlLabel control={<Checkbox
                checked={checked}
                onChange={handleChangeRGPD}
                inputProps={{ 'aria-label': 'controlled' }}
                className="CheckBoxRGPD"
              />} label="J'atteste de l'exactitude des informations fournies et accepte le traitement de mes données personnelles par l'entreprise à des fins non commerciales." />
              <div>
          <Button onClick={handleOpen}>Voir nos C.G.U</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                C.G.U
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              “J'atteste de l'exactitude des informations fournies et accepte le traitement de mes données personnelles par l'entreprise pour les fins de bon fonctionnement de l'application et statistiques dans les conditions prévues par la Politique de confidentialité.
    Ces données seront supprimées au maximum un an après la fin de ma procédure de candidature ou de la fin de ma participation à un programme opéré par l’entreprise. Je dispose à tout moment d'un droit d'accès, de rectification et de suppression qui peut-être exercé en contactant l'adresse rgpd@matrice.io”
              </Typography>
            </Box>
          </Modal>
        </div>
    </FormGroup>
              <Stack direction="column" spacing={2}>
                <Button type="submit" className="ButtonSignUp" variant="contained">
                  S'inscrire
                </Button>
              </Stack>
              </Box>
            </Card>
          </div>
        </div>
      );
    }
    