import React, { useEffect } from "react"
import MetaTags from "react-meta-tags"
import { Row, Col, CardBody, Card, Alert, Container, Input, Label, Form, FormFeedback } from "reactstrap"
// Formik Validation
import * as Yup from "yup"
import { useFormik } from "formik"
import { Link, useHistory } from "react-router-dom"
// import images
import profileImg from "../../../assets/images/profile-img.png"
import logoImg from "../../../assets/images/logo.svg"

const ForgetPasswordReset = () => {
  const history = useHistory()

  const validation = useFormik({
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
      // UPDATE PASSWORD
      history.push(`/login`)
    }
  })

  return (
    <React.Fragment>
      <MetaTags>
        <title>Forgot Password | iNSPECTOR</title>
      </MetaTags>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="fas fa-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col className="col-7">
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Reset password</h5>
                        <p style={{ width: 300 }}>Minimum length = 8 <br />
                          Use letters, numbers and/or special characters</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profileImg} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                    <Link to="/">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={logoImg}
                            alt=""
                            className="rounded-circle"
                            height="34"
                          />
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="p-2">
                    <Form
                      className="form-horizontal"
                      onSubmit={(e) => {
                        e.preventDefault()
                        validation.handleSubmit()
                        return false
                      }}
                    >

                      <div className="mb-3">
                        <Label className="form-label required">New password</Label>
                        <Input
                          name="password"
                          type="password"
                          placeholder="Enter password again"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.password || ""}
                          invalid={
                            !!(validation.touched.password && validation.errors.password)
                          }
                        />
                        {validation.touched.password && validation.errors.password ? (
                          <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label required">Retype password (must match above)</Label>
                        <Input
                          name="passwordConfirmation"
                          type="password"
                          placeholder="Enter Password"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.passwordConfirmation || ""}
                          invalid={
                            !!(validation.touched.passwordConfirmation && validation.errors.passwordConfirmation)
                          }
                        />
                        {validation.touched.passwordConfirmation && validation.errors.passwordConfirmation ? (
                          <FormFeedback type="invalid">{validation.errors.passwordConfirmation}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="mt-4 text-center">
                        <button
                          className="btn btn-primary"
                          type="submit"
                        >
                          Update password
                        </button>
                      </div>
                    </Form>
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

export default ForgetPasswordReset
