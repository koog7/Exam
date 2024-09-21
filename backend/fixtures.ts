import mongoose from "mongoose";
import {randomUUID} from "crypto";
import User from "./models/User";
import Product from "./models/Product";

const run = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/Exam');
    const db = mongoose.connection;
    try {
        await db.dropCollection('products')
        await db.dropCollection('users')
        await db.dropCollection('users')
    }catch (e) {
        console.log(e)
    }

    const users = await User.create([
        {
            username: 'User1',
            password: 'password1',
            displayName: 'Real User1',
            phoneNumber: '+996 111 11 11',
            token: randomUUID(),
        },
        {
            username: 'User2',
            password: 'password2',
            displayName: 'Real User2',
            phoneNumber: '+996 22 22 22',
            token: randomUUID(),
        },
    ]);

    const [user1, user2] = users;

    await Product.create([
        {
            title: 'Porsche GT3 RS',
            description: 'The new 911 GT3 with the Touring package.',
            price: 250000,
            category: 'cars',
            image: 'prosche911.jpg',
            userId: user1._id,
        },
        {
            title: 'Porsche 911 Cabriolet',
            description: 'They are equipped with a fully automatic fabric roof. The roof can be opened and closed in approx.',
            price: 127000,
            category: 'cars',
            image: '911C.webp',
            userId: user1._id,
        },
        {
            title: 'Porsche 911',
            description: 'The Porsche 911 sports car received a hybrid version for the first time.',
            category: 'cars',
            price: 230000,
            image: 'porsche.webp',
            userId: user2._id,
        },
        {
            title: 'Robinson R66',
            description: 'Aviation Sales International presents this practically new Robinson R66 Helicopter with only 200 hours total time and always hangared.',
            category: 'helicopter',
            price: 1470000,
            image: 'RobinsonR66.webp',
            userId: user2._id,
        },
    ]);

    await db.close();
}
run().catch(console.error)