const { where } = require('sequelize');
const { sequelize } = require('../models');
const db = require('../models');

const getAllComment =  async (req, res)  => {
    const allComment  = await db.Comment.findAll()
        // ({
        //     where:{ UserID: req.user.id }
        // });
    res.status(200).send(allComment);
};

const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;

        // ตรวจสอบว่า id มีค่า
        if (!id) {
            return res.status(400).send({ error: "Comment ID is required" });
        }

        // ลบข้อมูล
        const deletedRows = await db.Comment.destroy({
            where: { id: id }
        });

        // ตรวจสอบว่ามีการลบข้อมูลสำเร็จหรือไม่
        if (deletedRows === 0) {
            return res.status(404).send({ error: "Comment not found" });
        }

        res.status(200).send({ message: "Comment deleted successfully" });
    } catch (error) {
        console.error("Failed to delete comment:", error);
        res.status(500).send({ error: "Failed to delete comment" });
    }
};


const createComment = async (req, res) => {
    const {commentDate, commentText, ratingscore, MovieId} = req.body;
    const newMovie = await db.Comment.create({
        commentDate:commentDate,
        commentText:commentText,
        ratingscore:ratingscore,
        MovieId: MovieId,
        UserId:5
    });
    res.status(201).send(newMovie);
};

module.exports = {
    getAllComment,
    createComment,
    deleteComment
};