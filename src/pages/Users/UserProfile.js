import React, { useState } from "react"
import MetaTags from "react-meta-tags"
import PropTypes from "prop-types"
import { withRouter } from "react-router-dom"
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Form,
  FormFeedback,
  Input,
  Modal,
  Row,
  UncontrolledAlert
} from "reactstrap"
// Editable
import { removeBodyCss } from "../../helpers/removeBodyCss"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { useFormik } from "formik"
import * as Yup from "yup"
import ProfileHeader from "../../components/Common/Profile/ProfileHeader"
import ContactsTable from "../../components/Common/Profile/ContactsTable"
import AddressesTable from "../../components/Common/Profile/AddressesTable"
import { addresses, contacts } from "./fakeData"

const UserProfiles = props => {

  const [updateModal, setUpdateModal] = useState(false)
  // personal details initial values
  const [personalDetailsInitialValues, setPersonalDetailsInitialValues] = useState({})
  // email mouse over notification
  const [emailMouseOver, setEmailMouseOver] = useState(false)
  // checking if edit form is submittes
  const [submitted, setSubmitted] = useState(false)
  // FORM VALIDATIONS
  const editPersonalDetailsFormValidation = useFormik({
    enableReinitialize: true,
    initialValues: personalDetailsInitialValues,
    validationSchema: Yup.object({
      fname: Yup.string().required("Name is required"),
      lname: Yup.string().required("Last Name is required"),
      email: Yup.string().email("Please enter valid email").required("Email is required")
    }),

    onSubmit: (values) => {
      console.log("submit", values)
      setSubmitted(true)
      // EDIT  PERSONAL DATA
    }
  })
  const toggleEditModal = () => {
    setUpdateModal(!updateModal)
    removeBodyCss()
  }
// End of modal functions
  const {
    match: { params }
  } = props

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Inspector Web app</title>
        </MetaTags>
        <Container fluid>
          <div className="container-fluid">
            <Breadcrumbs title="Users" breadcrumbItem="Profile" />
            {/*Profile header - profile picture + password*/}
            <ProfileHeader userProfile={true}/>
            <Row>
              <Col lg={12}>
                {/*USER PERSONAL INFORMATIONS*/}
                <Card>
                  <CardBody>
                    <CardTitle className="mb-4">Personal information</CardTitle>
                    <Form>
                      <Row>
                        <Col md={12}>
                          <div className="table-responsive">
                            <table className="table-nowrap mb-0 table">
                              <tbody>
                              <tr>
                                <th scope="row">Full Name :</th>
                                <td>John Doe</td>
                              </tr>
                              <tr>
                                <th scope="row">E-mail :</th>
                                <td>
                                  cynthiaskote@gmail.com
                                  <span className="badge rounded-pill bg-success ms-1">Verified</span></td>
                              </tr>
                              </tbody>
                            </table>
                          </div>
                          <button
                            type="button"
                            className="btn btn-primary btn-sm mt-3"
                            onClick={() => {
                              toggleEditModal()
                            }}>
                            <i className="bx bx-edit-alt" /> Edit
                          </button>
                        </Col>
                      </Row>
                    </Form>

                    <Modal
                      isOpen={updateModal}
                      size={"lg"}
                      toggle={() => {
                        toggleEditModal()
                      }}
                    >
                      <Form onSubmit={(e) => {
                        e.preventDefault()
                        editPersonalDetailsFormValidation.handleSubmit()
                      }}>
                        <div className="modal-header">
                          <h5
                            className="modal-title mt-0"
                            id="mySmallModalLabel"
                          >
                            Edit personal informations
                          </h5>
                          <button
                            onClick={() => {
                              setUpdateModal(false)
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
                          {
                            submitted &&
                            <UncontrolledAlert color={"success"} role={"alert"}>
                              A verification email has been sent to the email address you just entered.
                              Please check your email and click the button to complete the procedure.
                            </UncontrolledAlert>
                          }
                          <Row className="mb-3">
                            <label
                              htmlFor="example-text-input"
                              className="col-md-2 col-form-label required"
                            >
                              Name
                            </label>
                            <div className="col-md-4">
                              <Input
                                name="fname"
                                className="form-control"
                                placeholder="First Name"
                                type="text"
                                onChange={editPersonalDetailsFormValidation.handleChange}
                                onBlur={editPersonalDetailsFormValidation.handleBlur}
                                value={editPersonalDetailsFormValidation.values.fname || ""}
                                invalid={
                                  !!(editPersonalDetailsFormValidation.touched.fname && editPersonalDetailsFormValidation.errors.fname)
                                }
                              />
                              {editPersonalDetailsFormValidation.touched.fname && editPersonalDetailsFormValidation.errors.fname ? (
                                <FormFeedback
                                  type="invalid">{editPersonalDetailsFormValidation.errors.fname}</FormFeedback>
                              ) : null}
                            </div>
                            <div className="col-md-2">
                              <Input
                                name="mname"
                                className="form-control"
                                placeholder="Middle Name"
                                type="text"
                                onChange={editPersonalDetailsFormValidation.handleChange}
                                onBlur={editPersonalDetailsFormValidation.handleBlur}
                                value={editPersonalDetailsFormValidation.values.mname || ""}
                                invalid={
                                  !!(editPersonalDetailsFormValidation.touched.mname && editPersonalDetailsFormValidation.errors.mname)
                                }
                              />
                            </div>
                            <div className="col-md-4">
                              <Input
                                name="lname"
                                className="form-control"
                                placeholder="Last Name"
                                type="text"
                                onChange={editPersonalDetailsFormValidation.handleChange}
                                onBlur={editPersonalDetailsFormValidation.handleBlur}
                                value={editPersonalDetailsFormValidation.values.lname || ""}
                                invalid={
                                  !!(editPersonalDetailsFormValidation.touched.lname && editPersonalDetailsFormValidation.errors.lname)
                                }
                              />
                              {editPersonalDetailsFormValidation.touched.lname && editPersonalDetailsFormValidation.errors.lname ? (
                                <FormFeedback
                                  type="invalid">{editPersonalDetailsFormValidation.errors.lname}</FormFeedback>
                              ) : null}
                            </div>
                          </Row>

                          <Row className="mb-3">
                            <label
                              htmlFor="example-text-input"
                              className="col-md-2 col-form-label"
                            >
                              Email
                            </label>
                            <div className="col-md-10">
                              <Input
                                name="email"
                                className="form-control"
                                placeholder="Enter email"
                                type="email"
                                onChange={editPersonalDetailsFormValidation.handleChange}
                                onBlur={editPersonalDetailsFormValidation.handleBlur}
                                value={editPersonalDetailsFormValidation.values.email || ""}
                                invalid={
                                  !!(editPersonalDetailsFormValidation.touched.email && editPersonalDetailsFormValidation.errors.email)
                                }
                                onMouseOut={() => {
                                  setEmailMouseOver(false)
                                }}
                                onMouseEnter={() => {
                                  setEmailMouseOver(true)
                                }}
                              />
                              {editPersonalDetailsFormValidation.touched.email && editPersonalDetailsFormValidation.errors.email ? (
                                <FormFeedback
                                  type="invalid">{editPersonalDetailsFormValidation.errors.email}</FormFeedback>
                              ) : null}
                              {
                                emailMouseOver &&
                                <Alert
                                  role="alert"
                                  type="warning"
                                  className="alert show alert-warning fade mt-3"
                                  ng-reflect-type="success"
                                  ng-reflect-dismissible="false">Please note that changing your email requires email
                                  verification.</Alert>
                              }
                            </div>
                          </Row>
                        </div>
                        <div className="modal-footer">
                          <Button color="success" type={"submit"}>Save Changes</Button>
                          <Button color="secondary" onClick={() => {
                            setUpdateModal(false)
                          }}>Cancel</Button>
                        </div>
                      </Form>
                    </Modal>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </React.Fragment>
  )
}
UserProfiles.propTypes = {
  match: PropTypes.object
}
export default withRouter(UserProfiles)
