import {Bar} from "react-chartjs-2";
import propTypes from "prop-types";

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

BarChart.propTypes = {
  chartData: propTypes.object,
  text: propTypes.string,
};

export default BarChart;
