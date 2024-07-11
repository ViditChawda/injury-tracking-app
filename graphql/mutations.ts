
import { gql } from "@apollo/client";

export const CREATE_REPORT = gql`
  mutation Mutation($input: ReportCreateInput!) {
    createReport(input: $input) {
      date
      time
      reporter_name 
      report_name
      injuries {
       description
       body_part
       body_part_id
    }
}
}
`;

export const UPDATE_REPORT = gql`
  mutation UpdateReport($input: ReportUpdateInput!) {
    updateReport(input: $input) {
      id
      date
      time
      reporter_name
      report_name
      injuries {
        description
        body_part
        body_part_id
      }
    }
  }
`;


export const DELETE_REPORT = gql`
  mutation DeleteReport($id: ID!) {
    deleteReport(id: $id) {
      id
      report_name
      reporter_name
      date
      time
      injuries {
        description
        body_part
        body_part_id
      }
    }
  }
`;