// const baseApi = `http://localhost:5000`;
const baseApi = `https://todo-test-task-backend.herokuapp.com`;
const todoRoute = `todo`;

export const environment = {
  production: true,
  todo: `${ baseApi }/${ todoRoute }`,
};
