import { BsCart3 } from "react-icons/bs";
import { CgFileDocument } from "react-icons/cg";
import { FaRegHeart } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { RiUserLine } from "react-icons/ri";
import { RxCounterClockwiseClock } from "react-icons/rx";

export const profileMenu = [
  {
    title: "My Profile",
    icon: <RiUserLine className="text-[#6A6A6A] h-4 w-4" />,
    activeIcon: <RiUserLine className="text-primary h-4 w-4" />,
    url: "/profile/my-account",
  },
  {
    title: "Saved Prescriptions",
    icon: <CgFileDocument className="text-[#6A6A6A] h-4 w-4" />,
    activeIcon: <CgFileDocument className="text-primary h-4 w-4" />,
    url: "/profile/my-prescriptions",
  },
  {
    title: "Saved Addresses",
    icon: <IoLocationOutline className="text-[#6A6A6A] h-4 w-4" />,
    activeIcon: <IoLocationOutline className="text-primary h-4 w-4" />,
    url: "/profile/address",
  },
  {
    title: "My Wishlist",
    icon: <FaRegHeart className="text-[#6A6A6A] h-4 w-4" />,
    activeIcon: <FaRegHeart className="text-primary h-4 w-4" />,
    url: "/profile/wishlist",
  },
  {
    title: "My Orders",
    icon: <BsCart3 className="text-[#6A6A6A] h-4 w-4" />,
    activeIcon: <BsCart3 className="text-primary h-4 w-4" />,
    url: "/profile/my-orders",
  },
  // {
  //     title: "Ongoing Orders",
  //     icon: <BsCart3 className="text-[#6A6A6A] h-4 w-4" />,
  //     activeIcon: <BsCart3 className="text-primary h-4 w-4" />,
  //     url: "/profile/ongoing-orders",
  // },
  // {
  //     title: "Order History",
  //     icon: <RxCounterClockwiseClock className="text-[#6A6A6A] h-4 w-4" />,
  //     activeIcon: (
  //         <RxCounterClockwiseClock className="text-primary h-4 w-4" />
  //     ),
  //     url: "/profile/order-history",
  // },
];
