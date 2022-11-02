import React, { useState, useRef, Component } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import Dropzone from "react-dropzone";
import axios from "axios";
import "./item.css";
import { API_URL } from "../../utils/constants";
import dummy from "../images/dummy.png";
import { useHistory } from "react-router-dom";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { Dropdown } from "semantic-ui-react";

//dialog box import
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Draggable from "react-draggable";
/**
 * draggable dialog component
 * @param {*} props
 * @returns
 */
function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-name"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    // height: "70%",
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
      "url(https://images.unsplash.com/photo-1536895058696-a69b1c7ba34f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  price: {
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
  formControl: {
    marginTop: theme.spacing(1),
    width: "90%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const initialState = {
  name: "",
  description: "",
  images: "",
  quantity: "",
  price: "",
  category: "",
  errors: {
    name: "",
    description: "",
    images: "",
    quantity: "",
    price: "",
    category: "",
  },
};

export default function AddItem() {
  const classes = useStyles();
  let history = useHistory();
  const [name, setSupplierName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImage] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    images: "",
    quantity: "",
    price: "",
    category: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [open, setOpen] = useState(false);


  
  const handleSupplierName = (e) => {
    setSupplierName(e.target.value);
  };

  const handleDescrip = (e) => {
    setDescription(e.target.value);
  };

  const handleImage = (e) => {
    setImage(e.target.value);
  };

  const handleQuantity = (e) => {
    setQuantity(e.target.value);
  };  

  const handlePrice = (e) => {
    setPrice(e.target.value);
  };  

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };


  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const clear = () => {
    setSupplierName("");
    setDescription("");
    setImage("");
    setQuantity("");
    setImage("");
    setPrice("");
    setCategory("");

  };

  const validate = () => {
    let errors = {};
    let isValid = true;

    if (name.length < 2) {
      isValid = false;
      errors["name"] = "Please enter valid Supplier Name";
    }
    if (price.length < 1) {
      isValid = false;
      errors["price"] = "Please enter valid Prive";
    }
    setErrors(errors);
    return isValid;
  };


  const onSubmit = () => {
    if (validate()) {
      setOpen(true);
      const supplier = {
        name: name,
        description: description,
        images: images,
        quantity: quantity,
        price: price,
        category: category,

      };
      axios
        .post(`${API_URL}/product/add-product/`, supplier, {
        //   headers: {
        //     Authorization: `Bearer ${localStorage.getItem("token")}`,
        //   },
        }); setSuccessMsg("upload Success");
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={6} className={classes.image} />
      <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <br />
          <Typography component="h1" variant="h5">
            Insert New Item
          </Typography>

            <div className={classes.alert}>
              <Dialog
                open={open}
                onClose={handleClose}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-name"
              >
                <DialogTitle
                  style={{
                    cursor: "move",
                    backgroundColor: "#02032b",
                    color: "#ffffff",
                  }}
                  id="draggable-dialog-name"
                >
                  <LocalLibraryIcon /> PMS
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    {successMsg != "" ? (
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
              id="name"
              label="Supplier Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={name}
              onChange={(e) => handleSupplierName(e)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="description"
              label="Description"
              name="description"
              autoComplete="description"
              autoFocus
              value={description}
              onChange={(e) => handleDescrip(e)}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="images"
              label="Image"
              name="images"
              autoComplete="images"
              autoFocus
              value={images}
              onChange={(e) => handleImage(e)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              // disabled
              id="quantity"
              label="Quantity"
              name="quantity"
              autoComplete="quantity"
              autoFocus
              value={quantity}
            onChange={(e) => handleQuantity(e)}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              // disabled
              id="price"
              label="price"
              name="price"
              autoComplete="price"
              autoFocus
              value={price}
            onChange={(e) => handlePrice(e)}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              // disabled
              id="category"
              label="category"
              name="category"
              autoComplete="category"
              autoFocus
              value={category}
              onChange={(e) => handleCategory(e)}
            />
  

            <div className={classes.btnGroup}>
              <Button
                id="btnBack"
                type="button"
                // href="/book"
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
                type="submit"
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
