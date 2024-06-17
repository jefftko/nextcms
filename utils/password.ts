import bcrypt from 'bcryptjs'

export const saltAndHashPassword = async (password) => {
  const saltRounds = 10
  const salt = await bcrypt.genSalt(saltRounds)
  const hashedPassword = await bcrypt.hash(password, salt)
  console.log(hashedPassword)
  return hashedPassword
}

export const validatePassword = async (enteredPassword, storedHash) => {
  return await bcrypt.compare(enteredPassword, storedHash)
}
