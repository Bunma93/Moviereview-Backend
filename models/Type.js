module.exports = (sequelize, DataTypes) => {
    const Type = sequelize.define('Type', {} ,
        {
            timestamps: false,
        }
    );

    return Type;
}