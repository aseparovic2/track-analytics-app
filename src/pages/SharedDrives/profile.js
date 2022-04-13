import React, { useEffect, useState } from "react"
import MetaTags from 'react-meta-tags';
import { Link, useHistory } from "react-router-dom"
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  InputGroup,
  Label,
  Row, Spinner
} from "reactstrap"
import Select from "react-select";
import Breadcrumbs from "components/Common/Breadcrumb"
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
import ReactTable from "react-table";
import ExcelJs from "exceljs";
import Spinearea from "../../components/spline-area"
import Apaexlinecolumn from "../../components/apex"
import SimpleMap from "../../components/simple-map"
import maintanence from "../../assets/images/interior.jpg"
import { useLazyQuery, useQuery } from "@apollo/client";
import { TELEMETRY_BY_CAR, TELEMETRY_BY_RANGE } from "../../graphql/queries/telemetry"
import { ALL_CARS } from "../../graphql/queries/cars"
import TestTable from "../../components/TestTable"
import DataTable from "../../components/Common/DataTable/DataTable"
import { orgChartData } from "../../components/Company/fakeData"
import { removeBodyCss } from "../../helpers/removeBodyCss"
import { AUTH_USER } from "../../graphql/queries/users"




const ShareRideProfile = () => {
  const [isDataFetched, setIsDataFetched] = useState(false)
  const [selectedCar, setSelectedCar] = useState('')
  const [testData, setTestData] = useState([])
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [expand, setExpanded] = useState({})
  const [generalData, setGeneralData] = useState([])
  const [globalLoading, setGlobalLoading] = useState(false)
  const history = useHistory()

  const [dates, setDates] = useState({
    start_date: "",
    end_date: ""
  })
  const {  data: carData } = useQuery(ALL_CARS);


  const [getDataByRange, {  }] = useLazyQuery(
    TELEMETRY_BY_RANGE, {
      variables: {
        startDate: startDate,
        endDate: endDate
      }
    },
  );
  const [getDataByCar, loading] = useLazyQuery(TELEMETRY_BY_CAR, {
    variables: {
      carId: "6244b4b43b002944b2598e19"
    }
  });

  const fakeData = [
    {
      time : '20/01/2022'
    },
    {
      time : '20/02/2022'
    }
  ]
  useEffect(() => {
    setGlobalLoading(true)
    getDataByCar().then(res => {
      console.log(res?.data?.telemetry_data)
      setGeneralData(res?.data?.telemetry_data)
      setGlobalLoading(false)
    })
  }, [])


  const onDataFilter = async () => {
    setGlobalLoading(true)
    if (selectedCar !== '') {
      await getDataByCar().then(res => {
        console.log(res?.data?.telemetry_data)
        setGeneralData(res?.data?.telemetry_data)

      })
    } else if (startDate !== '' && endDate !== '') {
      await getDataByRange().then(res => {
        console.log(res.data)
        setGeneralData(res?.data?.telemetry_data)
      })
    }
    //setTestData(data)
    setIsDataFetched(true)
    setGlobalLoading(false)

  }
  const handleMulti = (option) => {
    console.log(option._id)
    setSelectedCar(option._id)
  }
  const onPickerChange = (selectedDates,dateStr,instance) => {
    if(dateStr.includes('to')) {
      console.log(dateStr.split('to'))
      let days = dateStr.split('to')
      setStartDate(days[0].replace(/\s/g, ''))
      setEndDate(days[1].replace(/\s/g, ''))
    }
    //selectedDates.length === 2
  }

  const columns = [
    {
      dataField: "car",
      text: "Car Info",
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, user) => {
        return (
          <>
            <h5 className="font-size-14 mb-1"> {cellContent.model} {cellContent.licence}</h5>
          </>
        )
      }
    },
    {
      dataField: "user_id",
      text: "Owner ID",
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, user) => {
        return (
          <>
            <h5 className="font-size-14 mb-1"> {cellContent._id}</h5>
          </>
        )
      }
    },
    {
      dataField: "time",
      text: "Time",
    },
  ]


  const expandRow = {
    // eslint-disable-next-line react/display-name
    renderer: row => {
      const sensorData = []
      const arrayOfObj = Object.entries(row.vehicleStats).map((e) => ( { [e[0]]: e[1] } ));
      arrayOfObj.map((el) => {
        if (el.mean_HPI_FL_inverter_temp !== undefined) {
          let newObj = {
            id:el.mean_HPI_FL_inverter_temp.__typename,
            name: 'FL Inverter Temperature',
            value1: el.mean_HPI_FL_inverter_temp.HPI_temp_IGBT1,
            value2: el.mean_HPI_FL_inverter_temp.HPI_temp_IGBT2,
            value3: el.mean_HPI_FL_inverter_temp.HPI_temp_IGBT3
          }
          sensorData.push(newObj)
        } else if (el.mean_HPI_FR_inverter_temp !== undefined) {
          let newObj = {
            id:el.mean_HPI_FR_inverter_temp.__typename,
            name: 'FR Inverter Temperature',
            value1: el.mean_HPI_FR_inverter_temp.HPI_temp_IGBT1,
            value2: el.mean_HPI_FR_inverter_temp.HPI_temp_IGBT2,
            value3: el.mean_HPI_FR_inverter_temp.HPI_temp_IGBT3
          }
          sensorData.push(newObj)
        } else if (el.mean_PDU_HV_battery_performance !== undefined) {
          let voltage = {
            id:el.mean_PDU_HV_battery_performance.__typename,
            name: 'Battery Performance - Voltage',
            value1: el.mean_PDU_HV_battery_performance.PDU_HV_battery_voltage,
          }
          let current = {
            id:el.mean_PDU_HV_battery_performance.__typename,
            name: 'Battery Performance - Current',
            value1: el.mean_PDU_HV_battery_performance.PDU_HV_battery_current,
          }
          sensorData.push(voltage)
          sensorData.push(current)
        }  else if (el.mean_PDU_HV_consumptions !== undefined) {
          let voltage = {
            id:el.mean_PDU_HV_consumptions.__typename,
            name: 'Battery Consumption - Charged',
            value1: el.mean_PDU_HV_consumptions.PDU_HV_batt_consumption_charged,
          }
          let current = {
            id:el.mean_PDU_HV_consumptions.__typename,
            name: 'Battery Consumption - Regen',
            value1: el.mean_PDU_HV_consumptions.PDU_HV_batt_consumption_regen,
          }
          let total = {
            id:el.mean_PDU_HV_consumptions.__typename,
            name: 'Battery Consumption - Total',
            value1: el.mean_PDU_HV_consumptions.PDU_HV_batt_consumption_total,
          }
          sensorData.push(voltage)
          sensorData.push(current)
          sensorData.push(total)
        } else if (el.mean_SAFETY_PCU_vehicle_ST !== undefined) {
          let voltage = {
            id:el.mean_SAFETY_PCU_vehicle_ST.__typename,
            name: 'Vehicle - Pedal',
            value1: el.mean_SAFETY_PCU_vehicle_ST.PCU_accelerator_pedal,
          }
          let current = {
            id:el.mean_SAFETY_PCU_vehicle_ST.__typename,
            name: 'Vehicle - Milage',
            value1: el.mean_SAFETY_PCU_vehicle_ST.PCU_vehicle_mileage,
          }
          let total = {
            id:el.mean_SAFETY_PCU_vehicle_ST.__typename,
            name: 'Vehicle - Speed',
            value1: el.mean_SAFETY_PCU_vehicle_ST.PCU_vehicle_speed,
          }
          sensorData.push(voltage)
          sensorData.push(current)
          sensorData.push(total)
        }
      })
      return (
        <div className="table-responsive">
          <table className="table-nowrap mb-0 table">
            <thead>
            <th>Sensor Name</th>
            <th>Value1</th>
            <th>Value2</th>
            <th>Value3</th>
            </thead>
            <tbody>
            {
              sensorData.map(department => {
                return (
                  <tr
                    key={department.id}>
                    <td scope="row">{department.name}</td>
                    <td scope="row">{department.value1}</td>
                    <td scope="row">{department.value2}</td>
                    <td scope="row">{department.value3}</td>
                  </tr>
                )
              })
            }
            </tbody>
          </table>
        </div>
      )
    },
    expanded: [1,2],
  }

  const exportToExcel = (data) => {
    let sheetName = "TelemetryData.xlsx";
    let headerName = "RequestsList";

    // 获取sheet对象，设置当前sheet的样式
    // showGridLines: false 表示不显示表格边框
    let workbook = new ExcelJs.Workbook();
    let sheet = workbook.addWorksheet(sheetName, {
      views: [{ showGridLines: false }]
    });
    // let sheet2 = workbook.addWorksheet("Second sheet", { views: [{ showGridLines: false }] });

    // 获取每一列的header
    let columnArr = [];
    for (let i in data[0]) {
      let tempObj = { name: "" };
      tempObj.name = i;
      columnArr.push(tempObj);
    }

    // 设置表格的头部信息，可以用来设置标题，说明或者注意事项
    sheet.addTable({
      name: `Header`,
      ref: "A1", // 头部信息从A1单元格开始显示
      headerRow: true,
      totalsRow: false,
      style: {
        theme: "",
        showRowStripes: false,
        showFirstColumn: true,
        width: 200
      },
      columns: [{ name: "Export for vehicle ID 12332156445878" }],
      rows: [[`As of: 13/04/2022`], [`Rimac Automobili d.o.o`]]
    });

    // 设置表格的主要数据部分
    sheet.addTable({
      name: headerName,
      ref: "A5", // 主要数据从A5单元格开始
      headerRow: true,
      totalsRow: false,
      style: {
        theme: "TableStyleMedium2",
        showRowStripes: false,
        width: 200
      },
      columns: columnArr ? columnArr : [{ name: "" }],
      rows: data.map((e) => {
        let arr = [];
        for (let i in e) {
          arr.push(e[i]);
        }
        return arr;
      })
    });

    sheet.getCell("A1").font = { size: 20, bold: true }; // 设置单元格的文字样式

    // 设置每一列的宽度
    sheet.columns = sheet.columns.map((e) => {
      const expr = e.values[5];
      switch (expr) {
        case "Name":
          return { width: 50 };
        case "Gender":
          return { width: 40 };
        case "Height":
          return { width: 30 };
        default:
          return { width: 20 };
      }
    });

    const table = sheet.getTable(headerName);
    for (let i = 0; i < table.table.columns.length; i++) {
      // 表格主体数据是从A5开始绘制的，一共有三列。这里是获取A5到，B5，C5单元格，定义表格的头部样式
      sheet.getCell(`${String.fromCharCode(65 + i)}5`).font = { size: 12 };
      sheet.getCell(`${String.fromCharCode(65 + i)}5`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "c5d9f1" }
      };

      // 获取表格数据部分，定义其样式
      for (let j = 0; j < table.table.rows.length; j++) {
        let rowCell = sheet.getCell(`${String.fromCharCode(65 + i)}${j + 6}`);
        rowCell.alignment = { wrapText: true };
        rowCell.border = {
          bottom: {
            style: "thin",
            color: { argb: "a6a6a6" }
          }
        };
      }
    }
    table.commit();

    const writeFile = (fileName, content) => {
      const link = document.createElement("a");
      const blob = new Blob([content], {
        type: "application/vnd.ms-excel;charset=utf-8;"
      });
      link.download = fileName;
      link.href = URL.createObjectURL(blob);
      link.click();
    };

    // 表格的数据绘制完成，定义下载方法，将数据导出到Excel文件
    workbook.xlsx.writeBuffer().then((buffer) => {
      writeFile(sheetName, buffer);
    });
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Telemetry data</title>
        </MetaTags>
        <Container fluid>
          <Breadcrumbs title="Telemetry Data" breadcrumbItem="Shared Drive Details" />
          {
            !globalLoading &&  generalData?.length !== 0 &&
            <>
              <Row>
                <Col lg={12}>
                  <Card>
                    <CardBody>
                      <CardTitle className="h4">Actions</CardTitle>
                      <Row>
                        <Col lg={2}>
                          <button
                            type="button"
                            className="btn btn-outline-secondary  btn-label"
                            style={{
                              width: '60%',
                              marginLeft: '20%',
                            }}
                            onClick={() => history.push('/shared')}
                          >
                            <i className="bx bx-arrow-back"></i> Go Back
                          </button>
                        </Col>
                        <Col lg={10}>
                          <button
                            type="button"
                            className="btn btn-outline-secondary  btn-label"
                            style={{
                              width: '60%',
                              marginLeft: '20%',
                            }}
                            onClick={() => exportToExcel(generalData)}
                          >
                            <i className="bx bx-download"></i> Export to Excel
                          </button>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
                <Col className="col-12">
                  <Card>
                    <CardBody>
                      <CardTitle className="h4">Sensor informations</CardTitle><br/>

                      <DataTable
                        data={generalData}
                        columns={columns}
                        onClick={() => {
                          // setIsOrgChartEditing(false)
                          // setOrgChartInitialValue({})
                          // setOrgChartModal(!orgChartModal)
                          // removeBodyCss()
                        }}
                        expandRow={expandRow}
                        iconName="bx bx-user-plus"
                        buttonTitle={'Add'}/>

                    </CardBody>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col lg={6}>
                  <Card>
                    <CardBody>
                      <CardTitle className="mb-4"> Battery Performance</CardTitle>
                      <Spinearea data={generalData}/>
                    </CardBody>
                  </Card>
                </Col>

                <Col lg={6}>
                  <Card>
                    <CardBody>
                      <CardTitle className="mb-4">Motor Temperature</CardTitle>
                      <Apaexlinecolumn data={generalData}/>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              {/*<Row>*/}
              {/*  <Col lg="122">*/}
              {/*    <Card>*/}
              {/*      <CardBody>*/}
              {/*        <h4 className="card-title mb-4">Ride map</h4>*/}
              {/*        <div id="leaflet-map" className="leaflet-map">*/}
              {/*          <SimpleMap data={generalData}/>*/}
              {/*        </div>*/}
              {/*      </CardBody>*/}
              {/*    </Card>*/}
              {/*  </Col>*/}
              {/*</Row>*/}
            </>
          }

          {
            globalLoading &&
            <div>
              <Spinner className="ms-2" color="primary" />
            </div>

          }
        </Container>
      </div>
    </React.Fragment>
  )
}

export default ShareRideProfile;
