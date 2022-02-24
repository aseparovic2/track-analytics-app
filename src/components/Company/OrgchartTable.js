import React, { useState } from "react"
import { Button, Card, CardBody, CardTitle, Col, Form, FormFeedback, Input, Modal, Row } from "reactstrap"
import { removeBodyCss } from "../../helpers/removeBodyCss"
import { useFormik } from "formik"
import * as Yup from "yup"
import DataTable from "../Common/DataTable/DataTable"
import { orgChartData } from "./fakeData"

const OrgChartTable = props => {

  const [orgChartModal, setOrgChartModal] = useState(false)
  const [orgChartInitialValue, setOrgChartInitialValue] = useState({})
  const [isOrgChartEditing, setIsOrgChartEditing] = useState(false)
  //const [orgChartHover, setOrgChartHover] = useState(false)

  const orgChartValidation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: orgChartInitialValue,
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      dept_type: Yup.string(),
      belongs_to: Yup.string()
    }),
    onSubmit: (values) => {
      alert("Submit org.chart")
    }
  })
  const columns = [{
    dataField: "id",
    text: "",
    sort: false
  }, {
    dataField: "name",
    text: "",
    sort: false,
  }]
  const expandRow = {
    // eslint-disable-next-line react/display-name
    renderer: row => (
      <div>
        <p>{ `This Expand row is belong to rowKey ${row.id}` }</p>
        <p>You can render anything here, also you can add additional data on every row object</p>
        <p>expandRow.renderer callback will pass the origin row object to you</p>
      </div>
    ),
    expanded: [1,2],
   // onExpand: this.handleOnExpand
  }
  return (
    <Card>
      <CardBody>
        <Row>
          <Col lg={10}>
            <CardTitle className="mb-4">
              Orgchart
            </CardTitle>
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
           <DataTable
             data={orgChartData}
             columns={columns}
             onClick={() => {
               setIsOrgChartEditing(false)
               setOrgChartInitialValue({})
               setOrgChartModal(!orgChartModal)
               removeBodyCss()
             }}
             expandRow={expandRow}
             iconName="bx bx-user-plus"
             buttonTitle={'Add'}/>
          </Col>
        </Row>
        <Modal
          isOpen={orgChartModal}
          size={"lg"}
          toggle={() => {
            setOrgChartModal(!orgChartModal)
          }}
        >
          <Form onSubmit={(e) => {
            e.preventDefault()
            orgChartValidation.handleSubmit()
          }}>
            <div className="modal-header">
              <h5
                className="modal-title mt-0"
                id="address-modal"
              >
                {isOrgChartEditing ? `Edit Orgchart` : `Add Orgchart`}
              </h5>
              <button
                onClick={() => {
                  setOrgChartModal(false)
                }}
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <Row className="mb-3">
                <div className="col-md-12">
                  <label
                    htmlFor="example-text-input col-md-3">
                    Org. unit name
                  </label>
                  <Input
                    name="name"
                    className="form-control"
                    placeholder="Org. unit name"
                    type="text"
                    onChange={orgChartValidation.handleChange}
                    onBlur={orgChartValidation.handleBlur}
                    value={orgChartValidation.values.name || ""}
                    invalid={
                      !!(orgChartValidation.touched.name && orgChartValidation.errors.name)
                    }
                  />
                  {orgChartValidation.touched.name && orgChartValidation.errors.name ? (
                    <FormFeedback
                      type="invalid">{orgChartValidation.errors.name}</FormFeedback>
                  ) : null}
                </div>
              </Row>
            </div>
            <div className="modal-footer">
              <Button color="success" type={"submit"}>Save</Button>
              <Button color="secondary" onClick={() => {
                setOrgChartModal(false)
              }}>Cancel</Button>
            </div>
          </Form>
        </Modal>
      </CardBody>
    </Card>
  )
}
export default OrgChartTable
