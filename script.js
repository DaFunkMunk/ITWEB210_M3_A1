let contacts = [];

function promptContact() {
    const name = prompt("Enter contact name:");
    if (!name) return null;

    const address = prompt("Enter contact address:") || "";
    const phone = prompt("Enter contact phone number:") || "";
    let email = prompt("Enter contact email(s), separated by commas:") || "";

    email = email
        .split(',')
        .map(e => e.trim())
        .filter(e => e)
        .join('; ');

    return { name, address, phone, email };
}

function startContactPrompt() {
    let notifiedAtTen = false;

    while (true) {
        const newContact = promptContact();
        if (!newContact) break;

        contacts.push(newContact);

        if (contacts.length === 10 && !notifiedAtTen) {
            alert("You have added 10 contacts. You may continue adding more if you'd like.");
            notifiedAtTen = true;
        }

        const addMore = prompt("Would you like to add another contact? (yes/no)").toLowerCase();
        if (addMore !== "yes") break;
    }

    contacts.sort((a, b) => a.name.localeCompare(b.name));
    displayContacts();
    displayEmails();
}

function displayContacts() {
    const container = document.getElementById("tableContainer");

    if (contacts.length === 0) {
        container.innerHTML = "<p>No contacts available.</p>";
        return;
    }

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

    for (const contact of contacts) {
        tableHTML += `
            <tr>
                <td>${contact.name}</td>
                <td>${contact.address}</td>
                <td>${contact.phone}</td>
                <td>${contact.email}</td>
            </tr>`;
    }

    tableHTML += "</tbody></table>";
    container.innerHTML = tableHTML;
}

function displayEmails() {
    const emailBox = document.getElementById("emailListBox");

    const allEmails = contacts.flatMap(c => c.email.split(";"))
        .map(e => e.trim())
        .filter(e => e)
        .filter((e, i, arr) => arr.indexOf(e) === i);

    emailBox.value = allEmails.join(";");
}

window.addEventListener("DOMContentLoaded", () => {
    const emailBox = document.getElementById("emailListBox");
    if (emailBox) {
        emailBox.value = "";
    }
});
