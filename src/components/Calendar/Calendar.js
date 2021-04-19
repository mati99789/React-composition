import React, { Component } from 'react';
import API from '../../apiProvider/calendarProvider';
import CalendarList from './CalendarList';
import CalendarForm from './CalendarForm';

export class Calendar extends Component {
  api = new API('http://localhost:3005/meetings');

  state = {
    meetings: [],
  };

  componentDidMount() {
    this.loadDataFromAPI();
  }

  loadDataFromAPI() {
    this.api
      .loadData()
      .then((data) => {
        this.setState({ meetings: data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  submitHandler = (e) => {
    e.preventDefault();

    const { username, lastName, email, date, time } = e.target.elements;
    const data = {
      firstName: username.value,
      lastName: lastName.value,
      email: email.value,
      date: date.value,
      time: time.value,
    };

    this.api
      .addData(data)
      .then((meeting) => {
        this.setState({
          meetings: [...this.state.meetings, meeting],
        });
      })
      .finally(() => {
        this.clearData(e);
      });
  };

  clearData = (e) => {
    const allInputs = e.target.elements;
    console.log(allInputs);
  };

  render() {
    return (
      <div>
        <CalendarList data={this.state.meetings} />
        <CalendarForm submitHandler={this.submitHandler} />
      </div>
    );
  }
}

export default Calendar;
