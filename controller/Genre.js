const db = require("../models");

const getAllGenre = async (req, res)=> {
    try {
        const allGenre =await db.Genre.findAll();
        res.status(200).json(allGenre)
    } catch (error) {
        res.status(404).json({message: "พบปัญหาในการดึงข้อมูล"})
    }   
}

module.exports = {
    getAllGenre
}