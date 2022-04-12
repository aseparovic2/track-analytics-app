import React, { useEffect, useReducer, useState } from "react"
import {
  Button,
  Row,
  Col,
  Card,
  CardBody,
  Modal,
  Container,
  Alert,
  Form,
  FormFeedback,
  Input,
  ModalHeader, ModalBody, Label
} from "reactstrap"
import Select from "react-select";
import MetaTags from "react-meta-tags"
import { Link, useHistory } from "react-router-dom"
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { removeBodyCss } from "../../helpers/removeBodyCss"
import { useFormik } from "formik"
import * as Yup from "yup"
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"
import paginationFactory, { PaginationListStandalone, PaginationProvider } from "react-bootstrap-table2-paginator"
import BootstrapTable from "react-bootstrap-table-next"
import { ADD_USER, ALL_USERS, DELETE_USER, UPDATE_USER } from "../../graphql/queries/users"
import { useMutation, useQuery } from "@apollo/client"
import { ADD_CAR, DELETE_CAR, UPDATE_CAR } from "../../graphql/queries/cars"
import { fireAlert } from "../../components/Common/Alert"

const allCars = [
  {
    label: "CARS",
    options: [
      { label: "Rimac One", value: 1 },
      { label: "Rimac Two", value: 2 },
      { label: "Nevera", value: 3 }
    ]
  }
]

const allRoles = [
      { label: "admin", value: 1 },
      { label: "user", value: 2 },
      { label: "engineer", value: 3 }
]


const Users = () => {

  const [initialValue, setInitialValue] = useState({})
  const [isEdit, setIsEdit] = useState(false);
  const [modal, setModal] = useState(false);
  const [roleId, setRoleId] = useState("")
  const [globalId, setGlobalId] = useState("")
  const [reducerValue, forceUpdate] = useReducer(x => x+1 , 0)

  const { loading, error, data, refetch} = useQuery(ALL_USERS);
  const [addUser] = useMutation(ADD_USER, {
    variables: {
      data: initialValue
    }});

  const [updateUser] = useMutation(UPDATE_USER, {
    variables: {
      data: initialValue,
      userId: globalId
    }});

  const [deleteUser] = useMutation(DELETE_USER, {
    variables: {
      userId: globalId
    }});


  const { SearchBar } = Search;
  const sizePerPage = 10;
  const pageOptions = {
    sizePerPage: sizePerPage,
    totalSize: data?.users?.length,
    custom: true,
  };
  const defaultSorted = [
    {
      dataField: "id", // if dataField is not match to any column you defined, it will be ignored.
      order: "desc", // desc or asc
    },
  ];

  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: initialValue,
    validationSchema: Yup.object({
      email: Yup.string().email("Email is not valid!").required("Email is required"),
     // role: Yup.string().required("Role is required"),
    }),
    onSubmit: (values) => {

      if (isEdit) {
        //edit car
        setInitialValue({
          email: values.email,
          role: roleId
        })
        console.log(values)
        updateUser().then(res => {
          fireAlert("Update User","User updated successfully","success")
          forceUpdate()
        })
      } else {
        //add new car

        setInitialValue({
          email: values.email,
          password: values.password,
          role: roleId
        })
        addUser().then(res => {
          fireAlert("Add User","User added successfully","success")
          forceUpdate()
        })

      }
      toggle()
    },
  });

  const toggle = () => {
    setModal(!modal);
  };

  const handleAddUser = () => {
    setInitialValue({})
    setIsEdit(false);
    toggle()
  };

  const handleUserClick = arg => {
    const user = arg;
    console.log(user)
    setRoleId(user.role)
    setGlobalId(user._id)
    setInitialValue({
      email: user.email,
      role: user.role,
    });
    setIsEdit(true);

    toggle();
  };

  const onClickDelete = async (user) => {
    await setGlobalId(user._id)
    deleteUser().then((res) => {
      forceUpdate()
      fireAlert("Delete User","User deleted successfully","success")
    })
  }

  const userColumns = [
    {
      text: "ID",
      dataField: "_id",
    },
    {
      text: "Email",
      dataField: "email",
      sort: true,
    },
    {
      dataField: "role",
      text: "Role",
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, user) => (
        <>
          <h5 className="font-size-14 mb-1">
            {user.role}
          </h5>
        </>
      )
    },
    {
      dataField: "menu",
      isDummyField: true,
      editable: false,
      text: "Action",
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, user) => (
        <div className="d-flex gap-3">
          <Link className="text-success" to="#">
            <i
              className="mdi mdi-pencil font-size-18"
              id="edittooltip"
              onClick={() => handleUserClick(user)}
            />
          </Link>
          <Link className="text-danger" to="#">
            <i
              className="mdi mdi-delete font-size-18"
              id="deletetooltip"
              onClick={() => onClickDelete(user)}
            />
          </Link>
        </div>
      ),
    },
  ];

  useEffect(() => {
    refetch()
  }, [reducerValue])


  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Rimac Telemetry</title>
        </MetaTags>
        <Container fluid>
          <div className="container-fluid">
            <Breadcrumbs title="Permissions" breadcrumbItem="Users" />
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    {
                      loading &&
                      <div className="my-5 pt-sm-5">
                        <Container>
                          <Row>
                            <Col lg="12">
                              <div className="text-center">
                                <h4 className="mt-5">Loading ...</h4>
                              </div>
                            </Col>
                          </Row>
                        </Container>
                      </div>

                    }
                    {
                      error &&
                      <div className="my-5 pt-sm-5">
                        <Container>
                          <Row>
                            <Col lg="12">
                              <div className="text-center">
                                <h4 className="mt-5">Something went wrong</h4>
                              </div>
                            </Col>
                          </Row>
                        </Container>
                      </div>

                    }
                    {
                      data &&
                      <PaginationProvider
                        pagination={paginationFactory(pageOptions)}
                        keyField={"id"}
                        columns={userColumns}
                        data={data.users}
                      >
                        {({ paginationProps, paginationTableProps }) => {
                          return (
                            <ToolkitProvider
                              keyField={"id"}
                              data={data.users}
                              columns={userColumns}
                              bootstrap4
                              search
                            >
                              {toolkitProps => (
                                <React.Fragment>
                                  <Row className="mb-2">
                                    <Col sm="4">
                                      <div className="search-box ms-2 mb-2 d-inline-block">
                                        <div className="position-relative">
                                          <SearchBar {...toolkitProps.searchProps} />
                                          <i className="bx bx-search-alt search-icon" />
                                        </div>
                                      </div>
                                    </Col>
                                    <Col sm="8">
                                      <div className="text-sm-end">
                                        <Button
                                          color="primary"
                                          className="font-16 btn-block btn btn-primary"
                                          onClick={handleAddUser}
                                        >
                                          <i className="mdi mdi-plus-circle-outline me-1" />
                                          Add new user
                                        </Button>
                                      </div>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col xl="12">
                                      <div className="table-responsive">
                                        <BootstrapTable
                                          keyField={"id"}
                                          {...toolkitProps.baseProps}
                                          {...paginationTableProps}
                                          defaultSorted={defaultSorted}
                                          classes={
                                            "table align-middle table-nowrap table-hover"
                                          }
                                          bordered={false}
                                          striped={false}
                                          responsive
                                          // ref={node}
                                        />

                                        <Modal isOpen={modal} toggle={toggle}>
                                          <ModalHeader toggle={toggle} tag="h4">
                                            {!!isEdit ? "Edit User" : "Add User"}
                                          </ModalHeader>
                                          <ModalBody>
                                            <Form
                                              onSubmit={(e) => {
                                                e.preventDefault();
                                                validation.handleSubmit();
                                                //console.log("alelele")
                                               // return false;
                                              }}
                                            >
                                              <Row form>
                                                <Col xs={12}>
                                                  <div className="mb-3">
                                                    <Label className="form-label">Email</Label>
                                                    <Input
                                                      name="email"
                                                      type="text"
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

                                                  {
                                                    !isEdit &&
                                                    <div className="mb-3">
                                                      <Label className="form-label">Password</Label>
                                                      <Input
                                                        name="password"
                                                        type="password"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.password || ""}
                                                        invalid={
                                                          validation.touched.password && validation.errors.password ? true : false
                                                        }
                                                      />
                                                      {validation.touched.password && validation.errors.password ? (
                                                        <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                                                      ) : null}
                                                    </div>
                                                  }
                                                  <div className="mb-3">
                                                    <Label>Role</Label>
                                                    <Select
                                                      onChange={(option) => setRoleId(option.label)}
                                                      options={allRoles}
                                                      value={allRoles.find((o) => {
                                                        return o.label.toLowerCase() === roleId
                                                      })}
                                                      classNamePrefix="select2-selection"
                                                    />
                                                  </div>
                                                </Col>
                                              </Row>
                                              <Row>
                                                <Col>
                                                  <div className="text-end">
                                                    <button
                                                      type="submit"
                                                      className="btn btn-success save-user"
                                                    >
                                                      Save
                                                    </button>
                                                  </div>
                                                </Col>
                                              </Row>
                                            </Form>
                                          </ModalBody>
                                        </Modal>
                                      </div>
                                    </Col>
                                  </Row>
                                  <Row className="align-items-md-center mt-30">
                                    <Col className="pagination pagination-rounded justify-content-end mb-2">
                                      <PaginationListStandalone
                                        {...paginationProps}
                                      />
                                    </Col>
                                  </Row>
                                </React.Fragment>
                              )}
                            </ToolkitProvider>
                          );
                        }}
                      </PaginationProvider>
                    }
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

export default Users
