import { useSelector, useDispatch } from 'react-redux';
import { fetchDeleteContact } from 'redux/contacts/contacts-operations';
import { getFilteredContacts } from 'redux/contacts/contacts-selectors';

import css from './ContactList.module.css';

const ContactList = () => {
  const filteredContacts = useSelector(getFilteredContacts);
  const dispatch = useDispatch();

 

  const handleDeleteContact = id => {
    dispatch(fetchDeleteContact(id));
  };

  const phonebook = filteredContacts.map(({ id, name, number }) => (
    <li className={css.item} key={id}>
      {name}: {number}
      <button
        className={css.itemBtn}
        onClick={() => handleDeleteContact(id)}
        type="button"
      >
        Delete
      </button>
    </li>
  ));

  const isContacts = Boolean(filteredContacts.length);
  return isContacts && <ol className={css.list}> {phonebook}</ol>;
};

export default ContactList;
