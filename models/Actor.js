module.exports = (sequelize, DataTypes) => {
    const Actor = sequelize.define(
        'Actor', 
        {
        actorname: {
            type: DataTypes.STRING(255),
        },
        birthdate: {
            type: DataTypes.DATEONLY
        },
    }, {
        tableName: "actors",
        timestamps: false,
    });

    Actor.associate = (models) => {
        Actor.belongsToMany(models.Movie, { through: models.Act});
    };

    return Actor;
}