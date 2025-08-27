const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

class User {
    constructor(username, birthdate, age, email, password) {
        this.username = username;
        this.birthdate = birthdate;
        this.age = age;
        this.email = email;
        this.password = password;
        this.valid = false;
    }
}

// Test users - in a real application, use a database
const users = [
    new User('user1', '1990-01-15', 34, 'user1@example.com', 'password123'),
    new User('admin', '1985-05-20', 39, 'admin@example.com', 'admin123'),
    new User('testuser', '1995-12-10', 28, 'test@example.com', 'test123')
];

//Authentication route
app.post('/api/auth', (req, res) => {
    const { email, password } = req.body;

    console.log('Login attempt for:', email);

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {

        const userResponse = {
            username: user.username,
            birthdate: user.birthdate,
            age: user.age,
            email: user.email,
            valid: true
        };
    
        res.json(userResponse);
    } else {
        res.json({ valid: false });
    }
});

//Update user profile route
app.post('/api/profile/update', (req, res) => {
    const { email, username, birthdate, age } = req.body;

    const userIndex = users.findIndex(u => u.email === email);

    if (userIndex !== -1) {
        users[userIndex].username = username;
        users[userIndex].birthdate = birthdate;
        users[userIndex].age = age;

        const updatedUser = {
            username: users[userIndex].username,
            birthdate: users[userIndex].birthdate,
            age: users[userIndex].age,
            email: users[userIndex].email,
            valid: true
        };
        
        console.log('Profile updated successfully for:', email);

        res.json(updatedUser);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});


//Start server
app.listen(PORT, () => {
    console.log('\n========================================');
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log('========================================');
});