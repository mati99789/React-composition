import React from 'react';
import CalendarItem from './CalendarItem';

export default class CalendarList extends React.Component {
  render() {
    const { data } = this.props;
    const meetings = data.map((meeting) => (
      <CalendarItem key={meeting.id} {...meeting} />
    ));
    return <ul>{meetings}</ul>;
  }
}
