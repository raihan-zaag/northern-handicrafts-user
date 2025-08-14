"use client";

// import { GET_IMAGE_RENDER } from "@/helpers/apiURLS";
import { Carousel } from "antd";
import Image from "next/image";
import { useRef, useState } from "react";
import Icons from "../../../public/icons";
// import Icons from "../../../public/assets/Icons";

const ProductLeftView = ({ forModal = false, data }) => {
  const carouselRef = useRef();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleNextClick = (type) => {
    if (carouselRef && carouselRef.current) {
      if (type === "next") {
        carouselRef.current.next();
      } else {
        carouselRef.current.prev();
      }
    }
  };

  const handleSmallImageClick = (index) => {
    if (carouselRef && carouselRef.current) {
      carouselRef.current.goTo(index);
    }
    setSelectedImageIndex(index);
  };

  // const fetchBanner = useCallback(async () => {
  //     try {
  //         const banner = await BannerService.getBannerImage(
  //             data.featuredImage
  //         );
  //         setBannerImage(banner);
  //     } catch (error) {
  //         console.error("Error fetching banner:", error);
  //     }
  // }, [data.featuredImage]);

  // React.useEffect(() => {
  //     fetchBanner();
  // }, [fetchBanner]);

  const handleAfterChange = (current) => {
    setSelectedImageIndex(current);
  };

  const images = data?.images?.map((image) => image.image);

  return (
    <div className="">
      <div
        className={`flex ${
          forModal ? "w-[460px] flex-col-reverse gap-y-4" : "flex-row gap-4"
        }`}
      >
        <div
          className={`flex ${
            forModal ? "flex-row gap-x-4" : "flex-col gap-y-[13px]"
          }`}
        >
          {[data?.thumbnailImage, ...images].map((item, index) => (
            <div
              key={index}
              className={`flex justify-center items-center duration-300 cursor-pointer border ${
                index === selectedImageIndex
                  ? "border-magenta-600"
                  : "border-neutral-30"
              } p-`}
              onClick={() => handleSmallImageClick(index)}
            >
              <div
                className={`flex items-center justify-center ${
                  forModal
                    ? "w-[62px] h-[62px]"
                    : "w-[100px] h-[70px] xl:w-[120px] xl:h-[120px]"
                }`}
              >
                <Image
                  src={`${item}`}
                  alt="value"
                  width={1000}
                  height={1000}
                  className={`${
                    forModal
                      ? "w-[62px] h-[62px]"
                      : "w-[68px] h-[38px] xl:w-full xl:h-full"
                  } rounded-sm object-fit bg-[#F6F6F6]`}
                />
              </div>
            </div>
          ))}
        </div>

        <div
          className={`${
            forModal
              ? "w-[460px]"
              : "w-[360px] md:w-[280px] md:h-[300px] lg:w-[380px] lg:h-[400px] xl:w-[412px] xl:h-[513px] 2xl:w-[564px] 2xl:h-[664px]"
          } relative`}
        >
          <Carousel
            dots={false}
            ref={carouselRef}
            afterChange={handleAfterChange}
          >
            {[data.thumbnailImage, ...images].map((item, index) => (
              <div
                key={index}
                // className={`flex justify-center items-center border border-[#EBEDF0] overflow-hidden ${
                //   forModal
                //     ? "w-[460px] h-[708px] lg:w-[512px] lg:h-[513px]"
                //     : "w-[360px] md:w-[280px] md:h-[300px] lg:w-[380px] lg:h-[400px] xl:w-[512px] xl:h-[513px] 2xl:w-full 2xl:h-[664px]  "
                // }`}
                className={`flex justify-center items-center border border-[#EBEDF0] overflow-hidden ${
                  forModal
                    ? ""
                    : "w-[360px] md:w-[280px] md:h-[300px] lg:w-[380px] lg:h-[400px] xl:w-[412px] xl:h-[513px] 2xl:w-[564px] 2xl:h-[664px]"
                } `}
              >
                <Image
                  src={`${item}`}
                  alt="value"
                  width={1000}
                  height={1000}
                  // className={`${
                  //   forModal
                  //     ? "w-[460px] h-[708px] lg:w-[512px] lg:h-[513px]"
                  //     : "w-[360px] md:w-[280px] md:h-[300px] lg:w-[380px] lg:h-[400px] xl:w-[512px] xl:h-[513px] 2xl:w-full 2xl:h-[664px]"
                  // } w-full bg-cover rounded-sm`}
                  className={`${
                    forModal
                      ? "w-full lg:w-[512px] lg:h-[513px]"
                      : "w-[360px]  lg:w-[380px] lg:h-[400px] xl:w-[542px] xl:h-[450px] 2xl:w-[564px] 2xl:h-[664px]"
                  } w-full  rounded-sm object-fit bg-[#F6F6F6]`}
                />
              </div>
            ))}
          </Carousel>

          <button
            onClick={() => handleNextClick("prev")}
            className="absolute top-1/2 left-0 p-4 bg-transparent transform -translate-y-1/2"
          >
            <Image src={Icons.left_arrow} alt="value" className="w-8 h-8" />
          </button>
          <button
            onClick={() => handleNextClick("next")}
            className="absolute top-1/2 right-0 p-4 bg-transparent transform -translate-y-1/2"
          >
            <Image src={Icons.right_arrow} alt="value" className="w-8 h-8" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductLeftView;
