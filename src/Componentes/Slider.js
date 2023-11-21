import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useSelector } from "react-redux";
const Slider=(props)=>{
    const whatOnYourMind=useSelector((state)=>state.loc.whatOnYourMind)
    const topOfferesForYou=useSelector((state)=>state.loc.topOfferesForYou)
    const offersOn=useSelector((state)=>state.loc.offersOn)
   console.log(topOfferesForYou)
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
          breakpoint: { max: 767, min: 200 },
          items: props.data==="topOfferesForYou"?4:2,
          slidesToSlide: 1 // optional, default to 1.
        }
      };
      return (
        <div className="w-[400px] h-[200px] ">
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
            {props.data==="offersOn"?offersOn.map((imageUrl, index) => {
              return (
                <div className="flex ml-2" key={index}>
                  <img className="w-[350px] h-[200px]" src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/"+imageUrl.imageId} alt="movie" />
                </div>
              );
            }):props.data==="whatOnYourMind"?whatOnYourMind.map((imageUrl, index) => {
              return (
                <div className="flex ml-2" key={index}>
                  <img className="w-[500px] h-[180px]" src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/"+imageUrl.imageId} alt="movie" />
                </div>
              );
            }):props.data==="topOfferesForYou"?topOfferesForYou.map((imageUrl, index) => {
              return (
                <div className="flex ml-2 flex-col" key={index}>
                  <img className="w-[100px] h-[100px]" src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/"+imageUrl.info.cloudinaryImageId} alt="movie" />
                  <div>
                    <small className="from-neutral-700">{imageUrl.info.name}</small><br></br>
                    <small className="text-gray-600">{imageUrl.info.sla.deliveryTime}min</small>
                  </div>
                </div>
              );
            }):null}
          </Carousel>
        </div>
      );
};
export default Slider;