import React, { useState } from 'react';
import { DatePicker, Select } from 'antd';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const { Option } = Select;

function FlightSearchPage() {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [arrivalDate, setArrivalDate] = useState(null);
  const [departureDate, setDepartureDate] = useState(null);
  const [flights, setFlights] = useState([]);

  const handleSearch = () => {
    axios.get(`http://localhost:3001/api/v1/flights/search?source_city_id=${source}&destination_city_id=${destination}&arrival_date=${arrivalDate}&departure_date=${departureDate}`)
      .then(response => {
        setFlights(response.data);
      })
      .catch(error => {
        console.error('Error fetching flights:', error);
      });
  };

  return (
    <div className="container">
      <h1 className="my-4">Flight Search</h1>
      <div className="row">
        <div className="col-md-3">
          <label>Source:</label>
          <Select value={source} onChange={setSource} className="form-control">
            <Option value="9">Chennai</Option>
            <Option value="10">Bengaluru</Option>
          </Select>
        </div>
        <div className="col-md-3">
          <label>Destination:</label>
          <Select value={destination} onChange={setDestination} className="form-control">
            <Option value="9">Chennai</Option>
            <Option value="10">Bengaluru</Option>
          </Select>
        </div>
        <div className="col-md-3">
          <label>Arrival Date:</label>
          <DatePicker value={arrivalDate} onChange={date => setArrivalDate(date)} className="form-control" />
        </div>
        <div className="col-md-3">
          <label>Departure Date:</label>
          <DatePicker value={departureDate} onChange={date => setDepartureDate(date)} className="form-control" />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-12">
          <button className="btn btn-primary" onClick={handleSearch}>Search</button>
        </div>
      </div>
      <p>Total Flights: {flights.length}</p>
      <div className="row mt-3">
        <div className="col-md-12">
            <table className="table" border="1">
              <thead>
                <tr>
                  <th>Airline</th>
                  <th>Flight Number</th>
                  <th>Departure Time</th>
                  <th>Arrival Time</th>
                  <th>Price</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                {flights.map(flight => (
                  <tr key={flight.id}>
                    <td>{flight.airline_name}</td>
                    <td>{flight.flight_number}</td>
                    <td>{flight.departure_time}</td>
                    <td>{flight.arrival_time}</td>
                    <td>{flight.price}</td>
                    <td>{flight.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}

export default FlightSearchPage;
