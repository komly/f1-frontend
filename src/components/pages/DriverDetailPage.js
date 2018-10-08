import React, { Component } from 'react';
import api from '../../api';
import { Container, Table } from 'semantic-ui-react';

class DriverDetailPage extends Component {
  state = {
    loading: true,
    driver: null,
    races: [],
    currentPage: 0,
    totalPages: 0,
  };

  componentDidMount() {
    this.loadDriverDetail(this.props.match.params.driver_id);
  }
  async loadDriverDetail(driverId, currentPage) {
    this.setState({
      currentPage,
      loading: true,
    });
    api.loadDriverDetail(driverId).then(({ driver, races }) => {
      this.setState({
        driver,
        races,
        loading: false,
      });
    });
  }
  componentWillReceiveProps(newProps) {
    if (newProps.match.params.driver_id !== this.props.match.params.driver_id) {
      this.loadDriverDetail(this.props.match.params.driver_id);
    }
  }
  handlePageChange = pageNumber => {
    this.props.history.push(`/drivers/pages/${pageNumber}`);
  };
  render() {
    const { driver, races, loading } = this.state;
    return (
      <Container>
        {loading && <div>Loading...</div>}
        {!loading && (
          <div>
            <h2>
              {driver.givenName} {driver.familyName}
            </h2>
            <div>Nationality: {driver.nationality}</div>
            <div>Birthdate: {driver.dateOfBirth}</div>
            <a href={driver.url}>Wikipedia link</a>

            <Table basic="very">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Position</Table.HeaderCell>
                  <Table.HeaderCell>Season</Table.HeaderCell>
                  <Table.HeaderCell>Date</Table.HeaderCell>

                  <Table.HeaderCell>Wikipedia link</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {races.map(race => (
                  <Table.Row>
                    <Table.Cell>{race.raceName}</Table.Cell>
                    <Table.Cell>{race.round}</Table.Cell>
                    <Table.Cell>{race.season}</Table.Cell>
                    <Table.Cell>{race.date}</Table.Cell>
                    <Table.Cell>
                      <a href={race.url}>{race.url}</a>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        )}
      </Container>
    );
  }
}

export default DriverDetailPage;
