module.exports = (sequelize, DataTypes) => {
    const Act = sequelize.define('Act', {} ,
        {
            timestamps: false,
        }
    );

    return Act;
}