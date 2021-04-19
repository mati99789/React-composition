import React from 'react';

export default class CalendarItem extends React.Component {
  render() {
    const { firstName, lastName, email, date, time } = this.props;
    return (
      <li>
        <div>
          <p>
            First Name: {firstName} Last Name: {lastName}
          </p>
          <p>Email: {email}</p>
          <p>
            Date: {date}, Time: {time}
          </p>
        </div>
      </li>
    );
  }
}
