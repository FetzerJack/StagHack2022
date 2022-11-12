import React, { useEffect, useState, useMemo } from 'react';
import {
  Container,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
} from 'reactstrap';
import TableContainer from './TableContainer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SelectColumnFilter } from './filters';

const App = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const doFetch = async () => {
      const response = await fetch('http://127.0.0.1:9090/result');
      const body = await response.json();
      const contacts = body;
      setData(contacts);
    };
    doFetch();
  }, []);

  const renderRowSubComponent = (row) => {
    return (
      <Card style={{ width: '18rem', margin: '0 auto' }}>
        <CardBody>
          <CardTitle>
            <strong>{`${row.values.frst_nm} ${row.values.lst_nm}`} </strong>
          </CardTitle>
          <CardText>
            {`${row.values.cty}, ${row.values.st}`}
          </CardText>
          <CardText>
            Specialty: {`${row.values.pri_spec}`}
          </CardText>
          <CardText>
            Years of Experience: {`${row.values.years_of_exp}`}
          </CardText>
          <CardText>
            Quality Ranking Score: {`${row.values.total_rank}`}
          </CardText>

        </CardBody>
      </Card>
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: () => null,
        id: 'expander', // 'id' is required
        Cell: ({ row }) => (
          <span {...row.getToggleRowExpandedProps()}>
            {row.isExpanded ? '-' : '+'}
          </span>
        ),
      },
      {
        Header: 'First Name',
        accessor: 'frst_nm',
      },
      {
        Header: 'Last Name',
        accessor: 'lst_nm',
      },
      {
        Header: 'Specialty',
        accessor: 'pri_spec',
      },
      {
        Header: 'City',
        accessor: 'cty',
      },
      {
        Header: 'State',
        accessor: 'st',
      },
      {
        Header: 'Years of Experience',
        accessor: 'years_of_exp',
      },
      {
        Header: 'Max Medicare Pricing for New Patients',
        accessor: 'max_medicare',
      },
      {
        Header: 'Max Copay for New Patients',
        accessor: 'max_copay',
      },
      {
        Header: 'Total Rank',
        accessor: 'total_rank',
      },
    ],
    []
  );

  return (
    <Container style={{ marginTop: 100 }}>
      <TableContainer
        columns={columns}
        data={data}
        renderRowSubComponent={renderRowSubComponent}
      />
    </Container>
  );
};

export default App;
