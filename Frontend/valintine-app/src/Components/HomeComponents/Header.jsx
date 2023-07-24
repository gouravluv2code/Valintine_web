import React from 'react'
import "./headers.css"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from 'react-router-dom';
const Header = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1124 },
      items: 6,
      slidesToSlide: 1 ,
      // optional, default to 1.
    },
    desktop2: {
      breakpoint: { max: 1650, min: 1480 },
      items: 5,
      slidesToSlide: 1 ,
      // optional, default to 1.
    },
    desktop3: {
      breakpoint: { max: 1480, min: 1194 },
      items: 4,
      slidesToSlide: 1 ,
      // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1194, min: 864 },
      items: 3,
      slidesToSlide: 1 // optional, default to 1.
    },
    mid_tablet: {
      breakpoint: { max: 750, min: 460 },
      items: 3,
      slidesToSlide: 1 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 660, min: 0 },
      items: 3,
      slidesToSlide: 1 ,
      arrows:false
      // optional, default to 1.
    }
  };
     
  return (
    <div id='header'>
      <Carousel
    swipeable={false}
    draggable={false}
    // showDots={true}
    responsive={responsive}
    containerClass="carousel-container"
    autoPlay={true}
    infinite={true}
    autoPlaySpeed={3000}
    >
    <Link to={"/products?category=cake"} style={{textDecoration:"none",color:"black"}}>
    <div  className='headers-div'>
        <img style={{height:"35%",width:"30%",cursor:"pointer"}} src="https://valentinesaga.com/wp-content/uploads/2023/06/cake_icon_1_-_Copy-removebg-preview-min.png" alt="" />
        <p>Cake</p>
      </div>
    </Link>  

    <Link to="/products?category=flowers" style={{textDecoration:"none",color:"black"}}>
      <div className='headers-div' >
        <img style={{height:"35%",width:"30%"}} src="https://valentinesaga.com/wp-content/uploads/2023/06/Capture_flowers-removebg-preview__2_-removebg-preview-min.png" alt="" />
          <p>Flowers</p>
      </div>
    </Link>

    <Link to={"/products?category=candle_light"} style={{textDecoration:"none",color:"black"}}>
      <div  className='headers-div' >
        <img style={{height:"35%",width:"37%"}} src="https://valentinesaga.com/wp-content/uploads/2023/06/candle-light-dinner-character_15624-160-removebg-preview-min.png" alt="" />
 <p>Candle Light Dinner</p>
      </div>
    </Link>

    <Link to={"/products?category=decoration"} style={{textDecoration:"none",color:"black"}}>
      <div  className='headers-div' >
        <img  style={{height:"30%",width:"30%"}} src="https://valentinesaga.com/wp-content/uploads/2023/04/gifts_icon_1-removebg-preview.png" alt="" />
        <p>Gifts</p>
      </div>
    </Link>

    <Link to={"/products?category=decoration"} style={{textDecoration:"none",color:"black"}}>
      <div className='headers-div'  >
        <img style={{height:"35%",width:"30%"}} src="https://valentinesaga.com/wp-content/uploads/2023/06/balloon_decoration-removebg-preview-1-1-min.png" alt="" />
        <p>Decoration</p>
      </div>
    </Link>
    </Carousel>
    </div>
  )
}

export default Header