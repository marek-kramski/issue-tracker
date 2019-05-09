module.exports = (sequelize, DataTypes) => {
  return sequelize.define('issues', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    issueTitle: DataTypes.TEXT,
    issueDescription: DataTypes.TEXT,
    issueStatus: DataTypes.TEXT,
  }, );
};