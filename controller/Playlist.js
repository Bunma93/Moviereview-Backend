const { includes } = require("lodash");
const { sequelize } = require("../models");
const db = require("../models");

const getPlaylistById = async (req, res) => {
    const userId = req.user.id;
    try {
        const playlist= await db.Playlist.findAll({
            where: { UserId: userId },
            include: [
                {
                    model: db.Movie,
                    through: { attributes: [] },
                    attributes: ['id', 'title', 'posterimagePath', 'age', 'lang']
                }
            ]
        });
        if (!playlist) {
            return res.status(404).json({ message: "ไม่พบ Playlist นี้" });
        }
        return res.status(200).json(playlist);

    } catch (error) {
        console.error("เกิดข้อผิดพลาด:", error);
        return res.status(500).json({message: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์"})
    }
}

const createPlaylist = async (req, res) => {
    try {
        const { playlistName, MovieIds } = req.body;

        
        const userId = req.user?.id || 1;
        
        if (!playlistName || !MovieIds || !Array.isArray(MovieIds)) {
            return res.status(400).json({ message: "ข้อมูลไม่ถูกต้อง" });
        }
        const newPlaylist = await db.Playlist.create({
            playlistName,
            UserId: userId
        })

        const playlistItems = MovieIds.map(movieId => ({
            PlaylistId: newPlaylist.id,
            MovieId: movieId,
          }));

        await db.PlaylistItem.bulkCreate(playlistItems);

        return res.status(201).json({ message: "สร้าง Playlist สำเร็จ", playlistId: newPlaylist.id });

    } catch {
        console.error(err);
        return res.status(500).json({ message: "เกิดข้อผิดพลาดในระบบ" });
    }
}

const updatePlaylist = async (req,res) => {
    try {
        const { id } = req.params; // playlistId จาก URL
        const { playlistName, MovieIds } = req.body;
        const userId = req.user?.id || 1;

        // ตรวจสอบความถูกต้องของข้อมูล
        if (!playlistName || !Array.isArray(MovieIds)) {
            return res.status(400).json({ message: "ข้อมูลไม่ถูกต้อง"});
        }

        // ตรวจสอบว่า playlist นี้เป็นของ user คนนี้จริงไหม
        const playlist = await db.Playlist.findOne ({
            where: { id, UserId : userId }
        })

        
        if (!playlist) {
            return res.status(404).json({ message: "ไม่พบ Playlist ที่ต้องการแก้ไข" });
        }

        await playlist.update({ playlistName });
        await db.PlaylistItem.destroy({ where: { PlaylistId: id } });

        const playlistItems = MovieIds.map((movieId) => ({
            PlaylistId: id,
            MovieId: movieId
        }));

        await db.PlaylistItem.bulkCreate(playlistItems);

        return res.status(200).json({ message: "อัปเดต Playlist สำเร็จ" });

    }catch(err) {
        console.error("เกิดข้อผิดพลาด:", err);
        return res.status(500).json({ message: "เกิดข้อผิดพลาดในระบบ" });
    }
}

const deletePlaylist = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const playlist = await db.Playlist.findOne({
        where: { id, UserId: userId }
        });

        if (!playlist) {
        return res.status(404).json({ message: "ไม่พบ Playlist หรือไม่มีสิทธิ์ลบ" });
        }

        await db.PlaylistItem.destroy({ where: { PlaylistId: id } });
        await db.Playlist.destroy({ where: { id: id } });

        return res.status(200).json({ message: "ลบ Playlist สำเร็จ" });

    } catch (err) {
        console.log("เกิดปัญหาในการลบเพลลิสต์", err);
        return res.status(500).json({ message: "เกิดปัญหาในการลบเพลลิสต์"})
    }
} 

module.exports = {
    createPlaylist,
    getPlaylistById,
    updatePlaylist,
    deletePlaylist
}