module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        commentText: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        commentDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        ratingScore: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        tableName: 'comments',
        timestamps: false
    });

    return Comment;
};
