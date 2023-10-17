import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useSelector } from "react-redux";
const Slider=(props)=>{
    const whatOnYourMind=useSelector((state)=>state.loc.whatOnYourMind)
    const offersOn=useSelector((state)=>state.loc.offersOn)
    // console.log(offersOn)
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3,
          slidesToSlide: 4 // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 1024, min: 768 },
          items: 3,
          slidesToSlide: 3 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 767, min: 464 },
          items: 2,
          slidesToSlide: 1 // optional, default to 1.
        }
      };
      return (
        <div className="w-[400px]">
          <Carousel
            responsive={responsive}
            autoPlay={true}
            swipeable={true}
            draggable={true}
            showDots={true}
            infinite={false}
            partialVisible={false}
            dotListClass="custom-dot-list-style"
          >
            {props.data===true?offersOn.map((imageUrl, index) => {
              return (
                <div className="flex ml-2" key={index}>
                  <img className="w-[280px] h-[200px]" src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/"+imageUrl.imageId} alt="movie" />
                </div>
              );
            }):whatOnYourMind.map((imageUrl, index) => {
              return (
                <div className="flex ml-2" key={index}>
                  <img className="w-[180px] h-[180px]" src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/"+imageUrl.imageId} alt="movie" />
                </div>
              );
            })}
          </Carousel>
        </div>
      );
};
export default Slider;