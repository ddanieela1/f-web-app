const db = require('./models')

// async function dbTest() {
//   const journal = await db.journal.create({
//     Subject: 'New entry',
//     Quote: 'Quote.',
//     jounalId: journal.id
//   })
//   console.log(journal)
// }

// dbTest()

async function createEntry() {
  try {
      const newEntry = await db.journal.create({
        subject: 'New Subject',
        quote: 'quote',
        entry: 'New Entry',
        userId: 1
      });
      console.log('new entry', newEntry);
  } catch (error) {
      console.log('new user was not created b/c of >>>', error);
  }
  
}

createEntry()

<ul>
  <% journals.forEach(function(journal) { %>
    <li> <a href="./journal/<%= journal.id %>"><%= journal.subject %></a></li>
    <li><%= journal.entry %> </li>
  <% }) %>
  </ul>