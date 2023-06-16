/** @format */
import { useContext } from "react";
import axios from "axios";
import { Context } from "../context/store";

//const API_URL = "http://localhost:5115";
const API_URL = "https://localhost:7090";

export const useApiData = () => {
  const { state, dispatch } = useContext(Context);

  return {
    getCafe: (storeData) => {
      console.log("HIT getCafe");
      const { page, size, all } = storeData;
            // dispatch({
            //     type: "CAFE_DATA",
            //     payload: rows,
            // });
      axios
        .get(`${API_URL}/Cafe/GetAllCafes`, {
          params: {
            page,
            size,
            all,
          },
          headers: {
            // Authorization: Cookies.get("token"),
            // apikey: API_KEY,
          },
        })
        .then((res) => {
          dispatch({
            type: "CAFE_DATA",
            payload: res.data,
          });
        })
        .catch((err) => {
          dispatch({
            type: "ERRORS",
            payload: "Could not load data. Please try again.",
          });
        });
    },
    createCafe: (data) => {
        console.log("Cafe new data------>", data);
        return new Promise((resolve, reject) => {
          axios
            .post(
              `${API_URL}/Cafe/CreateCafe`,
              {
                id: 0,
                name: data.name,
                description: data.description,
                logo: data.logo,
                location: data.location,
              },
              {
                headers: {
                  // Authorization: Cookies.get("token"),
                  // apikey: API_KEY,
                },
              }
            )
            .then((res) => {
              dispatch({
                type: "SUCCESS",
                payload: "Cafe Added successfully.",
              });
              dispatch({
                type: "CAFE_DATA",
                payload: res.data,
              });
              resolve(true);
            })
            .catch((err) => {
              dispatch({
                type: "ERRORS",
                payload: "Could not add cafe. Please try again.",
              });
              reject(false);
            });
        });
    },
    updateCafe: (id, data) => {
        console.log("update data logo------>", data.logo);
        //console.log("update data logo length------>", data.logo.length);
        // const encoder = new TextEncoder();
        // const utf8Bytes = encoder.encode(data.logo);

        // console.log("update data logo byte------>", utf8Bytes);  
        
        // const decoder = new TextDecoder();
        // const str = decoder.decode(utf8Bytes);
        // console.log("update data logo str------>", str);            
            
        return new Promise((resolve, reject) => {
          axios
            .put(
              `${API_URL}/Cafe/UpdateCafe/${id}`,
              {
                id: data.id,
                name: data.name,
                description: data.description,
                logo: data.logo,
                // log: logoArray,
                location: data.location,
              },
              {
                headers: {
                  // Authorization: Cookies.get("token"),
                  // apikey: API_KEY,
                },
              }
            )
            .then((res) => {
              dispatch({
                type: "SUCCESS",
                payload: "Cafe updated successfully.",
              });
              dispatch({
                type: "CAFE_DATA",
                payload: res.data,
              });
              resolve(true);
            })
            .catch((err) => {
              dispatch({
                type: "ERRORS",
                payload: "Could not update cafe. Please try again.",
              });
              // dispatch({
              //   type: "ERRORS",
              //   payload: err.error,
              // });
              if (err.response && err.response.data && err.response.data.errors) {
                console.log(err.response.data.errors.Location[0]);
              } else {
                console.log("Unknown error occurred");
              }

              reject(false);
            });
        });
    },
      
    deleteCafe: (id) => {
      axios
        .delete(`${API_URL}/Cafe/DeleteCafe/${id}`, {
          headers: {
            // Authorization: Cookies.get("token"),
            // apikey: API_KEY,
          },
        })
        .then((res) => {
          dispatch({
            type: "SUCCESS",
            payload: "Cafe deleted successfully.",
          });
          dispatch({
            type: "CAFE_DATA",
            payload: res.data,
          });
        })
        .catch((err) => {
          dispatch({
            type: "ERRORS",
            payload: "Could not delete cafe. Please try again.",
          });
        });
    },

    getEmployees: (storeData) => {
      console.log("HIT getEmployee");
      const { page, size, all } = storeData;
      axios
        .get(`${API_URL}/Employee/GetAllEmployees`, {
          params: {
            page,
            size,
            all,
          },
          headers: {
            // Authorization: Cookies.get("token"),
            // apikey: API_KEY,
          },
        })
        .then((res) => {
          dispatch({
            type: "EMPLOYEE_DATA",
            payload: res.data,
          });
          console.log("employee datas: " + res.data)
        })
        .catch((err) => {
          dispatch({
            type: "ERRORS",
            payload: "Could not load data. Please try again.",
          });
        });
    },
    getEmployee: (id) => {
      console.log("HIT getEmployee");
      return new Promise((resolve, reject) => {
        axios
          .get(`${API_URL}/Employee/GetEmployeeById/${id}`, {
            
            headers: {
              // Authorization: Cookies.get("token"),
              // apikey: API_KEY,
            },
          })
          .then((res) => {
            // dispatch({
            //   type: "EMPLOYEE_DATA",
            //   payload: res.data,
            // });
            console.log("API employee data: " + res.data.name);
            resolve(res.data);
          })
          .catch((err) => {
            dispatch({
              type: "ERRORS",
              payload: "Could not load data. Please try again.",
            });
            reject(false)
          });
      });
    },
    createEmployee: (data) => {
      console.log("Employee new data------>", data);
      return new Promise((resolve, reject) => {
        axios
          .post(
            `${API_URL}/Employee/CreateEmployee`,
            {
              id: data.id,
              name: data.name,
              emailAddress: data.emailAddress,
              gender: data.gender,
              phoneNumber: data.phoneNumber,
              cafeId: data.cafeId,
              startDate: data.startDate,
            },
            {
              headers: {
                // Authorization: Cookies.get("token"),
                // apikey: API_KEY,
              },
            }
          )
          .then((res) => {
            dispatch({
              type: "SUCCESS",
              payload: "Employee added successfully.",
            });
            dispatch({
              type: "EMPLOYEE_DATA",
              payload: res.data,
            });
            resolve(true);
          })
          .catch((err) => {
            dispatch({
              type: "ERRORS",
              payload: "Could not add employee. Please try again.",
            });
            reject(false);
          });
      });
    },
    updateEmployee: (id, data) => {
      console.log("update date------>", data.startDate);
      return new Promise((resolve, reject) => {
        axios
          .put(
            `${API_URL}/Employee/UpdateEmployee/${id}`,
            {
              id: data.id,
              name: data.name,
              emailAddress: data.emailAddress,
              gender: data.gender,
              phoneNumber: data.phoneNumber,
              cafeId: data.cafeId,
              startDate: data.startDate,
            },
            {
              headers: {
                // Authorization: Cookies.get("token"),
                // apikey: API_KEY,
              },
            }
          )
          .then((res) => {
            dispatch({
              type: "SUCCESS",
              payload: "Employee updated successfully.",
            });
            dispatch({
              type: "EMPLOYEE_DATA",
              payload: res.data,
            });
            resolve(true);
          })
          .catch((err) => {
            dispatch({
              type: "ERRORS",
              payload: "Could not update employee. Please try again.",
            });
            reject(false);
          });
      });
    },
    deleteEmployee: (id) => {
      return new Promise((resolve, reject) => {
        axios
          .delete(`${API_URL}/Employee/DeleteEmployee/${id}`, {
            headers: {
              // Authorization: Cookies.get("token"),
              // apikey: API_KEY,
            },
          })
          .then((res) => {
            dispatch({
              type: "SUCCESS",
              payload: "Employee deleted successfully.",
            });
            dispatch({
              type: "EMPLOYEE_DATA",
              payload: res.data,
            });
            resolve(true);
          })
          .catch((err) => {
            dispatch({
              type: "ERRORS",
              payload: "Could not delete employee. Please try again.",
            });
            reject(false);
          });
      });
    },   
  };
};
