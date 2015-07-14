module.exports = function(sequelize, DataTypes) {
  return sequelize.define("User", {
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    bio: DataTypes.STRING,
    twitter_handle: DataTypes.STRING,
    site: DataTypes.STRING
  });
}