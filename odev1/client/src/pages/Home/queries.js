import { gql } from '@apollo/client';

const eventFragment = gql`
fragment EventFragment on Event {
  _id
      title
      desc
      date
}


`

export const GET_EVENTS = gql`
query getAllEvents{
    events{
      ...EventFragment
    }
      }
      ${eventFragment}
`;

export const EVENTS_SUBSCRIPTION = gql`
subscription{
    eventCreated{
      ...EventFragment
    }
      }
      ${eventFragment}
`;