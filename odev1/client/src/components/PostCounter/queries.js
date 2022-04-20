import { gql } from '@apollo/client';
export const EVENT_COUNT_SUBSCRIPTION = gql`
subscription {
    eventCount
}
`;
