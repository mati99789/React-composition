import React, { Component } from 'react';
import API from '../../apiProvider/calendarProvider';
import CalendarList from './CalendarList';
import CalendarForm from './CalendarForm';
import './Calendar.css';

export class Calendar extends Component {
  api = new API();

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

  submitHandler = (e, clearForm) => {
    e.preventDefault();

    const { username, lastName, email, date, time } = e.target.elements;
    const data = {
      firstName: username.value,
      lastName: lastName.value,
      email: email.value,
      date: date.value,
      time: time.value,
    };

    this.api.addData(data).then((meeting) => {
      this.setState({
        meetings: [...this.state.meetings, meeting],
      });

      clearForm();
    });
  };

  render() {
    return (
      <div>
        <h1>Meeting</h1>
        <CalendarForm submitHandler={this.submitHandler} />
        <CalendarList data={this.state.meetings} />
      </div>
    );
  }
}

export default Calendar;
