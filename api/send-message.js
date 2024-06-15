export default function handler(req, res) {
    if (req.method === 'POST') {
        const { message } = JSON.parse(req.body);
        // Simulate saving message to a database or storage
        console.log('Received message:', message);
        res.status(200).json({ success: true });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
