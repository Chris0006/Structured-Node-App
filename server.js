const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config({ path: './config.env' })
const app = require('./app');

const DB = process.env.DATABASE_LOCAL;
mongoose.connect(DB, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
}).then(() => console.log('[+] DB connected'))





const port = process.env.PORT || 8000;
app.listen(port, '192.168.0.103', () => {
    console.log('[+] Server started')
})