import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import "./view.css";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Draggable from "react-draggable";
import { useHistory } from "react-router-dom";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import { API_URL } from "../../utils/constants";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    // height: "100vh",
    width: "85%",
    margin: "auto",
    marginTop: "20px",
    marginBottom: "20px",
  },
  alert: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  image: {
    backgroundImage:
      "url(https://images.unsplash.com/photo-1574757987642-5755f0839101?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "fitxy",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "90%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  btnGroup: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(2),
    },
  },
}));

export default function AddSupplier() {
  let history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [supplierName, setSupplierName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errors, setErrors] = useState({
    contact: "",
    address: "",
    supplierName: "",
  });

  const handleSupplierName = (e) => {
    setSupplierName(e.target.value);
  };

  const handleAddress = (e) => {
    setAddress(e.target.value);
  };

  const handleContact = (e) => {
    setContact(e.target.value);
  };


  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const clear = () => {
    setSupplierName("");
    setAddress("");
    setContact("");
  };

  //validations for the form
  const validate = () => {
    let errors = {};
    let isValid = true;

    if (supplierName.length < 2) {
      isValid = false;
      errors["supplierName"] = "Please enter valid Supplier Name";
    }
    if (contact.length !== 10) {
      isValid = false;
      errors["contact"] = "Please enter valid Mibile No";
    }
    setErrors(errors);
    return isValid;
  };

  //submit the form
  const onSubmit = () => {
    if (validate()) {
      setOpen(true);
      const supplier = {
        supplierName: supplierName,
        address: address,
        contact: contact,
      };
      axios
        .post(`${API_URL}/supplier/insert/`, supplier, {
        //   headers: {
        //     Authorization: `Bearer ${localStorage.getItem("token")}`,
        //   },
        }); setSuccessMsg("upload Success");
        // .then((res) => {
        //   if (res.data.success) {
        //     setSupplierName("");
        //     setAddress("");
        //     setContact("");
        //     setSuccessMsg("Successfully inserted");
        //   } else {
        //     setErrorMsg("Please try again");
        //   }
        // })
        // .catch((err) => {
        //   console.log(err);
        // });
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={6} className={classes.image} />
      <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Insert New Supplier
          </Typography>
          <div className={classes.alert}>
            <Dialog
              open={open}
              onClose={handleClose}
              PaperComponent={PaperComponent}
              aria-labelledby="draggable-dialog-title"
            >
              <DialogTitle
                style={{
                  cursor: "move",
                  backgroundColor: "#02032b",
                  color: "#ffffff",
                }}
                id="draggable-dialog-title"
              >
                <LocalLibraryIcon /> PMS
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  {successMsg !== "" ? (
                    <>
                      <div style={{ color: "#008000" }}>
                        <CheckIcon />
                        {successMsg}
                      </div>
                    </>
                  ) : (
                    <>
                      <div style={{ color: "#aa202b" }}>
                        <ClearIcon />
                        {errorMsg}
                      </div>
                    </>
                  )}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Ok
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="supplierName"
            label="Supplier Name"
            name="supplierName"
            autoComplete="supplierName"
            value={supplierName}
            onChange={(e) => handleSupplierName(e)}
            autoFocus
          />
            {errors.supplierName && (
            <span className="error">{errors.supplierName}</span> 
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="address"
            label="Address"
            name="address"
            autoComplete="address"
            value={address}
            onChange={(e) => handleAddress(e)}
            autoFocus
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="contact"
            label="Mobile Number"
            name="contact"
            autoComplete="contact"
            value={contact}
            onChange={(e) => handleContact(e)}
            autoFocus
          />
          {errors.contact ? <span className="error">{errors.contact}</span> : <></>}
    
          {errors.bookCode ? (
            <span className="error">{errors.bookCode}</span>
          ) : (
            <></>
          )}

          <div className={classes.btnGroup}>
            <Button
              id="btnBack"
              type="button"
              onClick={history.goBack}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.back}
            >
              Back
            </Button>

            <Button
              id="btnSave"
              // type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.sub}
              onClick={() => onSubmit()}
            >
              Save
            </Button>

            <Button
              type="reset"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.clear}
              onClick={clear}
            >
              Clear
            </Button>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}