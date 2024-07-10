import { gql } from "@apollo/client";

export const typeDefs = gql`
  type Report {
    id: ID!
    report_name : String
    reporter_name: String
    date: String
    time:String
    injuries :[Injury]
  },
  type Injury{
    injury_id:ID!
    report:Report
    body_part_id : String!
    description:String
    body_part:String
  }
  type Query {
    report(id:ID!):Report
  }
  type Query{
    allReports:[Report]
  }
  input InjuryCreateInput {
    description: String!
    body_part: String!
    body_part_id : String!
  }
  
  input ReportCreateInput {
    reporter_name: String!
    report_name: String!
    date: String!
    time:String!
    injuries: [InjuryCreateInput!]
  }
  
  type Mutation {
    createReport(input: ReportCreateInput!):Report
}
`;