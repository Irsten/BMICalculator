import React, { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [unitSystem, setUnitSystem] = useState(1);
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [bmi, setBmi] = useState('');
  const [bmiClassification, setBmiClassification] = useState('');
  const [summary, setSummary] = useState('');

  const [isWeightValid, setIsWeightValid] = useState(true);
  const [isHeightValid, setIsHeightValid] = useState(true);

  const numberRegex = new RegExp(/^[1-9]\d*$/);

  const handleChangeUnitSystem = (e) => {
    console.log(e.target.value);
    if (e.target.value === '1') {
      setUnitSystem(1);
    } else if (e.target.value === '2') {
      setUnitSystem(2);
    }
  };

  const handleChangeWeight = (e) => {
    console.log(unitSystem);
    e.preventDefault();
    if (numberRegex.test(e.target.value) === false) {
      setIsWeightValid(false);
      console.log(e.target.value);
    } else {
      setIsWeightValid(true);
      setWeight(e.target.value);
      console.log(e.target.value);
    }
  };
  const handleChangeHeight = (e) => {
    if (numberRegex.test(e.target.value) === false) {
      setIsHeightValid(false);
      console.log(e.target.value);
    } else {
      setIsHeightValid(true);
      setHeight(e.target.value);
      console.log(e.target.value);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    try {
      axios
        .post('https://localhost:7001/calculate', {
          unitSystem,
          weight,
          height,
        })
        .then((response) => {
          console.log(response.data.Bmi);
          setBmi(response.data.Bmi);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='row align-items-start'>
      <div className='col' style={{ maxWidth: 500, padding: 10 }}>
        <h4>Enter values and check your BMI</h4>
        <hr style={{ width: 400 }} />
        <form onSubmit={handleFormSubmit} style={{ width: 400 }}>
          {/* Selector */}
          <div className='form-floating mb-3'>
            <select
              className='form-floating form-select mb-3'
              id='unitSystem'
              onChange={(e) => handleChangeUnitSystem(e)}
            >
              <option value={1}>Metric</option>
              <option value={2}>Imperial</option>
            </select>
            <label htmlFor='unitSystem'>Unit system</label>
          </div>
          {/* Weight input */}
          <div className='input-group mb-3'>
            <div className='form-floating' style={{ width: 355 }}>
              <input
                className={
                  isWeightValid ? 'form-control' : 'form-control is-invalid'
                }
                placeholder='Weight'
                id='weight'
                type='text'
                onChange={(e) => handleChangeWeight(e)}
              />
              <label htmlFor='weight'>Weight</label>
              {!isWeightValid && (
                <div className='invalid-feedback'>
                  Only positive numbers can be passed
                </div>
              )}
            </div>
            <span
              className='input-group-text'
              style={{ width: 45, maxHeight: 58 }}
            >
              {unitSystem !== 2 ? 'kg' : 'lbs'}
            </span>
          </div>
          {/* Height input */}
          <div className='input-group mb-3'>
            <div className='form-floating' style={{ width: 355 }}>
              <input
                className={
                  isHeightValid ? 'form-control' : 'form-control is-invalid'
                }
                placeholder='Height'
                id='height'
                type='text'
                onChange={(e) => handleChangeHeight(e)}
              />
              <label htmlFor='height'>Height</label>
              {!isHeightValid && (
                <div className='invalid-feedback'>
                  Only positive numbers can be passed
                </div>
              )}
            </div>
            <span
              className='input-group-text'
              style={{ width: 45, maxHeight: 58 }}
            >
              {unitSystem !== 2 ? 'cm' : 'in'}
            </span>
          </div>
          <button
            type='submit'
            className='btn btn-primary'
            style={{ width: 400 }}
          >
            Calculate
          </button>
        </form>
      </div>
      <div className='col' style={{ width: 400, padding: 10 }}>
        <h4>Result</h4>
        <hr />
        <div className='row align-items-center m-1 fw-semibold'>
          Your BMI: &nbsp;
          <label className='form-control' style={{ width: 400, height: 40 }}>
            {bmi}
          </label>
        </div>
      </div>
    </div>
  );
}
