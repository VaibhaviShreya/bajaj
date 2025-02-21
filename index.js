require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();


app.use(cors());
app.use(express.json());


const USER_DETAILS = {
    user_id: "vaibhavi_shreya_07092004",
    email: "vaibhavi.shreya@gmail.com",
    roll_number: "22BCS16922"
};


app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});
app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;

        if (!data || !Array.isArray(data)) {
            return res.status(400).json({ is_success: false, error: "Invalid input: data must be an array" });
        }


        const numbers = data.filter(item => !isNaN(item) && item !== '');
        const alphabets = data.filter(item => /^[a-zA-Z]$/.test(item));
        const highest_alphabet = alphabets.length > 0 
            ? [alphabets.reduce((a, b) => a.toLowerCase() > b.toLowerCase() ? a : b)]
            : [];


        res.status(200).json({
            is_success: true,
            user_id: USER_DETAILS.user_id,
            email: USER_DETAILS.email,
            roll_number: USER_DETAILS.roll_number,
            numbers,
            alphabets,
            highest_alphabet
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ is_success: false, error: "Internal server error" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
