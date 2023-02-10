import {graphqlHTTP} from "express-graphql";
import {buildSchema} from "graphql";
import express from "express";
// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
interface Error {
  code: String!
  message: String!
}

type DefaultError implements Error {
    code: String!
    message: String!
}

type SomeOtherError implements Error {
  code: String!
  message: String!
  extension: String
}

type OperationResult {
  isSuccess: Boolean!
  error: DefaultError
}

type Query {
   hello: String
}

type Mutation {
  doSmth: OperationResult!
}

`);

// The root provides a resolver function for each API endpoint
const root = {
    hello: () => {
        return 'Hello world!';
    },
    doSmth: () => {
        return {
            isSuccess: false,
            error: {
                code: "1234",
                message: "1234 error is happened",
                extension: 'extension value',
            }
        }
    },
};

const app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
