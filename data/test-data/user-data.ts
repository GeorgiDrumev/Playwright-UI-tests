export type { UserCredentials } from "@dtos/user.dto";

export const testUsers = {
  standardUser: {
    username: "standard_user",
    password: "secret_sauce",
  },
  lockedOutUser: {
    username: "locked_out_user",
    password: "secret_sauce",
  },
  problemUser: {
    username: "problem_user",
    password: "secret_sauce",
  },
  performanceGlitchUser: {
    username: "performance_glitch_user",
    password: "secret_sauce",
  },
  errorUser: {
    username: "error_user",
    password: "secret_sauce",
  },
  visualUser: {
    username: "visual_user",
    password: "secret_sauce",
  },
};

export const invalidCredentials = {
  invalidUser: {
    username: "invalid_user",
    password: "secret_sauce",
  },
  invalidPassword: {
    username: "standard_user",
    password: "wrong_password",
  },
  emptyUsername: {
    username: "",
    password: "secret_sauce",
  },
  emptyPassword: {
    username: "standard_user",
    password: "",
  },
  bothEmpty: {
    username: "",
    password: "",
  },
};
