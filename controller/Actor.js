const db = require('../models');

const createActors = async (req, res) => {
    try{
        const { actorname, birthdate, country, role } = req.body;

        const actorimagePath = req.file ? req.file.path : null;

        const newActor = await db.Actor.create({
            actorname, 
            birthdate, 
            country, 
            role,
            actorimagePath
        });

        res.status(201).json({ message: "เพิ่มนักแสดงสำเร็จ!", movie: newActor });
    } catch (error){
        if (req.file['actorimagePath']) {
            try {
                fs.unlinkSync(req.file['actorimagePath'].path);  // ลบไฟล์พื้นหลัง
            } catch (fsError) {
                console.error("Error deleting actor image file: ", fsError);
            }
        }
        console.error("เกิดข้อผิดพลาด:", error);
        res.status(500).json({ message: "เกิดข้อผิดพลาดในการเพิ่มนักแสดง" });
    }
};

module.exports = {
    createActors
}