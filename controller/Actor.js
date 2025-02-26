const fs = require('fs');
const db = require('../models');
const path = require('path');

const getAllActors = async (req, res) => {
    const allActors = await db.Actor.findAll();
    res.status(200).send(allActors);
}

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

const updateActors = async (req, res) => {
    try {
        const { id } = req.params;
        const { actorname, birthdate, country, role } = req.body;

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

        res.status(200).json({ message: "อัปเดตข้อมูลสำเร็จ!", actor });
    } catch (error) {
        console.error("เกิดข้อผิดพลาด:", error);
        res.status(500).json({ message: "เกิดข้อผิดพลาดในการอัปเดตข้อมูลนักแสดง" });
    }
};

const deleteActors = async (req, res) => {
    try {
        const actor = await db.Actor.findByPk(req.params.id); // หา actor ก่อน
        if (!actor) {
            return res.status(404).send({ error: "Actor not found" });
        }
        const imagePath = path.join(__dirname, '..', actor.actorimagePath); // พาธไฟล์รูป

        console.log(req.params.id); // ตรวจสอบ id

        await db.Actor.destroy({
            where: { id: req.params.id } // ตรวจสอบว่า id ถูกส่งมาและมีค่า
        });

          // ตรวจสอบว่ามีไฟล์ภาพหรือไม่ และลบออก
          if (fs.existsSync(imagePath|| null)) {
            fs.unlinkSync(imagePath);
            console.log("Deleted image:", imagePath);
        } else {
            console.log("Image file not found:", imagePath);
        }

        res.status(200).send({ message: "Actor deleted successfully" });
    } catch (error) {
        console.error('Failed to delete actor:', error);
        res.status(500).send({ error: 'Failed to delete actor' });
    }
};

module.exports = {
    getAllActors,
    createActors,
    deleteActors,
    updateActors
}