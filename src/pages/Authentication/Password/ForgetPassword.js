import PropTypes from "prop-types"
import MetaTags from "react-meta-tags"
import React from "react"
import { useHistory } from "react-router-dom"
import { Row, Col, Alert, Card, CardBody, Container, FormFeedback, Input, Label, Form } from "reactstrap"
import { getAuth, sendPasswordResetEmail } from "firebase/auth"

import { withRouter, Link } from "react-router-dom"

// Formik Validation
import * as Yup from "yup"
import { useFormik } from "formik"

// import images
import profile from "assets/images/nevera-removebg-preview.png"
import { fireAlert } from "../../../components/Common/Alert"

const ForgetPasswordPage = props => {

  const history = useHistory()
  const authentication = getAuth();

  const validation = useFormik({
    initialValues: {
      email: ""
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email")
    }),
    onSubmit:  (values) => {
       sendPasswordResetEmail(authentication,values.email).then(response => {
        fireAlert("Reset password","Reset password email sent successfully","success")
      }).catch(error => {
         if (error.code === 'auth/user-not-found') {
           fireAlert("Reset password","User with that email is not found in our database","error")
         }
      })
    }
  })

  return (
    <React.Fragment>
      <MetaTags>
        <title>
          Forget Password | iNSPECTOR
        </title>
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
                <div className="bg-soft" style={{backgroundColor: '#2a3042', color: "white"}}>
                  <Row>
                    <Col xs={7}>
                      <div className=" p-4">
                        <h2 style={{color: 'white'}}>Forgot pass?</h2>
                        <p> No worries, enter your email and you will get reset link</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profile} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
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
                        <Label className="form-label">Email</Label>
                        <Input
                          name="email"
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.email || ""}
                          invalid={
                            !!(validation.touched.email && validation.errors.email)
                          }
                        />
                        {validation.touched.email && validation.errors.email ? (
                          <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                        ) : null}
                      </div>
                      <Row className="mb-3">
                        <Col className={"col-6"}>
                          <button
                            className="btn btn-secondary w-md"
                            type="submit"
                            onClick={() => {
                              history.push(`/login`)
                            }}
                          >
                            Back to Login
                          </button>
                        </Col>
                        <Col className="col-6 text-end">
                          <button
                            className="btn btn-primary w-md"
                            type="submit"
                          >
                            Reset
                          </button>
                        </Col>
                      </Row>
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

ForgetPasswordPage.propTypes = {
  history: PropTypes.object
}

export default withRouter(ForgetPasswordPage)
