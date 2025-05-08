// productSourcing/CategoryNav.tsx

'use client'
import React, { useRef, useState, useEffect } from 'react';
 import ChevronRight from '../../../../../public/assets/icons/chevronRightIcon';
 import ChevronLeft from '../../../../../public/assets/icons/chevronLeftIcon';
import ChevronDown from '../../../../../public/assets/icons/chevronDown';
import { AnimatePresence, motion } from 'framer-motion';
import { modalVariants } from '../../variants/exitVariant';
import { useCategories } from '@/lib/customHooks/useReactQueryProductStoreHooks';
import { useRouter } from 'next/navigation';
  
 
 
 const CategoryNav = () => {
   const [showRightScroll, setShowRightScroll] = useState(false);
   const [showLeftScroll, setShowLeftScroll] = useState(false);
   const scrollRef = useRef<HTMLDivElement>(null);
   const [isOpenCategory, setIsOpenCategory] = useState(false);
   
   const router = useRouter();

   const { data: categoryResponse, isLoading } = useCategories();

    const categories = categoryResponse?.categories || [];

   const toggleCategoryDropdown = () => setIsOpenCategory((prev) => !prev);

   const handleSelectCategory = (categoryId: string, categoryName: string) => {
     // Navigate to category or filter products by this category
     router.push(
       `/product-sourcing/category/${categoryId}?name=${encodeURIComponent(
         categoryName
       )}`
     );
     console.log(`Selected category: ${categoryName}`);
     setIsOpenCategory(false);
   };

  //  useEffect(() => {
  //    const fetchCategories = async () => {
  //      setIsLoading(true);
  //      try {
  //        const response = await getCategory();

  //        // Check if response has the categories property
  //        if (
  //          response &&
  //          typeof response === "object" &&
  //          "categories" in response
  //        ) {
  //          const categoryData = response as CategoryResponse;
  //          setCategories(categoryData.categories);
  //        } else {
  //          console.warn("Unexpected API response format:", response);
  //        }
  //      } catch (error) {
  //        console.error("Error fetching categories:", error);
  //      } finally {
  //        setIsLoading(false);
  //      }
  //    };

  //    fetchCategories();
  //  }, [getCategory]);

    // Fallback categories to display while loading or if API fails or when loading
   const fallbackCategories = [
     "Agriculture",
     "Building materials",
     "Chemicals",
     "Furniture",
     "Ergonomics",
     "Food and perishables",
     "shoes",
     "school supplies",
     "shorts",
     "toiletraies",
   ];

   const checkScroll = () => {
     if (scrollRef.current) {
       const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
       setShowRightScroll(scrollLeft < scrollWidth - clientWidth);
       setShowLeftScroll(scrollLeft > 0);
     }
   };

   useEffect(() => {
     checkScroll();
     window.addEventListener("resize", checkScroll);
     return () => window.removeEventListener("resize", checkScroll);
   }, []);

   const scroll = (direction: string) => {
     if (scrollRef.current) {
       const scrollAmount = direction === "right" ? 200 : -200;
       scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
       // Update scroll buttons after scrolling
       setTimeout(checkScroll, 100);
     }
   };
   

   return (
     <>
       <div className="relative  sm:max-w-[300px]  md:block max-w-[550px] lg:max-w-[35rem] xl:max-w-[700px] hidden overflow-hidden bg-white">
         <div className="relative flex mx-auto px-4">
           {/* Left scroll button */}
           {showLeftScroll && (
             <button
               onClick={() => scroll("left")}
               className="absolute left-0  top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2  bg-red-500 rounded-full shadow-md z-10"
               aria-label="Scroll left"
             >
               <ChevronLeft />
             </button>
           )}

           {/* Scrollable container */}
           <div
             ref={scrollRef}
             className="flex items-center space-x-8 overflow-x-auto today-deal scrollbar-hide py-4 mx-6"
             style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
             onScroll={checkScroll}
           >
             {isLoading
               ? // Show loading placeholders
                 fallbackCategories.map((category, index) => (
                   <button
                     key={`fallback-${index}`}
                     className="text-gray-600 hover:text-gray-900 whitespace-nowrap text-base font-normal focus:outline-none flex-shrink-0"
                   >
                     {category}
                   </button>
                 ))
               : // Show actual categories
               categories.length > 0
               ? categories.map((category) => (
                   <button
                     key={category._id}
                     onClick={() =>
                       handleSelectCategory(category._id, category.name)
                     }
                     className="text-gray-600 hover:text-gray-900 whitespace-nowrap text-base font-normal focus:outline-none flex-shrink-0"
                   >
                     {category.name}
                   </button>
                 ))
               : // Fallback when no categories are available
                 fallbackCategories.map((category, index) => (
                   <button
                     key={`fallback-${index}`}
                     className="text-gray-600 hover:text-gray-900 whitespace-nowrap text-base font-normal focus:outline-none flex-shrink-0"
                   >
                     {category}
                   </button>
                 ))}
           </div>

           {/* Right scroll button */}
           {showRightScroll && (
             <button
               onClick={() => scroll("right")}
               className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md z-10"
               aria-label="Scroll right"
             >
               <ChevronRight />
             </button>
           )}
         </div>
       </div>

       <div className="md:hidden block ">
         <div className="relative  ">
           <label
             onClick={toggleCategoryDropdown}
             className=" cursor-pointer text-theme-yellow-pry flex items-center gap-1 text-[16px]  font-semibold"
             htmlFor=""
           >
             {" "}
             All categories <ChevronDown color="#FACC15" />
           </label>
           {/* Dropdown Options */}
           <AnimatePresence>
             {isOpenCategory && (
               <motion.ul
                 variants={modalVariants}
                 initial="hidden"
                 animate="visible"
                 exit="hidden"
                 className="absolute w-fit left-0 right-0 mt-2 bg-white border border-gray-300 z-30 rounded-md shadow-lg max-h-60 overflow-auto  scrollbar  scrollbar-track-gray-300   scrollbar-thumb "
               >
                 {isLoading
                   ? // Loading state for dropdown
                     fallbackCategories.map((category, index) => (
                       <li
                         key={`fallback-dropdown-${index}`}
                         className="px-4 py-2 text-gray-700 hover:bg-gray-200 cursor-pointer whitespace-nowrap"
                       >
                         {category}
                       </li>
                     ))
                   : // Actual dropdown items
                   categories.length > 0
                   ? categories.map((category) => (
                       <li
                         key={category._id}
                         className="px-4 py-2 text-gray-700 hover:bg-gray-200 cursor-pointer whitespace-nowrap"
                         onClick={() =>
                           handleSelectCategory(category._id, category.name)
                         }
                       >
                         {category.name}
                       </li>
                     ))
                   : // Fallback when no categories are available
                     fallbackCategories.map((category, index) => (
                       <li
                         key={`fallback-dropdown-${index}`}
                         className="px-4 py-2 text-gray-700 hover:bg-gray-200 cursor-pointer whitespace-nowrap"
                       >
                         {category}
                       </li>
                     ))}
               </motion.ul>
             )}
           </AnimatePresence>
         </div>
       </div>
     </>
   );
 };
 
 export default CategoryNav;