import React, { useState } from "react";
import "./login.css";
import Swal from "sweetalert2";
import { CSSTransition } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";
import {
  handle_admin_login,
  handle_admin_register,
} from "../Redux/action";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";

function AdminLogin() {
  const [showLogin, setShowLogin] = useState(true);
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const store = useSelector((store) => store);
  const { loading, error, token } = store;
  const [adminID, setadminID] = useState("");
  const [adminPass, setadminPass] = useState("");
  const handleregister = (e) => {

    e.preventDefault();
    let obj = {
      name: username,
      email: email,
      password: password,
      adminID: adminID,
      adminPass: adminPass,
    };

    dispatch(handle_admin_register(obj)).then((res) => {
      // console.log(res.response.status);
      if (res.status === 200 || res.status === 201) {
        Swal.fire("", "Signup Successful", "success");
        return navigate("/admin");
      } else {
        Swal.fire(
          "Enter valid Email or User Already Exists",
          "couldn't signup",
          "error"
        );
        return navigate("/adminlogin");
      }
    });
  };

  const handlelogin = (e) => {
    e.preventDefault();
    let obj = {
      email: email,
      password: password,
    };

    dispatch(handle_admin_login(obj))
      .then((res) => {

        if (res.status === 201) {
          Swal.fire("", "You have successfully logged in", "success");
          return navigate("/admin");
        } else {
          Swal.fire("Email or Password Wrong", "couldn't log in", "error");
          return navigate("/adminlogin");
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleToggle = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div className="container">
      <CSSTransition
        in={showLogin}
        timeout={300}
        classNames="form-transition"
        unmountOnExit
      >
        <div className="form-container">
          <h2>Admin Login</h2>
          <form onSubmit={handlelogin}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                required
              />
            </div>
            <button className="registerbtn" type="submit">
              {loading ? <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='sm'
              /> : "Login"}
            </button>
            <p className="toggle-text">
              Don't have an account?{" "}
              <span className="toggle-link" onClick={handleToggle}>
                Sign Up
              </span>
            </p>
          </form>
        </div>
      </CSSTransition>
      <CSSTransition
        in={!showLogin}
        timeout={300}
        classNames="form-transition"
        unmountOnExit
      >
        <div className="form-container">
          <h2>Admin Register</h2>
          <form onSubmit={handleregister}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setusername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Admin Email:</label>
              <input
                type="password"
                value={adminID}
                onChange={(e) => setadminID(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Admin Password:</label>
              <input
                type="password"
                value={adminPass}
                onChange={(e) => setadminPass(e.target.value)}
                required
              />
            </div>
            <button className="registerbtn" type="submit">
              {loading ? <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='sm'
              /> : "Register"}
            </button>
            <p className="toggle-text">
              Already have an account?{" "}
              <span className="toggle-link" onClick={handleToggle}>
                Login
              </span>
            </p>
          </form>
        </div>
      </CSSTransition>
    </div>
  );
}

export default AdminLogin;
