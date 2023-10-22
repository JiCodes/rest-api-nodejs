import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
});

export const UserModel = mongoose.model("User", UserSchema);

export const getUsers = async () => {
  return await UserModel.find({});
};

export const getUserByEmail = (email: string) => {
  return UserModel.findOne({ email });
};

export const getUserBySessionToken = async (sessionToken: string) => {
  return await UserModel.findOne({
    "authentication.sessionToken": sessionToken,
  });
};

export const getUserById = async (id: string) => {
  return await UserModel.findById(id);
};

export const createUser = async (values: Record<string, any>) => {
  return new UserModel(values).save().then((user) => user.toObject());
};

export const deleteUserById = async (id: string) => {
  return await UserModel.findByIdAndDelete(id);
};

export const updateUserById = async (
  id: string,
  values: Record<string, any>
) => {
  return UserModel.findByIdAndUpdate(id, values);
};
