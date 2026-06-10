import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {

    if (req.method !== 'POST') {
        return res.status(405).json({
            error: 'Method not allowed'
        });
    }

    const { date, message } = req.body;

    try {

        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'shashank9940@gmail.com',
            subject: '💕 Date Selection Received',
            html: `
                <h2>Someone selected a date 💕</h2>

                <p><strong>Date:</strong> ${date}</p>

                <p><strong>Message:</strong></p>

                <p>${message || 'No message provided'}</p>
            `
        });

        return res.status(200).json({
            success: true
        });

    } catch(err) {

        console.error(err);

        return res.status(500).json({
            error: 'Failed to send email'
        });
    }
}