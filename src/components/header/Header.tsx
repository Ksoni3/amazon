/* eslint-disable */
import Image from "next/image";
import logo from "../../images/logo.png";
import cartIcon from "../../images/cartIcon.png";
import { BiCaretDown } from "react-icons/bi";
import { HiOutlineSearch } from "react-icons/hi";
import { SlLocationPin } from "react-icons/sl";
import { FiMenu } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { FaUser, FaHome } from "react-icons/fa";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { StateProps, StoreProduct } from "../../../type";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { addUser } from "@/store/nextSlice";
import SearchProducts from "../SearchProducts";

const Header = () => {
  const { data: session } = useSession();
  const [allData, setAllData] = useState([]);
  const { productData, FavouriteData, userInfo, allProducts } = useSelector(
    (state: StateProps) => state.next
  );

  const dispatch = useDispatch();

  useEffect(() => {
    setAllData(allProducts.allProducts);
  }, [allProducts]);

  useEffect(() => {
    if (session) {
      dispatch(
        addUser({
          name: session?.user?.name,
          email: session?.user?.email,
          image: session?.user?.image,
        })
      );
    }
  }, [session, dispatch]);

  //mobile menu

  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  const handleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  // Search area
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const filtered = allData.filter((item: StoreProduct) =>
      item.title.toLocaleLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, allData]);

  return (
    <div className=" min-h-16 lg:h-20 bg-amazon_blue text-lightText  top-0 z-50 pb-2 lg:pb-0 ">
      <div className="h-16 lg:h-20  mx-auto flex items-center justify-between gap-1 lg:gap-3  w-[95%] relative  ">
        {/* logo */}
        <div className="flex  items-center gap-3">
          <div className="lg:hidden text-xl" onClick={handleMobileMenu}>
            <FiMenu />
          </div>
          <Link
            href={"/"}
            className=" border border-transparent hover:border-white cursor-pointer duration-300 flex gap-3 items-center justify-center h-[70%]"
          >
            <Image
              className="w-20 lg:w-28 object-cover mt-4"
              src={logo}
              alt="logoImg"
            />
          </Link>
        </div>

        {/* delivery */}
        <div className="px-2 border border-transparent hover:border-white cursor-pointer duration-300 items-center justify-center h-[70%] hidden xl:inline-flex gap-1">
          <SlLocationPin />
          <div className="text-xs">
            <p>Deliver to</p>
            <p className="text-white font-bold uppercase">Sydney</p>
          </div>
        </div>

        {/* serchbar */}
        <div className="flex-1 h-10 hidden md:inline-flex items-center justify-between relative z-50 ">
          <input
            onChange={handleSearch}
            value={searchQuery}
            className="w-full h-full rounded-md px-2 placeholder:text-sm text-base text-black border-[3px] border-transparent outline-none focus-visible:border-amazon_yellow"
            type="text"
            placeholder="Search anything you want....."
          />
          <span className="w-12 h-full bg-amazon_yellow text-black text-2xl flex items-center justify-center absolute right-0 rounded-tr-md rounded-br-md">
            <HiOutlineSearch />
          </span>

          {/* ========== Searchfield ========== */}
          {searchQuery && (
            <div className="absolute left-0 top-12 w-full mx-auto max-h-96 bg-gray-200 rounded-lg overflow-y-scroll cursor-pointer text-black">
              {filteredProducts?.length > 0 ? (
                <>
                  {searchQuery &&
                    filteredProducts.map((item: StoreProduct) => (
                      <Link
                        key={item._id}
                        className="w-full border-b-[1px] border-b-gray-400 flex items-center gap-4"
                        href={{
                          pathname: `${item._id}`,
                          query: {
                            _id: item._id,
                            brand: item.brand,
                            category: item.category,
                            description: item.description,
                            image: item.image,
                            isNew: item.isNew,
                            oldPrice: item.oldPrice,
                            price: item.price,
                            title: item.title,
                          },
                        }}
                        onClick={() => setSearchQuery("")}
                      >
                        <SearchProducts item={item} />
                      </Link>
                    ))}
                </>
              ) : (
                <div className="bg-gray-50 flex items-center justify-center py-10 rounded-lg shadow-lg">
                  <p className="text-xl font-semibold animate-bounce">
                    Nothing is matches with your search keywords. Please try
                    again!
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* signin */}
        {userInfo ? (
          <div className="hidden md:flex items-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[80%] gap-1">
            <Image
              src={userInfo.image}
              alt="userImage"
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="text-xs text-gray-100 flex flex-col justify-between">
              <p className="text-white font-bold">{userInfo.name}</p>
              <p>{userInfo.email}</p>
            </div>
          </div>
        ) : (
          <div
            onClick={() => signIn()}
            className="text-xs text-gray-100 hidden md:flex flex-col justify-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%]"
          >
            <p>Hello, sign in</p>
            <p className="text-white font-bold flex items-center">
              Account & Lists{" "}
              <span>
                <BiCaretDown />
              </span>
            </p>
          </div>
        )}
        {/* favourite */}
        <Link
          href={"/favourite"}
          className="text-xs text-gray-100 hidden md:flex flex-col justify-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%] relative"
        >
          <p>Marked</p>
          <p className="text-white font-bold">& Favourite</p>
          {FavouriteData?.length > 0 && (
            <span className="absolute right-2 top-2 w-4 h-4 border-[1px] border-gray-400 flex items-center justify-center text-xs text-amazon_yellow">
              {FavouriteData?.length}
            </span>
          )}
        </Link>
        {/* cart */}
        <Link
          href={"/cart"}
          className="flex items-center gap-2  border border-transparent hover:border-white cursor-pointer duration-300 h-[70%] relative"
        >
          <Image
            className="w-auto object-cover h-5 lg:h-7"
            src={cartIcon}
            alt="cartImg"
          />
          <p className="text-xs text-white font-bold ">Cart</p>
          <span className="absolute text-amazon_yellow text-sm top-1 left-[13px] lg:left-[20px] font-semibold">
            {productData ? productData?.length : 0}
          </span>
        </Link>
      </div>

      {/* mobile search bar */}
      <div className="h-10 md:hidden bg-amazon_blue relative w-[95%] mx-auto mb-4 ">
        <input
          onChange={handleSearch}
          value={searchQuery}
          className="w-full h-full rounded-md px-2 placeholder:text-sm text-base text-black border-[3px] border-transparent outline-none focus-visible:border-amazon_yellow"
          type="text"
          placeholder="Search anything you want....."
        />
        <span className=" h-full bg-amazon_yellow px-2 text-black text-2xl flex items-center justify-center  absolute top-0 right-0 rounded-tr-md rounded-br-md">
          <HiOutlineSearch />
        </span>

        {/* ========== Searchfield ========== */}
        {searchQuery && (
          <div className=" absolute left-1/2 translate-x-[-50%] top-10 w-[95%]  bg-gray-200 overflow-y-scroll cursor-pointer text-black z-50  ">
            {filteredProducts?.length > 0 ? (
              <>
                {searchQuery &&
                  filteredProducts.map((item: StoreProduct) => (
                    <Link
                      key={item._id}
                      className="w-full border-b-[1px] border-b-gray-400 flex items-center gap-4"
                      href={{
                        pathname: `${item._id}`,
                        query: {
                          _id: item._id,
                          brand: item.brand,
                          category: item.category,
                          description: item.description,
                          image: item.image,
                          isNew: item.isNew,
                          oldPrice: item.oldPrice,
                          price: item.price,
                          title: item.title,
                        },
                      }}
                      onClick={() => setSearchQuery("")}
                    >
                      <SearchProducts item={item} />
                    </Link>
                  ))}
              </>
            ) : (
              <div className="bg-gray-50 flex items-center justify-center py-10 rounded-lg shadow-lg">
                <p className="text-xl font-semibold animate-bounce">
                  Nothing is matches with your search keywords. Please try
                  again!
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* mobile menu? */}

      <div
        className={`lg:hidden absolute ${
          showMobileMenu ? "left-0" : "-left-[1000px]"
        } top-0 h-screen w-full z-40 flex `}
      >
        <div className="w-10/12 bg-slate-200 opacity-100 h-screen z-50  ">
          <div className="h-32 px-5 bg-amazon_blue flex py-5 justify-between">
            {" "}
            <span className="mt-10 text-xl ">
              Browse <br />
              Amazon
            </span>
            <div>
              <button className="flex gap-4 " onClick={() => signIn()}>
                Sign In <FaUser />
              </button>
            </div>
          </div>
          <div onClick={() => setShowMobileMenu(false)}>
            <span className=" px-5 py-3 text-black bg-white font-bold block ">
              <Link href="/" className="flex justify-between">
                Amazon Home <FaHome />
              </Link>
            </span>
          </div>
          <div className="mt-1 bg-white px-5 py-3 flex flex-col gap-3 text-black">
            <h2 className="font-bold"> Trending </h2>
            <h3> Best Sellers</h3>
            <h3> New Releases</h3>
            <h3> Movers and Shakers</h3>
          </div>

          <div className="mt-1 bg-white px-5 py-3 flex flex-col gap-3 text-black">
            <h2 className="font-bold"> Top Departments </h2>
            <h3> Computers</h3>
            <h3> Home</h3>
            <h3> Books</h3>
            <h3> Electronics</h3>
          </div>

          <div className="mt-1 bg-white px-5 py-3 flex flex-col gap-3 text-black">
            <h2 className="font-bold"> Program and Features </h2>
            <h3> Today's Deals</h3>
            <h3> Prime</h3>
            <h3> Gift Cards</h3>
          </div>
        </div>

        <div
          className=" bg-black opacity-70  w-[20%] text-2xl  z-40 text-white pt-20 pl-10"
          onClick={handleMobileMenu}
        >
          <RxCross2 />
        </div>
      </div>
    </div>
  );
};

export default Header;
