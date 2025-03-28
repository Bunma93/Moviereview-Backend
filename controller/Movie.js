const { sequelize } = require('../models');
const db = require('../models');
const fs = require('fs');
const path = require('path'); 
const { Op } = require('sequelize');

const getAllMovies = async (req, res)  => {
    const allMovies  = await db.Movie.findAll();
    res.status(200).send(allMovies);
};

const getMovieByID = async (req, res)  => {
    const { id } = req.params;
    try {
        const movieByID = await db.Movie.findByPk(id, {
            include: [
                {
                    model: db.Actor, // เชื่อมกับ Actor
                    through: { attributes: [] }, // ไม่ดึงข้อมูลจากตารางกลาง Act
                    attributes: ['id', 'actorname', 'actorimagePath']
                }
            ]
        });
        
        if (!movieByID) {
            return res.status(404).send({ message: "Movie not found" });
        }
    res.status(200).send(movieByID);
    } catch {
        res.status(500).send({ message: "Error fetching movies" });
    }
};
const getMovieByRank = async (req, res)  => {
    try {
        const topMovies = await db.Movie.findAll({
            where: { rank: { [Op.ne]: null } },
            order: [["rank","ASC"]] // เรียงจากอันดับ 1 ขึ้นไป
        });
        
        res.status(200).json(topMovies);
    } catch (error) {
        res.status(500).json({ message: "เกิดข้อผิดพลาดในการดึงข้อมูล" });
    }
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
    try {
        const { title, engTitle, date, description, Atcinema, age, lang, trailerUrl } = req.body;
        console.log('Uploaded Files:', req.files); // ตรวจสอบไฟล์ที่อัปโหลดเข้ามา
        // ตรวจสอบว่า Multer อัปโหลดไฟล์สำเร็จหรือไม่
        const posterimagePath = req.files['posterimagePath']
            ? req.files['posterimagePath'][0].path
            : null;

        const backgroundimagePath = req.files['backgroundimagePath']
            ? req.files['backgroundimagePath'].map(file => file.path) // เก็บทุก path เป็น array
            : [];

        // สร้างข้อมูลหนังใหม่
        const newMovie = await db.Movie.create({
            title,
            engTitle,
            date,
            description,
            age,
            Atcinema: Atcinema === 'true', // แปลงค่า String เป็น Boolean
            posterimagePath,
            backgroundimagePath: JSON.stringify(backgroundimagePath),
            lang: JSON.stringify(lang),
            trailerUrl
        });

        res.status(201).json({ message: "เพิ่มภาพยนตร์สำเร็จ!", movie: newMovie });
    } catch (error) {
        try {
            if (req.files['posterimagePath']) {
                const posterPath = req.files['posterimagePath'][0].path;
                if (fs.existsSync(posterPath)) fs.unlinkSync(posterPath); // ลบไฟล์โปสเตอร์
            }
        } catch (fsError) {
            console.error("Error deleting poster image file: ", fsError);
        }

        try {
            if (req.files['backgroundimagePath']) {
                req.files['backgroundimagePath'].forEach(file => {
                    if (fs.existsSync(file.path)) fs.unlinkSync(file.path); // ลบไฟล์พื้นหลัง
                });
            }
        } catch (fsError) {
            console.error("Error deleting background image files: ", fsError);
        }

        res.status(500).json({ message: "เกิดข้อผิดพลาดในการเพิ่มภาพยนตร์" });
    }
};

const updateMovies = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, engTitle, date, description, Atcinema, age, lang, trailerUrl } = req.body;

        const movie = await db.Movie.findByPk(id);
        if (!movie) {
            return res.status(404).json({ message: "ไม่พบภาพยนตร์ที่ต้องการแก้ไข" });
        }

        let posterimagePath = movie.posterimagePath;
        if (req.files?.posterimagePath)  {
            if (movie.posterimagePath) {
               const oldImagePath = path.join(__dirname, '..', movie.posterimagePath);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
            posterimagePath = req.files['posterimagePath'][0].path; // อัปเดต path รูปใหม่
        }

        let backgroundimagePath = movie.backgroundimagePath ? JSON.parse(movie.backgroundimagePath) : [];
        if (req.files?.backgroundimagePath) {
            // ลบไฟล์เก่าก่อน
            if (Array.isArray(backgroundimagePath)) {
                backgroundimagePath.forEach(oldPath => {
                    const oldBgPath = path.join(__dirname, '..', oldPath);
                    if (fs.existsSync(oldBgPath)) {
                        fs.unlinkSync(oldBgPath);
                    }
                });
            }

            // ใช้ path ของไฟล์ใหม่
            backgroundimagePath = req.files['backgroundimagePath'].map(file => file.path);
        }

        await movie.update({
            title,
            engTitle,
            date,
            description,
            Atcinema: Atcinema === 'true',
            age,
            lang: JSON.stringify(lang || []),
            posterimagePath,
            backgroundimagePath: JSON.stringify(backgroundimagePath),
            trailerUrl
        })
        res.status(200).json({message:"แก้ไขภาพยนตร์สำเร็จ!", movie})
    } catch (error) {
        try {
            if (req.files['posterimagePath']) {
                const posterPath = req.files['posterimagePath'][0].path;
                if (fs.existsSync(posterPath)) fs.unlinkSync(posterPath); // ลบไฟล์โปสเตอร์
            }
        } catch (fsError) {
            console.error("Error deleting poster image file: ", fsError);
        }

        try {
            if (req.files['backgroundimagePath']) {
                req.files['backgroundimagePath'].forEach(file => {
                    if (fs.existsSync(file.path)) fs.unlinkSync(file.path); // ลบไฟล์พื้นหลัง
                });
            }
        } catch (fsError) {
            console.error("Error deleting background image files: ", fsError);
        }
        res.status(500).json({ message: "เกิดข้อผิดพลาดในการแก้ไขภาพยนตร์" });
    }
}

module.exports = {
    getMovieByID,
    getAllMovies,
    getMovieByRank,
    deleteMovies,
    createMovies,
    updateMovies
};