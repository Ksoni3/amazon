import { LuMenu } from "react-icons/lu";
import { AiFillCaretDown } from "react-icons/ai";
import { StateProps } from "../../../type";
import { signOut } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "@/store/nextSlice";

const BottomHeader = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: StateProps) => state.next);

  const handleSignOut = () => {
    signOut();
    dispatch(removeUser());
  };

  return (
    <div className="h-10 bg-amazon_light text-base text-white flex items-center py-2 ">
      <div className="w-[95%] mx-auto flex items-center">
        <div className="flex items-center gap-2 flex-nowrap overflow-x-scroll lg:overflow-hidden">
          <p className="flex items-center gap-1 pr-2  border border-transparent hover:border-white cursor-pointer duration-300">
            <AiFillCaretDown className="text-xl" /> All
          </p>
          <p className="block text-sm  px-2 border border-transparent hover:border-white cursor-pointer duration-300">
            Todays Deals
          </p>
          <p className="block  px-2 border border-transparent hover:border-white cursor-pointer duration-300">
            Customer Service
          </p>
          <p className="hidden md:block  px-2 border border-transparent hover:border-white cursor-pointer duration-300">
            Registry
          </p>
          <p className="hidden md:block  px-2 border border-transparent hover:border-white cursor-pointer duration-300">
            Gift Cards
          </p>
          <p className="hidden md:block px-2 border border-transparent hover:border-white cursor-pointer duration-300">
            Sell
          </p>
          {userInfo && (
            <button
              onClick={handleSignOut}
              className="hidden md:inline-flex items-center  border border-transparent hover:border-red-600 hover:text-red-400 text-amazon_yellow cursor-pointer duration-300"
            >
              Sign Out
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BottomHeader;
