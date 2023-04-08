module.exports = app => {
    const todolists = require("../controllers/todolist.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", todolists.create);
  
    router.get("/", todolists.findAll);
  
    router.get("/allcompleted", todolists.findAllCompleted);
  
    router.get("/:id", todolists.findOne);
  
    router.put("/:id", todolists.update);
  
    router.delete("/:id", todolists.delete);
  
    app.use('/api/todolists', router);
  };