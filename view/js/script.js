// JS code goes here
/**
 * Sort order of the table based on name
 *
 * 0 = unsorted
 * 1 = ascending
 * 2 = descending
 * @type {number}
 */
let sortOrder = 0;

const getSortedList = () => {
  const { contactsList } = window;
  if (sortOrder === 0) {
    return contactsList;
  }
  const sortedList = contactsList.sort((a, b) => a.name.localeCompare(b.name));
  if (sortOrder === 1) {
    return sortedList;
  }
  return sortedList.reverse();
};

const updateTable = () => {
  const body = document.getElementById('summaryTable').children[1];
  body.innerHTML = getSortedList().map(
    (contact) =>
      `<tr><td>${contact.name}</td><td>${contact.mobile}</td><td>${contact.email}</td></tr>`
  ).join('\n');
}

const sortAlphabetically = () => {
  sortOrder = sortOrder === 1 ? 2 : 1;
  console.log(sortOrder)
  updateTable();
};



const addContact = (name, mobile, email) => {
  window.contactsList.push({
    name,
    mobile,
    email,
  });
  updateTable();
};

const validate = () => {
  document.getElementById('error').classList.add('dn');
  const name = document.getElementById('name').value.trim();
  const mobile = document.getElementById('mobile').value.trim();
  const email = document.getElementById('email').value.trim();

  const namePattern = new RegExp(/[\sa-zA-Z]{1,20}/);
  const validName = namePattern.test(name);

  const numberPattern = new RegExp(/\d{10}/);
  const validMobileNumber = numberPattern.test(mobile);

  const emailPattern = new RegExp(/[\w\-_.]+@[\w\-_.]+\.[\w\-_.]+/);
  const validEmail = emailPattern.test(email) && email.length < 40;

  if (!validName || !validMobileNumber || !validEmail) {
    document.getElementById('error').classList.remove('dn');
  } else {
    addContact(name, mobile, email);
    document.getElementById('name').value = '';
    document.getElementById('mobile').value = '';
    document.getElementById('email').value = '';
  }
};

const startup = () => {
  document.getElementById('nameColumn').onclick = sortAlphabetically;
  document.getElementById('submit').onclick = validate;
};
startup();