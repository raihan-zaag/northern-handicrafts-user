"use client";

import React, { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import useGetBanner from "@/common/hooks/banner/useGerBanner";
import Link from "next/link";
import Image from "next/image";
import Container from "./Container";

const SliderComponent = () => {
    // State to track the current slide index
    const [currentIndex, setCurrentIndex] = useState(0);

    const { data = [], loading } = useGetBanner(); // Default to an empty array if data is undefined

    console.log("loading", loading);

    // Function to go to the next slide
    const nextSlide = () => {
        if (data.length > 0) {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
        }
    };

    // Function to go to the previous slide
    const prevSlide = () => {
        if (data.length > 0) {
            setCurrentIndex(
                (prevIndex) => (prevIndex - 1 + data.length) % data.length
            );
        }
    };

    // Function to go to a specific slide
    const goToSlide = (index) => {
        if (data.length > 0) {
            setCurrentIndex(index);
        }
    };

    // Set up an interval to automatically move to the next slide every 8 seconds
    useEffect(() => {
        if (data.length > 0) {
            const interval = setInterval(() => {
                nextSlide(); // Change the slide every 8 seconds
            }, 5000);

            // Clean up the interval when the component is unmounted
            return () => clearInterval(interval);
        }
    }, [data]);

    if (loading) {
        console.log("Hello-------------");

        return (
            <Container>
                <div className="w-full my-9">
                    <div className="relative w-full h-500px bg-gray-200 animate-pulse">
                        {/* Skeleton for the image */}
                        <div className="absolute inset-0 bg-gray-300"></div>

                        {/* Skeleton for the content overlay */}
                        <div className="absolute inset-0 z-10 flex flex-col items-start justify-center px-12 py-8 text-left">
                            <div className="bg-gray-400 w-260px sm:w-300px md:w-380px lg:w-500px h-8 mb-4"></div>
                            <div className="bg-gray-400 w-150px h-6"></div>
                        </div>

                        {/* Skeleton for navigation buttons */}
                        <div className="absolute bottom-14 flex justify-between items-center gap-3 w-full px-16 md:px-20 lg:px-15 xl:px-12">
                            <div className="flex gap-3 items-center justify-center">
                                <div className="w-6 h-2 bg-gray-400 rounded-full"></div>
                                <div className="w-6 h-2 bg-gray-400 rounded-full"></div>
                                <div className="w-6 h-2 bg-gray-400 rounded-full"></div>
                            </div>
                            <div className="flex justify-between items-center gap-3">
                                <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
                                <div className="w-12 h-6 bg-gray-400"></div>
                                <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        );
    }

    if (data.length === 0) {
        return <div className="text-center">No banners available</div>; // Show a fallback message if data is empty
    }

    return (
        <div className="w-full my-9">
            {/* Slider Wrapper */}
            <Container className="relative w-full">
                {/* Slide */}
                <div className="relative w-full h-500px">
                    <div className="absolute inset-0 z-0">
                        <Image
                            height={1000}
                            width={1000}
                            quality={100}
                            src={data[currentIndex]?.image}
                            alt={
                                data[currentIndex]?.description || "Slide image"
                            }
                            className="w-full h-full object-cover transition-all duration-500"
                        />
                    </div>

                    {/* Content Overlay */}
                    <div className="absolute inset-0 z-10 flex flex-col items-start justify-center px-12 py-8 text-left text-white">
                        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold leading-25px sm:leading-30px md:leading-44px w-260px sm:w-300px md:w-380px lg:w-500px">
                            {data[currentIndex]?.description}
                        </h1>
                        <button className="px-0 py-2 mt-4 border-b border-white text-white transition-all duration-200 min-w-20 uppercase">
                            <Link
                                href={`${data[currentIndex]?.link || "#"}`}
                                target="_blank"
                            >
                                {data[currentIndex]?.buttonName || "Learn More"}
                            </Link>
                        </button>
                    </div>
                </div>

                {/* Custom Navigation Buttons */}
                <div className="flex items-center justify-center">
                    <div className="absolute bottom-14 cursor-pointer z-10 flex justify-between items-center gap-3 w-full px-16 md:px-20 lg:px-15 xl:px-12 ">
                        <div className="flex gap-3 items-center justify-center">
                            {data.map((slide, index) => (
                                <div
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${
                                        currentIndex === index ? "w-6" : " w-2"
                                    } bg-white`}
                                />
                            ))}
                        </div>

                        <div className="flex justify-between items-center gap-3">
                            {/* Previous Button */}
                            <button
                                onClick={prevSlide}
                                className="text-white text-3xl flex items-center justify-center"
                            >
                                <IoIosArrowBack />
                            </button>

                            {/* Pagination */}
                            <div className="text-white flex items-center gap-1 p-0 m-0 h-7">
                                <span>
                                    {data.length > 0 ? currentIndex + 1 : 0}
                                </span>
                                <span>/</span>
                                <span>{data.length}</span>
                            </div>

                            {/* Next Button */}
                            <button
                                onClick={nextSlide}
                                className="text-white text-3xl flex items-center justify-center"
                            >
                                <IoIosArrowForward />
                            </button>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default SliderComponent;

// "use client";

// import React, { useEffect, useState } from "react";
// import Container from "./container";
// import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
// import useGetBanner from "@/common/hooks/banner/useGerBanner";
// import Link from "next/link";

// const SliderComponent = () => {
//   // State to track the current slide index
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const { data, loading } = useGetBanner();
//   console.log(data, "data");

//   // Array of slides
//   const slides = [
//     {
//       id: 1,
//       title: "Style with Our Premium Vision Collection",
//       buttonText: "DISCOVER",
//       image:
//         "https://images.unsplash.com/photo-1726108954014-71ffe50f8a26?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     },
//     {
//       id: 2,
//       title: "Discover the Latest Fashion Trends",
//       buttonText: "SHOP NOW",
//       image:
//         "https://images.unsplash.com/photo-1720048169707-a32d6dfca0b3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     },
//     {
//       id: 3,
//       title: "Explore Our Premium Glasses Collection",
//       buttonText: "DISCOVER",
//       image:
//         "https://images.unsplash.com/photo-1731410612760-4d9ae680d5e9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     },
//   ];

//   // Function to go to the next slide
//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % data?.length);
//   };

//   // Function to go to the previous slide
//   const prevSlide = () => {
//     setCurrentIndex(
//       (prevIndex) => (prevIndex - 1 + data?.length) % data?.length
//     );
//   };

//   // Function to go to a specific slide
//   const goToSlide = (index) => {
//     setCurrentIndex(index);
//   };

//   // Set up an interval to automatically move to the next slide every 8 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       nextSlide(); // Change the slide every 8 seconds
//     }, 5000); // 8 seconds

//     // Clean up the interval when the component is unmounted
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="w-full my-9">
//       {/* Slider Wrapper */}
//       <Container classname={"relative w-full"}>
//         {/* Slide */}
//         <div className="relative w-full h-[500px]">
//           <div className="absolute inset-0 z-0">
//             <img
//               src={data[currentIndex]?.image}
//               alt={data[currentIndex]?.description}
//               className="w-full h-full object-cover transition-all duration-500"
//             />
//           </div>

//           {/* Content Overlay */}
//           <div className="absolute inset-0 z-10 flex flex-col items-start justify-center px-12 py-8 text-left text-white">
//             <h1 className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold leading-[25px] sm:leading-[30px] md:leading-[44px] w-[260px] sm:w-[300px] md:w-[380px] lg:w-[500px]">
//               {/* {data[currentIndex]?.description} */}
//             </h1>
//             {/* <button className="px-0 py-2 mt-4 border-b border-white text-white hover:bg-white hover:text-black transition-all duration-200 min-w-20">
//               <Link href={`${data[currentIndex]?.link}`} target="_blank">
//                 {data[currentIndex]?.buttonName}
//               </Link>
//             </button> */}
//           </div>
//         </div>

//         {/* Custom Navigation Buttons */}
//         <div className="flex items-center justify-center">
//           <div className="absolute bottom-14 cursor-pointer z-10 flex justify-between items-center gap-3 w-[100%] px-16 md:px-20 lg:px-15 xl:px-12 ">
//             <div className="flex gap-3 items-center justify-center">
//               {data?.map((slide, index) => {
//                 return (
//                   <div
//                     key={index}
//                     onClick={() => goToSlide(index)}
//                     className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${
//                       currentIndex === index ? "w-6" : " w-2"
//                     } rounded-full bg-white`}
//                   />
//                 );
//               })}
//             </div>

//             <div className="flex justify-between items-center gap-3">
//               {/* Previous Button */}
//               <button
//                 onClick={prevSlide}
//                 className="text-white text-3xl flex items-center justify-center"
//               >
//                 <IoIosArrowBack />
//               </button>

//               {/* Pagination */}
//               <div className="text-white flex items-center gap-1 p-0 m-0 h-7">
//                 <span>{currentIndex + 1}</span>
//                 <span>/</span>
//                 <span>{data?.length}</span>
//               </div>

//               {/* Next Button */}
//               <button
//                 onClick={nextSlide}
//                 className="text-white text-3xl flex items-center justify-center"
//               >
//                 <IoIosArrowForward />
//               </button>
//             </div>
//           </div>
//         </div>
//       </Container>
//     </div>
//   );
// };

// export default SliderComponent;
