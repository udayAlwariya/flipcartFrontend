import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export function Caraousel({data}){
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 1,
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
        <Carousel swipeable={true} responsive={responsive} showDots={true} infinite={true} transitionDuration={500} autoPlaySpeed={3000} autoPlay={true}>
            {data.map((value)=>{
              return <img src={value.url} alt="" />
            })}
        </Carousel>
        </div>
    )
}