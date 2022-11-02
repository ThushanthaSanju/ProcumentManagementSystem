import { useHistory } from "react-router-dom";
import InputField from "./password";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import PolymerIcon from '@material-ui/icons/Polymer';

import React, { useState } from "react";
import loginStyle from "./loginStyle.js";
import "./backStyle.css";
import axios from "axios";
import { API_URL } from "../../utils/constants";

/**
 * inisial form input state
 * @type {{ email: string, password: string}}
 */
const initialState = { email: "", password: "", avatar: "" };

/**
 * sign in and sign up component
 * @returns {*}
 * @constructor
 */
const SignIn = () => {
  /**
   * import variable
   * @type {*}
   */
  const classes = loginStyle();
  let history = useHistory();

  /**
   * states
   */
  const [showPassword, setShowpassword] = useState(false);
  const [isSignUp, setSignUp] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState(initialState);

  /**
   * password visibility togle
   */
  const handleShowPass = () => setShowpassword((prevShowPass) => !prevShowPass);

  /**
   * form submit
   * @param e
   */
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      await axios.post(`${API_URL}/admin/signin`, formData).then((res) => {
        localStorage.setItem("token", res.data.token);
      });
      try {
        const { data } = await axios.get(
          `${API_URL}/admin/${formData._id}`
        );
        setData(data[0]);
        console.log(data[0].email);
        localStorage.setItem("user", JSON.stringify({ formData: data[0] }));
        setData(null);
      } catch (error) {
        console.log(error);
      }
      history.push("/suppliers");
      console.log(formData);
      window.location.reload();
    } catch (error) {
      // error.response && setErrorMsg(error.response.data);
      console.log(error);
    }
  };

  /**
   * on text field value change
   * @param e
   */
  const onchange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    const validEID = RegExp(/\d{10}/);
    switch (name) {
      case "email":
        errors.email =
          value.length <= 0 ? "User Name Can not be empty!" : "";
        if (validEID.test(value)) {
          errors.email = "Enter valid User Name! ";
        }
        break;
      case "password":
        errors.password = value.length <= 0 ? "Password can not be empty!" : "";

        break;
      default:
        break;
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Container component="main" className="container" maxWidth="md">
      <Paper className={classes.paper} maxWidth="mdx" elevation={3}>
        <div>
          <Avatar className={classes.avatar}>
            <PolymerIcon />
          </Avatar>
          <Typography variant="h5">Sign In</Typography>
        </div>
        <form className={classes.form} onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <InputField
              name="email"
              label="Email"
              handleOnchange={onchange}
              type="text"
            />
            {errors.email.length > 0 && (
              <span className="error">{errors.email}</span>
            )}

            <InputField
              name="password"
              label="Password"
              handleOnchange={onchange}
              type={showPassword ? "text" : "password"}
              handleShowPass={handleShowPass}
            />
            {errors.email.length > 0 && (
              <span className="error">{errors.password}</span>
            )}
          </Grid>

          <Button
            className={classes.submit}
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
          <hr />
        </form>
      </Paper>
    </Container>
  );
};

export default SignIn;