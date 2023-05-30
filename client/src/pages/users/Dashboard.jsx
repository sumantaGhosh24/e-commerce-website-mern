import {useState} from "react";
import Chart from "chart.js/auto";
import {CategoryScale} from "chart.js";

import {useGetDashboardQuery} from "../../app/features/user/userApiSlice";
import {useTitle} from "../../hooks";
import {BarChart, Loading} from "../../components";

Chart.register(CategoryScale);

const Dashboard = () => {
  useTitle("Dashboard");

  const {data, isLoading} = useGetDashboardQuery();

  const userData = [
    {id: 1, user: data?.userCount, label: "Total User"},
    {id: 2, user: data?.activeUser, label: "Active User"},
    {id: 3, user: data?.inActiveUser, label: "Inactive User"},
    {id: 4, user: data?.totalUser, label: "Users"},
    {id: 5, user: data?.totalAdmin, label: "Admins"},
  ];

  const [userChartData, setUserChartData] = useState({
    labels: userData.map((data) => data.label),
    datasets: [
      {
        label: "Users Gained",
        data: userData.map((data) => data.user),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#08e840",
          "#b70531",
          "#ffea08",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  const countData = [
    {id: 1, count: data?.brandCount, label: "Total Brand"},
    {id: 2, count: data?.categoryCount, label: "Total Category"},
    {id: 3, count: data?.orderCount, label: "Total Order"},
    {id: 4, count: data?.productCount, label: "Total Product"},
    {id: 5, count: data?.reviewCount, label: "Total Review"},
    {id: 6, count: data?.sellProduct[0]?.sell, label: "Total Sell Product"},
  ];

  const [countChartData, setCountChartData] = useState({
    labels: countData.map((data) => data.label),
    datasets: [
      {
        label: "General Detailed",
        data: countData.map((data) => data.count),
        backgroundColor: [
          "#ed8609",
          "#94fa06",
          "#03ff10",
          "#03f9cc",
          "#0727fc",
          "#ac0afc",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  const priceData = [
    {id: 1, amount: data?.totalPrice[0]?.amount, label: "Total Price"},
    {id: 2, amount: data?.price[0]?.amount, label: "Actual Price"},
    {id: 3, amount: data?.taxPrice[0]?.amount, label: "Tax Price"},
    {id: 4, amount: data?.shippingPrice[0]?.amount, label: "Shipping Price"},
  ];

  const [priceChartData, setPriceChartData] = useState({
    labels: priceData.map((data) => data.label),
    datasets: [
      {
        label: "General Detailed",
        data: priceData.map((data) => data.amount),
        backgroundColor: ["#f59403", "#05ff22", "#087cf9", "#880be8"],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <section className="max-w-7xl p-6 mx-auto my-20 shadow-xl rounded-xl">
        <h2 className="text-xl font-bold capitalize mb-5">Admin Dashboard</h2>
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 xl:w-2/6 mb-4">
            <BarChart chartData={userChartData} text="User Data" />
          </div>
          <div className="w-full md:w-1/2 xl:w-2/6 mb-4">
            <BarChart chartData={countChartData} text="Count Data" />
          </div>
          <div className="w-full md:w-1/2 xl:w-2/6 mb-4">
            <BarChart chartData={priceChartData} text="Price Data" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
