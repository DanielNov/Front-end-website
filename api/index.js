const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const prisma = new PrismaClient();

app.use(cors({credentials: true, origin: "http://localhost:5173"}));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());

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

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600000
        });

        res.json({message: 'User logged in successfully', token});
    }
    catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({error: 'Internal server error'});
    }
})

app.get('/user', (req, res) => {
    const {token} = req.cookies;
    if (!token) {
        return res.status(401).json({error: 'Token not found'});
    }
    jwt.verify(token, JWT_SECRET, (err) => {
        if (err) {
            return res.status(403).json({error: 'Invalid or expired token'});
        }
        res.status(200).json({ isLoggedIn: true });
    })
})

app.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'User logged out successfully' });
})
app.listen(3010);

process.on('SIGINT', async () => {
    await prisma.$disconnect();
    process.exit();
});