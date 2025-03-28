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
            type: DataTypes.FLOAT,
            allowNull: true
        }
    }, {
        tableName: 'comments',
        timestamps: false
    });

    Comment.associate = (models) => {
        Comment.belongsTo(models.User, { foreignKey: "UserId" });  // ✅ Comment เป็นของ User คนเดียว
        Comment.belongsTo(models.Movie, { foreignKey: "MovieId" }); // ✅ Comment เป็นของ Movie เรื่องเดียว
    };

    return Comment;
};
