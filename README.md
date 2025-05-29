# ITWEB210_M3_A1

SECTION 1: Global Contact List

  let contacts = [];

    Explanation:
    Creates an empty list (array) to store contact objects.
    Think of this as a notebook to store each contact's information.

SECTION 2: Get User Input — promptContact()

  function promptContact() {

    Explanation:
    Starts the function that asks the user for a contact's information.

  const name = prompt("Enter contact name:");
  if (!name) return null;

    Explanation:
    Shows a popup asking for a name.
    If nothing is entered or canceled, the function exits.
    
  const address = prompt("Enter contact address:") || "";
  const phone = prompt("Enter contact phone number:") || "";
  
    Explanation:
    Asks for address and phone number.
    If left blank, stores an empty string.
    
  let email = prompt("Enter contact email(s), separated by commas:") || "";
  
    Explanation:
    Asks the user to enter one or more emails separated by commas.email = email
    
  .split(',')
  .map(e => e.trim())
  .filter(e => e)
  .join('; ');
  
    Explanation:
    Splits emails at commas into a list.
    Removes extra spaces around each email.
    Deletes blank entries.
    Joins them back into one string using ;.
    
  return { name, address, phone, email };
  }
  
    Explanation:
    Returns a new contact object.
    
SECTION 3: Collect Multiple Contacts — startContactPrompt()

  function startContactPrompt() {
  let notifiedAtTen = false;
  
    Explanation:
    Starts the function.
    Creates a flag so we only notify the user once after 10 contacts.
    
  while (true) {
  
    Explanation:
    Starts an infinite loop until the user decides to stop.const newContact = promptContact();
    
  if (!newContact) break;
  
    Explanation:
    Asks for a contact.
    If user cancels or doesn't input a name, exit the loop.
    
  contacts.push(newContact);
  
    Explanation:
    Adds the new contact to the list.
    
  if (contacts.length === 10 && !notifiedAtTen) {
  alert("You have added 10 contacts. You may continue adding more if you'd like.");
  notifiedAtTen = true;
  }
  
    Explanation:
    Alerts the user when 10 contacts are added.
    
  const addMore = prompt("Would you like to add another contact? (yes/no)").toLowerCase();
  if (addMore !== "yes") break;
  
    Explanation:
    Asks if the user wants to continue.
    If not "yes", stops the loop.
    
  contacts.sort((a, b) => a.name.localeCompare(b.name));
  displayContacts();
  displayEmails();
  }
  
    Explanation:
    Sorts the list alphabetically by name.
    Shows the full contact table and email list.

SECTION 4: Show Table of Contacts — displayContacts()

  function displayContacts() {
  const container = document.getElementById("tableContainer");

    Explanation:
    Finds the area on the page where the contact list will appear.
    
  if (contacts.length === 0) {
  container.innerHTML = "<p>No contacts available.</p>";
  return;
  }
  
    Explanation:
    If no contacts, show a message and exit.
    
  let tableHTML = `
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Address</th>
        <th>Phone</th>
        <th>Email</th>
      </tr>
  </thead>
  <tbody>`;
    
    Explanation:
    Begins creating HTML for a contact table.
    
  for (const contact of contacts) {
  tableHTML += `
  <tr>
    <td>${contact.name}</td>
    <td>${contact.address}</td>
    <td>${contact.phone}</td>
    <td>${contact.email}</td>
  </tr>`;
  }
  
    Explanation:
    Adds each contact as a row in the table.

  tableHTML += "</tbody></table>";
  container.innerHTML = tableHTML;
  }
  
    Explanation:
    Finishes table and places it in the webpage.
    
SECTION 5: Show Unique Emails — displayEmails()

  function displayEmails() {
  const emailBox = document.getElementById("emailListBox");
  
    Explanation:
    Finds the text box where emails will appear.
    
  const allEmails = contacts.flatMap(c => c.email.split(";"))
    .map(e => e.trim())
    .filter(e => e)
    .filter((e, i, arr) => arr.indexOf(e) === i);
    
    Explanation:
    Breaks all emails apart.
    Trims and filters.
    Removes duplicates by checking if each email appears earlier in the list.
    
  emailBox.value = allEmails.join(";");
  }
  
    Explanation:
    Combines cleaned emails and puts them in the text box.
  
  SECTION 6: Clear Email Box When Page Loads
    
  window.addEventListener("DOMContentLoaded", () => {
    const emailBox = document.getElementById("emailListBox");
    if (emailBox) {
      emailBox.value = "";
    }
  });
  
    Explanation:
    As soon as the page is ready, clears the email box.
    Prevents leftover text from a previous session.
