
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