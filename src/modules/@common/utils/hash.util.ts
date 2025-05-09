import { argon2d, argon2i, argon2id, hash, verify } from 'argon2'

//argon2i
const hashPassword = async (pwd: string) => await hash(pwd, { type: argon2i })

//argon2d
const hashData = async (data: string) => await hash(data, { type: argon2d })

//argon2id
const hashDataExtra = async (data: string) =>
  await hash(data, { type: argon2id })

const matchPassword = async (hashedPwd: string, pwd: string) => {
  console.log(hashedPwd)
  console.log(pwd)
  return await verify(hashedPwd, pwd)
}

//https://github.com/ranisalt/node-argon2/wiki/Options

export { hashPassword, hashData, hashDataExtra, matchPassword }
