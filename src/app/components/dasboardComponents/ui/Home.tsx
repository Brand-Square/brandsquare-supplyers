"use client";
import React from "react";
import Card from "./card";
import ProductIcon from "../../../../../public/assets/icons/productIcon";
import OrdersIcon from "../../../../../public/assets/icons/ordersIcon";
import PaymentIcon from "../../../../../public/assets/icons/paymentIcon";
import LineChart from "./LineChart";
import SalesDonutChart from "./DonutChart";
import BarChart from "./BarChart";
import NoSales from "./NoSales";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useVendorAnalyticsData } from "@/app/store/useVendorProductStore";
import { Skeleton } from "@/components/ui/skeleton";
// type Data = {
//   name: string;
//   val: number;
// }[];
// type RevData = {
//   name: string;
//   value: number;
// }[];

const Home = () => {
  const router = useRouter();
  const { data: analyticsData, isLoading } = useVendorAnalyticsData();

  // const data: Data = [
  //   { name: "Mar", val: 10 },
  //   { name: "Apr", val: 2780 },
  //   { name: "May", val: 1890 },
  //   { name: "Jun", val: 2390 },
  //   { name: "Jul", val: 3490 },
  //   { name: "Aug", val: 3200 },
  // ];
  // const customerData: Data = [
  //   { name: "Mar", val: 10 },
  //   { name: "Apr", val: 2780 },
  //   { name: "May", val: 1890 },
  //   { name: "Jun", val: 2390 },
  //   { name: "Jul", val: 3490 },
  //   { name: "Aug", val: 3200 },
  // ];

  // const reviewsData: RevData = [
  //   { name: "Good reviews", value: 70 },
  //   { name: "Bad reviews", value: 30 },
  // ];
  // const bestSellingData: RevData = [
  //   { name: "Product 1", value: 30 },
  //   { name: "Product 2", value: 30 },
  //   { name: "Others", value: 30 },
  // ];

  const chartContainer =
    " rounded-[16px]  shadow-md border border-[#E2E3EC]  p-3 md:p-5";
  const chartTitle = "text-[#2A2B2D] font-semibold py-3";
  return (
    <div className=" pb-14">
      <div className="  py-1 flex md:flex-row flex-col  md:items-center md:justify-between gap-2 md:gap-0">
        <div>
          <h1 className="text-3xl     font-bold">Home</h1>
          <span className="  text-theme-text-gray">
            Get an overview of your activity here
          </span>
        </div>
        <div
          onClick={() => router.push("/dashboard/add-product")}
          className="  w-fit"
        >
          <Button asChild>
            <Link href={"/dashboard/products/add-product"}>
              <Plus /> New Product
            </Link>
          </Button>
        </div>
      </div>


      <div className="cards grid xl:grid-cols-4 md:grid-cols-2    gap-2  md:mt-9">
        {isLoading ? (
          <Skeleton className="h-[100px] w-[300px]" />
        ) : (
          <Card
            title="New orders"
            number={String(analyticsData?.totalOrders)}
            percentage="10"
            icon={<OrdersIcon color="black" />}
          />
        )}

        {isLoading ? (
          <Skeleton className="h-[100px] w-[300px]" />
        ) : (
          <Card
            title="Total orders"
            number={
              isLoading ? "Loading..." : String(analyticsData?.totalOrders)
            }
            percentage="10"
            icon={<OrdersIcon color="black" />}
          />
        )}

        {isLoading ? (
          <Skeleton className="h-[100px] w-[300px]" />
        ) : (
          <Card
            title="Total revenue"
            number={String(analyticsData?.totalRevenue)}
            percentage="10"
            icon={<ProductIcon color="black" />}
          />
        )}

        {isLoading ? (
          <Skeleton className="h-[100px] w-[300px]" />
        ) : (
          <Card
            title="Total products"
            number={String(analyticsData?.totalProduct)}
            percentage="10"
            icon={<PaymentIcon color="black" />}
          />
        )}
      </div>

      {/* <div className="chart lg:flex-row flex-col flex gap-3 items-start mt-9">
        <div className={` ${chartContainer}    w-full`}>
          <span className={`${chartTitle}`}>Sales over the past 6 months</span>
          <div className="  max-w-[300px]    md:max-w-[500px] mx-auto">
            {data.length > 0 ? (
              <LineChart data={data} />
            ) : (
              <NoSales text="No sales yet" subtext=" to see sales trends" />
            )}
          </div>
        </div>

        <div className={` ${chartContainer} w-full `}>
          <span className={`${chartTitle}`}>Best selling products</span>
          <div className="  max-w-[300px]    md:max-w-[500px] mx-auto">
            {bestSellingData.length > 0 ? (
              <SalesDonutChart data={bestSellingData} text="sales" />
            ) : (
              <NoSales
                text="No sales yet"
                subtext=" to see best selling products"
              />
            )}
          </div>
        </div>
      </div> */}
      <div className="chart lg:flex-row flex-col flex gap-3 items-start mt-9">
        <div className={` ${chartContainer}    w-full`}>
          <span className={`${chartTitle}`}>Sales over the past 6 months</span>
          <div className="  max-w-[300px]    md:max-w-[500px] mx-auto">
            {analyticsData?.salesOverTime?.length ? (
              <LineChart data={analyticsData?.salesOverTime} />
            ) : (
              <NoSales text="No sales yet" subtext=" to see sales trends" />
            )}
          </div>
        </div>

        <div className={` ${chartContainer} w-full `}>
          <span className={`${chartTitle}`}>Best selling products</span>
          <div className="  max-w-[300px]    md:max-w-[500px] mx-auto">
            {analyticsData?.bestSellingProducts?.length ? (
              <SalesDonutChart
                data={analyticsData?.bestSellingProducts}
                text="sales"
              />
            ) : (
              <NoSales
                text="No sales yet"
                subtext=" to see best selling products"
              />
            )}
          </div>
        </div>
      </div>

      {/* <div className={`barChart mt-5   w-full ${chartContainer}`}>
        <span className={`${chartTitle}`}>
          Product performance over the past 6 months
        </span>
        <div>
          {data.length > 0 ? (
            <BarChart />
          ) : (
            <NoSales
              text="No sales yet"
              subtext=" to see product performance"
            />
          )}
        </div>
      </div> */}

      <div className={`barChart mt-5   w-full ${chartContainer}`}>
        <span className={`${chartTitle}`}>
          Product performance over the past 6 months
        </span>
        <div>
          {analyticsData?.salesOverTime?.length ? (
            <BarChart />
          ) : (
            <NoSales
              text="No sales yet"
              subtext=" to see product performance"
            />
          )}
        </div>
      </div>

      {/* <div className="customersChart">
        <div className="chart lg:flex-row flex-col flex gap-3 items-start mt-9">
          <div className={` ${chartContainer}    w-full`}>
            <span className={`${chartTitle}`}>
              Sales New customers over the past 6 months
            </span>
            <div className="  max-w-[300px]    md:max-w-[500px] mx-auto">
              {customerData.length > 0 ? (
                <LineChart data={customerData} />
              ) : (
                <NoSales text="No sales yet" subtext=" to see sales trends" />
              )}
            </div>
          </div>

          <div className={` ${chartContainer} w-full `}>
            <span className={`${chartTitle}`}>Review trends</span>
            <div className="  max-w-[300px]    md:max-w-[500px] mx-auto">
              {reviewsData.length > 0 ? (
                <SalesDonutChart
                  style="   "
                  data={reviewsData}
                  text="reviews"
                />
              ) : (
                <NoSales
                  text="No reviews yet"
                  subtext=" to see review trends"
                />
              )}
            </div>
          </div>
        </div>
      </div> */}

      <div className="customersChart">
        <div className="chart lg:flex-row flex-col flex gap-3 items-start mt-9">
          <div className={` ${chartContainer}    w-full`}>
            <span className={`${chartTitle}`}>
              Sales New customers over the past 6 months
            </span>
            <div className="  max-w-[300px]    md:max-w-[500px] mx-auto">
              {analyticsData?.newCustomersByMonth?.length ? (
                <LineChart data={analyticsData?.newCustomersByMonth} />
              ) : (
                <NoSales text="No sales yet" subtext=" to see sales trends" />
              )}
            </div>
          </div>

          {/* <div className={` ${chartContainer} w-full `}>
            <span className={`${chartTitle}`}>Review trends</span>
            <div className="  max-w-[300px]    md:max-w-[500px] mx-auto">
              {reviewsData.length > 0 ? (
                <SalesDonutChart
                  style="   "
                  data={reviewsData}
                  text="reviews"
                />
              ) : (
                <NoSales
                  text="No reviews yet"
                  subtext=" to see review trends"
                />
              )}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};
// left-[28%]   md:left-[30.8%]  md:ml-4
export default Home;
