import express from 'express';
import { ENV } from './lib/env.js';
import authRoutes from './routes/auth.route.js';
import path from 'path';
import { connect_DB } from './lib/db.js';

const app = express();
const __dirname = path.resolve();
const port = ENV.PORT || 3000;

console.log(`PORT: ${ENV.PORT}`);

app.use(express.json());

app.use("/api/auth",authRoutes);

//ready for production
if (ENV.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));
    
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
    });
}

app.listen(port, () =>  {console.log(`Server is running on http://localhost:${port}`);
    connect_DB(ENV.MONGO_URL);
});
