module.exports = (sequelize, DataTypes) => {
    const Playlist = sequelize.define('Playlist', {
        playlistName: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    }, {
        tableName: 'playlists',
        timestamps: false,
    });

    return Playlist;
};