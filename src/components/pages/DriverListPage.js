import React, { Component } from 'react';
import { Container, Table, Pagination } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import api from '../../api';

class DriverListPage extends Component {
  state = {
    loading: true,
    drivers: [],
    totalPages: 0,
  };

  componentDidMount() {
    const currentPage = this.props.match.params.page_num || 1;
    this.loadDrivers(currentPage);
  }
  async loadDrivers(currentPage) {
    this.setState({
      currentPage,
      loading: true,
    });

    api.driversList(currentPage).then(({ drivers, totalPages }) => {
      this.setState({
        drivers,
        loading: false,
        totalPages,
      });
    });
  }
  componentWillReceiveProps(newProps) {
    if (newProps.match.params.page_num !== this.props.match.params.page_num) {
      this.loadDrivers(newProps.match.params.page_num || 1);
    }
  }
  handlePageChange = pageNumber => {
    this.props.history.push(`/drivers/page/${pageNumber}`);
  };
  render() {
    const { drivers, totalPages, currentPage, loading } = this.state;
    return (
      <Container>
        {loading && <div>Loading...</div>}
        {!loading && (
          <div>
            <Table basic="very">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Nationality</Table.HeaderCell>
                  <Table.HeaderCell>Wikipedia link</Table.HeaderCell>
                  <Table.HeaderCell>Birthdate</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {drivers.map(driver => (
                  <Table.Row key={driver.driverId}>
                    <Table.Cell>
                      <Link to={`/drivers/${driver.driverId}`}>
                        {driver.givenName} {driver.familyName}
                      </Link>
                    </Table.Cell>
                    <Table.Cell>{driver.nationality}</Table.Cell>
                    <Table.Cell>
                      <a href={driver.url}>{driver.url}</a>
                    </Table.Cell>
                    <Table.Cell>{driver.dateOfBirth}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
            <Pagination
              defaultActivePage={currentPage}
              totalPages={totalPages}
              onPageChange={e => {
                this.handlePageChange(e.target.attributes.value.value);
              }}
            />
          </div>
        )}
      </Container>
    );
  }
}

export default DriverListPage;
