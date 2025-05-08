import React, { useState } from "react";
// import SearchIcon from "../../../../public/assets/icons/searchIcon";
import { Search } from "lucide-react";

const SearchBar = ({ style, text }: { style?: string; text?: string }) => {
  const [searchFocus, setSearchFocus] = useState(false);

  //${searchFocus && ' ring-1  ring-theme-blue ring-opacity-35'  }   flex items-center  bg-[#F0F1F6] gap-3 border rounded-md p-[2px] sm:p-2 w-full ${style}
  return (
    <div className="lg:flex lg:items-center lg:gap-2">
      <div
        className={` ${
          searchFocus &&
          "ring-1 xl:w-[40vw] xl:py-[2%] ring-theme-blue ring-opacity-35"
        } flex items-center bg-white gap-3 border rounded-md pl-5  ${style}  `}
      >
        <Search className="text-gray-700" width={30} height={30} />

        <input
          suppressHydrationWarning
          type="text"
          onBlur={() => setSearchFocus(false)}
          onFocus={() => setSearchFocus(true)}
          className=" bg-inherit py-[3%] xl:py-[2%] text-base lg:w-[30vw] outline-none"
          placeholder={text ? text : " Find your products"}
        />
      </div>
      <button className="hidden shadow-sm lg:block bg-theme-blue text-white px-5 py-2 rounded-md">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
