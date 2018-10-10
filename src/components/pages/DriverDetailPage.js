import React, { Component } from 'react';
import { Container, Table } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as drivers from '../../actions/drivers';

class DriverDetailPage extends Component {
  componentDidMount() {
    this.props.loadDriverDetail(this.props.match.params.driver_id);
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
    const { driver, loading } = this.props;
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

            <h3>Races</h3>
            <Table basic="very">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Race name</Table.HeaderCell>
                  <Table.HeaderCell>Position</Table.HeaderCell>
                  <Table.HeaderCell>Season</Table.HeaderCell>
                  <Table.HeaderCell>Date</Table.HeaderCell>

                  <Table.HeaderCell>Wikipedia link</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {driver.races &&
                  driver.races.map(race => (
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
const mapStateToProps = (state, props) => {
  const driver = state.drivers.drivers.find(driver => driver.driverId == props.match.params.driver_id);
  if (driver) {
    return {
      loading: false,
      driver,
    };
  }
  return {
    loading: true,
    driver: driver,
  };
};
export default connect(
  mapStateToProps,
  { loadDriverDetail: drivers.loadDriverDetail },
)(DriverDetailPage);
