const { sequelize } = require('../models');
const db = require('../models');
const fs = require('fs');

const getAllNews = async (req, res) => {
    const allNews = await db.MovieNews.findAll();
    res.status(200).send(allNews);
};

const createNews = async (req, res) => {
    try {
        const { title, content } = req.body;
        console.log('Uploaded File:', req.file); // ตรวจสอบไฟล์ที่อัปโหลดเข้ามา

        const newsimagePath = req.file
            ? req.file.path
            : null;

        const newNews = await db.MovieNews.create({
            title,
            content,
            newsimagePath
        });

        res.status(201).json({ message: "เพิ่มข่าวสำเร็จ!", News: newNews});
    } catch(error) {
        try {
            if (req.file) {
                const newsPath = req.file.path;
                if (fs.existsSync(newsPath)) fs.unlinkSync(newsPath);
            }
        } catch (fsError) {
            console.error("Error deleting poster image file: ", fsError);
        }

        res.status(500).json({ message: "เกิดข้อผิดพลาดในการเพิ่มข่าว" });
    }
}
module.exports = {
    getAllNews,
    createNews
}