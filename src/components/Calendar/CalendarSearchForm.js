import React from 'react';
import calendarProvider from './../../apiProvider/calendarProvider';

class CalendarSearchForm extends React.Component {
  api = new calendarProvider('http://localhost:3005/meetings');
  state = {
    searchQuery: '',
  };

  handleChange = (e) => {
    this.setState({
      searchQuery: e.target.value,
    });

    this.getSearchedMeetings();
  };

  getSearchedMeetings = () => {
    this.api
      .searchMeeting(`?firstName_like=§${this.state.searchQuery}`)
      .then((data) => {
        console.log(data);
      });
  };

  render() {
    return (
      <form>
        <label>
          Search for Meetings:
          <input
            type="text"
            onChange={this.handleChange}
            value={this.state.searchQuery}
            name="searchMeeting"
          />
        </label>
      </form>
    );
  }
}

export default CalendarSearchForm;
