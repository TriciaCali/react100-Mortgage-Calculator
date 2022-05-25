import React from 'react';

export default class App extends React.Component {
  // your Javascript goes here
  constructor(props) {
    super(props);
    this.state = {
      balance: 0,
      rate: 0,
      term: 15,
      mpayment: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.calculate = this.calculate.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: parseFloat(event.target.value) });
  }

  calculate() {
    const balance = this.state.balance;
    const rate = this.state.rate;
    const term = this.state.term;

    const p = balance;
    const r = (rate / 12) / 100;
    const n = term * 12;
    const dividend = r * Math.pow((1 + r), n);
    const divisor = Math.pow((1 + r), n) - 1;

    const monthlyPayment = p * (dividend / divisor);
    this.setState({ mpayment: monthlyPayment.toFixed(2) });
  }
  render() {
    return (
      <div className='container'>
        <h3>Mortgage Calculator</h3>
        <form className='form-horizontal'>
          <div className='form-group'>
            <label htmlFor='balance' className='col-sm-2 control-label' >Loan Balance</label>
            <div className='col-sm-10'>
              <input
                type='number'
                className='form-control'
                id='balance'
                name='balance'
                placeholder='balance'
                onChange={ this.handleChange }
              />
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor='rate' className='col-sm-2 control-label'>Interest Rate (%)</label>
            <div className='col-sm-10'>
              <input
                type='number'
                step='0.01'
                className='form-control'
                id='rate'
                name='rate'
                placeholder='rate'
                onChange={ this.handleChange }
              />

            </div>
          </div>
          <div className='form-group'>
            <label htmlFor='term' className='col-sm-2 control-label'>Loan Term (years)</label>
            <div className='col-sm-10'>
              <select
                className='form-control'
                id='term'
                name='term'
                placeholder='term'
                onChange={ this.handleChange }
              >
                <option value='15' >15</option>
                <option value='30' >30</option>
              </select>
            </div>
          </div>
          <div className='form-group'>
            <div className='col-sm-offset-2 col-sm-10'>
              <button
                type='button'
                name='submit'
                className='btn btn-default'
                onClick={ this.calculate }
              >Calculate
              </button>
            </div>
          </div>
          <div id='output' name='output'>{this.state.mpayment}</div>
        </form>
      </div>
    );
  }
}
