const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log("Hashed Password:", hashedPassword);
};

hashPassword("Seth82004!?"); // Replace with your password
