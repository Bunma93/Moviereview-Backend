module.exports = (sequelize, DataTypes) => {
    const Movie = sequelize.define(
        'Movie', 
        {
        title: {
            type: DataTypes.STRING(255),
        },
        engTitle: {
            type: DataTypes.STRING(255),
        },
        date: {
            type: DataTypes.DATEONLY
        },
        description: {
            type: DataTypes.TEXT('long')
        },
        Atcinema : {
            type: DataTypes.STRING(10)
        },
        posterimagePath: {
            type: DataTypes.STRING,
            allowNull: true
        },
        backgroundimagePath: {
            type: DataTypes.JSON,
            allowNull: true
        },
        age: {
            type: DataTypes.TEXT
        },
        lang: {
            type: DataTypes.JSON
        },
        trailerUrl: {
            type: DataTypes.TEXT
        },
        rank: {
            type: DataTypes.INTEGER, 
            allowNull: true 
        }
    }, {
        tableName: "movies",
        timestamps: false,
    });

    Movie.associate = (models) => {
        Movie.hasMany(models.Comment, { foreignKey: "MovieId" });
        Movie.belongsToMany(models.User, { through: models.Playlist});
        Movie.belongsToMany(models.User, { through: models.Search});
        Movie.belongsToMany(models.Actor, { through: models.Act});
        Movie.belongsToMany(models.Genre, { through: models.Type});
    };

    return Movie;
}