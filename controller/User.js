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
            return res.status(400).send({ message: "Username and password are required" });
        }

        // หาผู้ใช้จากฐานข้อมูล
        const targetUser = await db.User.findOne({ where: { username: username.trim() } });

        // ถ้าไม่มีผู้ใช้
        if (!targetUser) {
            return res.status(400).send({ message: "Username or password is wrong" });
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
            return res.status(400).send({ message: "Username or password is wrong" });
        }
    } catch (error) {
        // จัดการข้อผิดพลาดทั่วไป
        console.error("Login error: ", error);
        return res.status(500).send({ message: "Something went wrong. Please try again later." });
    }
}
const registerUser = async (req, res) => {
    let userimagePath = null;

    try {
            const { username, name, email, password, tel, age, } = req.body;
            const userimagePath = req.file ? req.file.path : null; // ดึง path ของรูปภาพที่อัปโหลด
            //เช็คว่าใช้ user ไปรึยัง
            const targetUser = await db.User.findOne({where: { username: username} });
            const targetEmail = await db.User.findOne({where: { email: email} });

            // ตรวจสอบว่าข้อมูลครบถ้วน
            if (!username || !name || !email || !password || !tel || !age) {
                if (userimagePath) fs.unlinkSync(userimagePath); // ลบไฟล์ออก
                return res.status(400).send({ message: "All fields are required" });
            }

            // ตรวจสอบรูปแบบ email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                if (userimagePath) fs.unlinkSync(userimagePath); // ลบไฟล์ออก
                return res.status(400).send({ message: "Invalid email format" });
            }

            if (targetUser) {
                // ลบรูปที่อัปโหลดในกรณี Username ซ้ำ
                if (userimagePath) fs.unlinkSync(userimagePath); // ลบไฟล์ออก
                return res.status(400).send({ message: "Username already taken" });
              }
          
            if (targetEmail) {
                // ลบรูปที่อัปโหลดในกรณี Email ซ้ำ
                if (userimagePath) fs.unlinkSync(userimagePath);
            return res.status(400).send({ message: "Email already taken" });
            }
            // ตรวจสอบความยาวของ password
            if (password.length < 8) {
                if (userimagePath) fs.unlinkSync(userimagePath); // ลบไฟล์ออก
                return res.status(400).send({ message: "Password must be at least 8 characters" });
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
                    userimagePath: userimagePath
                });
        
                const payload = {
                    name: newUser.name,
                    id: newUser.id,
                    role: "user",
                };
    
                // สร้าง token
                const token = jwt.sign(payload, process.env.JWT_SECRET || process.env.SECRET_OR_KEY, { expiresIn: 3600 });
    
                return res.status(201).send({ 
                    message: "User created successfully",
                    token: token,
                    user: {
                        id: newUser.id,
                        name: newUser.name,
                        role: "user",
                    }
                 });
        } catch (error) {
            if (userimagePath) {
                try {
                    fs.unlinkSync(userimagePath);
                } catch (fsError) {
                    console.error("Error deleting file: ", fsError);
                }
            }
            console.error("Error during registration: ", error);
            return res.status(500).send({ message: "Something went wrong. Please try again later." });
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