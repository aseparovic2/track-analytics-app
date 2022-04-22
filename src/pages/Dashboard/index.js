import React, { useEffect, useState } from "react"
import MetaTags from 'react-meta-tags';
import {
  Container,
  Col,
  Row, Card, CardBody, CardTitle
} from "reactstrap"
import avatar from "assets/images/avatar-2.jpg"

import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory, {
  PaginationProvider, PaginationListStandalone,
  SizePerPageDropdownStandalone
} from 'react-bootstrap-table2-paginator';

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

const defaultSorted = [{
  dataField: 'id',
  order: 'asc'
}];

const pageOptions = {
  sizePerPage: 10,
  totalSize: productData.length, // replace later with size(customers),
  custom: true,
}
const selectRow = {
  mode: 'checkbox'
}
// Custom Pagination Toggle
const sizePerPageList = [
  { text: '5', value: 5 },
  { text: '10', value: 10 },
  { text: '15', value: 15 },
  { text: '20', value: 20 },
  { text: '25', value: 25 },
  { text: 'All', value: (productData).length }];



const { SearchBar } = Search;

const Dashboard = () => {
  const [data,setData] = useState([])
  const [user,setUser] = useState([])

  useEffect(() => {
    const obj = JSON.parse(localStorage.getItem("authUser"))
    setUser(obj)
  },[])
  return (
      <React.Fragment>
        <div className="page-content">
          <MetaTags>
            <title>Rimac Telemetry</title>
          </MetaTags>
          <Container fluid>
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    <Row>
                      <Col lg="4">
                        <div className="d-flex">
                          <div className="me-3">
                            <img
                              src={avatar}
                              alt=""
                              className="avatar-md rounded-circle img-thumbnail"
                            />
                          </div>
                          <div className="flex-grow-1 align-self-center">
                            <div className="text-muted">
                              <p className="mb-2">Welcome to Rimac Telemetry</p>
                              <h5 className="mb-1">{user.email}</h5>
                              <p className="mb-0">Role: {user.role}</p>
                            </div>
                          </div>
                        </div>
                      </Col>

                      <Col lg="4" className="align-self-center">
                        <div className="text-lg-center mt-4 mt-lg-0">
                          <Row>
                            <Col xs="6">
                              <div>
                                <p className="text-muted text-truncate mb-2">
                                  Total Cars
                                </p>
                                <h5 className="mb-0">19</h5>
                              </div>
                            </Col>
                            <Col xs="6">
                              <div>
                                <p className="text-muted text-truncate mb-2">
                                  Total Rides
                                </p>
                                <h5 className="mb-0">40</h5>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>

            <Row>
              <Col className="col-12">
                <Card>
                  <CardBody>
                    <CardTitle className="h4">Sensor informations - Exceeding Tolerances</CardTitle><br/>

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


          </Container>
        </div>
      </React.Fragment>
    )
}

export default Dashboard;
