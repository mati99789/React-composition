import React from 'react';
import './CalendarItem.css';

export default class CalendarItem extends React.Component {
  render() {
    const { firstName, lastName, email, date, time } = this.props;
    return (
      <li className="meetingItem">
        <div>
          <p>First Name: {firstName}</p>
          <p>Last Name: {lastName}</p>
          <p>Email: {email}</p>
          <p>
            Date: {date}, Time: {time}
          </p>
        </div>
      </li>
    );
  }
}
