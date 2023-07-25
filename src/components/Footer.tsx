import Image from "next/image";
import logo from "../images/logo.png";

const Footer = () => {
  return (
    <div className="w-full h-20 bg-amazon_light text-gray-300 flex items-center ">
      <div className="w-[95%] mx-auto flex justify-between ">
        <Image className="w-14 lg:w-24 mt-2 lg:mt-0" src={logo} alt="logo" />
        <p className="text-sm ">@All rights reserved </p>
        <span>By KaMal Soni</span>
      </div>
    </div>
  );
};

export default Footer;
