import React, { useEffect, useState } from "react"
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
import DataTable from "../../components/Common/DataTable/DataTable"
import { useMutation, useQuery } from "jsonapi-react"
import { fireAlert } from "../../components/Common/Alert"
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"
import paginationFactory, { PaginationListStandalone, PaginationProvider } from "react-bootstrap-table2-paginator"
import BootstrapTable from "react-bootstrap-table-next"

const users = [
  {
    id: 1,
    full_name: 'John Doe',
    email: 'john@doe.com',
    cars: [],
    role: 1
  },
  {
    id: 2,
    full_name: 'Jure Juric',
    email: 'jurejuric@gmail.com',
    cars: [1,4],
    role: 2
  }
]

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
  {
      label: "ROLES",
    options: [
      { label: "Admin", value: 1 },
      { label: "Owner", value: 2 },
      { label: "Engineer", value: 3 }
    ]
  }
]


const Users = () => {

  const [initialValue, setInitialValue] = useState({})
  const [isEdit, setIsEdit] = useState(false);
  const [modal, setModal] = useState(false);

  const { SearchBar } = Search;
  const sizePerPage = 10;
  const pageOptions = {
    sizePerPage: sizePerPage,
    totalSize: users.length, // replace later with size(users),
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
      full_name: Yup.string().required("Full Name is required"),
      email: Yup.string().email("Email is not valid!").required("Email is required"),
      role: Yup.number().required("Role is required"),
    }),
    onSubmit: (values) => {
      if (isEdit) {
        //edit car
      } else {
        //add new car
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
    setInitialValue({
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      role: user.role,
      cars: user.cars
    });
    setIsEdit(true);

    toggle();
  };

  const userColumns = [
    {
      text: "ID",
      dataField: "id",
    },
    {
      text: "Full Name",
      dataField: "full_name",
      sort: true,
    },
    {
      text: "Email",
      dataField: "email",
      sort: true,
    },
    {
      dataField: "cars",
      text: "Cars",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, user) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
              {
                user.cars.length === 0 ?
                  'User is not car owner' :
                  user.cars.map(car => {
                    return <a href={"$"} key={car}>{`Vehicle(${car})`} </a>
                  })
              }
            </Link>
          </h5>
        </>
      )
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


  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Inspector Web app</title>
        </MetaTags>
        <Container fluid>
          <div className="container-fluid">
            <Breadcrumbs title="Permissions" breadcrumbItem="Users" />
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    <PaginationProvider
                      pagination={paginationFactory(pageOptions)}
                      keyField={"id"}
                      columns={userColumns}
                      data={users}
                    >
                      {({ paginationProps, paginationTableProps }) => {
                        return (
                          <ToolkitProvider
                            keyField={"id"}
                            data={users}
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
                                              return false;
                                            }}
                                          >
                                            <Row form>
                                              <Col xs={12}>
                                                <div className="mb-3">
                                                  <Label className="form-label">Full Name</Label>
                                                  <Input
                                                    name="full_name"
                                                    type="text"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.full_name || ""}
                                                    invalid={
                                                      validation.touched.full_name && validation.errors.full_name ? true : false
                                                    }
                                                  />
                                                  {validation.touched.full_name && validation.errors.full_name ? (
                                                    <FormFeedback type="invalid">{validation.errors.full_name}</FormFeedback>
                                                  ) : null}
                                                </div>
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
                                                <div className="mb-3">
                                                  <label className="control-label">
                                                    Cars
                                                  </label>
                                                  <Select
                                                    value={validation.values.cars}
                                                    isMulti={true}
                                                    onChange={validation.handleChange}
                                                    options={allCars}
                                                    classNamePrefix="select2-selection"
                                                  />
                                                </div>
                                                <div className="mb-3">
                                                  <Label>Role</Label>
                                                  <Select
                                                    value={validation.values.cars}
                                                    onChange={validation.handleChange}
                                                    options={allRoles}
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
