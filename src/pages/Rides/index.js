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
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
  SizePerPageDropdownStandalone
} from "react-bootstrap-table2-paginator"
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"
import BootstrapTable from "react-bootstrap-table-next"
import Spinearea from "../../components/spline-area"
import Apaexlinecolumn from "../../components/apex"
import SimpleMap from "../../components/simple-map"
import maintanence from "../../assets/images/interior.jpg"
import { useQuery } from "@apollo/client";
import {TELEMETRY_BY_RANGE} from "../../graphql/queries/telemetry"


const users = [
  {
    id: 1,
    name: 'Ride Grobnik 132252',

  },
  {
    id: 2,
    name: 'Dubrovnik tk8',

  },
  {
    id: 2,
    name: 'Zagreb Airport 558g',

  },
  {
    id: 2,
    name: 'Zadar 4959',

  },{
    id: 2,
    name: 'Grobnik 667767',

  },
  {
    id: 2,
    name: 'Gorica jgjt858',

  }
]


// Table Data
const productData = [
  { "id": 1, "name": "mean_CCU_R_temp_1:CCU_R_batt_coolant_in_temp", "position": "2020/02/02 - 19:45:24", "office": "5"},

  { "id": 2, "name": "mean_CCU_R_temp_1:CCU_R_batt_coolant_out_temp", "position": "2020/02/02 - 19:45:24", "office": "20"},

  { "id": 3, "name": "mean_PDU_BMS_cell_min_max_vals:PDU_cell_temp_max", "position": "2020/02/02 - 19:45:25", "office": "30"},

  { "id": 4, "name": "mean_CCU_R_temp_1:CCU_R_batt_coolant_in_temp", "position": "2020/02/02 - 19:45:26", "office": "22"},

  { "id": 5, "name": "mean_PDU_HV_LV_status:PDU_HV_battery_SOC", "position": "2020/02/02 - 19:45:27", "office": "44"},

  { "id": 6, "name": "mean_CCU_R_temp_1:CCU_R_batt_coolant_in_temp", "position": "2020/02/02 - 19:45:25", "office": "40"},

  { "id": 7, "name": "mean_PDU_HV_battery_performance:PDU_HV_battery_voltage", "position": "2020/02/02 - 19:45:30", "office": "5"},

  { "id": 8, "name": "mean_CCU_R_temp_1:CCU_R_batt_coolant_in_temp", "position": "2020/02/02 - 19:45:24", "office": "15"},

  { "id": 9, "name": "mean_SAFETY_PCU_vehicle_ST:PCU_accelerator_pedal\n", "position": "2020/02/02 - 19:45:34", "office": "17"},

  { "id": 10, "name": "mean_CCU_R_temp_1:CCU_R_batt_coolant_in_temp", "position": "2020/02/02 - 19:45:24", "office": "28"},

  { "id": 11, "name": "mean_CCU_R_temp_1:CCU_R_batt_coolant_in_temp", "position": "2020/02/02 - 19:45:20", "office": "2"},

];

const optionGroup = [
  {
    label: "CARS",
    options: [
      { label: "Concept One", value: 1 },
      { label: "Concept Two", value: 2 },
      { label: "Nevera", value: 3 }
    ]
  }
];




//const db = getFirestore(app);

const Rides = () => {
  const [isDataFetched, setIsDataFetched] = useState(false)
  const [selectedMulti, setselectedMulti] = useState(null);
  const [testData, setTestData] = useState([])
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  // variables: {
  //   start_date: "2021-01-14T18:18:04.200+01:00",
  //     end_date: "2021-01-14T18:18:06.100+01:00"
  // }
  const getDataByRage = async (start, end) => {

    console.log(data)
  }
  const { loading, error, data } =  useQuery(TELEMETRY_BY_RANGE, {
    enabled: false,
    variables: {
      start_date: '2021-01-14T18:18:04.200+01:00',
      end_date: '2021-01-14T18:18:06.100+01:00'
    },
  });

  useEffect(() => {
    console.log(data)
    setTestData(data?.telemetry_data)
  }, data)



  const { SearchBar } = Search;

  const defaultSorted = [{
    dataField: 'id',
    order: 'asc'
  }];

  const pageOptions = {
    sizePerPage: 10,
    totalSize: testData?.length, // replace later with size(customers),
    custom: true,
  }

  // Custom Pagination Toggle
  const sizePerPageList = [
    { text: '5', value: 5 },
    { text: '10', value: 10 },
    { text: '15', value: 15 },
    { text: '20', value: 20 },
    { text: '25', value: 25 },
    { text: 'All', value: (testData)?.length }];

  const productInfo = (cell, row, rowIndex, formatExtraData) => {
    console.log(cell);
    for (var key in cell) {
      if (cell.hasOwnProperty(key)) {
        console.log(key + " -> " + cell[key]);
        //return key
      }
    }

  };


  // Select All Button operation
  const selectRow = {
    mode: 'checkbox'
  }

  const onDataFilter = () => {
    setIsDataFetched(true)

  }
  const handleMulti = (selectedMulti) => {
    setselectedMulti(selectedMulti);
  }
  const onPickerChange = (selectedDates,dateStr,instance) => {
    console.log(selectedDates,dateStr,instance)
    //selectedDates.length === 2
  }

  const columns = [{
    dataField: 'id',
    text: 'Id',
    sort: true,
  }, {
    dataField: 'time',
    text: 'Time',
    sort: true
  }, {
    dataField: 'vehicleStats',
    text: 'Statistic',
    formatter: productInfo
  }, {
    dataField: 'office',
    text: 'Value',
    sort: true
  }];

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
                  onChange={() => {
                    handleMulti();
                  }}
                  options={optionGroup}
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
            isDataFetched &&
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

                        <PaginationProvider
                          pagination={paginationFactory(pageOptions)}
                          keyField='id'
                          columns={columns}
                          data={testData}
                        >
                          {({ paginationProps, paginationTableProps }) => (
                            <ToolkitProvider
                              keyField='id'
                              columns={columns}
                              data={testData}
                              search
                            >
                              {toolkitProps => (
                                <React.Fragment>

                                  <Row className="mb-2">
                                    <Col md="4">
                                      <div className="search-box me-2 mb-2 d-inline-block">
                                        <div className="position-relative">
                                          <SearchBar
                                            {...toolkitProps.searchProps}
                                          />
                                          <i className="bx bx-search-alt search-icon" />
                                        </div>
                                      </div>
                                    </Col>
                                  </Row>

                                  <Row>
                                    <Col xl="12">
                                      <div className="table-responsive">
                                        <BootstrapTable
                                          keyField={"id"}
                                          responsive
                                          bordered={false}
                                          striped={false}
                                          defaultSorted={defaultSorted}
                                          selectRow={selectRow}
                                          classes={
                                            "table align-middle table-nowrap"
                                          }
                                          headerWrapperClasses={"thead-light"}
                                          {...toolkitProps.baseProps}
                                          {...paginationTableProps}
                                        />

                                      </div>
                                    </Col>
                                  </Row>

                                  <Row className="align-items-md-center mt-30">
                                    <Col className="inner-custom-pagination d-flex">
                                      <div className="d-inline">
                                        <SizePerPageDropdownStandalone
                                          {...paginationProps}
                                        />
                                      </div>
                                      <div className="text-md-right ms-auto">
                                        <PaginationListStandalone
                                          {...paginationProps}
                                        />
                                      </div>
                                    </Col>
                                  </Row>
                                </React.Fragment>
                              )
                              }
                            </ToolkitProvider>
                          )
                          }</PaginationProvider>

                      </CardBody>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col lg={6}>
                    <Card>
                      <CardBody>
                        <CardTitle className="mb-4"> Fuel efficiency</CardTitle>
                        <Spinearea/>
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
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Rides;
