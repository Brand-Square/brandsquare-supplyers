'use client'
import { PrimaryHeading } from "@/components/ui/PrimaryHeading";
import { Button } from "@/components/ui/button";
import { ProductForm } from "./ProductForm";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const Page = () => {
  const [isProfileComplete, setIsProfileComplete] = useState<boolean | null>(null);

useEffect(() => {
  console.log('Checking profile completion status...');
  const storedUser = localStorage.getItem("vendorDetails"); 
 
  if (storedUser) {
    try {
      const userData = JSON.parse(storedUser);
      console.log('Parsed userData:', userData);
      
     
      const profileComplete = userData.isProfileComplete ?? 
                           userData.data?.details?.isProfileComplete ?? 
                           userData.details?.isProfileComplete ?? 
                           false;
      
      console.log('Determined profileComplete:', profileComplete);
      setIsProfileComplete(profileComplete);
    } catch (error) {
      console.error("Error parsing user data:", error);
      setIsProfileComplete(false);
    }
  } else {
    console.log('No vendorDetails found in localStorage');
    setIsProfileComplete(false);
  }
}, []);


  console.log('Rendering with isProfileComplete:', isProfileComplete);
  if (isProfileComplete === null) {
    console.log('Showing loading state');
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isProfileComplete) {
    console.log('Showing profile incomplete block'); 
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <PrimaryHeading text="Complete Your Profile" />
        <p className="mt-4 text-lg text-gray-600">
          You need to complete your supplier profile to add products.
        </p>
        <Link href="/dashboard/settings">
          <Button className="mt-6" variant="default">
            Update Profile
          </Button>
        </Link>
      </div>
    );
  }

  console.log('Showing product form (profile complete)'); 
  return (
    <div>
      <div className="flex items-center justify-between mx-auto max-w-[60rem]">
        <PrimaryHeading text="Add New Product" />
        <Button variant="ghost">Clear</Button>
      </div>
      <div className="mt-5 mx-auto max-w-[60rem]">
        <ProductForm />
      </div>
    </div>
  );
};

export default Page;
















































// 'use client'
// import { PrimaryHeading } from "@/components/ui/PrimaryHeading";
// import { Button } from "@/components/ui/button";
// import { ProductForm } from "./ProductForm";
// import React, { useEffect, useState } from "react";
// import Link from "next/link";

// const Page = () => {
//   const [isProfileComplete, setIsProfileComplete] = useState<boolean | null>(() => {
//     if (typeof window !== 'undefined') {
//       const cached = sessionStorage.getItem('profileComplete');
//       return cached ? JSON.parse(cached) : null;
//     }
//     return null;
//   });

//   useEffect(() => {
//     if (isProfileComplete === true) {
//       console.log('Profile already complete, skipping check');
//       return;
//     }

//     console.log('Checking profile completion status...');
//     const storedUser = localStorage.getItem("vendorDetails"); 
    
//     if (storedUser) {
//       try {
//         const userData = JSON.parse(storedUser);
//         console.log('Parsed userData:', userData);
        
//         const profileComplete = userData.isProfileComplete ?? 
//                              userData.data?.details?.isProfileComplete ?? 
//                              userData.details?.isProfileComplete ?? 
//                              false;
        
//         console.log('Determined profileComplete:', profileComplete);
//         setIsProfileComplete(profileComplete);
        
//         // Cache true results in sessionStorage
//         if (profileComplete) {
//           sessionStorage.setItem('profileComplete', 'true');
//         }
//       } catch (error) {
//         console.error("Error parsing user data:", error);
//         setIsProfileComplete(false);
//       }
//     } else {
//       console.log('No vendorDetails found in localStorage');
//       setIsProfileComplete(false);
//     }
//   }, [isProfileComplete]);

//   console.log('Rendering with isProfileComplete:', isProfileComplete);

//   if (isProfileComplete === null) {
//     console.log('Showing loading state');
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <p>Loading...</p>
//       </div>
//     );
//   }

//   if (!isProfileComplete) {
//     console.log('Showing profile incomplete block');
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen text-center">
//         <PrimaryHeading text="Complete Your Profile" />
//         <p className="mt-4 text-lg text-gray-600">
//           You need to complete your supplier profile to add products.
//         </p>
//         <Link href="/dashboard/settings">
//           <Button className="mt-6" variant="default">
//             Update Profile
//           </Button>
//         </Link>
//       </div>
//     );
//   }

//   console.log('Showing product form (profile complete)');
//   return (
//     <div>
//       <div className="flex items-center justify-between mx-auto max-w-[60rem]">
//         <PrimaryHeading text="Add New Product" />
//         <Button variant="ghost">Clear</Button>
//       </div>
//       <div className="mt-5 mx-auto max-w-[60rem]">
//         <ProductForm />
//       </div>
//     </div>
//   );
// };

// export default Page;