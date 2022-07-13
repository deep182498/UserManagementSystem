var Userdb = require('../model/model');

//create and save a new user
exports.create = (req, res) => {
   //validate the request
   if (!req.body) {
      res.status(400).send('Request body is required');
      return;
   }

   //create a new user
   const user = new Userdb({
      name: req.body.name,
      email: req.body.email,
      gender: req.body.gender,
      status: req.body.status,
   });

   //save user in the database

   user
      .save(user)
      .then((data) => {
         res.send(data);
      })
      .catch((err) => {
         res.status(500).send({
            message:
               err.message || 'Some error occurred while creating the user.',
         });
      });
};

//retrive and return all users or single users

exports.find = (req, res) => {
   if (req.query.id) {
      const id = req.query.id;
      Userdb.findById(id)
         .then((data) => {
            if (!data) {
               res.status(404).send({
                  message: `Cannot Find user with ${id}. Maybe user not found!`,
               });
            } else {
               res.send(data);
            }
         })
         .catch((err) => {
            res.status(500).send({
               message:
                  err.message || 'Some error occurred while retrieving users.',
            });
         });
   } else {
      Userdb.find()
         .then((user) => {
            res.send(user);
         })
         .catch((err) => {
            res.status(500).send({
               message:
                  err.message || 'Some error occurred while retrieving users.',
            });
         });
   }
};

//update a new identified user by user id
exports.update = (req, res) => {
   if (!req.body) {
      return res
         .status(400)
         .send({ message: 'Data to update can not be empty' });
   }

   const id = req.params.id;
   Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then((data) => {
         if (!data) {
            res.status(404).send({
               message: `Cannot Update user with ${id}. Maybe user not found!`,
            });
         } else {
            res.send(data);
         }
      })
      .catch((err) => {
         res.status(500).send({ message: 'Error Update user information' });
      });
};

//delete a new identified user by user id

exports.delete = (req, res) => {
   const id = req.params.id;
   Userdb.findByIdAndRemove(id, { useFindAndModify: false })
      .then((data) => {
         if (!data) {
            res.status(404).send({
               message: `Cannot Delete user with ${id}. Maybe user not found!`,
            });
         } else {
            res.send(data);
         }
      })
      .catch((err) => {
         res.status(500).send({ message: 'Error Delete user information' });
      });
};
