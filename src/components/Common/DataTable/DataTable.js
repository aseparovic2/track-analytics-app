import React from "react"
import paginationFactory, {
  PaginationListStandalone, PaginationProvider,
  SizePerPageDropdownStandalone
} from "react-bootstrap-table2-paginator"
import PropTypes from 'prop-types'
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"
import { Col, Row } from "reactstrap"
import BootstrapTable from "react-bootstrap-table-next"

const DataTable = (props) => {

  const pageOptions = {
    sizePerPage: 10,
    totalSize: props.data?.length, // replace later with size(customers),
    custom: true
  }

  const defaultSorted = [{
    dataField: "id",
    order: "asc"
  }]

  return (
    <PaginationProvider
      pagination={paginationFactory(pageOptions)}
      keyField="id"
      columns={props.columns}
      data={props.data}
    >
      {({ paginationProps, paginationTableProps }) => (
        <ToolkitProvider
          keyField="_id"
          columns={props.columns}
          data={props.data}
        >
          {toolkitProps => (
            <React.Fragment>
              <Row>
                <Col xl="12">
                  <div className="table-responsive">
                    <BootstrapTable
                      keyField={"id"}
                      responsive
                      bordered={false}
                      striped={false}
                      expandRow={props.expandRow}
                     // defaultSorted={defaultSorted}
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
  )

}

DataTable.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  onClick: PropTypes.func,
  iconName: PropTypes.string,
  buttonTitle: PropTypes.string,
  expandRow: PropTypes.func,
}

export default DataTable
