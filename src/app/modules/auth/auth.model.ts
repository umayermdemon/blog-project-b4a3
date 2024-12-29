import { model, Schema } from "mongoose";
import { TRegisterUser, UserModel } from "./auth.interface";
import bcrypt from "bcrypt";
import config from "../../config";
const userRegistrationSchema = new Schema<TRegisterUser, UserModel>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user"], default: "user" },
    // role: { type: String, default: "user" },
    isBlocked: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);
// hashed password
userRegistrationSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// empty password
userRegistrationSchema.post("save", async function (doc, next) {
  doc.password = "";
  next();
});

userRegistrationSchema.statics.isUserExistsByEmail = async function (
  email: string,
) {
  return await RegisteredUser.findOne({ email });
};

userRegistrationSchema.statics.isPasswordMatched = async function (
  plainPassword: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

export const RegisteredUser = model<TRegisterUser, UserModel>(
  "RegisteredUser",
  userRegistrationSchema,
);
