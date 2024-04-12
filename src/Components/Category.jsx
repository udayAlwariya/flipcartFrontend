import { navData } from "./Navdata";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export function Category(){
    const responsive = {
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 3,
          slidesToSlide: 1 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 4,
          slidesToSlide: 1 // optional, default to 1.
        }

      }
    return(
        <div>
         <Carousel responsive={responsive} removeArrowOnDeviceType={["mobile"]} className=" sm:hidden" infinite={true}>
            {navData.map((value,index)=>{
              return <img key={index} src={value.url} alt="" />
            })}
        </Carousel>
        <div className="sm:flex hidden w-fit mx-auto mt-3">
            {navData.map((value,index)=>{
                return <div key={index} className="text-center px-4 items-center">
                    <img src={value.url} width="75px" alt="" />
                    <h1 className="font-semibold text-sm">{value.text}</h1>
                </div>
            })}
        </div>
        </div>
      
    )
}