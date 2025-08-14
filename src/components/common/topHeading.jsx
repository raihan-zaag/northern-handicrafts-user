import React from "react";
import Container from "./container";
import Typography from "../Typography/component.typography";
import Link from "next/link";

const TopHeading = () => {
  return (
    <Container classname={"flex flex-col items-center justify-center py-4"}>
      <Link href={"/"}>
        <Typography.Title3 weight="font-medium" color="dark-black" leading="10">
          OPTILUXE EYEWEAR
        </Typography.Title3>
      </Link>

      <Link href={"/"}>
        <Typography.BodyText weight="light" color="dark-black">
          Elevating your vision
        </Typography.BodyText>
      </Link>
    </Container>
  );
};

export default TopHeading;
