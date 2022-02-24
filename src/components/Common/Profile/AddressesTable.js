import React, { useState } from "react"
import { Button, Card, CardBody, CardTitle, Col, Form, FormFeedback, Input, Modal, Row } from "reactstrap"
import { removeBodyCss } from "../../../helpers/removeBodyCss"
import { addresses, countries } from "../../../pages/Users/fakeData"
import SweetAlert from "react-bootstrap-sweetalert"
import { useFormik } from "formik"
import * as Yup from "yup"
import PropTypes from "prop-types"

const AddressesTable = props => {

  const [addAddressModal, setAddAddressModal] = useState(false)
  const [addressEditInitialValue, setAddressEditInitialValue] = useState({})
  const [isAddressEditing, setIsAddressEditing] = useState(false)
  const [addressesHover, setAddressesHover] = useState(false)
  // delete alerts
  const [confirm_both, setconfirm_both] = useState(false)
  const [success_dlg, setsuccess_dlg] = useState(false)
  const [dynamic_title, setdynamic_title] = useState("")
  const [dynamic_description, setdynamic_description] = useState("")


  const addressValidation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: addressEditInitialValue,
    validationSchema: Yup.object({
      fline: Yup.string().required("First Line is required"),
      city: Yup.string().required("City is required"),
      country: Yup.string().required("Country is required"),
      zip: Yup.number().required("ZIP is required")
    }),

    onSubmit: (values) => {
      // props profile is telling us is it profile of the company or user or etc.
      //check if it is updating or adding new
      switch (props.profile) {
        case 'USER' :
          isAddressEditing ?
            alert("Editing user ADDRESS") :
            alert("Creating new user ADDRESS")
          return
        case 'COMPANY' :
          isAddressEditing ?
            alert("Editing company ADDRESS") :
            alert("Creating company ADDRESS")
      }
    }
  })

  // Get country name based on fa
  const getCountryName = (id) => {
    return countries.find(contact => contact.id === id).name
  }


  return (
    <Card>
      <CardBody>
        <Row>
          <Col lg={7}>
            <CardTitle className="mb-4">
              Addresses
            </CardTitle>
          </Col>
          <Col lg={2}>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => {
                setIsAddressEditing(false)
                setAddressEditInitialValue({})
                setAddAddressModal(!addAddressModal)
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
                  props.data.map(address => {
                    return (
                      <tr
                        key={address.id}
                        onMouseEnter={() => {
                          setAddressesHover(true)
                        }}
                        onMouseLeave={() => {
                          setAddressesHover(false)
                        }}>
                        <th scope="row">{address.label}</th>
                        <td>{`${address.fline !== null ? address.fline : ""} 
                                    ${address.sline !== null ? address.sline : ""} ${address.tline !== null ? address.tline : ""}
                                    ${address.post_num !== null ? address.post_num : ""} ${address.city !== null ? address.city : ""}
                                    , ${getCountryName(address.fk_country)}`}</td>
                        {
                          addressesHover &&
                          <td>
                            <i className="bx bx-edit-alt"
                               style={{ fontSize: 25, color: "#556EE6" }}
                               onClick={() => {
                                 setIsAddressEditing(true)
                                 setAddressEditInitialValue({
                                   label: address.label,
                                   fline: address.fline,
                                   sline: address.sline,
                                   tline: address.tline,
                                   city: address.city,
                                   country: getCountryName(address.fk_country),
                                   zip: address.post_num
                                 })
                                 setAddAddressModal(!addAddressModal)
                               }
                               } />

                            <i className="bx bx-trash-alt"
                               style={{ fontSize: 25, color: "#F46A6A", marginLeft: 10 }}
                               onClick={() => {
                                 setconfirm_both(true)
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
            {/*delete alert*/}
            {success_dlg ? (
              <SweetAlert
                success
                title={dynamic_title}
                onConfirm={() => {
                  setsuccess_dlg(false)
                }}
              >
                {dynamic_description}
              </SweetAlert>
            ) : null}
            {confirm_both ? (
              <SweetAlert
                title="Are you sure?"
                warning
                showCancel
                confirmBtnBsStyle="success"
                cancelBtnBsStyle="danger"
                onConfirm={() => {
                  setconfirm_both(false)
                  setsuccess_dlg(true)
                  setdynamic_title("Deleted")
                  setdynamic_description("Your file has been deleted.")
                }}
                onCancel={() => {
                  setconfirm_both(false)
                  setsuccess_dlg(true)
                  setdynamic_title("Cancelled")
                  setdynamic_description("Your imaginary file is safe :)")
                }}
              >
                You won&apos;t be able to revert this!
              </SweetAlert>
            ) : null}
            {/*end of delete alert*/}
          </Col>
        </Row>
        <Modal
          isOpen={addAddressModal}
          size={"lg"}
          toggle={() => {
            setAddAddressModal(!addAddressModal)
          }}
        >
          <Form onSubmit={(e) => {
            e.preventDefault()
            addressValidation.handleSubmit()
          }}>
            <div className="modal-header">
              <h5
                className="modal-title mt-0"
                id="address-modal"
              >
                {isAddressEditing ? 'Edit address' : 'Add address'}
              </h5>
              <button
                onClick={() => {
                  setAddAddressModal(false)
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
                    Label
                  </label>
                  <Input
                    name="label"
                    className="form-control"
                    placeholder="Label"
                    type="text"
                    onChange={addressValidation.handleChange}
                    onBlur={addressValidation.handleBlur}
                    value={addressValidation.values.label || ""}
                    invalid={
                      !!(addressValidation.touched.label && addressValidation.errors.label)
                    }
                  />
                  {addressValidation.touched.label && addressValidation.errors.label ? (
                    <FormFeedback
                      type="invalid">{addressValidation.errors.label}</FormFeedback>
                  ) : null}
                </div>
              </Row>

              <Row className="mb-3">
                <div className="col-md-12">
                  <label
                    htmlFor="example-text-input"
                    className="required"
                  >
                    First line
                  </label>
                  <Input
                    name="fline"
                    className="form-control"
                    placeholder="First Line"
                    type="text"
                    onChange={addressValidation.handleChange}
                    onBlur={addressValidation.handleBlur}
                    value={addressValidation.values.fline || ""}
                    invalid={
                      !!(addressValidation.touched.fline && addressValidation.errors.fline)
                    }
                  />
                  {addressValidation.touched.fline && addressValidation.errors.fline ? (
                    <FormFeedback
                      type="invalid">{addressValidation.errors.fline}</FormFeedback>
                  ) : null}
                </div>
              </Row>

              <Row className="mb-3">
                <div className="col-md-6">
                  <label
                    htmlFor="example-text-input"
                  >
                    Second line
                  </label>
                  <Input
                    name="sline"
                    className="form-control"
                    placeholder="Second Line"
                    type="text"
                    onChange={addressValidation.handleChange}
                    onBlur={addressValidation.handleBlur}
                    value={addressValidation.values.sline || ""}
                    invalid={
                      !!(addressValidation.touched.sline && addressValidation.errors.sline)
                    }
                  />
                  {addressValidation.touched.sline && addressValidation.errors.sline ? (
                    <FormFeedback
                      type="invalid">{addressValidation.errors.sline}</FormFeedback>
                  ) : null}
                </div>

                <div className="col-md-6">
                  <label
                    htmlFor="example-text-input"
                  >
                    Third line
                  </label>
                  <Input
                    name="tline"
                    className="form-control"
                    placeholder="Third Line"
                    type="text"
                    onChange={addressValidation.handleChange}
                    onBlur={addressValidation.handleBlur}
                    value={addressValidation.values.tline || ""}
                    invalid={
                      !!(addressValidation.touched.tline && addressValidation.errors.tline)
                    }
                  />
                  {addressValidation.touched.tline && addressValidation.errors.tline ? (
                    <FormFeedback
                      type="invalid">{addressValidation.errors.tline}</FormFeedback>
                  ) : null}
                </div>
              </Row>

              <Row className="mb-3">
                <div className="col-md-4">
                  <label
                    htmlFor="example-text-input"
                    className="required"
                  >
                    City
                  </label>
                  <Input
                    name="city"
                    className="form-control"
                    placeholder="Enter city"
                    type="text"
                    onChange={addressValidation.handleChange}
                    onBlur={addressValidation.handleBlur}
                    value={addressValidation.values.city || ""}
                    invalid={
                      !!(addressValidation.touched.city && addressValidation.errors.city)
                    }
                  />
                  {addressValidation.touched.city && addressValidation.errors.city ? (
                    <FormFeedback
                      type="invalid">{addressValidation.errors.city}</FormFeedback>
                  ) : null}
                </div>

                <div className="col-md-4">
                  <label
                    htmlFor="example-text-input"
                    className="required"
                  >
                    Country
                  </label>
                  <Input
                    name="country"
                    type="select"
                    onChange={addressValidation.handleChange}
                    onBlur={addressValidation.handleBlur}
                    value={addressValidation.values.country || ""}
                    invalid={
                      !!(addressValidation.touched.country && addressValidation.errors.country)
                    }
                  >
                    <option value="" hidden>Choose...</option>
                    {
                      countries.map(country => {
                        return (
                          <option value={country.name} key={country.id}>{country.name}</option>
                        )
                      })
                    }
                  </Input>
                  {addressValidation.touched.country && addressValidation.errors.country ? (
                    <FormFeedback type="invalid">{addressValidation.errors.country}</FormFeedback>
                  ) : null}
                </div>

                <div className="col-md-4">
                  <label
                    htmlFor="example-text-input"
                    className="required"
                  >
                    Zip
                  </label>
                  <Input
                    name="zip"
                    className="form-control"
                    placeholder="Enter zip"
                    type="number"
                    onChange={addressValidation.handleChange}
                    onBlur={addressValidation.handleBlur}
                    value={addressValidation.values.zip || ""}
                    invalid={
                      !!(addressValidation.touched.zip && addressValidation.errors.zip)
                    }
                  />
                  {addressValidation.touched.zip && addressValidation.errors.zip ? (
                    <FormFeedback
                      type="invalid">{addressValidation.errors.zip}</FormFeedback>
                  ) : null}
                </div>
              </Row>
            </div>
            <div className="modal-footer">
              <Button color="success" type={"submit"}>Save Changes</Button>
              <Button color="secondary" onClick={() => {
                setAddAddressModal(false)
              }}>Cancel</Button>
            </div>
          </Form>
        </Modal>
      </CardBody>
    </Card>
  )
}
AddressesTable.propTypes = {
  profile: PropTypes.string,
  data: PropTypes.array
}
export default AddressesTable
