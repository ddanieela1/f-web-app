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
        subject: '9/25/22',
        quote: "You have power over your mind not outside events. Realize this, and you will find strength. -Marcus Aurelius",
        entry: 'Collected a great number of curious & beautiful animals from the little pools left by the tide. The colours of the sponges & corallines are extremely vivid & it is curious how all animated nature becomes more gaudy as it approaches the hotter countrys.  ',
        userId: 1
      });
      console.log('new entry', newEntry);
  } catch (error) {
      console.log('new user was not created b/c of >>>', error);
  }
  
}

createEntry()

async function findAllJournals() {
  try {
      const journals = await db.journal.findAll();
      console.log('all users here >>>', journals);  
  } catch (error) {
      console.log('did not find all users because of >>>', error);
  }
}

findAllJournals()

async function createReminder() {
  try {
      const newReminder = await db.note.create({
        subject: 'Semi Annual Sale',
        note: 'Sales on shoes 10/22/22',
        userId: 1
      });
      console.log('new entry', newReminder);
  } catch (error) {
      console.log('new user was not created b/c of >>>', error);
  }
  
}

createReminder()