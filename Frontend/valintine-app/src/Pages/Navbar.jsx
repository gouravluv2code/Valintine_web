import React, { useEffect, useRef, useState } from "react";
import "../Styles/navbar.css";
import { Link } from "react-router-dom";
import BasicModal from "../Components/HomeComponents/Modal";
import TemporaryDrawer from "../Components/HomeComponents/DrawerComp";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handlegetcartproducts } from "../Redux/action";
import logo from './logo3.png'
import { Avatar, Button, Center, IconButton, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Spinner, Text } from "@chakra-ui/react";
import { HiShoppingCart } from 'react-icons/hi'
import SearchResults from "./SearchResults";
import Swal from "sweetalert2";
function Navbar({ cartcount }) {
  const dispatch = useDispatch()

  const initialCity = sessionStorage.getItem("cityname")?.toLowerCase()
  // const [selectedProduct, setSelectedProduct] = useState(null);
  // const initialCity=searchParams.get("city")
  const searchResultsRef = useRef(null);
  const store = useSelector((store) => store);
  const { token, cart } = store;
  const [menuOpen, setMenuOpen] = useState(false);
  const [flag, setflag] = useState(false);
  const navigate = useNavigate();
  const [items, setitems] = useState(cart.length);
  const [text, setText] = useState("")
  const [loading,setloading] = useState(false)
  const [results, setResults] = useState([])
  const user=JSON.parse(sessionStorage.getItem("userdetails"))
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

   useEffect(() => {
    let user = JSON.parse(sessionStorage.getItem("userdetails"));

    dispatch(handlegetcartproducts(user?._id));
  }, [token]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open2 = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleAddClassname = () => {
    setflag(false)
    setText("")
  };
  const handlelogout = () => {
    sessionStorage.setItem("token", "");
    Swal.fire(
      '😶',
      'Logut Successfully',
      'success'
    )
    setTimeout(() => {
      window.location.reload();
    }, [1000])

  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchResultsRef.current && !searchResultsRef.current.contains(event.target)) {
        setResults([]); // Clear search results when clicking outside
      }
    };

    // Add event listener to window
    window.addEventListener("click", handleClickOutside);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [])
  // useEffect(() => {
  //   setitems(cart?.length);
  //   setSearchParams({ city: initialCity })
  // }, [cart, initialCity,flag]);

  const handlevalue = (e) => {
    setText(e.target.value)
    // setflag(false)
  }

  function handleSearchClick() {
    setflag(true)
    if (text.trim() !== '') {
      setloading(true)
      fetch(`${process.env.REACT_APP_Backend_url}/products/search?q=${encodeURIComponent(text)}`)
        .then((response) => response.json())
        .then((data) => {
          const searchResults = data.results;
          setResults(searchResults)
          setloading(false)
        })
        .catch((error) => {
          console.error('Error fetching search results:', error);
          setloading(false)
        });
    }
  }
  return (
    <>
      <div className="navbar">
        <div className="navbar-menu-icon" onClick={toggleMenu}>
          <TemporaryDrawer />
        </div>
        <div className="navbar-logo">
          <Link to={`/`}>
            <img
              className="logo"
              id={"comp-logo"}
              style={{ width: "140px", height: "auto" }}
              // src={"https://valentinesagaassets.s3.ap-south-1.amazonaws.com/logo/logo3.png"}
              src={"https://valentinesagaassets.s3.ap-south-1.amazonaws.com/newlogo.webp"}
              alt=""
            />
          </Link>
          {/* {menuOp/en===false && <BasicModal name={"Location"} />} */}
          <div id="search-cont">
            <input
              type="text"
              className="navbar-search"
              placeholder="what you want to search"
              onChange={handlevalue}
              value={text}
            />
            <img
              id="glass"
              src="https://img.icons8.com/?size=512&id=132&format=png"
              alt=""
              onClick={handleSearchClick}
            />
          </div>
           
          {/* <div id="search-mob">
          <input
            type="text"
            className="search-mob-input"
            placeholder="what you want to search"
          />

          <img
            id="search-btn"
            src="https://img.icons8.com/?size=512&id=132&format=png"
            alt=""
          />
        </div> */}
        </div>
        <div className="navbar-options">
          {token === "" ? (
            <Link to={"/login"} className="login-nav location">
              Login
            </Link>
          ) :  <Menu>
          <MenuButton
            as={Button}
            rounded={'full'}
            variant={'link'}
            cursor={'pointer'}
            minW={0}>
            <Avatar
              size={'sm'}
              src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKVgdPnMdBjCdxkKFnwvfzcvEA6RTfYRMuEA&usqp=CAU'}
            />
          </MenuButton>
          <MenuList alignItems={'center'}>
            <br />
            <Center>
              <Avatar
                size={'xl'}
                src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKVgdPnMdBjCdxkKFnwvfzcvEA6RTfYRMuEA&usqp=CAU'}
              />
            </Center>
            <br />
              <MenuItem  fontSize={"15px"}  color={'black'}>{user.name}</MenuItem>
              <MenuItem  fontSize={"15px"}  color={'black'}>{user.email}</MenuItem>
             <Link to={"/orders"}>
              <MenuItem  fontSize={"15px"}  color={'black'}>Orders</MenuItem>
             </Link>
            <MenuDivider />
            <Link to={"/login"}><MenuItem onClick={handlelogout} bg={'rgb(255, 65, 139)'} color={'black'}>Logout</MenuItem></Link>
          </MenuList>
        </Menu>
          
          }

          <Link to={"/cart"} className="cart-nav location">
            {/* <a href="#" className="cart-nav location"> */}

              <HiShoppingCart />
              <span class='badge badge-warning' id='lblCartCount'> {cart?.length} </span>
            {/* </a> */}
          </Link>

          {/* <button  backgroundColor={color}> */}


          {/* </button> */}

        </div>
        {<BasicModal name={"delhi"} />}
        <div className="user">

        </div>
        {/* <div className="navbar-menu-icon" onClick={toggleMenu}>
        <TemporaryDrawer />
      </div> */}
      </div>
      {
       flag && loading?<Spinner color='red.500' />: flag && <div id="search-results" ref={searchResultsRef}>
         {results.map((result) => (
           <Link key={result._id} to={`/products/${result._id}`}>
           <div
             className="search-result-item"
             onClick={handleAddClassname}
             style={{display:"flex",margin:"auto",gap:"10px"}}             
           >
            <img style={{height:"30px",width:"30px"}} src={result?.image[0]} alt="" />
            <Text>
              {result.name}
              </Text> 
           </div>
           </Link>
         ))}
       </div>
      }
      
    </>
  );
}

export default Navbar;





