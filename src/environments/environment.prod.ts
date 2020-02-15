const baseApi = `http://localhost:5000`;
const todoRoute = `todo`;

export const environment = {
  production: true,
  todo: `${ baseApi }/${ todoRoute }`,
};
