'use strict';
module.exports = (sequelize, DataTypes) => {
  const Issue = sequelize.define('Issue', {
    id: DataTypes.INTEGER,
    issueTitle: DataTypes.STRING,
    issueDescription: DataTypes.STRING,
    issueStatus: DataTypes.STRING
  }, {});
  Issue.associate = function(models) {
    // associations can be defined here
  };
  return Issue;
};