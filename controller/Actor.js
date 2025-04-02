const fs = require('fs');
const db = require('../models');
const path = require('path');
const { Op } = require("sequelize");

const getAllActors = async (req, res) => {
    const allActors = await db.Actor.findAll();
    res.status(200).send(allActors);
}

const getActorByID = async (req, res) => {
    const { id } = req.params;
    try {
        const actor = await db.Actor.findByPk(id, {
            include: [
                {
                    model: db.Movie,
                    through: { attributes: [] },
                    attributes: ['id', 'title',]
                }
            ]
        });

        if (!actor) {
            return res.status(404).json({ message: "ไม่พบข้อมูลนักแสดง" });
        }

        res.status(200).json(actor)
    } catch(error) {
        console.log("Error การดึงข้อมุลนักแสดง", error);
        res.status(500).json({ message: "พบปัญหาในการดึงข้อมูลหนัง"})
    }
}

const createActors = async (req, res) => {
    try{
        const { actorname, birthdate, country, role, movieIds } = req.body;
        console.log(movieIds)

        const actorimagePath = req.file ? req.file.path : null;

        const newActor = await db.Actor.create({
            actorname, 
            birthdate, 
            country, 
            role,
            actorimagePath
        });

           // ✅ ตรวจสอบและแปลง movieIds เป็นอาร์เรย์หากจำเป็น
           let parsedMovieIds = movieIds;
           if (typeof parsedMovieIds === "string") {
               try {
                   parsedMovieIds = JSON.parse(parsedMovieIds);  // แปลงจาก string เป็น array
               } catch (error) {
                   console.error("Error parsing movieIds:", error);
                   return res.status(400).json({ message: "รูปแบบ movieIds ไม่ถูกต้อง" });
               }
           }
   
           // ✅ ตรวจสอบว่าข้อมูลที่แปลงแล้วเป็นอาร์เรย์
           if (!Array.isArray(parsedMovieIds)) {
               return res.status(400).json({ message: "movieIds ต้องเป็นอาร์เรย์" });
           }
   
           // ✅ เช็คว่ามีหนังที่เลือกหรือไม่
           if (parsedMovieIds.length > 0) {
               console.log("Movie IDs to associate:", parsedMovieIds);
               
               const movies = await db.Movie.findAll({
                   where: { id: { [Op.in]: parsedMovieIds } }
               });
   
               console.log("Movies found:", movies.map(m => m.id));
   
               if (movies.length > 0) {
                   await newActor.addMovies(movies);
                   console.log("Movies linked to actor successfully!");
               } else {
                   console.log("No matching movies found.");
               }
           }

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

const updateActors = async (req, res) => {
    try {
        const { id } = req.params;
        const { actorname, birthdate, country, role, movieIds } = req.body;

        console.log("Actor data received:", { actorname, birthdate, country, role });
        if (req.file) {
        console.log("New file received:", req.file.path);
        }
        // หา actor จาก database
        const actor = await db.Actor.findByPk(id);
        if (!actor) {
            return res.status(404).json({ message: "ไม่พบนักแสดง" });
        }

        let actorimagePath = actor.actorimagePath; // เก็บ path รูปเก่าก่อน
        if (req.file) {
            // ถ้ามีอัปโหลดรูปใหม่ → ลบรูปเก่าออกก่อน
            if (actor.actorimagePath) {
                const oldImagePath = path.join(__dirname, '..', actor.actorimagePath);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
            actorimagePath = req.file.path; // อัปเดต path รูปใหม่
        }

        // อัปเดตข้อมูลใน database
        await actor.update({
            actorname,
            birthdate,
            country,
            role,
            actorimagePath
        });

         // ✅ ตรวจสอบและแปลง movieIds เป็นอาร์เรย์หากจำเป็น
         let parsedMovieIds = movieIds;
         if (typeof parsedMovieIds === "string") {
             try {
                 parsedMovieIds = JSON.parse(parsedMovieIds);  // แปลงจาก string เป็น array
             } catch (error) {
                 console.error("Error parsing movieIds:", error);
                 return res.status(400).json({ message: "รูปแบบ movieIds ไม่ถูกต้อง" });
             }
         }
 
         // ✅ ตรวจสอบว่าข้อมูลที่แปลงแล้วเป็นอาร์เรย์
         if (!Array.isArray(parsedMovieIds)) {
             return res.status(400).json({ message: "movieIds ต้องเป็นอาร์เรย์" });
         }

         if (Array.isArray(parsedMovieIds)) {
            parsedMovieIds = parsedMovieIds.flatMap(item => {
                try {
                    return JSON.parse(item); // แปลง JSON string เป็นอาร์เรย์จริง
                } catch (error) {
                    return item.split(',').map(Number); // แยก string แล้วแปลงเป็นตัวเลข
                }
            });
        }
 
         // ✅ เช็คว่ามีหนังที่เลือกหรือไม่
         if (parsedMovieIds.length > 0) {
             console.log("Movie IDs to associate:", parsedMovieIds);
             
             const movies = await db.Movie.findAll({
                 where: { id: { [Op.in]: parsedMovieIds } }
             });
 
             console.log("Movies found:", movies.map(m => m.id));
 
             if (movies.length > 0) {
                 await actor.setMovies(movies);
                 console.log("Movies linked to actor successfully!");
             } else {
                 console.log("No matching movies found.");
             }
         }

        res.status(200).json({ message: "อัปเดตข้อมูลสำเร็จ!", actor });
    } catch (error) {
        console.error("เกิดข้อผิดพลาด:", error);
        res.status(500).json({ message: "เกิดข้อผิดพลาดในการอัปเดตข้อมูลนักแสดง" });
    }
};

const deleteActors = async (req, res) => {
    try {
        const { id } = req.params;

        const actor = await db.Actor.findByPk(id);
        if (!actor) {
            return res.status(404).json({ message: "ไม่พบนักแสดง" });
        }

        console.log(req.params.id); // ตรวจสอบ id

        await db.Act.destroy({
            where: { ActorId: id } // ลบนักแสดงออกจากตาราง Act
        });

        await db.Actor.destroy({
            where: { id: id } // ตรวจสอบว่า id ถูกส่งมาและมีค่า
        });


         if (actor.actorimagePath) {
            const imagePath = path.join(__dirname, '..', actor.actorimagePath);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
                console.log("Deleted image:", imagePath);
            } else {
                console.log("Image file not found:", imagePath);
            }
        }

        res.status(200).send({ message: "Actor deleted successfully" });
    } catch (error) {
        console.error('Failed to delete actor:', error);
        res.status(500).send({ error: 'Failed to delete actor' });
    }
};

module.exports = {
    getAllActors,
    getActorByID,
    createActors,
    deleteActors,
    updateActors
}