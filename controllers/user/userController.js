const { valid } = require("joi");
const { User, UserValidation } = require("../../models/users/user");
const hashPassword = require("../../utils/hashPassword");
const { validateObjectId, formatResult } = require("../../utils/formatResult");


//creating the new user
exports.createUser = async (req, res) => {
  try {
    const body = req.body;

    const { error } = UserValidation(body);
    if (error) {
      return res.send(formatResult({ status: 400, message: error }));
    }

    //checking the duplicate problem
    const duplicateEmail = await User.findOne({ userEmail: body.userEmail });
    if (duplicateEmail) {
      res.send(formatResult({ status: 400, message: "User already exist" }));
    }

    let newUser = new User(body);
    

    //question codes slash bugs
    const hashedPasswsord = await hashPassword(newUser.userPassword);
    newUser.userPassword = hashedPasswsord;
    
    await newUser.save();
    res.send(
      formatResult({ status: 201, message: "succesfful created", data: body })
    );
  } catch (error) {
    // res.send(formatResult({status:500, message:error}));
    res.send(formatResult({ status: 500, message: error }));
  }
};

//gettting all users
exports.getAllUsers = async (req, res) => {
  try {
    let {limit,page } = req.query;
    if (!page) page = 1;
    if (!limit) limit = 10;

    if (page < 1)
      return res.send(
        formatResult({
          status: 400,
          message: "Page query must be greater than 0",
        })
      );

    const options = {
      page: page,
      limit: limit,
    };

    const users = await User.paginate({}, options);
    res.send(
      formatResult({
        data: users,
      })
    );
  } catch (err) {
    res.send(formatResult({ status: 500, message: err }));
  }
};

//getting a user
exports.getUser = async (req, res) => {
  try {
    let { id } = req.params;

    if (!validateObjectId(id))
      return res.send(formatResult({ status: 204, message: "Invalid id" }));

    const user = await User.findOne({ _id: id });
    

    if (!user) {
      return res.send(formatResult({ status: 404, message: "User not found" }));
    }

    return res.send(
      formatResult({ status: 200, message: "sucess", data: user })
    );
  } catch (err) {
    res.send(formatResult({ status: 400, message: "bad request", data: err }));
  }
};

//updating  a usedr
exports.updateUser = async (req, res) => {
  try {
    let { id } = req.params;
    const body = req.body;

    if (!validateObjectId(id)) {
      res.send(
        formatResult({
          status: 204,
          message: "Invalid id",
        })
      );
    }

    const { error } = UserValidation(req.body);
    if (error) return res.send(formatResult({ status: 400, message: error }));

    //finding the user
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.send(formatResult({ status: 404, message: "user not found" }));
    }

    const duplicateEmail = await User.findOne({
      _id: {
        $ne: req.params.id,
      },
      userEmail: req.body.userEmail,
    });

    console.log(duplicateEmail);

    if (duplicateEmail)
      return res.send(
        formatResult({
          status: 400,
          message: "user with this email already exists",
        })
      );

    const updatedUser = await User.findOneAndUpdate({ _id: id }, body);

    return res.send(
      formatResult({
        status: 201,
        message: "User updated successfully",
        data: updatedUser,
      })
    );
  } catch (error) {
    res.send(
      formatResult({ status: 400, message: "bad request", data: error })
    );
  }
};

//deleting a user
exports.deleteUser = async (req, res) => {
  try {
    let { id } = req.params;

    const user = await User.findOneAndDelete({ _id: id });

    if (!user) return res.send("user not found").status(404);

    return res.send(
      formatResult({
        status: 200,
        message: "user deleted succesffuly",
        data: user,
      })
    );
  } catch (error) {
    res.send(formatResult({ status: 400, message: error }));
  }
};

//deleting all users
exports.deleteAllUsers = async (req, res) => {
  const users = await User.deleteMany();
  if (!users) {
    res.send(
      formatResult({
        status: 400,
        message: "Bad request",
      })
    );
  }

  res.send(
    formatResult({
      status: 200,
      message: "Deleted the whole thingy",
      data: users,
    })
  );
};
