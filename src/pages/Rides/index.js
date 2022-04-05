import React, { useEffect, useState } from "react"
import MetaTags from 'react-meta-tags';
import { Link } from "react-router-dom"
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
  Row
} from "reactstrap"
import Select from "react-select";
import Breadcrumbs from "components/Common/Breadcrumb"
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
import ReactTable from "react-table";
import Spinearea from "../../components/spline-area"
import Apaexlinecolumn from "../../components/apex"
import SimpleMap from "../../components/simple-map"
import maintanence from "../../assets/images/interior.jpg"
import { useLazyQuery, useQuery } from "@apollo/client";
import {TELEMETRY_BY_RANGE} from "../../graphql/queries/telemetry"
import { ALL_CARS } from "../../graphql/queries/cars"
import TestTable from "../../components/TestTable"
import DataTable from "../../components/Common/DataTable/DataTable"
import { orgChartData } from "../../components/Company/fakeData"
import { removeBodyCss } from "../../helpers/removeBodyCss"




const Rides = () => {
  const [isDataFetched, setIsDataFetched] = useState(false)
  const [selectedMulti, setselectedMulti] = useState(null);
  const [testData, setTestData] = useState([])
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [expand, setExpanded] = useState({})

  const [dates, setDates] = useState({
    start_date: "",
    end_date: ""
  })
  const {  data: carData } = useQuery(ALL_CARS);


  const [getDataByRange, { called, loading, data = [] }] = useLazyQuery(
    TELEMETRY_BY_RANGE,
  );

  const fakeData = [
  {
    time : '20/01/2022'
  },
    {
      time : '20/02/2022'
    }
  ]






 // const { SearchBar } = Search;

  const defaultSorted = [{
    dataField: 'id',
    order: 'asc'
  }];

  const pageOptions = {
    sizePerPage: 10,
    totalSize: data?.telemetry_data?.length, // replace later with size(customers),
    custom: true,
  }

  // Custom Pagination Toggle
  const sizePerPageList = [
    { text: '5', value: 5 },
    { text: '10', value: 10 },
    { text: '15', value: 15 },
    { text: '20', value: 20 },
    { text: '25', value: 25 },
    { text: 'All', value: (data)?.telemetry_data?.length }];





  const onDataFilter = () => {

    getDataByRange().then(res => {
      console.log(res.data)
    })
    //setTestData(data)
    setIsDataFetched(true)

  }
  const handleMulti = (selectedMulti) => {
    console.log(selectedMulti)
    setselectedMulti(selectedMulti);
  }
  const onPickerChange = (selectedDates,dateStr,instance) => {
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

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Telemetry data</title>
        </MetaTags>
        <Container fluid>
          <Breadcrumbs title="" breadcrumbItem="Telemetry data" />
          <Row>
            <Col lg={5}>
              <FormGroup className="mb-4">
                <label className="control-label">
                  Select one or multiple cars
                </label>
                <Select
                  value={selectedMulti}
                  isMulti={true}
                  getOptionValue={(option) => option.id}
                  getOptionLabel={(option) => option.model +" "+ option.licence}
                  onChange={(option) => {
                    handleMulti(option);
                  }}
                  options={carData?.cars}
                  classNamePrefix="select2-selection"
                />
              </FormGroup>
            </Col>
            <Col lg={5}>
              <FormGroup className="mb-4">
                <Label>Select Range</Label>
                <InputGroup>
                  <Flatpickr
                    className="form-control d-block"
                    placeholder="Date - Time Range"
                    options={{
                      mode: "range",
                      enableTime: true,
                      dateFormat: "Y-m-D H:i"
                    }}
                    onChange={onPickerChange}
                  />
                </InputGroup>
              </FormGroup>
            </Col>
            <Col lg={2}>
              <FormGroup className="mb-4">
                <InputGroup>
                 <Button
                 className="btn btn-primary"
                 style={{
                   marginTop: '14%',
                   backgroundColor: '#2a3042',
                   color: "white"
                 }}
                 onClick={onDataFilter}
                 >Filter</Button>
                </InputGroup>
              </FormGroup>
            </Col>
          </Row>
          {
            isDataFetched && called &&  data.length !== 0 &&
              <>
                <Row>
                  <Col lg={12}>
                    <Card>
                      <CardBody>
                        <CardTitle className="h4">Actions</CardTitle>
                        <Row>
                          <Col lg={6}>
                            <button
                              type="button"
                              className="btn btn-outline-primary  btn-label"
                              style={{
                                width: '60%',
                                marginLeft: '20%',
                              }}
                            >
                              <i className="bx bx-share-alt"></i> Save and Share
                            </button>
                          </Col>

                          <Col lg={6}>
                            <button
                              type="button"
                              className="btn btn-outline-secondary  btn-label"
                              style={{
                                width: '60%',
                                marginLeft: '20%',
                              }}
                            >
                              <i className="bx bx-download"></i> Export to PDF
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
                          data={data?.telemetry_data !== undefined ? data.telemetry_data : []}
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
                        <Spinearea data={data}/>
                      </CardBody>
                    </Card>
                  </Col>

                  <Col lg={6}>
                    <Card>
                      <CardBody>
                        <CardTitle className="mb-4"> Ride data</CardTitle>
                        <Apaexlinecolumn/>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col lg="122">
                    <Card>
                      <CardBody>
                        <h4 className="card-title mb-4">Ride map</h4>
                        <div id="leaflet-map" className="leaflet-map">
                          <SimpleMap/>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </>
          }

          {
            !isDataFetched &&
            <div className="my-5 pt-sm-5">
              <Container>
                <Row>
                  <Col lg="12">
                    <div className="text-center">
                      <Row className="justify-content-center mt-5">
                        <Col sm="4">
                          <div className="maintenance-img">
                            <img
                              src={maintanence}
                              alt=""
                              className="img-fluid"
                            />
                          </div>
                        </Col>
                      </Row>
                      <h4 className="mt-5">Please select car or range</h4>
                      <p className="text-muted">
                        Data will be filtered based on your input
                      </p>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          }
          {
            called && loading &&
            <div className="my-5 pt-sm-5">
              <Container>
                <Row>
                  <Col lg="12">
                    <div className="text-center">
                      <h4 className="mt-5">Loading ...</h4>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>

          }
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Rides;
