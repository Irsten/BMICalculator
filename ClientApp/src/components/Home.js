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

  const numberRegex = new RegExp(/^(\d*\.)?\d+$/);

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
  const handleBmiClassification = (e) => {
    //setBmiClassification(e);

    switch (e) {
      case 0:
        setBmiClassification('(Extreme Underweight)');
        break;
      case 1:
        setBmiClassification('(Underweight)');
        break;
      case 2:
        setBmiClassification('(Slightly Underweight)');
        break;
      case 3:
        setBmiClassification('(Normal)');
        break;
      case 4:
        setBmiClassification('(Overweight)');
        break;
      case 5:
        setBmiClassification('(Obesity Class I)');
        break;
      case 6:
        setBmiClassification('(Obesity Class II)');
        break;
      case 7:
        setBmiClassification('(Obesity Class III)');
        break;
      default:
        break;
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
          console.log(response.data);
          const classification = response.data.BmiClassification;
          console.log(typeof classification);
          setBmi(response.data.Bmi);
          handleBmiClassification(classification);
          setSummary(response.data.Summary);
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
                  Weight must be a positive number greater than 1
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
                  Height must be a positive number greater than 1
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
      <div className='col' style={{ width: 600, padding: 10 }}>
        <h4>Result</h4>
        <hr />
        <div className='row align-items-center m-1 fw-semibold'>
          Your BMI: &nbsp;
          <label className='form-control' style={{ width: 400, height: 40 }}>
            {bmi} {bmiClassification}
          </label>
          <div className='p-0'>{summary}</div>
        </div>
      </div>
    </div>
  );
}
