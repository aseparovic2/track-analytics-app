import React, { useState } from "react"
import {
  Alert,
  Button,
  Card,
  CardBody,
  Col,
  Form,
  FormFeedback,
  Input,
  Modal,
  Row,
  UncontrolledAlert
} from "reactstrap"
import avatar from "../../../assets/images/avatar-2.jpg"
import companyImage from "../../../assets/images/rimac-avatar.jpg"
import Dropzone from "react-dropzone"
import { Link } from "react-router-dom"
import { useFormik } from "formik"
import * as Yup from "yup"
import { removeBodyCss } from "../../../helpers/removeBodyCss"
import PropTypes from "prop-types"

const ProfileHeader = props => {

  const [updateImageModal, setUpdateImageModal] = useState(false)
  const [selectedFiles, setselectedFiles] = useState([])
  // reset password
  const [resetModal, setResetModal] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const resetPasswordValidation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      password: "",
      passwordConfirmation: ""
    },
    validationSchema: Yup.object().shape({
      password: Yup.string().required("Please Enter Your Password")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
      passwordConfirmation: Yup.string().required("Confirm password is required").oneOf([Yup.ref("password"), null], "Passwords must match")
    }),
    onSubmit: (values) => {
      console.log("reset password", values)
    }
  })

  const toggleResetPasswordModal = () => {
    setResetModal(!resetModal)
    removeBodyCss()
  }

  const toggleEditImageModal = () => {
    setUpdateImageModal(!updateImageModal)
    removeBodyCss()
  }
 //DROPZONE
  const handleAcceptedFiles = (files) => {
    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size)
      })
    )
    setselectedFiles(files)
  }

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  }

  //TODO: based on id and userProfile bool value get details about company/user

  const getProfilePicture = () => {
    let url;
    if(props.userProfile) {
       selectedFiles.length === 0 ?
         url = avatar :
         url = selectedFiles[0].preview
    } else {
       selectedFiles.length === 0 ?
         url = companyImage :
         url = selectedFiles[0].preview
    }
    return url
  }

  return (
    <Row>
      <Col lg={12}>
        <Card>
          <CardBody>
            <Row>
              <Col lg={8}>
                <Row>
                  <Col lg={3}>
                    <div
                      className={"image-container"}>
                      <img className={`rounded-circle`}
                           src={getProfilePicture()}
                           alt={"User profile image"} width={150} height={150} /> <br />
                    </div>
                  </Col>
                  <Col lg={5}>
                    <div className={"profile-header"}>
                      <h2 className="mb-4 font-weight-semibold">{props.userProfile? 'John Doe' : 'MAERSK'}</h2>
                      {
                        props.userProfile &&
                        <p> cynthiaskote@gmail.com</p>
                      }
                    </div>
                    <Row>
                      <Col lg={6}>
                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          style={{ width: "120%" }}
                          onClick={() => {
                            toggleEditImageModal()
                          }}>
                          <i className="bx bx-camera" /> Change profile picture
                        </button>
                      </Col>
                      {
                        props.userProfile &&
                        <Col lg={6}>
                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            style={{ marginLeft: 20, width: "120%" }}
                            onClick={() => {
                              toggleResetPasswordModal()
                            }}>
                            Change Password
                            <i className="bx bx-right-arrow-alt" />
                          </button>
                        </Col>
                      }
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
            {/*end of general update modal*/}
            {/*Image modal*/}
            <Modal
              isOpen={updateImageModal}
              toggle={() => {
                toggleEditImageModal()
              }}
            >
              <div className="modal-header">
                <h5
                  className="modal-title mt-0"
                  id="mySmallModalLabel"
                >
                  Upload new image
                </h5>
                <button
                  onClick={() => {
                    setUpdateImageModal(false)
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
                    <Form>
                      <Dropzone
                        maxFiles={1}
                        onDrop={acceptedFiles => {
                          handleAcceptedFiles(acceptedFiles)
                        }}
                      >
                        {({ getRootProps, getInputProps }) => (
                          <div className="dropzone">
                            <div
                              className="dz-message needsclick mt-2"
                              {...getRootProps()}
                            >
                              <input {...getInputProps()} />
                              <div className="mb-3">
                                <i className="display-4 text-muted bx bxs-cloud-upload" />
                              </div>
                              <h4>Drop file here or click to upload.</h4>
                            </div>
                          </div>
                        )}
                      </Dropzone>
                      <div className="dropzone-previews mt-3" id="file-previews">
                        {selectedFiles.map((f, i) => {
                          return (
                            <Card
                              className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                              key={i + "-file"}
                            >
                              <div className="p-2">
                                <Row className="align-items-center">
                                  <Col className="col-auto">
                                    <img
                                      data-dz-thumbnail=""
                                      height="80"
                                      className="avatar-sm rounded bg-light"
                                      alt={f.name}
                                      src={f.preview}
                                    />
                                  </Col>
                                  <Col>
                                    <Link
                                      to="#"
                                      className="text-muted font-weight-bold"
                                    >
                                      {f.name}
                                    </Link>
                                    <p className="mb-0">
                                      <strong>{f.formattedSize}</strong>
                                    </p>
                                  </Col>
                                </Row>
                              </div>
                            </Card>
                          )
                        })}
                      </div>
                    </Form>
                  </div>
                </Row>
              </div>
              <div className="modal-footer">
                <Button color="success">Update</Button>
                <Button color="secondary" onClick={() => {
                  setUpdateImageModal(false)
                }}>Cancel</Button>
              </div>
            </Modal>
            {/*end of image modal*/}
            {/*Reset password modal*/}
            <Modal
              isOpen={resetModal}
              size={"lg"}
              toggle={() => {
                toggleResetPasswordModal()
              }}
            >
              <Form onSubmit={(e) => {
                e.preventDefault()
                resetPasswordValidation.handleSubmit()
              }}>
                <div className="modal-header">
                  <h5
                    className="modal-title mt-0"
                    id="mySmallModalLabel"
                  >
                    Change password
                  </h5>
                  <button
                    onClick={() => {
                      setResetModal(false)
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
                      className="col-md-3 col-form-label"
                    >
                      New Password
                    </label>
                    <div className="col-md-9">
                      <Input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        onChange={resetPasswordValidation.handleChange}
                        onBlur={resetPasswordValidation.handleBlur}
                        value={resetPasswordValidation.values.password || ""}
                        invalid={
                          !!(resetPasswordValidation.touched.password && resetPasswordValidation.errors.password)
                        }
                      />
                      {resetPasswordValidation.touched.password && resetPasswordValidation.errors.password ? (
                        <FormFeedback type="invalid">{resetPasswordValidation.errors.password}</FormFeedback>
                      ) : null}
                    </div>
                  </Row>

                  <Row className="mb-3">
                    <label
                      htmlFor="example-text-input"
                      className="col-md-3 col-form-label"
                    >
                      Repeat New Password
                    </label>
                    <div className="col-md-9">
                      <Input
                        name="passwordConfirmation"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        onChange={resetPasswordValidation.handleChange}
                        onBlur={resetPasswordValidation.handleBlur}
                        value={resetPasswordValidation.values.passwordConfirmation || ""}
                        invalid={
                          !!(resetPasswordValidation.touched.passwordConfirmation && resetPasswordValidation.errors.passwordConfirmation)
                        }
                      />
                      {resetPasswordValidation.touched.passwordConfirmation && resetPasswordValidation.errors.passwordConfirmation ? (
                        <FormFeedback
                          type="invalid">{resetPasswordValidation.errors.passwordConfirmation}</FormFeedback>
                      ) : null}
                    </div>
                  </Row>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-sm btn-info"
                    style={{ margin: 5 }}
                    onClick={() => {
                      setShowPassword(!showPassword)
                    }}><i className="bx bx-show" />{showPassword ? "Hide pass" : "Show pass"}</button>
                  <Button color="primary">Save</Button>
                  <Button color="secondary" onClick={() => {
                    setResetModal(false)
                  }}>Cancel</Button>
                </div>
              </Form>
            </Modal>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}

ProfileHeader.propTypes = {
  userProfile: PropTypes.bool,
  title: PropTypes.string
}

export default ProfileHeader
