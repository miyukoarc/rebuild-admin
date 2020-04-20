import virturalData  from '../virtural-data'
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

export default [
  // user login
  {
    url: '/vue-admin-template/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      // const token = tokens[username]

      // mock error
      if (!username) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return virturalData.login
      
    }
  },

  // get user info
  {
    url: '/v1/detail/myInfo',
    type: 'get',
    response: config => {
      // const { token } = config.query
      // const info = users[token]

      // mock error
      // if (!info) {
      //   return {
      //     code: 50008,
      //     message: 'Login failed, unable to get user details.'
      //   }
      // }

      return virturalData.userInfo
      
    }
  },

  // user logout
  {
    url: '/vue-admin-template/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/v1/list/menu',
    type: 'get',
    response: _=>{
      return  virturalData.userMenu
      
    }
  }
]
