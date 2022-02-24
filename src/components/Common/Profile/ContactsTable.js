import React, { useState } from "react"
import { Button, Card, CardBody, CardTitle, Col, Form, FormFeedback, Input, Modal, Row } from "reactstrap"
import { removeBodyCss } from "../../../helpers/removeBodyCss"
import { contact_types, contacts } from "../../../pages/Users/fakeData"
import { useFormik } from "formik"
import * as Yup from "yup"
import PropTypes from "prop-types"
import ProfileHeader from "./ProfileHeader"

const ContactsTable = props => {

  //add/edit contact modal
  const [addContactModal, setAddContactModal] = useState(false)
  const [contactEditInitialValue, setContactEditInitialValue] = useState({})
  const [isContactEditing, setIsContactEditing] = useState(false)

  const [contactsHover, setContactsHover] = useState(false)

  const contactValidation = useFormik({
    enableReinitialize: true,
    initialValues: contactEditInitialValue,
    validationSchema: Yup.object({
      contact_type: Yup.string().required("Contact type is required"),
      value: Yup.string().required("Value is required")
    }),
    onSubmit: (values) => {
      // props profile is telling us is it profile of the company or user or etc.
      switch (props.profile) {
        case 'USER' :
          isContactEditing ?
          alert("Editing user contact") :
            alert("Creating new user contact")
          return
        case 'COMPANY' :
          isContactEditing ?
          alert("Editing company contacts") :
            alert("Creating company contacts")
      }
      console.log(values)
    }
  })

  // get contact name based on fk
  const getContactName = (id) => {
    return contact_types.find(contact => contact.id === id).name
  }

  return (
    <Card>
      <CardBody>
        <Row>
          <Col lg={7}>
            <CardTitle className="mb-4">
              Contacts
            </CardTitle>
          </Col>
          <Col lg={2}>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => {
                setIsContactEditing(false)
                setContactEditInitialValue({})
                setAddContactModal(!addContactModal)
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
                  props.data.map(contact => {
                    return (
                      <tr key={contact.id}
                          onMouseEnter={() => {
                            setContactsHover(true)
                          }}
                          onMouseLeave={() => {
                            setContactsHover(false)
                          }}>
                        <th scope="row">{getContactName(contact.fk_contact_type)}</th>
                        <td style={{ paddingLeft: "10%" }}>{contact.value}</td>
                        <td style={{ paddingLeft: "10%" }}>{
                          contact.active === 1 ?
                            <span className="badge rounded-pill bg-success ms-1">Visible</span> :
                            <span className="badge rounded-pill bg-danger ms-1">Not visible</span>
                        }</td>
                        {
                          contactsHover &&
                          <td style={{ paddingLeft: "8%" }}>
                            <i className="bx bx-edit-alt"
                               style={{ fontSize: 25, color: "#556EE6" }}
                               onClick={() => {
                                 setIsContactEditing(true)
                                 setContactEditInitialValue({
                                   contact_type: contact.fk_contact_type,
                                   label: contact.label,
                                   value: contact.value,
                                   active: contact.active
                                 })
                                 setAddContactModal(!addContactModal)
                                 removeBodyCss()
                               }
                               } />
                            <i className="bx bx-trash-alt"
                               style={{ fontSize: 25, color: "#F46A6A", marginLeft: 10 }} />
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
      </CardBody>
      {/*ADD NEW/EDIT CONTACT MODAL*/}
      <Modal
        isOpen={addContactModal}
        size={"lg"}
        toggle={() => {
          setAddContactModal(!addContactModal)
        }}
      >
        <Form onSubmit={(e) => {
          e.preventDefault()
          contactValidation.handleSubmit()
        }}>
          <div className="modal-header">
            <h5
              className="modal-title mt-0"
              id="mySmallModalLabel"
            >
              {isContactEditing ? "Edit contact" : "Add new contact"}
            </h5>
            <button
              onClick={() => {
                setAddContactModal(false)
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
              <label
                htmlFor="example-text-input"
                className="col-md-3 col-form-label required"
              >
                Contact Type
              </label>
              <div className="col-md-9">
                <Input
                  name="contact_type"
                  type="select"
                  onChange={contactValidation.handleChange}
                  onBlur={contactValidation.handleBlur}
                  value={contactValidation.values.contact_type || ""}
                  invalid={
                    !!(contactValidation.touched.contact_type && contactValidation.errors.contact_type)
                  }
                >
                  <option value="" hidden>Choose...</option>
                  {
                    contact_types.map(type => {
                      return (
                        <option value={type.id} key={type.id}>{type.name}</option>
                      )
                    })
                  }
                </Input>
                {contactValidation.touched.contact_type && contactValidation.errors.contact_type ? (
                  <FormFeedback type="invalid">{contactValidation.errors.contact_type}</FormFeedback>
                ) : null}
              </div>
            </Row>

            <Row className="mb-3">
              <label
                htmlFor="example-text-input"
                className="col-md-3 col-form-label"
              >
                Label
              </label>
              <div className="col-md-9">
                <Input
                  name="label"
                  type="text"
                  className="form-control"
                  onChange={contactValidation.handleChange}
                  onBlur={contactValidation.handleBlur}
                  value={contactValidation.values.label || ""}
                  invalid={
                    !!(contactValidation.touched.label && contactValidation.errors.label)
                  }
                />
                {contactValidation.touched.label && contactValidation.errors.label ? (
                  <FormFeedback type="invalid">{contactValidation.errors.label}</FormFeedback>
                ) : null}
              </div>
            </Row>

            <Row className="mb-3">
              <label
                htmlFor="example-text-input"
                className="col-md-3 col-form-label required"
              >
                Value
              </label>
              <div className="col-md-9">
                <Input
                  name="value"
                  type="text"
                  className="form-control"
                  onChange={contactValidation.handleChange}
                  onBlur={contactValidation.handleBlur}
                  value={contactValidation.values.value || ""}
                  invalid={
                    !!(contactValidation.touched.value && contactValidation.errors.value)
                  }
                />
                {contactValidation.touched.value && contactValidation.errors.value ? (
                  <FormFeedback type="invalid">{contactValidation.errors.value}</FormFeedback>
                ) : null}
              </div>
            </Row>

            <Row className="mb-3">
              <label
                htmlFor="example-text-input"
                className="col-md-3 col-form-label"
              >
                Visible
              </label>
              <div className="col-md-9">
                <div className="form-check form-switch form-switch-md col-md-9">
                  <Input
                    name="active"
                    type="checkbox"
                    className="form-control"
                    onChange={contactValidation.handleChange}
                    onBlur={contactValidation.handleBlur}
                    defaultChecked={contactValidation.values.active === 1}
                    value={contactValidation.values.active || false}
                    invalid={
                      !!(contactValidation.touched.active && contactValidation.errors.active)
                    }
                  />
                </div>
              </div>
            </Row>
          </div>
          <div className="modal-footer">
            <Button color="primary" type={"submit"}>Update</Button>
            <Button color="secondary" onClick={() => {
              setAddContactModal(false)
            }}>Cancel</Button>
          </div>
        </Form>
      </Modal>
      {/*END OF ADD NEW CONTACT MODAL*/}
    </Card>
  )
}
ContactsTable.propTypes = {
  profile: PropTypes.string,
  data: PropTypes.array
}
export default ContactsTable
