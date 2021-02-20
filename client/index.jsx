/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tradingSymbol: '',
      filings: null,
      start: 0,
      interval: 40,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getHtml = this.getHtml.bind(this);
    this.nextForty = this.nextForty.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.get('/api/search', { params: { tradingSymbol: this.state.tradingSymbol, start: this.state.start, interval: this.state.interval } })
      .then(({ data }) => {
        this.setState({
          filings: data,
        });
      });
  }

  getHtml(e, arr) {
    e.preventDefault();
    const info = {
      tradingSymbol: this.state.tradingSymbol,
      filings: arr[0],
      description: arr[2],
      fileDate: arr[3],
    };
    axios.get('/api/htm', { params: { indexUrl: arr[5], info } })
      .then(({ data }) => {
        window.open(data);
      });
  }

  nextForty() {
    const currentStart = this.state.start + this.state.interval;
    axios.get('/api/search', { params: { tradingSymbol: this.state.tradingSymbol, start: currentStart, interval: this.state.interval } })
      .then(({ data }) => {
        this.setState({
          filings: data,
          start: currentStart,
        });
      });
  }

  render() {
    return (
      <div>
        <div className="search">
          <form>
            <input type="text" value={this.state.tradingSymbol} onChange={this.handleChange} name="tradingSymbol" placeholder="Enter Trading Symbol" />
            <button onClick={this.handleSubmit} type="submit">Search</button>
          </form>
        </div>
        {this.state.filings && (
        <table>
          <tr>
            <td>Filings</td>
            <td>File Link</td>
            <td>Description</td>
            <td>Filing Date</td>
            <td>File/File Number</td>
          </tr>
          {this.state.filings.map((ele) => (
            <tr key={ele[4]} className="file">
              {ele.map((val, i, arr) => {
                if (i === 1) {
                  return (<td><button onClick={(e) => {this.getHtml(e, arr);}}>Click to view file</button></td>);
                } if (i === 5) {
                  return '';
                }
                return (<td>{val}</td>);
              })}
            </tr>
          ))}
        </table>
        )}
        <button onClick={this.nextForty} type="submit">Next 40</button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
