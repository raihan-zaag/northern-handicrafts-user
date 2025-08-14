import React from "react";

const Container = ({ children, classname }) => {
    return (
        <div className={`container mx-auto px-4 h-full ${classname}`}>
            {children}
        </div>
    );
};

export default Container;
