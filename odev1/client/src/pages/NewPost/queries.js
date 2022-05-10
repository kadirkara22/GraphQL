import { gql } from '@apollo/client';



export const GET_USERS = gql`
query getAllUsers{
    users{
      _id
      username
    }
      }
     
`;
export const GET_LOCATIONS = gql`
query getAllLocations{
    locations{
      _id
      name
    }
      }
     
`;


export const GET_EVENT_MUTATION = gql`
mutation addNewEvent($data:AddEventInput!){
  addEvent(
    data: $data
  ) {
    _id
title
    desc
   
}
}`