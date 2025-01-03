const { sequelize } = require('../models');
const db = require('../models');

const getAllMovies =  async (req, res)  => {
    const allMovies  = await db.Movie.findAll();
    res.status(200).send(allMovies);
};

const deleteMovies = async (req, res) => {
    try {
        console.log(req.params.id); // ตรวจสอบ id
        await db.Movie.destroy({
            where: { id: req.params.id } // ตรวจสอบว่า id ถูกส่งมาและมีค่า
        });
        res.status(200).send({ message: "Movie deleted successfully" });
    } catch (error) {
        console.error('Failed to delete movie:', error);
        res.status(500).send({ error: 'Failed to delete movie' });
    }
};

const createMovies = async (req, res) => {
    const {title, date, description} = req.body;
    const newMovie = await db.Movie.create({
        //แก้แอตทริบิ้ว
        title:title,
        date:date,
        description:description
    });
    res.status(201).send(newMovie);
}

module.exports = {
    getAllMovies,
    deleteMovies,
    createMovies
};