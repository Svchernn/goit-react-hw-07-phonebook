import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  fetchAddContact,
  fetchAllContacts,
} from 'redux/contacts/contacts-operations';

import initialState from './initialState';

import css from './ContactForm.module.css';

const ContactForm = () => {
  const [state, setState] = useState({ ...initialState });
  // const allContacts = useSelector(getAllContacts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllContacts());
  }, [dispatch]);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    handleAddContact({ ...state });
    setState({ ...initialState });
  };

  const handleAddContact = ({ name, number }) => {
    dispatch(fetchAddContact({ name, number }));
  };

  const { name, number } = state;

  return (
    <form onSubmit={handleSubmit}>
      <div className={css.block}>
        <label>
          Name
          <input
            onChange={handleChange}
            type="text"
            name="name"
            value={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label>
          Number
          <input
            onChange={handleChange}
            type="tel"
            name="number"
            value={number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button className={css.formBtn} type="submit">
          Add contacts
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
