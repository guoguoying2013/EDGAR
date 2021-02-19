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
      colTitles: ['Filings ', 'Html file', 'Description', 'Filing Date', 'File/File Number'],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getHtml = this.getHtml.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.get('/api/search', { params: { tradingSymbol: this.state.tradingSymbol } })
      .then(({ data }) => {
        console.log(data);
        this.setState({
          filings: data,
        });
      });
  }

  getHtml(e) {
    e.preventDefault();
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
          {this.state.filings.map((ele) => (
            <tr key={ele[4]} className="file">
              {ele.map((val, i, arr) => {
                if (i === 1) {
                  return (<td><button name={arr[5]} onClick={this.getHtml}>Click to get file</button></td>);
                } if (i === 5) {
                  return '';
                } else {
                  return (<td>{val}</td>);
                }
              })}
            </tr>
          ))}
        </table>
        )}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
