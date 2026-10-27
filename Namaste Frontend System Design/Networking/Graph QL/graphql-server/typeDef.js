export const typeDefs = `#graphql
    type Author {
    id: ID
    name: String
    age: Int
    books: [Book]
    }
    type Book {
    id: ID
    title: String
    publishedYear: Int
    author:Author
}

type Query {
    authors: [Author]
    books: [Book]
}
type Mutation {
    addAuthor(name: String, age: Int): Author
    addBook(title: String, publishedYear: Int, authorId: ID): Book
}`;
