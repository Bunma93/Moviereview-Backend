require('dotenv').config();
const db = require('./models');

const express = require('express');
const app = express();
const port = 8000;
const cors = require("cors");

const movieRoutes = require('./routes/Movie');
const userRoutes = require('./routes/User');
const actorRoutes = require('./routes/Actor');
const commentRoutes = require('./routes/Comment');
const playlistRoutes = require('./routes/Playlist');
const genreRoutes = require('./routes/Genre');

const passport = require('passport');

require('./config/passport/passport');// run jwt

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/movie', movieRoutes);
app.use('/user', userRoutes);
app.use('/actor', actorRoutes);
app.use('/comment', commentRoutes);
app.use('/playlist', playlistRoutes);
app.use('/genre', genreRoutes);

db.sequelize.sync({ force: false}).then(() => {
    app.listen(port, () => {
        console.log(`Server is Running at port ${port}`);
    })
});