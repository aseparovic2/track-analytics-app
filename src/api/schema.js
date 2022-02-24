export const schema = {
  users: {
    type: 'users',
    relationships: {
      userRole: {
        type: 'userRoles'
      }
    }
  },
  'user-roles': {
    type: 'userRoles',
    relationships: {
      users: {
        type: 'users'
      }
    }
  },
  'password-resets': {
    type: 'passwordResets',
  }
}
