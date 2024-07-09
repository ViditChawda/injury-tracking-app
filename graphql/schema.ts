import { gql } from "@apollo/client";

export const typeDefs = gql`
  type Report {
    id: ID!
    reporter: String
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
  type Query {
    analyticsData: AnalyticsData!
  }
  
  type AnalyticsData {
    reporterData: [ReporterCount]!
    dateData: [DateCount]!
    injuryData:[BodyPartCount]!
  }
  
  type ReporterCount {
    reporter: String!
    noOfReports: Int!
  }
  type DateCount {
    date: String!
    noOfReports: Int!
  }
  type BodyPartCount {
    body_part:String!
    noOfReports:Int!
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
    createReport(input: ReportCreateInput!): Report
  }
`;