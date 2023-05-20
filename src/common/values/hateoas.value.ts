export const hateoasValue = {
  users: [
    {
      type: 'GET',
      rel: 'self',
      uri: 'localhost:3000/users/uuid',
    },
    {
      type: 'GET',
      rel: 'user_roles',
      uri: 'localhost:3000/users/uuid/roles',
    },
    {
      type: 'PATCH',
      rel: 'user_update',
      uri: 'localhost:3000/users/uuid',
    },
    {
      type: 'DELETE',
      rel: 'user_delete',
      uri: 'localhost:3000/users/uuid',
    },
  ],
};
