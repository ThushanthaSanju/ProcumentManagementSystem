import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../utils/constants";
import "../suppliers/view.css";
import MaterialTable from "material-table";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
const ViewItems = (props) => {
  const { useState } = React;
  const [data, setData] = useState([]);
  const [errorMsg, setErrorMsg] = useState([]);
  const [iserror, setIserror] = useState(false);
  const [successMsg, setSuccessMsg] = useState([]);
  const [issucc, setIssucc] = useState(false);

  //get all book details
  useEffect(() => {
    const getFileList = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/product/productsad`, {
        //   headers: {
        //     Authorization: `Bearer ${localStorage.getItem('token')}`,
        //   },
        });
        setErrorMsg("");
        setData(data);
        console.log(data);
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
        console.log(error);
      }
    };

    getFileList();

    console.log(data);
  }, []);

  const [columns, setColumns] = useState([
    {
      title: "Image",
      field: "images",
      render: (rowData) => (
        <img
          style={{ height: 50, width: 50, borderRadius: "10%" }}
          // src={`http://localhost:8070/${rowData.file_path}`}
          src={rowData.images}
        />
      ),
    },
    { title: "Supplier Name", field: "name" },
    { title: "Item", field: "category" },
    { title: "Quantity", field: "quantity" , type: "numeric"},
    { title: "Price", field: "price" , type: "numeric"},
  ]);

  /////////////////////////update rows
  const api = axios.create({
    baseURL: `http://localhost:7070`,
  });

  const handleRowUpdate = (newData, oldData, resolve) => {
    //validation
    let errorList = [];
    if (newData.name === "") {
      errorList.push("Please enter name");
    }
    if (newData.category === "") {
      errorList.push("Please enter category");
    }
    if (newData.quantity === "") {
      errorList.push("Please enter quantity");
    }
    if (newData.quantity === "") {
      errorList.push("Please enter quantity");
    }

    if (errorList.length < 1) {
      api
        .put("/product/productsad/" + newData._id, newData, {
        //   headers: {
        //     Authorization: `Bearer ${localStorage.getItem('token')}`,
        //   },
        })
        .then((res) => {
          const dataUpdate = [...data];
          const index = oldData.tableData.id;
          dataUpdate[index] = newData;
          setData([...dataUpdate]);
          resolve();
          setIserror(false);
        })
        .catch((error) => {
          setErrorMsg(["Update failed! Server error"]);
          setIserror(true);
          resolve();
        });
    } else {
      setErrorMsg(errorList);
      setIserror(true);
      resolve();
    }
  };

  ////////////Delete Row

  const handleRowDelete = (oldData, resolve) => {
    api
      .delete("/product/productsad/" + oldData._id, {
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem('token')}`,
        // },
      })
      .then((res) => {
        const dataDelete = [...data];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setData([...dataDelete]);
        resolve();
        setSuccessMsg(["Delete success"]);
        setIssucc(true);
      })
      .catch((error) => {
        setErrorMsg(["Delete failed! Server error"]);
        setIserror(true);
        resolve();
      });
  };

  return (
    <div>
      <br />
      <br />
      <h1 id="h12" align="center">
        Item Management
      </h1>
      <div className="tbl">
        <div>
          {iserror && (
            <Alert severity="error">
              {errorMsg.map((msg, i) => {
                return <div key={i}>{msg}</div>;
              })}
            </Alert>
          )}

          {issucc && (
            <Alert severity="success">
              {successMsg.map((msg, i) => {
                return <div key={i}>{msg}</div>;
              })}
            </Alert>
          )}
        </div>

        <MaterialTable
          title={
            <Button
              id="btnAdd"
              variant="contained"
              color="primary"
              href="/addItem"
            >
              Add new Item
            </Button>
          }
          columns={columns}
          data={data}
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                handleRowUpdate(newData, oldData, resolve);
              }),

            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                handleRowDelete(oldData, resolve);
              }),
          }}
          options={{
            headerStyle: {
              backgroundColor: "rgb(111, 94, 83)",
              color: "rgb(255, 255, 255)",
            },
            actionsColumnIndex: -1,
          }}
          icons={{
            Edit: () => <EditIcon style={{ color: "green" }} />,
            Delete: () => <DeleteIcon style={{ color: "red" }} />
          }}
        />
      </div>
    </div>
  );
};

export default ViewItems;