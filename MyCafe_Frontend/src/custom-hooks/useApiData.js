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
        console.log("update data------>", data);
        return new Promise((resolve, reject) => {
          axios
            .put(
              `${API_URL}/Cafe/UpdateCafe/${id}`,
              {
                id: data.id,
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
        })
        .catch((err) => {
          dispatch({
            type: "ERRORS",
            payload: "Could not delete cafe. Please try again.",
          });
        });
    },
  };
};
