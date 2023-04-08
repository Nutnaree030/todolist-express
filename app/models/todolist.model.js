const sql = require("./db.js");

// constructor
const Todolist = function(todolist) {
  this.title = todolist.title;
  this.body = todolist.body;
  this.completed = todolist.completed;
};

Todolist.create = (newTodolist, result) => {
  sql.query("INSERT INTO todolists SET ?", newTodolist, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created todolist: ", { id: res.insertId, ...newTodolist });
    result(null, { id: res.insertId, ...newTodolist });
  });
};

Todolist.findById = (id, result) => {
  sql.query(`SELECT * FROM todolists WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found todolist: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Todolist with the id
    result({ kind: "not_found" }, null);
  });
};

Todolist.getAll = (title, result) => {
  let query = "SELECT * FROM todolists";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("todolists: ", res);
    result(null, res);
  });
};

Todolist.getAllPublished = result => {
  sql.query("SELECT * FROM todolists WHERE completed=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("todolists: ", res);
    result(null, res);
  });
};

Todolist.updateById = (id, todolist, result) => {
  for (const key in todolist) {
    if (Object.hasOwnProperty.call(todolist, key) && todolist[key] != null) {
        const element = todolist[key];
        console.log(key+": key value");
        console.log(element+": element value");

        sql.query(
        //   "UPDATE todolists SET `?` = ? WHERE id = ?",
          //   [key.replace(/"'"/,""), element, id.replace(/"'"/,"")],
          "UPDATE todolists SET ? = ? WHERE id = ?",
          [key, element, id],
          (err, res) => {
            if (err) {
              console.log("error: ", err);
              result(null, err);
              return;
            }
      
            if (res.affectedRows == 0) {
              // not found Tutorial with the id
              result({ kind: "not_found" }, null);
              return;
            }
            
            result(null, { id: id, ...todolist });
        }
        );
    }

    console.log("updated todolist: ", { id: id, ...todolist });
    
  }
};

Todolist.remove = (id, result) => {
  sql.query("DELETE FROM todolists WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted todolist with id: ", id);
    result(null, res);
  });
};


module.exports = Todolist;