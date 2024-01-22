import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Slider = (props) => {
  const whatOnYourMind = useSelector((state) => state.loc.whatOnYourMind);
  const topOfferesForYou = useSelector((state) => state.loc.topOfferesForYou);
  const offersOn = useSelector((state) => state.loc.offersOn);
  //    console.log(whatOnYourMind)
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
      slidesToSlide: 4, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 767, min: 200 },
      items: props.data === "topOfferesForYou" ? 3 : 2,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  return (
    <div className="w-[350px] h-full md:w-[1000px]">
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
        {props.data === "offersOn"
          ? offersOn.map((imageUrl, index) => {
              const { entityId } = imageUrl;
              return (
                <Link to={"/bestoffers/" + imageUrl?.entityId}>
                  <div className="flex ml-2" key={index}>
                    <img
                      className="w-[350px] h-[220px]"
                      src={
                        "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/" +
                        imageUrl.imageId
                      }
                      alt="movie"
                    />
                  </div>
                </Link>
              );
            })
          : props.data === "whatOnYourMind"
          ? whatOnYourMind.map((imageUrl, index) => {
              //     console.log(imageUrl.entityId)
              return (
                <Link to={"/bestoffers/" + imageUrl?.entityId}>
                  <div className="flex ml-2 md:ml-3" key={index}>
                    <img
                      className="w-[350px] h-[220px]"
                      src={
                        "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/" +
                        imageUrl.imageId
                      }
                      alt="movie"
                    />
                  </div>
                </Link>
              );
            })
          : props.data === "topOfferesForYou"
          ? topOfferesForYou.map((imageUrl, index) => {
              return (
                <Link to={"/restaurent/" + imageUrl?.info?.id}>
                  <div
                    onClick={() => console.log("clk")}
                    className="flex ml-2 flex-col bg-gray-[2px] rounded-sm h-full"
                    key={index}
                  >
                    <img
                      className="w-[300px] h-[150px] rounded-lg md:w-[400px] md:h-[200px]"
                      src={
                        "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/" +
                        imageUrl.info.cloudinaryImageId
                      }
                      alt="movie"
                    />
                    {imageUrl?.info?.aggregatedDiscountInfoV3 && (
                      <div className=" text-center absolute top-[100px] md:top-[157px] bg-white border rounded-full w-[75px] left-4">
                        <small className="text-[14px] text-orange-800 font-bold">
                          {imageUrl?.info?.aggregatedDiscountInfoV3?.header}
                        </small>
                        <br></br>
                        <small className="text-[10px] text-orange-800 font-bold">
                          {imageUrl?.info?.aggregatedDiscountInfoV3?.subHeader}
                        </small>
                      </div>
                    )}
                    <div>
                      <small className="from-neutral-700">
                        {imageUrl.info.name}
                      </small>
                      <br></br>
                      <small className="text-gray-600">
                        {imageUrl.info.sla.deliveryTime}min
                      </small>
                    </div>
                  </div>
                </Link>
              );
            })
          : null}
      </Carousel>
    </div>
  );
};
export default Slider;
