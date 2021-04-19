import React from 'react';
import calendarProvider from './../../apiProvider/calendarProvider';

export default class CalendarForm extends React.Component {
  api = new calendarProvider('http://localhost:3005/meetings');

  state = {
    fields: {
      username: '',
      lastName: '',
      email: '',
      date: '',
      time: '',
    },
    errors: {},
    disabledBtn: true,
    matchedItems: [],
  };

  isValid = () => {
    const { username, lastName, email, date, time } = this.state.fields;

    let errors = {};
    let isValid = true;

    if (username.trim().length <= 2) {
      isValid = false;

      errors['username'] = `User Name can't be empty!`;
    }

    if (lastName.trim().length <= 2) {
      isValid = false;
      errors['lastname'] = `Last Name can't be empty!`;
    }

    if (!email.includes('@')) {
      isValid = false;
      errors['email'] = `Incorrect email`;
    }

    if (!date) {
      if (date.trim().length <= 0) {
        isValid = false;
        errors['date'] = `Incorrect Date!`;
      }
    }

    if (!time) {
      const reg = /([0-9]{2}):([0-9]{2})/;
      if (!reg.test(time)) {
        isValid = false;
        errors['time'] = `Incorrect Time!`;
      }
    }

    this.setState({
      errors: errors,
    });

    return isValid;
  };

  handleChange = (e) => {
    const formName = e.target.name;
    const fields = this.state.fields;
    fields[formName] = e.target.value;

    this.setState({
      fields,
    });

    const validation = this.isValid();

    if (validation) {
      this.setState({
        disabledBtn: false,
      });
    }

    this.searchMatchedMeeting(e);
  };

  searchMatchedMeeting = (e) => {
    const { username, lastName, email } = this.state.fields;
    if (username) {
      this.api
        .searchMeeting(`?firstName_like=${username}`)
        .then((data) => this.addItemToState(data));
    } else if (lastName) {
      this.api
        .searchMeeting(`?lastName_like=${lastName}`)
        .then((data) => this.addItemToState(data));
    } else if (email) {
      this.api
        .searchMeeting(`?email_like=${email}`)
        .then((data) => this.addItemToState(data));
    }
  };

  addItemToState = (data) => {
    this.setState({
      matchedItems: { data },
    });
  };

  showMatchedMeeting = () => {
    if (this.state.matchedItems.data !== undefined) {
      const item = this.state.matchedItems.data.map((item) =>
        console.log(item)
      );
    }
  };
  render() {
    const { submitHandler } = this.props;
    return (
      <form onSubmit={submitHandler}>
        <label>
          FirstName:{' '}
          <input
            type="text"
            name="username"
            onChange={this.handleChange}
            placeholder="First Name"
            value={this.state.fields.username}
          />
          <span style={{ color: 'red' }}>{this.state.errors['username']}</span>
        </label>{' '}
        <label>
          LastName:{' '}
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            onChange={this.handleChange}
            value={this.state.fields.lastName}
          />
          <span style={{ color: 'red' }}>{this.state.errors['lastname']}</span>
        </label>{' '}
        <label>
          Email:{' '}
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={this.handleChange}
            value={this.state.fields.email}
          />
          <span style={{ color: 'red' }}>{this.state.errors['email']}</span>
        </label>{' '}
        <label>
          Date:{' '}
          <input
            type="date"
            placeholder="Date"
            name="date"
            onChange={this.handleChange}
            value={this.state.fields.date}
          />
          <span style={{ color: 'red' }}>{this.state.errors['date']}</span>
        </label>
        <label>
          Time:{' '}
          <input
            type="time"
            placeholder="Time"
            name="time"
            onChange={this.handleChange}
            value={this.state.fields.time}
          />
          <span style={{ color: 'red' }}>{this.state.errors['time']}</span>
        </label>
        <input
          type="submit"
          value="Send Data"
          disabled={this.state.disabledBtn}
        />
        <div>{this.showMatchedMeeting()}</div>
      </form>
    );
  }
}
