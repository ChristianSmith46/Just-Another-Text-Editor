import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // Open jate db
  const jateDb = await openDB('jate', 1);

  // Create readwrite transaction to edit db
  const transaction = jateDb.transaction('jate', 'readwrite');
  // Get jate Stores with permission from transaction type above
  const store = transaction.objectStore('jate');

  // Add the content as value to the jate db
  const request = store.add({value: content});

  // Async await the result
  const result = await request;
  // console.log(`putDb: ${result}`);
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  // Open the jate db
  const jateDb = await openDB('jate', 1);

  // Setup the transaction type this time readme since we wont edit anything
  const transaction = jateDb.transaction('jate', 'readonly');

  // Get the jate stores using the transaction type above
  const store = transaction.objectStore('jate');

  // Get everything from the jate db
  const request = store.getAll();

  // Async await to get the data
  const result = await request;
  // Returning only the value from the last index that way we don't have to edit editor logic
  if (result.length < 1) {
    return null;
  }
  return result[result.length - 1].value;
}

initdb();
