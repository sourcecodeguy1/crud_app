const express = require('express');

const app = express();

const bodyParser = require('body-parser');

let mysql = require('./db');

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

/** Get data from database **/
app.get('/show', (req, res) => {

  // Select data from database

  mysql.query("SELECT * FROM posts", (error, rows) => {

    if(error){
      res.send("An error has occurred.");
    } else {

      if(rows.length > 0){


        res.json(rows);

      } else {
        res.json({result: "No Posts"});
      }

    }

  });

});

/** Post data to the data base - AddPost.js **/
app.post('/add', (req,res) => {

  /** Create local variables and grab user input values **/

  let postTitle = req.body.post_title;
  let postMessage = req.body.post_msg;

  //console.log(`Title: ${postTitle}`, `Message: ${postMessage}`);

  mysql.query("INSERT INTO posts (post_title, post_message) VALUES (?, ?)",[postTitle, postMessage], (error, rows) => {

    if(error){

      res.json({result: error});

    } else {

      if(rows.affectedRows > 0){

        console.log("Data inserted successfully!");

        res.json({result: "Data saved!"});

        //res.redirect('/show');

      } else {

        res.json({result: "An error has occurred."});

      }

    }

  });

});

app.get('/edit/:id', (req, res)=>{

  let id = req.params.id;

  console.log("from back-end server id is " + id);

  // Select data from database

  mysql.query("SELECT * FROM posts WHERE id = ?", [id], (error, rows) => {

    if(error){
      res.send("An error has occurred.");
    } else {

      if(rows.length === 1){

        res.json(rows);

      } else {
        res.json({result: "No Posts"});
      }

    }

  });


});

app.put('/edit/:id', (req, res)=>{

  let id = req.params.id;

  let postTitle = req.body.post_title;
  let postMsg   = req.body.post_message;

  let postObj   = {post_title: postTitle, post_message: postMsg}

  console.log("from back-end server id is for editPost " + id);

  // Select data from database

  mysql.query("UPDATE posts SET ? WHERE id = ?", [postObj, id], (error, rows) => {

    if(error){
      res.json({result: "An error has occurred."});
    } else {

      if(rows.changedRows === 1){

        res.json(rows);

      } else {
        console.log(rows);
        res.json({result: "No changes made."});
      }

    }

  });


});

app.delete('/edit/:id', (req, res) => {

  let id = req.params.id;

  console.log("from back-end server id is for deletePost " , id);

  mysql.query("DELETE FROM posts WHERE id = ?", [id], (error, rows) => {

    if(error){
      res.json({result: "An error has occurred."});
    } else {

      if(rows.affectedRows === 1){

        res.json(rows);

      } else {
        res.json({result: "An error has occurred."});
      }
// <CustomPagination activePage={activePage} posts={posts.length} postPerPage={postPerPage} />
    }

  });
});

const port = 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));