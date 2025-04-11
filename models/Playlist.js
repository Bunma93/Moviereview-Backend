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

    Playlist.associate = (models) => {
        Playlist.belongsTo(models.User);
        Playlist.belongsToMany(models.Movie, { through: models.PlaylistItem });
    };


    return Playlist;
};