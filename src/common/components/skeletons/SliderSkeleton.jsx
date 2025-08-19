"use client";

import React from "react";
import Container from "../common/container";

const SliderSkeleton = () => {
    return (
        <Container>
            <div className="relative w-full h-500px bg-gray-300 animate-pulse">
                <div className="absolute inset-0 z-0 bg-gray-200" />
                <div className="absolute inset-0 z-10 flex flex-col items-start justify-center px-12 py-8 text-left">
                    <div className="w-1/2 bg-gray-400 h-6 mb-4 rounded"></div>
                    <div className="w-1/4 bg-gray-400 h-8 rounded"></div>
                </div>
            </div>
        </Container>
    );
};

export default SliderSkeleton;
