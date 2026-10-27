const data = {
  authors: [
    {
      id: "1",
      name: "J.K. Rowling",
      age: 55,
    },
    {
      id: "2",
      name: "George R.R. Martin",
      age: 72,
    },
    {
      id: "3",
      name: "J.R.R. Tolkien",
      age: 81,
    },
  ],
  books: [
    {
      id: "1",
      title: "Harry Potter and the Sorcerer's Stone",
      publishedYear: 1997,
      authorId: "1",
    },
    {
      id: "2",
      title: "Harry Potter and the Chamber of Secrets",
      publishedYear: 1998,
      authorId: "1",
    },
    {
      id: "3",
      title: "Harry Potter and the Prisoner of Azkaban",
      publishedYear: 1999,
      authorId: "3",
    },
  ],
};

export const resolvers = {
  Book: {
    author: (book) => {
      return data.authors.find((author) => author.id === book.authorId);
    },
  },
  Author: {
    books: (author) => {
      return data.books.filter((book) => book.authorId === author.id);
    },
  },
  Query: {
    authors: () => {
      return [data.authors[0], data.authors[1], data.authors[2]];
    },
    books: () => {
      return [data.books[0], data.books[1], data.books[2]];
    },
  },
  Mutation: {
    addAuthor: (_, { name, age }) => {
      const newAuthor = {
        id: String(data.authors.length + 1),
        name,
        age,
      };
      data.authors.push(newAuthor);
      return newAuthor;
    },
    addBook: (_, { title, publishedYear, authorId }) => {
      const newBook = {
        id: String(data.books.length + 1),
        title,
        publishedYear,
        authorId,
      };
      data.books.push(newBook);
      return newBook;
    },
  },
};
