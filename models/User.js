module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User', 
        {
        username: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM('user', 'admin'),
            defaultValue: 'user',
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,   
            unique: true,       
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        tel: {
            type: DataTypes.STRING(15), 
            allowNull: false, 
            validate: {
                isNumeric: true, 
            }
        },
        age: {
            type: DataTypes.INTEGER
        },
        userimagePath: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: "users",
        timestamps: false,
    });

    User.associate = (models) => {
        User.belongsToMany(models.Movie, { through: models.Comment});
        User.belongsToMany(models.Movie, { through: models.Playlist});
        User.belongsToMany(models.Movie, { through: models.Search});
    };

    return User;
}