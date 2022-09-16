const db = require('./models')

async function dbTest() {
  const user = await db.user.findOne()
  const journal = await db.journal.create({
    Subject: 'New entry',
    Quote: 'Quote.',
    jounalId: journal.id
  })
  console.log(journal)
}

dbTest()

