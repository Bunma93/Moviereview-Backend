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

module.exports = {
    createPlaylist,
    getPlaylistById
}