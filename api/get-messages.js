export default function handler(req, res) {
    if (req.method === 'GET') {
        // Simulate fetching messages from a database or storage
        const messages = [
            "Hello!",
            "How are you?",
            "I'm good, thanks!",
            "What about you?",
            "I'm doing well, just working on some code."
        ];
        res.status(200).json({ messages });
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
