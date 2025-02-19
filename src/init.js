import 'dotenv/config';
import './db.js';
import app from './server';

const PORT = 3000;

const handleListening = () => console.log(`✅ Server listening on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
