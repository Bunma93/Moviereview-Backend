module.exports = (sequelize, DataTypes) => {
    const MovieNews = sequelize.define (
        'MovieNews',
        {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          content: {
            type: DataTypes.TEXT,
            allowNull: false,
          },
          newsimagePath: {
            type: DataTypes.STRING, // เก็บ URL หรือ Path ของรูปข่าว
            allowNull: true,
          },
    },{
        timestamps: false,
    });

    return MovieNews;
}