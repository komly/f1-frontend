import React, { Component } from 'react';
import { Container, Table, Pagination } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as drivers from '../../actions/drivers';

class DriverListPage extends Component {
  componentDidMount() {
    this.props.loadDrivers(this.getCurrentPage());
  }
  componentWillReceiveProps(newProps) {
    if (newProps.match.params.page_num !== this.props.match.params.page_num) {
      this.props.loadDrivers(this.getCurrentPage());
    }
  }
  handlePageChange = pageNumber => {
    this.props.history.push(`/drivers/page/${pageNumber}`);
  };

  getCurrentPage() {
    return this.props.match.params.page_num || 1;
  }
  render() {
    const { drivers, totalPages, loading } = this.props;
    const currentPage = this.getCurrentPage();
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

const mapStateToProps = state => ({
  drivers: state.drivers.drivers,
  totalPages: state.drivers.totalPages,
  loading: state.drivers.loading,
  error: state.drivers.error,
});

export default connect(
  mapStateToProps,
  { loadDrivers: drivers.loadDrivers },
)(DriverListPage);
