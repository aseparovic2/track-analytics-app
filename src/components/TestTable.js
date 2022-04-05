import React from "react";
import namor from "namor";
import { ReactTable } from "react-table";


const range = len => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = () => {
  const statusChance = Math.random();
  return {
    firstName: namor.generate({ words: 1, numbers: 0 }),
    lastName: namor.generate({ words: 1, numbers: 0 }),
    age: Math.floor(Math.random() * 30),
    visits: Math.floor(Math.random() * 100),
    progress: Math.floor(Math.random() * 100),
    status:
      statusChance > 0.66
        ? "relationship"
        : statusChance > 0.33 ? "complicated" : "single"
  };
};

function makeData(len = 5553) {
  return range(len).map(d => {
    return {
      ...newPerson(),
      children: range(10).map(newPerson)
    };
  });
}

// Import React Table

const columns = [
  {
    Header: "Name",
    columns: [
      {
        Header: "First Name",
        accessor: "firstName"
      },
      {
        Header: "Last Name",
        id: "lastName",
        accessor: d => d.lastName
      }
    ]
  },
  {
    Header: "Info",
    columns: [
      {
        Header: "Age",
        accessor: "age"
      },
      {
        Header: "Status",
        accessor: "status"
      }
    ]
  },
  {
    Header: "Stats",
    columns: [
      {
        Header: "Visits",
        accessor: "visits"
      }
    ]
  }
];

class TestTable extends React.Component {
  constructor() {
    super();
    this.state = {
      data: makeData(),
      expanded: {}
    };
  }
  onExpandedChange = (expanded) => {
    this.setState({ expanded });
  }
  render() {
    const { data } = this.state;
    return (
      <div>
        <ReactTable
          data={data}
          columns={columns}
          defaultPageSize={10}
          expanded={this.state.expanded}
          className="-striped -highlight"
          getTrProps={(state, rowInfo, column, instance, expanded) => {
            return {
              onClick: e => {
                const expanded = {...this.state.expanded};
                expanded[rowInfo.viewIndex] = this.state.expanded[rowInfo.viewIndex] ? false : true;
                this.setState({ expanded });
              }
            };
          }}
          SubComponent={row => {
            return (
              <div style={{ padding: "20px" }}>
                <em>
                  You can put any component you want here, even another React
                  Table!
                </em>
                <br />
                <br />
                <ReactTable
                  data={data}
                  columns={columns}
                  defaultPageSize={3}
                  showPagination={false}
                  SubComponent={row => {
                    return (
                      <div style={{ padding: "20px" }}>
                        Another Sub Component!
                      </div>
                    );
                  }}
                />
              </div>
            );
          }}
        />
        <br />
      </div>
    );
  }
}
export default TestTable
