module.exports = (sequelize, DataTypes) => {
    const Genre = sequelize.define('Genre', {
        genreName: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    }, {
        tableName: 'genres',
        timestamps: false,
    });

    Genre.associate = (models) => {
        Genre.belongsToMany(models.Movie, { through: models.Type});
    };

    return Genre;
};