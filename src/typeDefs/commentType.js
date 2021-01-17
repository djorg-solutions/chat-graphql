import { gql } from 'apollo-server-express'

export default gql`
 type Comment{
   id: ID!
   description: String!
   user: User!
   chat: Chat!
   createdAt: Date!
 }

 extend type Query {
  comments:[Comment!]!
 }
 
 extend type Mutation {
  newComment(description: String!, user: ID, chat:ID): Comment
 }

 extend type Subscription {
  commentAdded: Comment
 }
`