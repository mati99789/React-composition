import React from 'react';
import CalendarItem from './CalendarItem';
import './CalendarList.css';

export default class CalendarList extends React.Component {
  render() {
    const { data } = this.props;
    const meetings = data.map((meeting) => (
      <CalendarItem key={meeting.id} {...meeting} />
    ));
    return <ul className="meetingsList">{meetings}</ul>;
  }
}
