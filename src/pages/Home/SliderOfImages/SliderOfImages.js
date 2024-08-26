import React from "react";
import { connect } from "react-redux";
import "./SliderOfImages.css"
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
const SliderOfImages = () => {

    const images = [
        { url: "./images/web_banner.png", },

    ];
    return (
        <>


            {
                images.length > 0 ?
                    <Carousel>
                        {images.map((image,i) => {
                            return (
                                <div key={i}>
                                    <img alt="" src={require(`${image.url}`).default} />
                                </div>
                            )
                        })

                        }


                    </Carousel> :
                    <Carousel className="datark">
                        <div >

                        </div>
                    </Carousel>
            }

        </>
    )

}

const mapDispatchToProps = (dispatch) => {
    return {

    };
};
export default connect(null, mapDispatchToProps)(SliderOfImages);