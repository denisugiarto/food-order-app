import React, { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = (value) => value.trim() === '';
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = ({ onCancel, onConfirm }) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });
  const nameInputRef = useRef('');
  const streetInputRef = useRef('');
  const postalInputRef = useRef('');
  const cityInputRef = useRef('');

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostalIsValid = isFiveChars(enteredPostal);
    const enteredCityIsValid = !isEmpty(enteredCity);

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      postalCode: enteredPostalIsValid,
      city: enteredCityIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredPostalIsValid &&
      enteredCityIsValid;

    if (!formIsValid) {
      return;
    }
    onConfirm({
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostal,
      city: enteredCity,
    });
      console.log('Submited!')
  };

  const inputInvalidHandler = (inputValid) => {
    return inputValid
      ? `${classes.control}`
      : `${classes.control} ${classes.invalid}`;
  };

  return (
    <form onSubmit={confirmHandler}>
      <div className={inputInvalidHandler(formInputsValidity.name)}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formInputsValidity.name && (
          <p className={classes.text}>Please enter a valid name!</p>
        )}
      </div>
      <div className={inputInvalidHandler(formInputsValidity.street)}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef} />
        {!formInputsValidity.street && (
          <p className={classes.text}>Please enter a valid street!</p>
        )}
      </div>
      <div className={inputInvalidHandler(formInputsValidity.postalCode)}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalInputRef} />
        {!formInputsValidity.postalCode && (
          <p className={classes.text}>
            Please enter a valid postal code (5 character)!
          </p>
        )}
      </div>
      <div className={inputInvalidHandler(formInputsValidity.city)}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef} />
        {!formInputsValidity.city && (
          <p className={classes.text}>Please enter a valid city!</p>
        )}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
