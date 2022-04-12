import React, { useEffect, useState } from "react"
import ReactApexChart from "react-apexcharts";
import PropTypes from "prop-types"
import Spinearea from "./spline-area"

const Apaexlinecolumn = (props) => {

  const [motor1Data, setMotor1] = useState([])
  const [motor2Data, setMotor2] = useState([])
  const [motor3Data, setMotor3] = useState([])
  const [categories1, setCategories] = useState([])


  const [series1, setSeries] = useState([])

  useEffect(() => {
    let timeData = []
    props.data.forEach(el => {
      motor1Data.push(el.vehicleStats.mean_BFI_RR_temp_2.BFI_temp_motor_1)
      motor2Data.push(el.vehicleStats.mean_BFI_RR_temp_2.BFI_temp_motor_2)
      motor3Data.push(el.vehicleStats.mean_BFI_RR_temp_2.BFI_temp_motor_3)
      timeData.push(el.time)
    })
    setCategories(timeData)
    let ser = []
    ser.push({
      name: "Motor 1",
      data: motor1Data
    })
    ser.push({
      name: "Motor 2",
      data: motor2Data
    })
    ser.push({
      name: "Motor 3",
      data: motor3Data
    })
    setSeries(ser)
  }, [])
  const series = [
    {
      name: "Motor 1",
      data: motor1Data,
    },
    {
      name: "Motor 2",
      data: motor2Data,
    },
    {
      name: "Motor 3",
      data: motor3Data,
    },
  ];
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "45%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },

    colors: ["#34c38f", "#556ee6", "#f46a6a"],
    xaxis: {
      categories: categories1,
    },
    yaxis: {
      title: {
        text: "Temperature",
      },
    },
    grid: {
      borderColor: "#f1f1f1",
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "C " + val;
        },
      },
      x: {
        format: "dd/MM/yy HH:mm",
      }
    },
  };

  return (
    <ReactApexChart options={options} series={series1} type="bar" height={350} />
  );
};
Apaexlinecolumn.propTypes = {
  data: PropTypes.array
}
export default Apaexlinecolumn;
