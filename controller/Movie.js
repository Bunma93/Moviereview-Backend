const { sequelize } = require('../models');
const db = require('../models');
const fs = require('fs');
const path = require('path'); 
const { Op, fn, col, literal } = require('sequelize');

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
                    attributes: ['id', 'actorname', 'actorimagePath', 'role', 'country']
                },
                {
                    model: db.Genre, // ดึง Genre ที่เกี่ยวข้อง
                    through: { attributes: [] }, // ถ้ามีตารางกลาง เช่น MovieGenre
                    attributes: ['id', 'genreName'] 
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
            order: [["rank","ASC"]], // เรียงจากอันดับ 1 ขึ้นไป
            include: [
                {
                model: db.Comment,
                attributes: [],
                },
            ],
            attributes: {
                include: [
                    [fn("AVG", col("Comments.ratingScore")), "averageRating"],
                    [fn("COUNT", col("Comments.id")), "reviewCount"]
                ]
    
            },
             group: ['Movie.id'],
             raw: true,
        });
        
        res.status(200).json(topMovies);
    } catch (error) {
        console.error("🔥 SERVER ERROR:", error);
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
        const { title, engTitle, date, description, Atcinema, age, lang, trailerUrl, genreIds } = req.body;
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

        console.log("ประเภทหนัง", genreIds);
        let parsedGenreIds = genreIds;
        if (typeof parsedGenreIds === "string") {
            try {
                parsedGenreIds = JSON.parse(parsedGenreIds);
            } catch (error) {
                console.error("Error parsing genreIds:", error);
                return res.status(400).json({ message: "รูปแบบ genreIds ไม่ถูกต้อง" })
            }
        }

        // ✅ ตรวจสอบว่าข้อมูลที่แปลงแล้วเป็นอาร์เรย์
        if (!Array.isArray(parsedGenreIds)) {
            return res.status(400).json({ message: "genreIds ต้องเป็นอาร์เรย์" });
        }

        // ✅ เช็คว่ามีหนังที่เลือกหรือไม่
        if (parsedGenreIds.length > 0) {
            console.log("Genre IDs to associate:", parsedGenreIds);
            
            const genres = await db.Genre.findAll({
                where: { id: { [Op.in]: parsedGenreIds } }
            });

            console.log("Genres found:", genres.map(m => m.id));

            if (genres.length > 0) {
                await newMovie.addGenres(genres);
                console.log("Genres linked to actor successfully!");
            } else {
                console.log("No matching genres found.");
            }
        }

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
        const { title, engTitle, date, description, Atcinema, age, lang, trailerUrl, genreIds } = req.body;

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
            title: title || movie.title,  // ถ้า title เป็น undefined ให้ใช้ค่าของเดิม
            engTitle: engTitle || movie.engTitle,
            date: date || movie.date,
            description: description || movie.description,
            Atcinema: Atcinema === 'true', // เช็คค่า Atcinema ให้เป็น boolean
            age: age || movie.age,
            lang: JSON.stringify(lang || JSON.parse(movie.lang)), // ตรวจสอบค่าภาษา
            posterimagePath,
            backgroundimagePath: JSON.stringify(backgroundimagePath),
            trailerUrl: trailerUrl || movie.trailerUrl
        });

        let parsedGenreIds = genreIds
        console.log("ประเภทหนัง", parsedGenreIds);
        if (typeof parsedGenreIds === "string") {
            try {
                parsedGenreIds = JSON.parse(parsedGenreIds);
            } catch (error) {
                console.error("Error parsing genreIds:", error);
                return res.status(400).json({ message: "รูปแบบ genreIds ไม่ถูกต้อง" })
            }
        }

        // ✅ ตรวจสอบว่าข้อมูลที่แปลงแล้วเป็นอาร์เรย์
        if (!Array.isArray(parsedGenreIds)) {
            return res.status(400).json({ message: "genreIds ต้องเป็นอาร์เรย์" });
        }

        if (Array.isArray(parsedGenreIds)) {
            parsedGenreIds = parsedGenreIds.flatMap(item => {
                try {
                    return JSON.parse(item); // แปลง JSON string เป็นอาร์เรย์จริง
                } catch (error) {
                    return item.split(',').map(Number); // แยก string แล้วแปลงเป็นตัวเลข
                }
            });
        }
          
        // ✅ เช็คว่ามีหนังที่เลือกหรือไม่
        if (parsedGenreIds.length > 0) {
            console.log("Genre IDs to associate:", parsedGenreIds);
            
            const genres = await db.Genre.findAll({
                where: { id: { [Op.in]: parsedGenreIds } }
            });

            console.log("Genres found:", genres.map(m => m.id));

            if (genres.length > 0) {
                await movie.setGenres(genres);
                console.log("Genres linked to actor successfully!");
            } else {
                console.log("No matching genres found.");
            }
        }

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