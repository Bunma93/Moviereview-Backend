module.exports = (sequelize, DataTypes) => {
    const Search = sequelize.define('Search', {} ,
        {
            timestamps: false,
        }
    );

    return Search;
}