let notes = [
  {
    author: 'Raquel',
    id: 1,
    title: 'first note',
    content: 'My first note is here.'
  }
];

export const list = () => {
  return notes.map(({ id, title, author }) => ({
    author,
    id,
    title
  }));
};

export const get = (id) => {
  const note = notes.find((note) => note.id === id);

  if (!note) {
    throw new Error('Note not found');
  }

  return note;
};

export const create = (author, title, content) => {
  const { id: lastId } = notes[notes.length - 1];

  const newNote = {
    author,
    id: lastId + 1,
    title,
    content
  };

  notes.push(newNote);
  return newNote;
};

export const update = (author, id, title, content) => {
  const index = notes.findIndex((note) => note.id === id);

  if (index < 0) {
    throw new Error('Note not found for update');
  }

  const note = notes[index];
  note.author = author;
  note.title = title;
  note.content = content;

  notes[index] = note;
  return note;
};

export const remove = (id) => {
  if (!notes.some((note) => note.id === id)) {
    throw new Error('Note not found for delete');
  }

  notes = notes.filter((note) => note.id !== id);
};