import { mongoose } from "mongoose";
const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.set("toJSON", {
  transform(_doc, ret) {
    delete ret.password;
  },
});
const User = mongoose.model("User", UserSchema);
export default User;
