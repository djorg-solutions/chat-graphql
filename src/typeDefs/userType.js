import { gql } from 'apollo-server-express'

export default gql`
 type User{
   id: ID!
   username: String!
   password: String!
   name: String!
   avatar: String
   email: String
   country: String
   phone: String
   chats: [Chat]
   createdAt: String!
 }

 extend type Query {
  me: User @auth
  user(id: ID!): User
  users:[User!]!
 }
 
 extend type Mutation {
  signUp(name: String!, username: String!, password: String!,email: String, phone: String, country: String): User
  signIn(username: String!, password: String!): String!
 }
`