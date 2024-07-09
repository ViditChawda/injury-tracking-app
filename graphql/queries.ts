import { gql } from "@apollo/client";

export const GET_REPORTS = gql`
  query AllReports {
    allReports {
      id
      date
      reporter
      time
      Injury {
        body_part
        body_part_id
        description
      }
    }
  } 
`;

export const GET_REPORT_BY_ID = gql`
query Report($reportId: ID!) {
  report(id: $reportId) {
    id
    reporter
    date
    time
    Injury {
      body_part
      body_part_id
      description
    }
  }
}`