const {buildSchema} = require('graphql');


module.exports = buildSchema(
    `
    input RestaurantInput {
      name:String!
      ratings:Float!
      image:String!
      address:String!
      contactNumber:String!
      menuCard:String!
    }
  
   type User {
    _id:ID!
    mobile:String!
    password:String
    name:String!
    bookings:[Booking!]
   }
  
   input UserInput {
    name:String!
    mobile:String!
    password:String!
   }
  
    type Restaurant {
      _id:ID!
      name:String!
      ratings:Float!
      image:String!
      address:String!
      contactNumber:String!
      menuCard:String!
    }
  
    type PageInfo{
      pageCount:Int
    }

     type Booking {
      restaurant:ID!
      date:String!
      time:String!
      partySize:Int!
      creater:User!
     }
  
     input BookingInput {
      date:String!
      time:String!
      partySize:Int!
      creater:ID!
      restaurant:ID!
     }

    type Query {
     
      restaurant(name:String!):Restaurant
      restaurants:[Restaurant!]
      mybookings(bookingId:String!):[Booking!]
      bookings:[Booking!]
    }
  
    type Mutation {
      createRestaurant(input:RestaurantInput):Restaurant
      createUser(input:UserInput):User
      bookRestarant(input:BookingInput):Booking
    }
  
    `
  );