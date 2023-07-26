import Cookies from "js-cookie";
import * as types from "./type";
import axios from "axios";
// require("dotenv").config()
export const handleLogin = (data) => (dispatch) => {
  dispatch({ type: types.LOADING });

  return axios
    .post(`${process.env.REACT_APP_Backend_url}/auth/login`, data)
    .then((res) => {
      // console.log(res);
      Cookies.set("token", res.data.token);
      sessionStorage.setItem("userdetails",JSON.stringify(res.data.data));
      // console.log(sessionStorage.getItem("userdetails"), res.data.data); 
      sessionStorage.setItem("token", res.data.token);
      dispatch({ type: types.LOGIN, payload: res.data.token });

      return res;
    })
    .catch((error) => {
      dispatch({ type: types.ERROR });
      return error;
    });
};
export const handleSignup = (data) => (dispatch) => {
  dispatch({ type: types.LOADING });

  return axios
    .post(`${process.env.REACT_APP_Backend_url}/auth/register`, data)
    .then((res) => {
      // console.log(res)
      // Cookies.set("token", res.data.token);
      sessionStorage.setItem("userdetails", JSON.stringify(res.data.data));
      sessionStorage.setItem("token", res.data.token);
      dispatch({ type: types.SIGNUP, payload: res.data.token });

      return res;
    })
    .catch((err) => {
      dispatch({ type: types.ERROR });
      return err;
    });
};

export const handlegetproducts = () => (dispatch) => {
  dispatch({ type: types.LOADING });
// console.log(process.env.REACT_APP_Backend_url)
  return axios
    .get(`${process.env.REACT_APP_Backend_url}/products/all`, {
      headers: {
        "Content-Type": "application/json",
        authorization: Cookies.get("token"),
      },
    })
    .then((res) => {
      // console.log(res.data);

      dispatch({ type: types.GETPRODUCTS, payload: res.data.data });

      return res;
    })
    .catch((err) => {
      dispatch({ type: types.ERROR });
      return err;
    });
};



export const handlegetcartproducts = (id) => (dispatch) => {
  dispatch({ type: types.LOADING });

  return axios
    .get(`${process.env.REACT_APP_Backend_url}/cart/usercart/${id}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: sessionStorage.getItem("token"),
      },
    })
    .then((res) => {
      console.log(res.data);

      dispatch({ type: types.GETCARTPRODUCTS, payload: res.data.data });

      return res;
    })
    .catch((err) => {
      dispatch({ type: types.ERROR });
      return err;
    });
};
export const handle_delete_cartproducts = (id) => (dispatch) => {
  dispatch({ type: types.LOADING });

  return axios
    .delete(`${process.env.REACT_APP_Backend_url}/cart/delete/${id}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: sessionStorage.getItem("token"),
      },
    })
    .then((res) => {
      console.log(res.data);

      dispatch({ type: types.DELETECARTPRODUCTS});
      
      return res;
    })
    .catch((err) => {
      dispatch({ type: types.ERROR });
      return err;
    });
};


export const handleaddcartproduct = (data) => (dispatch) => {
  dispatch({ type: types.LOADING });

  return axios
    .post(`${process.env.REACT_APP_Backend_url}/cart/add`,data, {
      headers: {
        "Content-Type": "application/json",
        authorization: sessionStorage.getItem("token"),
      },
    })
    .then((res) => {
      console.log(res.data);

      dispatch({ type: types.ADDCARTPRODUCTS, payload: res.data.data });

      return res;
    })
    .catch((err) => {
      console.log(err.message)
      dispatch({ type: types.ERROR });
      return err;
    });
};

export const handlecartquantity = (id,data) => (dispatch) => {
  dispatch({ type: types.LOADING });

  return axios
    .patch(`${process.env.REACT_APP_Backend_url}/cart/update/${id}`, data,{
      headers: {
        "Content-Type": "application/json",
        authorization: sessionStorage.getItem("token"),
      },
    })
    .then((res) => {
      console.log(res.data);

      dispatch({ type: types.HANDLECARTQUANTITY });

      return res;
    })
    .catch((err) => {
      console.log(err.message)
      dispatch({ type: types.ERROR });
      return err;
    });
};
export const handleaddress = (id,data) => (dispatch) => {
  dispatch({ type: types.LOADING });
console.log(data)
  return axios
    .patch(`${process.env.REACT_APP_Backend_url}/auth/update/address/${id}`,data,{
      headers: {
        "Content-Type": "application/json",
        authorization: sessionStorage.getItem("token"),
      },
    })
    .then((res) => {
      // console.log(res.data)
      sessionStorage.setItem("userdetails",JSON.stringify(res.data.data))
      dispatch({ type: types.ADDRESSUPDATE });
      return res;
    })
    .catch((err) => {
      console.log(err.message)
      dispatch({ type: types.ERROR });
      return err;
    });
};
export const handledelete_allcart_products = (id) => (dispatch) => {
  dispatch({ type: types.LOADING });

  return axios
    .delete(`${process.env.REACT_APP_Backend_url}/cart/deleteall/${id}`,{
      headers: {
        "Content-Type": "application/json",
        authorization: sessionStorage.getItem("token"),
      },
    })
    .then((res) => {
      // console.log(res.data)
      dispatch({ type: types.DELETE_ALLCARTPRODUCTS });
      return res;
    })
    .catch((err) => {
      console.log(err.message)
      dispatch({ type: types.ERROR });
      return err;
    });
};
export const handleadd_allcart_products_toorders = (data) => (dispatch) => {
  dispatch({ type: types.LOADING });
const user = JSON.parse(sessionStorage.getItem('userdetails'));
   data=data.map((el)=>{
    el.status="Pending";
    el.userID=user?._id
    el.orderDate=new Date().toISOString().slice(0, 10)
    return el
  })


console.log(data)
  return axios
    .post(`${process.env.REACT_APP_Backend_url}/orders/add`,data,{
      headers: {
        "Content-Type": "application/json",
        authorization: sessionStorage.getItem("token"),
      },
    })
    .then((res) => {
      dispatch({ type: types.ADDRESSUPDATE });
      return res;
    })
    .catch((err) => {
      console.log(err.message)
      dispatch({ type: types.ERROR });
      return err;
    });
};
export const handle_get_allorders = (id) => (dispatch) => {
  dispatch({ type: types.LOADING });

  return axios
    .get(`${process.env.REACT_APP_Backend_url}/orders/all/${id}`,{
      headers: {
        "Content-Type": "application/json",
        authorization: sessionStorage.getItem("token"),
      },
    })
    .then((res) => {
      dispatch({ type: types.GET_ALL_ORDERS ,payload:res.data.data});
      return res;
    })
    .catch((err) => {
      console.log(err.message)
      dispatch({ type: types.ERROR });
      return err;
    });
};
export const handle_get_allorders_byadmin = (id) => (dispatch) => {
  dispatch({ type: types.LOADING });

  return axios
    .get(`${process.env.REACT_APP_Backend_url}/orders/all`,{
      headers: {
        "Content-Type": "application/json",
        authorization: sessionStorage.getItem("admin_token"),
      },
    })
    .then((res) => {
      dispatch({ type: types.GET_ALL_ORDERS_BY_ADMIN ,payload:res.data.data});
      return res;
    })
    .catch((err) => {
      console.log(err.message)
      dispatch({ type: types.ERROR });
      return err;
    });
};
export const handle_add_reviews = (id,data) => (dispatch) => {
  dispatch({ type: types.LOADING });

  return axios
    .patch(`${process.env.REACT_APP_Backend_url}/products/reviews/${id}`,data,{
      headers: {
        "Content-Type": "application/json",
        authorization: sessionStorage.getItem("token"),
      },
    })
    .then((res) => {
      dispatch({ type: types.GET_ALL_ORDERS ,payload:res.data.data});
      return res;
    })
    .catch((err) => {
      console.log(err.message)
      dispatch({ type: types.ERROR });
      return err;
    });
};
export const handle_get_all_users = () => (dispatch) => {
  dispatch({ type: types.LOADING });

  return axios
    .get(`${process.env.REACT_APP_Backend_url}/auth/all`,{
      headers: {
        "Content-Type": "application/json",
        authorization: sessionStorage.getItem("admin_token"),
      },
    })
    .then((res) => {
      dispatch({ type: types.GET_ALL_ORDERS ,payload:res.data.data});
      return res;
    })
    .catch((err) => {
      console.log(err.message)
      dispatch({ type: types.ERROR });
      return err;
    });
};
export const handle_admin_login = (data) => (dispatch) => {
  dispatch({ type: types.LOADING });

  return axios
    .post(`${process.env.REACT_APP_Backend_url}/admin/login`,data,{
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      sessionStorage.setItem("admin_token",res.data.token)
      dispatch({ type: types.ADMIN_LOGIN ,payload:res.data.token});
      return res;
    })
    .catch((err) => {
      console.log(err.message)
      dispatch({ type: types.ERROR });
      return err;
    });
};
export const handle_admin_register = (data) => (dispatch) => {
  dispatch({ type: types.LOADING });

  return axios
    .post(`${process.env.REACT_APP_Backend_url}/admin/register`,data,{
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      sessionStorage.setItem("admin_token",JSON.stringify(res.data.token))
      dispatch({ type: types.ADMIN_REGISTER ,payload:res.data.token});
      return res;
    })
    .catch((err) => {
      console.log(err.message)
      dispatch({ type: types.ERROR });
      return err;
    });
};
export const handle_erase_admin_token = () => (dispatch) => {
   sessionStorage.setItem('admin_token',"")
  dispatch({type:types.ERASE_ADMIN_TOKEN})

};


export const handle_get_all_blogs = () => (dispatch) => {
  dispatch({ type: types.LOADING });

  return axios
    .get(`${process.env.REACT_APP_Backend_url}/auth/all`,{
      headers: {
        "Content-Type": "application/json",
        authorization: sessionStorage.getItem("admin_token"),
      },
    })
    .then((res) => {
      dispatch({ type: types.GET_ALL_ORDERS ,payload:res.data.data});
      return res;
    })
    .catch((err) => {
      console.log(err.message)
      dispatch({ type: types.ERROR });
      return err;
    });
};

export const handle_add_product_by_admin = (data) => (dispatch) => {
  dispatch({ type: types.LOADING });

  return axios
    .post(`${process.env.REACT_APP_Backend_url}/products/add`,data,{
      headers: {
        "Content-Type": "application/json",
        authorization: sessionStorage.getItem("admin_token"),
      },
    })
    .then((res) => {
      dispatch({ type: types.HANDLE_ADD_PRODUCT});
      return res;
    })
    .catch((err) => {
      console.log(err.message)
      dispatch({ type: types.ERROR });
      return err;
    });
};


export const handle_delete_product_by_admin = (id) => (dispatch) => {
  dispatch({ type: types.LOADING });

  return axios
    .delete(`${process.env.REACT_APP_Backend_url}/products/delete/${id}`,{
      headers: {
        "Content-Type": "application/json",
        authorization: sessionStorage.getItem("admin_token"),
      },
    })
    .then((res) => {
      dispatch({ type: types.HANDLE_DELETE_PRODUCT});
      return res;
    })
    .catch((err) => {
      console.log(err.message)
      dispatch({ type: types.ERROR });
      return err;
    });
};


export const handle_edit_product_by_admin = (id,data) => (dispatch) => {
  dispatch({ type: types.LOADING });

  return axios
    .patch(`${process.env.REACT_APP_Backend_url}/products/update/${id}`,data,{
      headers: {
        "Content-Type": "application/json",
        authorization: sessionStorage.getItem("admin_token"),
      },
    })
    .then((res) => {
      dispatch({ type: types.HANDLE_EDIT_PRODUCT});
      return res;
    })
    .catch((err) => {
      console.log(err.message)
      dispatch({ type: types.ERROR });
      return err;
    });
};

export const handle_delete_users_by_admin = (id) => (dispatch) => {
  dispatch({ type: types.LOADING });

  return axios
    .delete(`${process.env.REACT_APP_Backend_url}/auth/delete/${id}`,{
      headers: {
        "Content-Type": "application/json",
        authorization: sessionStorage.getItem("admin_token"),
      },
    })
    .then((res) => {
      dispatch({ type: types.HANDLE_DELETE_USER});
      return res;
    })
    .catch((err) => {
      console.log(err.message)
      dispatch({ type: types.ERROR });
      return err;
    });
};

export const handle_edit_orders_by_admin = (id,data) => (dispatch) => {
  dispatch({ type: types.LOADING });

  return axios
    .patch(`${process.env.REACT_APP_Backend_url}/orders/update/${id}`,data,{
      headers: {
        "Content-Type": "application/json",
        authorization: sessionStorage.getItem("admin_token"),
      },
    })
    .then((res) => {
      dispatch({ type: types.HANDLE_UPDATE_ORDERS});
      return res;
    })
    .catch((err) => {
      console.log(err.message)
      dispatch({ type: types.ERROR });
      return err;
    });
};

