const { sequelize } = require(".");

module.exports = (sequelize, Datatypes) => {
    const PlaylistItem = sequelize.define('PlaylistItem', {

    }, {
        tableName: 'playlist_items',
        timestamps: false,
    });

    PlaylistItem.associate = (models) => {
    PlaylistItem.belongsTo(models.Playlist);
    PlaylistItem.belongsTo(models.Movie);
  };

  return PlaylistItem;
};