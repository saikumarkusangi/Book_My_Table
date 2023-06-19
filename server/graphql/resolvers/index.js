const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const RestaurantModel = require('../../models/restaurant');
const UserModel = require('../../models/user');
const BookingModel = require('../../models/bookings');
const User = require('../../models/user');


const user = async userId => {
    try {
        const user = await UserModel.findById(userId);
        return { ...user._doc, bookings: bookings.bind(this, user._doc.bookings) }
    } catch (error) {
        throw error;
    }
}



const bookings = async bookingId => {
    try {
        const bookings = await BookingModel.find({ _id: { $in: bookingId } });
        return bookings.map(
            booking => {
                return { ...booking._doc, }
            }
        );

    } catch (error) {
        throw error;
    }
}



module.exports = {
    createUser: async (args) => {
        try {
            const existingUser = UserModel.findOne({mobile: args.input.mobile});
            if (existingUser) {
                throw new Error('User already exist mobile number.')
            }
            else{
                const hashedPassword = await bcrypt.hash(args.input.password, 12);
            const newUser = new UserModel({
                name: args.input.name,
                mobile: args.input.mobile,
                password: hashedPassword
            });
            const result = await newUser.save();
            return { ...result._doc, password: null };
            }

        } catch (error) {
            throw error;
        }
    },

    restaurants: async () => {
        try {
            const result = await RestaurantModel.Restaurant.find();
           return result;
        } catch (error) {
            throw error;
        }
    },

    restaurant: async (name) => {
        try {
            const result = await RestaurantModel.Restaurant.findOne(name);
           return  result;
        } catch (error) {
            throw error;
        }
    },

    createRestaurant: async (args) => {
        const newRestarant = new RestaurantModel.Restaurant({
            name: args.input.name,
            ratings: args.input.ratings,
            image: args.input.image,
            address: args.input.address,
            contactNumber: args.input.contactNumber,
            menuCard: args.input.menuCard
        });
        try {
            const result = await newRestarant.save();
            return { ...result._doc };
        } catch (error) {
            throw error;
        }
    },
    bookRestarant: async (args) => {
        const newBooking = new BookingModel({
            date: args.input.date,
            time: args.input.time,
            partySize: args.input.partySize,
            creater: args.input.creater,
            restaurant: args.input.restaurant
        });
        let userBookings;
        try {
            const result = await newBooking.save();
            userBookings = { ...result._doc };
            const user = await UserModel.findById(args.input.creater);
            if (!user) {
                throw new Error('User not exist');
            }
            user.bookings.push(newBooking);
            await user.save();

            return userBookings;
        } catch (error) {
            throw error;
        }

    },
    
     mybookings : async (bookingId) => {
        try {
           
            const bookings = await BookingModel.find({
                "$or": [{
                    restaurant: bookingId.bookingId
                }, {
                    creater: bookingId.bookingId
                }]
            });
            return bookings.map(
                booking => {
                    return { ...booking._doc ,creater:user.bind(this,booking._doc.creater)}
                }
            );
    
        } catch (error) {
            throw error;
        }
    },
    
    bookings: async () => {
      
        try {
            const result = await BookingModel.find()
          
           return result.map(
                booking => {
                    return {
                        ...booking._doc,
                        creater: user.bind(this, booking._doc.creater),
                        
                    }
                });
        } catch (error) {
            throw error;
        }
    },

    

};