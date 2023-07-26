import React from "react";
import Image from "next/image";
import FormattedPrice from "./FormattedPrice";

interface Props {
  brand: string;
  category: string;
  description: string;
  image: string;
  isNew: boolean;
  oldPrice: number;
  price: number;
  title: string;
  _id: number;
}

type Item = {
  item: Props;
};

const SearchProducts = ({ item }: Item) => {
  return (
    <div className="flex items-center gap-4 py-3 lg:py-0">
      <Image
        width={130}
        height={150}
        src={item.image}
        alt="productImage"
        className="h-[30%] lg:h-24  w-[25%] lg:w-24"
      />
      <div>
        <p className="hidden lg:block text-xs -mb-1">
          {item.brand}_{item.category}
        </p>
        <p className="text-md lg:text-lg font-medium">{item.title}</p>
        <p className="text-xs">{item.description.substring(0, 80) + "..."}</p>
        <p className="text-sm flex items-center gap-1">
          price:{" "}
          <span className="font-semibold">
            <FormattedPrice amount={item.price} />
          </span>
          <span className="text-gray-600 line-through">
            <FormattedPrice amount={item.oldPrice} />
          </span>
        </p>
      </div>
      <div className="flex-1 text-right px-4">
        <p className="text-base font-semibold animate-bounce text-amazon_blue">
          Save <FormattedPrice amount={item.oldPrice - item.price} />
        </p>
      </div>
    </div>
  );
};

export default SearchProducts;
