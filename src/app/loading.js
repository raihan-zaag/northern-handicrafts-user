import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";
import React from "react";

const HomePageLoding = () => {
    return (
        <Flex align="center" gap="middle">
            <Spin fullscreen />
        </Flex>
    );
};

export default HomePageLoding;
