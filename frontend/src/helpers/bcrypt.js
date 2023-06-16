import bcrypt from "bcryptjs";

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const pass = await bcrypt.hash(password, salt);
  console.log(pass);
  return pass;
};

export const comparePassword = async (enteredPassword, dbPassword) => {
  return await bcrypt.compare(enteredPassword, dbPassword);
};
