import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";

export function Slider({data}){
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 6,
          slidesToSlide: 1 // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
          slidesToSlide: 1 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        }

      }
    return(
        <div>
        <Carousel responsive={responsive} swipeable={true} removeArrowOnDeviceType={["mobile"]} infinite={true} transitionDuration={500}>
            {data && data.map((value,index)=>{
              return <Link key={index} to={"/productDetails/"+value.id}><div className="border mr-2 text-center h-[30vh]">
              <img src={value.url} className="mx-auto mt-2" width="120px" alt="" />
              <h1 className=" text-gray-600">{value.title.shortTitle}</h1>
              <h1 className="font-semibold">Shop Now!</h1>

            </div></Link>
              
            })}
        </Carousel>
        </div>
    )
}