import React from 'react';
import CalendarProvider from './../../apiProvider/calendarProvider';
import DropDown from './DropDownItem';
import './CalendarForm.css';

export default class CalendarForm extends React.Component {
  api = new CalendarProvider();

  state = {
    fields: {
      firstName: '',
      lastName: '',
      email: '',
      date: '',
      time: '',
    },
    errors: {},
    disabledBtn: true,
    matchedItems: [],
    focus: null,
  };

  isValid = (fieldName) => {
    const value = this.state.fields[fieldName];

    let errors = {};
    let isValid = true;

    if (fieldName === 'firstName') {
      if (value.trim().length < 2) {
        isValid = false;

        errors[fieldName] = `User Name can't be empty!`;
      }
    }

    if (fieldName === 'lastName') {
      if (value.trim().length < 2) {
        isValid = false;
        errors[fieldName] = `Last Name can't be empty!`;
      }
    }

    if (fieldName === 'email') {
      if (!value.includes('@')) {
        isValid = false;
        errors['email'] = `Incorrect email`;
      }
    }

    if (fieldName === 'date') {
      if (!value) {
        if (value.trim().length <= 0) {
          isValid = false;
          errors['date'] = `Incorrect Date!`;
        }
      }
    }

    if (fieldName === 'time') {
      if (!value) {
        const reg = /([0-9]{2}):([0-9]{2})/;
        if (!reg.test(value)) {
          isValid = false;
          errors['time'] = `Incorrect Time!`;
        }
      }
    }

    this.setState({
      errors: errors,
    });

    return isValid;
  };

  handleChange = (e) => {
    const fieldName = e.target.name;
    const fields = this.state.fields;
    fields[fieldName] = e.target.value;

    this.setState({
      fields,
    });

    const validation = this.isValid(fieldName);
    const checkInputs = Object.values(fields).every((item) => item.length > 0);

    if (validation & checkInputs) {
      this.setState({
        disabledBtn: false,
      });
    }

    this.searchMatchedMeeting(fieldName);
  };

  searchMatchedMeeting = (fieldName) => {
    const value = this.state.fields[fieldName];

    if (value.trim().length >= 2) {
      this.api.searchMeeting(`?${fieldName}_like=${value}`).then((data) => {
        this.addItemToState(data);
      });
    }
  };

  addItemToState = (data) => {
    this.setState({
      matchedItems: data,
    });
  };

  handleSubmit = (e) => {
    const { submitHandler } = this.props;

    submitHandler(e, this.resetForm);
  };

  resetForm = () => {
    this.setState({
      fields: {
        firstName: '',
        lastName: '',
        email: '',
        date: '',
        time: '',
      },
    });
  };

  handleFocus = (e) => {
    this.setState({ focus: e.target.name });
  };

  clickHandle = (e) => {
    e.preventDefault();
    const fieldName = this.state.focus;
    const fields = this.state.fields;
    fields[fieldName] = e.target.textContent;
    this.setState({
      fields: { ...this.state.fields },
      focus: null,
    });
  };

  renderDropDown = () => {
    const matchedValues = this.state.matchedItems.map((item) => {
      return (
        <DropDown
          className="autocomplete"
          chooseItem={this.clickHandle}
          content={item[this.state.focus]}
          key={parseInt(Math.random() * 99)} // To jest tylko wylacznie w ramach testu.
        />
      );
    });
    return <ul className={'autocompleteList'}>{matchedValues}</ul>;
  };

  render() {
    return (
      <form className="formContainer" onSubmit={this.handleSubmit}>
        <label className="formContainer__input" onFocus={this.handleFocus}>
          FirstName:{' '}
          <input
            type="text"
            name="firstName"
            onChange={this.handleChange}
            placeholder="First Name"
            value={this.state.fields.firstName}
          />
          <span style={{ color: 'red' }}>{this.state.errors['firstName']}</span>
          {this.state.focus === 'firstName' && this.renderDropDown()}
        </label>{' '}
        <label className="formContainer__input" onFocus={this.handleFocus}>
          LastName:{' '}
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            onChange={this.handleChange}
            value={this.state.fields.lastName}
          />
          <span style={{ color: 'red' }}>{this.state.errors['lastName']}</span>
          {this.state.focus === 'lastName' && this.renderDropDown()}
        </label>{' '}
        <label className="formContainer__input" onFocus={this.handleFocus}>
          Email:{' '}
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={this.handleChange}
            value={this.state.fields.email}
          />
          <span style={{ color: 'red' }}>{this.state.errors['email']}</span>
          {this.state.focus === 'email' && this.renderDropDown()}
        </label>{' '}
        <label className="formContainer__input" onFocus={this.handleFocus}>
          Date:{' '}
          <input
            type="date"
            placeholder="Date"
            name="date"
            onChange={this.handleChange}
            value={this.state.fields.date}
          />
          <span style={{ color: 'red' }}>{this.state.errors['date']}</span>
          {this.state.focus === 'date' && this.renderDropDown()}
        </label>
        <label className="formContainer__input" onFocus={this.handleFocus}>
          Time:{' '}
          <input
            type="time"
            placeholder="Time"
            name="time"
            onChange={this.handleChange}
            value={this.state.fields.time}
          />
          <span style={{ color: 'red' }}>{this.state.errors['time']}</span>
          {this.state.focus === 'time' && this.renderDropDown()}
        </label>
        <input
          type="submit"
          value="Send Data"
          disabled={this.state.disabledBtn}
          className="formContainer__btn"
        />
      </form>
    );
  }
}
