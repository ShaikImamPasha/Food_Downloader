import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Slider=(props)=>{
    const whatOnYourMind=useSelector((state)=>state.loc.whatOnYourMind)
    const topOfferesForYou=useSelector((state)=>state.loc.topOfferesForYou)
    const offersOn=useSelector((state)=>state.loc.offersOn)
//    console.log(whatOnYourMind)
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
            showDots={props.data==="topOfferesForYou"?false:true}
            infinite={false}
            partialVisible={false}
            dotListClass="custom-dot-list-style"
           removeArrowOnDeviceType={props.data==="topOfferesForYou"?["tablet", "mobile"]:null} 
          >
            {props.data==="offersOn"?offersOn.map((imageUrl, index) => {
              const {id}=imageUrl;
              return (
               <Link to={"/bestoffers/"+id}>
                   <div className="flex ml-2" key={index}>
                  <img className="w-[350px] h-[200px]" src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/"+imageUrl.imageId} alt="movie" />
                </div>
              </Link>
              );
            }):props.data==="whatOnYourMind"?whatOnYourMind.map((imageUrl, index) => {
              return (
               <Link to={"/restaurent/"+imageUrl?.id}>
                  <div className="flex ml-2" key={index}>
                  <img className="w-[500px] h-[180px]" src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/"+imageUrl.imageId} alt="movie" />
                </div>
               </Link>
              );
            }):props.data==="topOfferesForYou"?topOfferesForYou.map((imageUrl, index) => {
              return (
             <Link to={"/restaurent/"+imageUrl?.info?.id}>
                   <div className="flex ml-2 flex-col" key={index}>
                  <img className="w-[100px] h-[100px] rounded-lg" src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/"+imageUrl.info.cloudinaryImageId} alt="movie" />
                 { imageUrl?.info?.aggregatedDiscountInfoV3 &&  <div className=" text-center absolute top-[60px] bg-white border rounded-md w-[75px] left-4">
                    <small className="text-[14px] text-orange-800 font-bold">{imageUrl?.info?.aggregatedDiscountInfoV3?.header}</small><br></br>
                    <small className="text-[10px] text-orange-800 font-bold">{imageUrl?.info?.aggregatedDiscountInfoV3?.subHeader}</small>
                  </div>
                 }
                  <div>
                    <small className="from-neutral-700">{imageUrl.info.name}</small><br></br>
                    <small className="text-gray-600">{imageUrl.info.sla.deliveryTime}min</small>
                    
                  </div>
                </div>
             </Link>
              );
            }):null}
          </Carousel>
        </div>
      );
};
export default Slider;