import React, { useEffect, useState } from "react";

import "./mainadmin.css";
import { handle_get_all_users, handlegetproducts } from "../../Redux/action";
import { useDispatch } from "react-redux";
const MainAdmin = () => {
  const dispatch = useDispatch();
  const [active_title, setactivetitle] = useState("Dashboard");
  const handle_Component = (e) => {
    console.log(e)
    let val = e.target.innerText;
    setactivetitle(e.target.innerText);
    console.log(val)
    if (val === "Customers") {
      dispatch(handle_get_all_users()).then((res) => {
          console.log(res.data);
        });
    } else if (val === "Products") {
       
        dispatch(handlegetproducts()).then((res) => {
        console.log(res.data);
    });
} else if (val === "Orders") {
        
        dispatch(handlegetproducts()).then((res) => {
            console.log(res.data);
        });
    }
    else if (val === "Blogs") {
        
        
      dispatch(handlegetproducts()).then((res) => {
        console.log(res.data);
      });
    }
  };

  useEffect(() => {
    // Query all the side menu items with 'top' class
    const allSideMenu = document.querySelectorAll(
      "#sidebar .side-menu.top li a"
    );
    // Add click event listener to each side menu item
    allSideMenu.forEach((item) => {
      const li = item.parentElement;

      item.addEventListener("click", function () {
        // Remove 'active' class from all side menu items
        allSideMenu.forEach((i) => {
          i.parentElement.classList.remove("active");
        });

        // Add 'active' class to the clicked side menu item
        li.classList.add("active");
      });
    });

    // TOGGLE SIDEBAR
    const menuBar = document.querySelector("#content nav .bx.bx-menu");
    const sidebar = document.getElementById("sidebar");

    menuBar.addEventListener("click", function () {
      sidebar.classList.toggle("hide");
    });

    // SEARCH BUTTON
    const searchButton = document.querySelector(
      "#content nav form .form-input button"
    );
    const searchButtonIcon = document.querySelector(
      "#content nav form .form-input button .bx"
    );
    const searchForm = document.querySelector("#content nav form");

    searchButton.addEventListener("click", function (e) {
      if (window.innerWidth < 576) {
        e.preventDefault();
        searchForm.classList.toggle("show");
        if (searchForm.classList.contains("show")) {
          searchButtonIcon.classList.replace("bx-search", "bx-x");
        } else {
          searchButtonIcon.classList.replace("bx-x", "bx-search");
        }
      }
    });

    // Handle initial window width conditions
    if (window.innerWidth < 768) {
      sidebar.classList.add("hide");
    } else if (window.innerWidth > 576) {
      searchButtonIcon.classList.replace("bx-x", "bx-search");
      searchForm.classList.remove("show");
    }

    // Handle window resize event
    window.addEventListener("resize", function () {
      if (this.innerWidth > 576) {
        searchButtonIcon.classList.replace("bx-x", "bx-search");
        searchForm.classList.remove("show");
      }
    });

    // SWITCH MODE
    const switchMode = document.getElementById("switch-mode");

    switchMode.addEventListener("change", function () {
      if (this.checked) {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }
    });
  }, []);
  return (
    <>
      <section id="sidebar">
        <a href="#" class="brand">
          <i class="bx bxs-smile"></i>
          <span class="text">Admin Panel</span>
        </a>
        <ul class="side-menu top">
          <li class="active">
            <a href="#">
              <i class="bx bxs-dashboard"></i>
              <span onClick={handle_Component} class="text">
                Dashboard
              </span>
            </a>
          </li>
          <li>
            <a href="#">
              <i class="bx bxs-shopping-bag-alt"></i>
              <span onClick={handle_Component} class="text">
                Customers
              </span>
            </a>
          </li>
          <li>
            <a href="#">
              <i class="bx bxs-doughnut-chart"></i>
              <span onClick={handle_Component} class="text">Orders</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i class="bx bxs-message-dots"></i>
              <span onClick={handle_Component} class="text">Products</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i class="bx bxs-group"></i>
              <span onClick={handle_Component} class="text">Blogs</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i class="bx bxs-group"></i>
              <span onClick={handle_Component} class="text">Team</span>
            </a>
          </li>
        </ul>
        <ul class="side-menu">
          <li>
            <a href="#">
              <i class="bx bxs-cog"></i>
              <span class="text">Settings</span>
            </a>
          </li>
          <li>
            <a href="#" class="logout">
              <i class="bx bxs-log-out-circle"></i>
              <span class="text">Logout</span>
            </a>
          </li>
        </ul>
      </section>

      <section id="content">
        <nav>
          <i class="bx bx-menu"></i>
          <a href="#" class="nav-link">
            Categories
          </a>
          <form action="#">
            <div class="form-input">
              <input type="search" placeholder="Search..." />
              <button type="submit" class="search-btn">
                <i class="bx bx-search"></i>
              </button>
            </div>
          </form>
          <input type="checkbox" id="switch-mode" hidden />
          <label for="switch-mode" class="switch-mode"></label>
          <a href="#" class="notification">
            <i class="bx bxs-bell"></i>
            <span class="num">8</span>
          </a>
          <a href="#" class="profile">
            <img src="img/people.png" />
          </a>
        </nav>

        <main>
          <div class="head-title">
            <div class="left">
              <h1>{active_title}</h1>
              <ul class="breadcrumb">
                <li>
                  <a href="dashboard">{active_title}</a>
                </li>
                <li>
                  <i class="bx bx-chevron-right"></i>
                </li>
                <li>
                  <a class="active" href="#">
                    Home
                  </a>
                </li>
              </ul>
            </div>
            <a href="#" class="btn-download">
              <i class="bx bxs-cloud-download"></i>
              <span class="text">Download PDF</span>
            </a>
          </div>

         { active_title ==="Dashboard" && <ul class="box-info">
            <li>
              <i class="bx bxs-calendar-check"></i>
              <span class="text">
                <h3>1020</h3>
                <p>New Order</p>
              </span>
            </li>
            <li>
              <i class="bx bxs-group"></i>
              <span class="text">
                <h3>2834</h3>
                <p>Visitors</p>
              </span>
            </li>
            <li>
              <i class="bx bxs-dollar-circle"></i>
              <span class="text">
                <h3>$2543</h3>
                <p>Total Sales</p>
              </span>
            </li>
          </ul>
                         }
          <div class="table-data">
            <div class="order">
              <div class="head">
                <h3>All {active_title}</h3>
                <i class="bx bx-search"></i>
                <i class="bx bx-filter"></i>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Date Order</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <img src="img/people.png" />
                      <p>John Doe</p>
                    </td>
                    <td>01-10-2021</td>
                    <td>
                      <span class="status completed">Completed</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <img src="img/people.png" />
                      <p>John Doe</p>
                    </td>
                    <td>01-10-2021</td>
                    <td>
                      <span class="status pending">Pending</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <img src="img/people.png" />
                      <p>John Doe</p>
                    </td>
                    <td>01-10-2021</td>
                    <td>
                      <span class="status process">Process</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <img src="img/people.png" />
                      <p>John Doe</p>
                    </td>
                    <td>01-10-2021</td>
                    <td>
                      <span class="status pending">Pending</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <img src="img/people.png" />
                      <p>John Doe</p>
                    </td>
                    <td>01-10-2021</td>
                    <td>
                      <span class="status completed">Completed</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* <div class="todo">
					<div class="head">
						<h3>Todos</h3>
						<i class='bx bx-plus' ></i>
						<i class='bx bx-filter' ></i>
					</div>
					<ul class="todo-list">
						<li class="completed">
							<p>Todo List</p>
							<i class='bx bx-dots-vertical-rounded' ></i>
						</li>
						<li class="completed">
							<p>Todo List</p>
							<i class='bx bx-dots-vertical-rounded' ></i>
						</li>
						<li class="not-completed">
							<p>Todo List</p>
							<i class='bx bx-dots-vertical-rounded' ></i>
						</li>
						<li class="completed">
							<p>Todo List</p>
							<i class='bx bx-dots-vertical-rounded' ></i>
						</li>
						<li class="not-completed">
							<p>Todo List</p>
							<i class='bx bx-dots-vertical-rounded' ></i>
						</li>
					</ul>
				</div> */}
          </div>
        </main>
      </section>
    </>
  );
};

export default MainAdmin;