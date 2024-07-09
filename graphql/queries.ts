import { gql } from "@apollo/client";

export const GET_REPORTS = gql`
  query AllReports {
    allReports {
      id
      date
      Injury {
        body_part
        description
      }
      reporter
      time
    }
  }
`;