import React, { useEffect } from "react"
import MetaTags from "react-meta-tags"
import { Row, Col, CardBody, Card, Alert, Container, Input, Label, Form, FormFeedback } from "reactstrap"

// Formik Validation
import * as Yup from "yup"
import { useFormik } from "formik"

import { Link, useHistory } from "react-router-dom"

// import images
import profile from "../../assets/images/nevera-removebg-preview.png"

//firebase
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth"
import { fireAlert } from "../../components/Common/Alert"


const Register = props => {
  const history = useHistory()
  const authentication = getAuth();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "",
      password: "",
      passwordConfirmation: ""
    },

    validationSchema: Yup.object().shape({
      email: Yup.string().email("Invalid email").required("Please Enter Your Email"),
      password: Yup.string().required("Please Enter Your Password"),
      passwordConfirmation: Yup.string().required("Confirm password is required").oneOf([Yup.ref("password"), null], "Passwords must match")
    }),
    onSubmit: (values) => {
      createUserWithEmailAndPassword(authentication, values.email, values.password)
        .then((response) => {
          fireAlert("Sign up","You signed up successfully,please log in with you credentials","success")
          history.push(`/login`)
        })
        .catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            fireAlert("Sign up","Email is already in use.PLease log in instead or request new password","error")
          }
        })
    }

  })


  return (
    <React.Fragment>
      <MetaTags>
        <title>Register | Rimac Analytics App</title>
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
                        <h2 style={{color: 'white'}}>Sign-up</h2>
                        <p> for Rimac Analytics app.</p>
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
                          id="email"
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

                      <div className="mb-3">
                        <Label className="form-label">Password</Label>
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
                        <Label className="form-label">Retype password</Label>
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
                          Register
                        </button>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Already have an account ?{" "}
                  <Link to="/login" className="font-weight-medium text-primary">
                    {" "}
                    Login
                  </Link>{" "}
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Register
