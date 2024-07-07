import { gql } from "@apollo/client";

export const typeDefs = gql`
  type Report {
    id: ID!
    reporter: String
    date: String
    time:String
  },
  type Query{
    allReports:[Report]
  }
`;
