import React, { useState } from "react"
import { Button, Card, CardBody, CardTitle, Col, Form, FormFeedback, Input, Modal, Row } from "reactstrap"
import { removeBodyCss } from "../../helpers/removeBodyCss"
import { useFormik } from "formik"
import * as Yup from "yup"
import PropTypes from "prop-types"

const SimpleCompanyTable = props => {

  const [departmentTypeModal, setDepartmentTypeModal] = useState(false)
  const [departmentTypeInitialValue, setDepartmentTypeInitialValue] = useState({})
  const [isDepartmentEditing, setIsDepartmentEditing] = useState(false)
  const [departmentHover, setDepartmentHover] = useState(false)

  const departmentTypeValidation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: departmentTypeInitialValue,
    validationSchema: Yup.object({
      name: Yup.string().required("Department type name is required"),
    }),
    onSubmit: (values) => {
      switch (props.title) {
        case 'Department Types' :
          isDepartmentEditing ?
            alert("Editing department") :
            alert("Creating new department")
          break
        case 'Positions' :
          isDepartmentEditing ?
            alert("Editing Positions") :
            alert("Creating new Positions")
          break
      }
    }
  })

  return (
    <Card>
      <CardBody>
        <Row>
          <Col lg={10}>
            <CardTitle className="mb-4">
              {props.title}
            </CardTitle>
          </Col>
          <Col lg={2}>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => {
                setIsDepartmentEditing(false)
                setDepartmentTypeInitialValue({})
                setDepartmentTypeModal(!departmentTypeModal)
                removeBodyCss()
              }}>
              <i className="fas fa-plus-circle" /> Add new
            </button>
          </Col>
        </Row>
        <Row>
          <Col lg={8}>
            <div className="table-responsive">
              <table className="table-nowrap mb-0 table">
                <tbody>
                {
                  props.data.map(department => {
                    return (
                      <tr
                        key={department.id}
                        onMouseEnter={() => {
                          setDepartmentHover(true)
                        }}
                        onMouseLeave={() => {
                          setDepartmentHover(false)
                        }}>
                        <td scope="row">{department.id}</td>
                        <td scope="row">{department.name}</td>
                        {
                          departmentHover &&
                          <td>
                            <i className="bx bx-edit-alt"
                               style={{ fontSize: 25, color: "#556EE6" }}
                               onClick={() => {
                                 setIsDepartmentEditing(true)
                                 setDepartmentTypeInitialValue({
                                   name: department.name,
                                 })
                                 setDepartmentTypeModal(!departmentTypeModal)
                               }
                               } />

                            <i className="bx bx-trash-alt"
                               style={{ fontSize: 25, color: "#F46A6A", marginLeft: 10 }}
                               onClick={() => {
                                // setconfirm_both(true)
                               }
                               } />
                          </td>
                        }
                      </tr>
                    )
                  })
                }
                </tbody>
              </table>
            </div>
          </Col>
        </Row>
        <Modal
          isOpen={departmentTypeModal}
          size={"lg"}
          toggle={() => {
            setDepartmentTypeModal(!departmentTypeModal)
          }}
        >
          <Form onSubmit={(e) => {
            e.preventDefault()
            departmentTypeValidation.handleSubmit()
          }}>
            <div className="modal-header">
              <h5
                className="modal-title mt-0"
                id="address-modal"
              >
                {isDepartmentEditing ? `Edit ${props.title}` : `Add ${props.title}`}
              </h5>
              <button
                onClick={() => {
                  setDepartmentTypeModal(false)
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
                <div className="col-md-6">
                  <label
                    htmlFor="example-text-input">
                    Name
                  </label>
                  <Input
                    name="name"
                    className="form-control"
                    placeholder={`${props.title} name`}
                    type="text"
                    onChange={departmentTypeValidation.handleChange}
                    onBlur={departmentTypeValidation.handleBlur}
                    value={departmentTypeValidation.values.name || ""}
                    invalid={
                      !!(departmentTypeValidation.touched.name && departmentTypeValidation.errors.name)
                    }
                  />
                  {departmentTypeValidation.touched.name && departmentTypeValidation.errors.name ? (
                    <FormFeedback
                      type="invalid">{departmentTypeValidation.errors.name}</FormFeedback>
                  ) : null}
                </div>
              </Row>
            </div>
            <div className="modal-footer">
              <Button color="success" type={"submit"}>Save</Button>
              <Button color="secondary" onClick={() => {
                setDepartmentTypeModal(false)
              }}>Cancel</Button>
            </div>
          </Form>
        </Modal>
      </CardBody>
    </Card>
  )
}
SimpleCompanyTable.propTypes = {
  data: PropTypes.array,
  title: PropTypes.string
}
export default SimpleCompanyTable
