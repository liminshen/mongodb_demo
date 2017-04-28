var UserModel = require("./user-model.js");

/**
 * 插入
 */
 function getByConditions(okFn,errorFn){
     var wherestr = {};//搜索条件
     var opt = {"_id": 0,"_v":0};//输出条件 1是显示，0是不显示

     UserModel.find(wherestr ,opt,function(err, res){
         if (err) {
             console.log("Error:" + err);
             errorFn&&errorFn();
         }
         else {
             console.log("Res:" + res);
             okFn&&okFn(res);
         }
     })
 }

module.exports = getByConditions;
