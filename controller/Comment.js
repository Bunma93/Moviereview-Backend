const { where } = require('sequelize');
const { sequelize } = require('../models');
const db = require('../models');


const getAllComment =  async (req, res)  => {
    try {
        const { MovieId } = req.query;

        if (!MovieId) {
            return res.status(400).json({ message: "MovieId is required" });
        }

        const allComment = await db.Comment.findAll({
            where: { MovieId: MovieId }, // กรองคอมเมนต์ตาม MovieId
            include: [{
                model:db.User,
                attributes: ['id','name','userimagePath']
            }]
        });
        res.status(200).json(allComment);
        
    } catch(error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({ message: "เกิดข้อผิดพลาดในการดึงคอมเมนต์" });
    }

};

const getCommentById = async (req, res) => {
    try {
        const commentByID = await db.Comment.findAll({
            where: {UserId: req.user.id},
            include: [{
                model:db.User,
                attributes: ['id','name','userimagePath']
            },
            {
                model: db.Movie,
                attributes: ['id', 'title', 'posterimagePath']
            }]
        });
        res.status(200).json(commentByID);

    } catch(error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({ message: "เกิดข้อผิดพลาดในการดึงคอมเมนต์" });
    }
}

const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const UserId = req.user.id;
        const UserRole = req.user.role;
        console.log("ลบคอมเมนต์ ID:", id);

        // ตรวจสอบว่า id มีค่า
        if (!id) {
            return res.status(400).send({ error: "Comment ID is required" });
        }

        // ลบข้อมูล
        let deletedRows;

        if (UserRole === 'admin') {
            deletedRows = await db.Comment.destroy({
            where: { id: id }
            })
        } else {
            deletedRows = await db.Comment.destroy({
            where: { id: id, UserId: UserId }
            })
        };

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
    try {
        const { commentText, ratingScore, MovieId } = req.body;
        const UserId = req.user.id;

        if (!MovieId) {
            return res.status(400).json({ message: "MovieId ไม่สามารถเป็นค่าว่างได้" });
        }


        // ตรวจสอบว่าผู้ใช้เคยคอมเมนต์ในหนังเรื่องนี้หรือไม่
        const existingComment = await db.Comment.findOne({
            where: { MovieId: MovieId, UserId:  UserId }
        });

        if (existingComment) {
            return res.status(400).json({ message: "คุณสามารถคอมเมนต์ได้เพียง 1 ครั้งต่อหนัง 1 เรื่องเท่านั้น" });
        }

        // เพิ่มคอมเมนต์
        const newComment = await db.Comment.create({
            commentText,
            ratingScore,
            MovieId,
            UserId
        });
        return res.status(201).json({ message: "คอมเมนต์สำเร็จ!", comment: newComment });

    } catch (error) {
        console.error("Error adding comment:", error);
        return res.status(500).json({ message: "เกิดข้อผิดพลาด โปรดลองอีกครั้ง" });
    }
}

const updateComment = async (req ,res) => {
    try {
        const { id } = req.params;
        const { commentText, ratingScore } = req.body;
        const UserId = req.user.id;

         const comment = await db.Comment.findOne({
            where: { id, UserId }
        });

        if (!comment) {
            return res.status(404).json({ message: "ไม่พบคอมเมนต์ หรือไม่มีสิทธิ์แก้ไข" });
        }

       await db.Comment.update(
            { commentText, ratingScore },
            { where: { id, UserId } }
        );

        return res.status(201).json({ message: "แก้ไขคอมเม้นสำเร็จ"})
    } catch (err) {
        console.log("เกิดความผิดพลาดในการแก้ไขคอมเม้น", err);
        return res.status(500).json({ message: "เกิดความผิดพลาดในการแก้ไขคอมเม้น"});
    }
}

module.exports = {
    getAllComment,
    createComment,
    deleteComment,
    getCommentById,
    updateComment
};