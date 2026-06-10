import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {

    if (req.method !== 'POST') {
        return res.status(405).json({
            error: 'Method not allowed'
        });
    }

    const { date, message } = req.body;

    try {

        await sql`
            INSERT INTO responses(date, message)
            VALUES(${date}, ${message})
        `;

        return res.status(200).json({
            success: true
        });

    } catch(err) {

        console.error(err);

        return res.status(500).json({
            error: 'Database error'
        });
    }
}