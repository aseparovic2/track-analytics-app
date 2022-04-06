import React, { useEffect, useState } from "react"
import ReactApexChart from "react-apexcharts"
import PropTypes from "prop-types"

const Spinearea = (props) => {
  const [series1, setSeries] = useState([])
  const [categories1, setCategories] = useState([])
  useEffect(() => {
    console.log(props.data.telemetry_data)
    let bateryData = []
    let timeData = []
    let newObj = {
      name: 'Ride',
      data: bateryData
    }
    props.data.forEach(el => {
      bateryData.push(el.vehicleStats.mean_PDU_HV_battery_performance.PDU_HV_battery_current)
      timeData.push(el.time)
    })
    let newSeries = []
    newSeries.push(newObj)
    setSeries(newSeries)
    setCategories(timeData)
    console.log(timeData, newSeries)
  }, [])


  const options = {
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },

    colors: ["#556ee6", "#34c38f"],
    xaxis: {
      type: "datetime",
      categories: categories1,
    },
    grid: {
      borderColor: "#f1f1f1",
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  }

  return (
    <ReactApexChart
      options={options}
      series={series1}
      type="area"
      height="350" />
  )
}
Spinearea.propTypes = {
  data: PropTypes.array
}

export default Spinearea
