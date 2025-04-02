const { where } = require('sequelize');
const db = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require("fs");

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // ตรวจสอบว่ามีการส่ง username และ password มาหรือไม่
        if (!username || !password) {
            return res.status(400).send({ message: "ต้องการ Username และ password" });
        }

        // หาผู้ใช้จากฐานข้อมูล
        const targetUser = await db.User.findOne({ where: { username: username.trim() } });

        // ถ้าไม่มีผู้ใช้
        if (!targetUser) {
            return res.status(400).send({ message: "Username หรือ password ผิดพลาด" });
        }

        // ตรวจสอบรหัสผ่าน
        const isCorrectPassword = bcryptjs.compareSync(password, targetUser.password);

        if (isCorrectPassword) {
            // สร้าง payload สำหรับ JWT
            const payload = {
                name: targetUser.name,
                id: targetUser.id,
                role: targetUser.role
            };

            // สร้าง token
            const token = jwt.sign(payload, process.env.JWT_SECRET || process.env.SECRET_OR_KEY, { expiresIn: 3600 });

            // ส่งตอบกลับเมื่อเข้าสู่ระบบสำเร็จ
            return res.status(200).send({
                token: token,
                message: "Login successful",
                role: targetUser.role,
            });
        } else {
            // ถ้ารหัสผ่านไม่ถูกต้อง
            return res.status(400).send({ message: "Username หรือ password ผิดพลาด" });
        }
    } catch (error) {
        // จัดการข้อผิดพลาดทั่วไป
        console.error("Login error: ", error);
        return res.status(500).send({ message: "เกิดความผิดปกติบางอย่าง โปรดลองใหม่อีกครั้งภายหลัง" });
    }
}
const registerUser = async (req, res) => {
    let userimagePath = null;
    let userBackgroundImagePath = null; // ✅ กำหนดตัวแปรไว้ก่อน

    try {
            const { username, name, email, password, tel, age, } = req.body;
            userimagePath = req.file ? req.file.path : null; // ดึง path ของรูปภาพที่อัปโหลด
            if (req.files && req.files['userBackgroundImagePath']) {
                userBackgroundImagePath = req.files['userBackgroundImagePath'][0].path;
            }

            //เช็คว่าใช้ user ไปรึยัง
            const targetUser = await db.User.findOne({where: { username: username} });
            const targetEmail = await db.User.findOne({where: { email: email} });

            // ตรวจสอบว่าข้อมูลครบถ้วน
            if (!username || !name || !email || !password || !tel || !age) {
                if (userimagePath) fs.unlinkSync(userimagePath); // ลบไฟล์ออก
                return res.status(400).send({ message: "กรุณากรอกข้อมูลให้ครบ" });
            }

            // ตรวจสอบรูปแบบ email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                if (userimagePath) fs.unlinkSync(userimagePath); // ลบไฟล์ออก
                return res.status(400).send({ message: "รูปแบบ Email ไม่ถูกต้อง" });
            }

            if (targetUser) {
                // ลบรูปที่อัปโหลดในกรณี Username ซ้ำ
                if (userimagePath) fs.unlinkSync(userimagePath); // ลบไฟล์ออก
                return res.status(400).send({ message: "Username นี้ถูกใช้แล้ว" });
              }
          
            if (targetEmail) {
                // ลบรูปที่อัปโหลดในกรณี Email ซ้ำ
                if (userimagePath) fs.unlinkSync(userimagePath);
            return res.status(400).send({ message: "Email นี้ถูกใช้แล้ว" });
            }
            // ตรวจสอบความยาวของ password
            if (password.length < 8) {
                if (userimagePath) fs.unlinkSync(userimagePath); // ลบไฟล์ออก
                return res.status(400).send({ message: "Password ต้องมีอย่างน้อย 8 ตัวอักษร" });
            }
                //สร้าง salt
                const salt = bcryptjs.genSaltSync(12);
                //สร้าง password
                const hashedPassword = bcryptjs.hashSync(password, salt);

                const newUser = await db.User.create({
                    username: username.trim(),
                    name: name.trim(),
                    password: hashedPassword,
                    email: email.trim(),
                    tel: tel.trim(),
                    age: parseInt(age),
                    userimagePath: userimagePath,
                    userBackgroundImagePath
                });
        
                const payload = {
                    name: newUser.name,
                    id: newUser.id,
                    role: "user",
                };
    
                // สร้าง token
                const token = jwt.sign(payload, process.env.JWT_SECRET || process.env.SECRET_OR_KEY, { expiresIn: 3600 });
    
                return res.status(201).send({ 
                    message: "สร้างบัญชีผู้ใช้งานสำเร็จ",
                    token: token,
                    user: {
                        id: newUser.id,
                        name: newUser.name,
                        role: "user",
                    }
                 });
        } catch (error) {
           try {
            if (userimagePath && fs.existsSync(userimagePath)) {
                fs.unlinkSync(userimagePath);
            }
            if (userBackgroundImagePath && fs.existsSync(userBackgroundImagePath)) {
                fs.unlinkSync(userBackgroundImagePath);
            }
            } catch (fsError) {
                console.error("Error deleting uploaded images: ", fsError);
            }
            console.error("Error during registration: ", error);
            return res.status(500).send({ message: "เกิดความผิดปกติบางอย่าง โปรดลองใหม่อีกครั้งภายหลัง" });
        }
    };

const getUserById = async (req, res) => {
   try {
        // ค้นหาผู้ใช้จากฐานข้อมูลตาม id
        const targetUser = await db.User.findOne({ where: { id: req.user.id } });

        // ถ้าไม่พบผู้ใช้ ให้ส่งกลับด้วยสถานะ 404
        if (!targetUser) {
            return res.status(404).send({ message: 'User not found' });
        }

        // ถ้าพบผู้ใช้ ให้ส่งข้อมูลกลับไป
        res.status(200).send(targetUser);
    } catch (error) {
        // จัดการข้อผิดพลาดและส่งกลับด้วยสถานะ 500
        console.error(error);
        res.status(500).send({ message: 'An error occurred', error: error.message });
    }
};

module.exports = {
    loginUser,
    registerUser,
    getUserById
}