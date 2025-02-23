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
    try {
        const { title, date, description, Atcinema } = req.body;

        // ตรวจสอบว่า Multer อัปโหลดไฟล์สำเร็จหรือไม่
        const posterimagePath = req.files['posterimagePath'] ? req.files['posterimagePath'][0].path : null;
        const backgroundimagePath = req.files['backgroundimagePath'] ? req.files['backgroundimagePath'][0].path : null;

        // สร้างข้อมูลหนังใหม่
        const newMovie = await db.Movie.create({
            title,
            date,
            description,
            Atcinema: Atcinema === 'true', // แปลงค่า String เป็น Boolean
            posterimagePath,
            backgroundimagePath
        });

        res.status(201).json({ message: "เพิ่มภาพยนตร์สำเร็จ!", movie: newMovie });
    } catch (error) {
        if (req.files['posterimagePath']) {
            try {
                fs.unlinkSync(req.files['posterimagePath'][0].path);  // ลบไฟล์โปสเตอร์
            } catch (fsError) {
                console.error("Error deleting poster image file: ", fsError);
            }
        }
        if (req.files['backgroundimagePath']) {
            try {
                fs.unlinkSync(req.files['backgroundimagePath'][0].path);  // ลบไฟล์พื้นหลัง
            } catch (fsError) {
                console.error("Error deleting background image file: ", fsError);
            }
        }
        console.error("เกิดข้อผิดพลาด:", error);
        res.status(500).json({ message: "เกิดข้อผิดพลาดในการเพิ่มภาพยนตร์" });
    }
};

module.exports = {
    getAllMovies,
    deleteMovies,
    createMovies
};