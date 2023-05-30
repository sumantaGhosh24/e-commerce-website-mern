import {Bar} from "react-chartjs-2";

const BarChart = ({chartData, text}) => {
  return (
    <div className="rounded-xl shadow-xl bg-gray-200 p-3 m-2">
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: text,
            },
            legend: {
              display: true,
            },
          },
        }}
      />
    </div>
  );
};

export default BarChart;
