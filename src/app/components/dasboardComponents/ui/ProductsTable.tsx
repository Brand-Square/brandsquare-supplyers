  import MoreIcon from '../../../../../public/assets/icons/moreIcon.svg'
 import ChevronLeftIcon from '../../../../../public/assets/icons/chevronLeftIcon'
 import ChevronRightIcon from '../../../../../public/assets/icons/chevronRightIcon';
import React from 'react';
import Image from 'next/image';

interface Product {
  name: string;
  quantity: string;
  price: string;
  sales: string;
  image: string;
}

const ProductTable = ({ products }: { products: Product[] }) => {
  return (
    <div className=" w-full  mt-3">
      <div className="relative w-full overflow-x-auto scrollbar    scrollbar-thumb-[#F6F7F9]  flex bg-white  p-2   ">
        <div className=" w-max flex-1   rounded-lg">
          <table className="min-w-full table-auto bg-white">
            <thead className="bg-[#F6F7F9] text-sm">
              <tr>
                <th className="p-4 text-left whitespace-nowrap">Product Name</th>
                <th className="p-4 text-left whitespace-nowrap">Quantity</th>
                <th className="p-4 text-left whitespace-nowrap">Price (NGN)</th>
                <th className="p-4 text-left whitespace-nowrap">Sales</th>
                <th className="p-4 text-left whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-4">
                    <div className="flex items-center gap-3 min-w-[200px]">
                      <div className="flex-shrink-0">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={48}
                          height={48}
                          className="w-12 h-12 object-cover rounded"
                        />
                      </div>
                      <span className="truncate">{product.name}</span>
                    </div>
                  </td>
                  <td className="p-4 whitespace-nowrap">{product.quantity}</td>
                  <td className="p-4 whitespace-nowrap">{product.price}</td>
                  <td className="p-4 whitespace-nowrap">{product.sales}</td>
                  <td className="p-4 whitespace-nowrap">
                    <button className="p-2 hover:bg-gray-100 rounded">
                      <Image src={MoreIcon} alt="more icon" width={20} height={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="flex f flex-row justify-between items-center gap-4 mt-4 p-4">
        <button className=" md:w-auto  px-2 md:px-4 py-2 border rounded hover:bg-gray-50 ">
          <span className=' md:block hidden'>Previous</span>
          <div className=' md:hidden block'>
          <ChevronLeftIcon />
          </div>
           
        </button>
        <span className="text-sm">Page 1 of 30</span>
        <button className=" md:w-auto  px-2 md:px-4 py-2 border rounded hover:bg-gray-50 ">
          <span className=' md:block hidden'>Next</span>
          <div className=' md:hidden block'>
          <ChevronRightIcon />
          </div>
           
        </button>
      </div>
    </div>
  );
};

export default ProductTable;