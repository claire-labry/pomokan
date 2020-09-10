import * as express from 'express';



// express setup
const app = express();

// middleware setup
app.use(express.urlencoded({extended:true}));

app.use(express.json);



const PORT = process.env.PORT || 5000