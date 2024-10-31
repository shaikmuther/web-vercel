// api/send-email.js
const nodemailer = require('nodemailer');

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, message } = req.body;

        // Configure nodemailer transport
        const transporter = nodemailer.createTransport({
            service: 'Gmail', // Or another email service
            auth: {
                user: 'your-email@gmail.com', // Your email
                pass: 'your-email-password', // Your email password or app password
            },
        });

        const mailOptions = {
            from: email,
            to: 'info@domain.com', // Recipient's email
            subject: `New contact form submission from: ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        };

        try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: 'Email sent successfully!' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to send email.' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

