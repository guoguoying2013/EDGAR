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
      end: 40,
      colTitles: ['Filings ', 'Html file', 'Description', 'Filing Date', 'File/File Number'],
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
    axios.get('/api/search', { params: { tradingSymbol: this.state.tradingSymbol, start: this.state.start, end: this.state.end } })
      .then(({ data }) => {
        console.log(data);
        this.setState({
          filings: data,
        });
      });
  }

  getHtml(e) {
    e.preventDefault();
    axios.get('/api/htm', { params: { indexUrl: e.target.name } })
      .then(({ data }) => {
        window.open(data);
      });
  }

  nextForty() {
    const currentStart = this.state.start;
    const currentEnd = this.state.end;
    this.setState({
      start: currentStart + 40,
      end: currentEnd + 40,
    });
    axios.get('/api/search', { params: { tradingSymbol: this.state.tradingSymbol, start: this.state.start, end: this.state.end } })
      .then(({ data }) => {
        console.log(data);
        this.setState({
          filings: data,
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
                  return (<td><button name={arr[5]} onClick={this.getHtml}>Click to view file</button></td>);
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
