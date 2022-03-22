import React, { useEffect, useState } from "react"
import MetaTags from 'react-meta-tags';
import {
  Container,
  Col,
  Row,Card,CardBody,CardTitle,Input
} from "reactstrap"
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from "../../firebase/firebase-config"
import avatar from "assets/images/users/avatar-2.jpg"
import Breadcrumbs from "components/Common/Breadcrumb"
import RideContact from "../../components/ride-card"
import { isEmpty, size, map } from "lodash"
import SimpleMap from "../../components/simple-map"
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, {
  PaginationProvider, PaginationListStandalone,
  SizePerPageDropdownStandalone
} from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import Spinearea from "../../components/spline-area"
import Apaexlinecolumn from "../../components/apex"


const columns = [{
  dataField: 'id',
  text: 'Id',
  sort: true,
}, {
  dataField: 'name',
  text: 'Sensor Name',
  sort: true
}, {
  dataField: 'position',
  text: 'Time',
  sort: true
}, {
  dataField: 'office',
  text: 'Value',
  sort: true
}];

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


const users = [
  {
    id: 1,
    name: 'Ride Grobnik 132252',

  },
  {
    id: 2,
    name: 'Ride Grobnik 258552',

  }
]

//const db = getFirestore(app);

const RideDetails = () => {
  const [data,setData] = useState([])
  const fetchData =  () => {
    app.collection('telemetry_test').get().then((querySnapshot) => {
      querySnapshot.forEach(el => {
        var data = el.data()
        setData(arr => [...arr, data])
      })
    })
  }
  useEffect(() => {
    //  fetchData()
  },[])
  useEffect(() => {
    console.log(data)
  },[data])

  const defaultSorted = [{
    dataField: 'id',
    order: 'asc'
  }];

  const pageOptions = {
    sizePerPage: 10,
    totalSize: productData.length, // replace later with size(customers),
    custom: true,
  }

  // Custom Pagination Toggle
  const sizePerPageList = [
    { text: '5', value: 5 },
    { text: '10', value: 10 },
    { text: '15', value: 15 },
    { text: '20', value: 20 },
    { text: '25', value: 25 },
    { text: 'All', value: (productData).length }];


  // Select All Button operation
  const selectRow = {
    mode: 'checkbox'
  }

  const { SearchBar } = Search;

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Inspector Web app</title>
        </MetaTags>
        <Container fluid>
          <Breadcrumbs title="Ride Details" breadcrumbItem="Ride 25869" />
          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <CardTitle className="h4">Sensor informations</CardTitle><br/>

                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField='id'
                    columns={columns}
                    data={productData}
                  >
                    {({ paginationProps, paginationTableProps }) => (
                      <ToolkitProvider
                        keyField='id'
                        columns={columns}
                        data={productData}
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

        </Container>
      </div>
    </React.Fragment>
  )
}

export default RideDetails;
