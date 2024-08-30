const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

app.use(cors({credentials: true, origin: "http://localhost:5173"}));
app.use(express.json());

const JWT_SECRET = "809e176390b96b8c38f517392b8b362cf39cd47a2ea67e0eb241881897dc9a7f";


app.post('/register', async (req, res) => {
    const {email, password} = req.body;

    try {
        const existingUser = await prisma.user.findUnique({where: {email}});
        if (existingUser) {
            return res.status(400).json({error: 'User already exists'});
        }

        const hashedPass = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPass,
            }
        });

        res.status(201).json({message: 'User registered successfully', userId: newUser.id});
    }
    catch (error) {
        console.error('Error creating user', error);
        res.status(500).json({error: 'Internal server error'});
    }

});

app.post('/login', async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await prisma.user.findUnique({where: {email}});
        if (!user) {
            return res.status(400).json({error: 'Invalid email'});
        }

        const isPassOk = await bcrypt.compare(password, user.password);
        if (!isPassOk) {
            return res.status(400).json({error: 'Invalid password'});
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email},
            JWT_SECRET,
            {expiresIn: '1h'}
        )

        res.json({message: 'User logged in successfully', token});
    }
    catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({error: 'Internal server error'});
    }
})

app.listen(3010);

process.on('SIGINT', async () => {
    await prisma.$disconnect();
    process.exit();
});