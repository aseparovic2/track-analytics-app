import PropTypes from "prop-types";
import MetaTags from "react-meta-tags";
import React, { useState } from "react"
import { Row, Col, CardBody, Card, Alert, Container, Form, Input, FormFeedback, Label } from "reactstrap";
import { withRouter, Link, useHistory } from "react-router-dom";4
// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";
// import images
import profile from "assets/images/nevera-removebg-preview.png";
import { fireAlert } from "../../components/Common/Alert"
import { useLazyQuery } from "@apollo/client";
import { AUTH_USER } from "../../graphql/queries/users"


const Login = () => {

  const history = useHistory()
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })
  const [authUser, { loading, data }] = useLazyQuery(AUTH_USER, {
    variables: credentials
  });


  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "admin@rimac.com" || '',
      password: "123456" || '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: async (values) => {
      setCredentials({
        email: values.email,
        password: values.password
      })
      authUser().then(res => {
        console.log(res.data.user)
        if (res.data.user === null) {
          fireAlert("Invalid Credentials", "Please check your email/password and try again", "error")
        } else {
              localStorage.setItem('authUser', JSON.stringify(res.data.user))
              history.push('/dashboard')
        }
      })
    }
  });

  return (
    <React.Fragment>
      <MetaTags>
        <title>Login | Rimac Analytics App</title>
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
                        <h2 style={{color: 'white'}}>Welcome </h2>
                        <p> to Rimac Analytics app.</p>
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
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
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
                            validation.touched.email && validation.errors.email ? true : false
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
                          value={validation.values.password || ""}
                          type="password"
                          placeholder="Enter Password"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          invalid={
                            validation.touched.password && validation.errors.password ? true : false
                          }
                        />
                        {validation.touched.password && validation.errors.password ? (
                          <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="mt-3 d-grid">
                        <button
                          className="btn btn-primary btn-block"
                          style={{backgroundColor: '#2a3042' , color: "white"}}
                          type="submit"
                        >
                          Log In
                        </button>
                      </div>

                      <div className="mt-4 text-center">
                        <Link to="/register" className="text-muted">
                          Dont have an account? <strong>Register</strong>
                        </Link>
                      </div>

                      <div className="mt-4 text-center">
                        <Link to="/forgot-password" className="text-muted">
                          <i className="mdi mdi-lock me-1" />
                          Forgot your password?
                        </Link>
                      </div>

                      <div className="mt-4 text-center">
                        <Link to="/shared" className="text-muted">
                          View shared data
                        </Link>
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
  );
};

export default withRouter(Login);

Login.propTypes = {
  history: PropTypes.object,
};
