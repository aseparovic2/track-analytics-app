import React, { useEffect, useState, useRef } from "react";
import MetaTags from "react-meta-tags";
import { withRouter, Link } from "react-router-dom";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Modal,
  Button,
  ModalHeader,
  ModalBody,
  Label,
  FormFeedback,
  Input,
  Form,
} from "reactstrap";
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import * as Yup from "yup";
import { useFormik } from "formik";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import {ALL_CARS} from "../../graphql/queries/cars"
import {useQuery} from "@apollo/client"


//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb";


const users = [
  {
    id: '44789',
    vin: 'WLEJFJFIRIJOJEOIR545HKJH',
    name: 'Rimac Concept_One',
    description: 'Concept one prototype vehicle 1'
  },
  {
    id: '66767',
    name: 'Rimac Concept_One',
    vin: 'WLEJFJFIRIJOJEOIR545HKJH',
    description: 'Concept one prototype vehicle 2'
  },
  {
    id: '22234',
    vin: 'WLEJFJFIRIJOJEOIR545HKJH',
    name: 'Rimac Concept_Two',
    description: 'Concept one prototype vehicle 1'
  },
  {
    id: '1235c5d',
    vin: 'WLEJFJFIRIJOJEOIR545HKJH',
    name: 'Rimac Nevera',
    description: 'Concept one prototype vehicle 1'
  }
]

const CarList = props => {
  const [contact, setContact] = useState();
  const { loading, error, data } = useQuery(ALL_CARS);

  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: (contact && contact.name) || '',
      description: (contact && contact.description) || '',
      vin: (contact && contact.vin)  ||  '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Your Name"),
      description: Yup.string().required("Please Enter Vehicle Description"),
      vin: Yup.array().required("Please Enter Vehicle VIN nu,ber"),
    }),
    onSubmit: (values) => {
      if (isEdit) {
        //edit car
      } else {
        //add new car
      }
      toggle();
    },
  });

  const [userList, setUserList] = useState([]);
  const [vehicles, setVehicles] = useState([])
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);


  const { SearchBar } = Search;
  const sizePerPage = 10;
  const pageOptions = {
    sizePerPage: sizePerPage,
    totalSize: vehicles.length, // replace later with size(users),
    custom: true,
  };
  const defaultSorted = [
    {
      dataField: "id", // if dataField is not match to any column you defined, it will be ignored.
      order: "desc", // desc or asc
    },
  ];

  const contactListColumns = [
    {
      text: "ID",
      dataField: "_id",
    },
    {
      text: "Model",
      dataField: "model",
      sort: true,
    },
    {
      text: "Body",
      dataField: "body",
      sort: true,
    },
    {
      text: "Color",
      dataField: "color",
      sort: true,
    },
    {
      text: "Battery",
      dataField: "battery",
      sort: true,
    },
    {
      text: "Licence",
      dataField: "licence",
      sort: true,
    },
    {
      text: "Power",
      dataField: "power",
      sort: true,
    },
    {
      text: "Range",
      dataField: "range",
      sort: true,
    },
    {
      text: "Torque",
      dataField: "torque",
      sort: true,
    },
    {
      text: "Transmission",
      dataField: "transmission",
      sort: true,
    },
    {
      text: "Owner ID",
      dataField: "user_id",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, user) => {
        console.log(user)
        return (
          <>
            <h5 className="font-size-14 mb-1">
              <Link to="#" className="text-dark">
                {user?.user_id?._id}
              </Link>
            </h5>
          </>
        )
      },
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
    if (data?.cars !== undefined) {
      console.log(data?.cars)
      setVehicles(data.cars)
    }
  }, [data])


  const toggle = () => {
    setModal(!modal);
  };

  const handleUserClick = arg => {
    const user = arg;
    console.log(user)
    setContact({
      id: user.id,
      name: user.name,
      description: user.description,
      vin: user.vin,
    });
    setIsEdit(true);

    toggle();
  };

  var node = useRef();
  const onPaginationPageChange = page => {
    if (
      node &&
      node.current &&
      node.current.props &&
      node.current.props.pagination &&
      node.current.props.pagination.options
    ) {
      node.current.props.pagination.options.onPageChange(page);
    }
  };

  //delete customer
  const [deleteModal, setDeleteModal] = useState(false);

  const onClickDelete = (users) => {
    setContact(users);
    setDeleteModal(true);
  };

  const handleDeleteUser = () => {

  };

  const handleUserClicks = () => {
    setUserList("");
    setContact({})
    setIsEdit(false);
    toggle();
  };

  const keyField = "id";

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Car List</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Engineer" breadcrumbItem="Vehicle List" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField={keyField}
                    columns={contactListColumns}
                    data={vehicles}
                  >
                    {({ paginationProps, paginationTableProps }) => {
                      return (
                        <ToolkitProvider
                          keyField={keyField}
                          data={vehicles}
                          columns={contactListColumns}
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
                                      onClick={handleUserClicks}
                                    >
                                      <i className="mdi mdi-plus-circle-outline me-1" />
                                      Create New Vehicle
                                    </Button>
                                  </div>
                                </Col>
                              </Row>
                              <Row>
                                <Col xl="12">
                                  <div className="table-responsive">
                                    <BootstrapTable
                                      keyField={keyField}
                                      {...toolkitProps.baseProps}
                                      {...paginationTableProps}
                                      defaultSorted={defaultSorted}
                                      classes={
                                        "table align-middle table-nowrap table-hover"
                                      }
                                      bordered={false}
                                      striped={false}
                                      responsive
                                      ref={node}
                                    />

                                    <Modal isOpen={modal} toggle={toggle}>
                                      <ModalHeader toggle={toggle} tag="h4">
                                        {!!isEdit ? "Edit Vehicle" : "Add Vehicle"}
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
                                                <Label className="form-label">VIN</Label>
                                                <Input
                                                  name="vin"
                                                  type="text"
                                                  onChange={validation.handleChange}
                                                  onBlur={validation.handleBlur}
                                                  value={validation.values.vin || ""}
                                                  invalid={
                                                    validation.touched.vin && validation.errors.vin ? true : false
                                                  }
                                                />
                                                {validation.touched.vin && validation.errors.vin ? (
                                                  <FormFeedback type="invalid">{validation.errors.vin}</FormFeedback>
                                                ) : null}
                                              </div>
                                              <div className="mb-3">
                                                <Label className="form-label">Name</Label>
                                                <Input
                                                  name="name"
                                                  type="text"
                                                  onChange={validation.handleChange}
                                                  onBlur={validation.handleBlur}
                                                  value={validation.values.name || ""}
                                                  invalid={
                                                    validation.touched.name && validation.errors.name ? true : false
                                                  }
                                                />
                                                {validation.touched.name && validation.errors.name ? (
                                                  <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
                                                ) : null}
                                              </div>
                                              <div className="mb-3">
                                                <Label className="form-label">Description</Label>
                                                <Input
                                                  name="description"
                                                  label="Description"
                                                  type="text"
                                                  onChange={validation.handleChange}
                                                  onBlur={validation.handleBlur}
                                                  value={validation.values.description || ""}
                                                  invalid={
                                                    validation.touched.description && validation.errors.description ? true : false
                                                  }
                                                />
                                                {validation.touched.description && validation.errors.description ? (
                                                  <FormFeedback type="invalid">{validation.errors.description}</FormFeedback>
                                                ) : null}
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
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(CarList);
