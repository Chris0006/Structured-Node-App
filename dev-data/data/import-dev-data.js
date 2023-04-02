const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' })
const Tour = require('./../../models/tourModel');

const DB = process.env.DATABASE_LOCAL;
mongoose.connect(DB, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
}).then(() => console.log('[+] DB connected'))

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));


// import to the database
const importData = async () => {
    try {
        await Tour.create(tours)
        console.log('[+] Data loaded')
    } catch (err){
        console.log(err)
    }
    process.exit()
};

// delete all data
const deleteData = async () => {
    try {
        await Tour.deleteMany()
        console.log('[+] Data deleted')
    } catch (err) {
        console.log(err)
    }
    process.exit()

};

if (process.argv[2] == '--import') importData()
else if (process.argv[2] == '--delete') deleteData()

console.log(process.argv)