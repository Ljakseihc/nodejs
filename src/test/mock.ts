import jwt from "jsonwebtoken";

const jwtConfig = {
    jwtToken: 'secret',
    jwtExpire: '2h',
  };

export const validToken = jwt.sign(
  { login: "Test" },
  jwtConfig.jwtToken as string
);

export const invalidToken = jwt.sign(
  { login: "Test" },
  "wrong token" as string
);

export const getValidUser = () => ({
  login: `login${  Date.now()}`,
  password: "lettersNumbers123456",
  age: 18,
});

export const getValidGroup = () => ({
  name: `name${  Date.now()}`,
  permissions: [],
});
