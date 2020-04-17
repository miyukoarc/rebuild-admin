
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
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 20000,
        data: {
          "access_token": "b544bff9-bf98-4098-ac57-c64a5dea8e24",
          "token_type": "bearer",
          "refresh_token": "5fc57d4e-f337-4ef7-8461-49381b23fc33",
          "expires_in": 275659,
          "scope": "all",
          "unionID": "aecf55fce5940142aeb36bf8123b0125",
          "userSig": "eJw1jk0LgkAURf-LbAt943M*GmgVElRQqZHbyikekYmNgxD990Tr7u65HLhvlm*ywHY1NZYZ5AIlAEwH6m3DDIsCYGN-lfdTXVPJDI8BMFIg9LhQaStHVxoEjgrG8L9It56HW3*BzD8trs7LGNKEeIoIE1cUO3lsF1Wb5-vDbN2FyfwnOnr0r7jQsVKopf58AZzKMHg_",
          "userID": "13700000001"
      }
      }
    }
  },

  // get user info
  {
    url: '/v1/detail/myInfo\.*',
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

      return {
        code: 20000,
        data: {
          "country": {},
          "role": {
              "createdAt": "2020-03-21 09:19:01",
              "code": "developer",
              "name": "开发者",
              "terminal": "ORG",
              "version": 0,
              "uuid": 1,
              "updatedAt": "2020-03-21 09:19:01"
          },
          "unionId": "aecf55fce5940142aeb36bf8123b0125",
          "gender": null,
          "org": {
              "createdAt": "2020-03-21 09:19:54",
              "name": "天邮平台5123484287",
              "uuid": 1,
              "version": 1,
              "updatedAt": "2020-03-21 09:19:57"
          },
          "city": {},
          "version": 1,
          "uuid": 2,
          "enabled": true,
          "createdAt": "2020-03-21 14:23:58",
          "province": {},
          "headimgurl": "https://www.gravatar.com/avatar/24fe9a1a26e3007977b6f5eabdd64afa?d=robohash&s=256",
          "nickname": "用户gativs",
          "state": {},
          "department": {},
          "userinfo": {
              "mobile": "13700000001",
              "uuid": 2
          },
          "updatedAt": "2020-03-21 14:23:59"
      }
      }
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
      return {
        code: 20000,
        data: {
          "items": [
              {
                  "parent": {},
                  "createdAt": null,
                  "code": "has_routes",
                  "children": [
                      {
                          "parent": {
                              "code": "has_routes",
                              "name": "导航",
                              "sort": 9,
                              "uuid": 10,
                              "url": "/has_routes"
                          },
                          "createdAt": null,
                          "code": "second",
                          "name": "second",
                          "iconUrl": null,
                          "sort": 11,
                          "uuid": 12,
                          "version": null,
                          "url": "/has_routes/second",
                          "updatedAt": null
                      },
                      {
                          "parent": {
                              "code": "has_routes",
                              "name": "导航",
                              "sort": 9,
                              "uuid": 10,
                              "url": "/has_routes"
                          },
                          "createdAt": null,
                          "code": "primary",
                          "name": "primary",
                          "iconUrl": null,
                          "sort": 10,
                          "uuid": 11,
                          "version": null,
                          "url": "/has_routes/primary",
                          "updatedAt": null
                      }
                  ],
                  "name": "导航",
                  "iconUrl": null,
                  "sort": 9,
                  "uuid": 10,
                  "version": null,
                  "url": "/has_routes",
                  "updatedAt": null
              },
              {
                  "parent": {},
                  "createdAt": null,
                  "code": "mall",
                  "name": "商城",
                  "iconUrl": null,
                  "sort": 8,
                  "uuid": 8,
                  "version": null,
                  "url": "http://m.tmall.com",
                  "updatedAt": null
              },
              {
                  "parent": {},
                  "createdAt": null,
                  "code": "human_resource",
                  "children": [
                      {
                          "parent": {
                              "code": "human_resource",
                              "name": "人资",
                              "sort": 4,
                              "uuid": 5,
                              "url": "/human_resource"
                          },
                          "createdAt": null,
                          "code": "manager",
                          "children": [
                              {
                                  "parent": {
                                      "code": "manager",
                                      "name": "管理",
                                      "sort": 5,
                                      "uuid": 9,
                                      "url": ""
                                  },
                                  "createdAt": null,
                                  "code": "roles",
                                  "name": "角色管理",
                                  "iconUrl": null,
                                  "sort": 7,
                                  "uuid": 7,
                                  "version": null,
                                  "url": "/human_resource/roles",
                                  "updatedAt": null
                              },
                              {
                                  "parent": {
                                      "code": "manager",
                                      "name": "管理",
                                      "sort": 5,
                                      "uuid": 9,
                                      "url": ""
                                  },
                                  "createdAt": null,
                                  "code": "deparment",
                                  "name": "部门管理",
                                  "iconUrl": null,
                                  "sort": 6,
                                  "uuid": 6,
                                  "version": null,
                                  "url": "/human_resource/department",
                                  "updatedAt": null
                              }
                          ],
                          "name": "管理",
                          "iconUrl": null,
                          "sort": 5,
                          "uuid": 9,
                          "version": null,
                          "url": "",
                          "updatedAt": null
                      }
                  ],
                  "name": "人资",
                  "iconUrl": null,
                  "sort": 4,
                  "uuid": 5,
                  "version": null,
                  "url": "/human_resource",
                  "updatedAt": null
              },
              {
                  "parent": {},
                  "createdAt": "2020-03-21 09:19:57",
                  "code": "state_setting",
                  "name": "状态机",
                  "iconUrl": null,
                  "sort": 3,
                  "uuid": 4,
                  "version": 0,
                  "url": "/state_setting",
                  "updatedAt": "2020-03-21 09:19:57"
              },
              {
                  "parent": {},
                  "createdAt": "2020-03-21 09:19:57",
                  "code": "friend",
                  "name": "联系人",
                  "iconUrl": null,
                  "sort": 2,
                  "uuid": 3,
                  "version": 0,
                  "url": "/im_friend",
                  "updatedAt": "2020-03-21 09:19:57"
              },
              {
                  "parent": {},
                  "createdAt": "2020-03-21 09:19:57",
                  "code": "conversation",
                  "name": "会话",
                  "iconUrl": null,
                  "sort": 1,
                  "uuid": 2,
                  "version": 0,
                  "url": "/im_conversation",
                  "updatedAt": "2020-03-21 09:19:57"
              },
              {
                  "parent": {},
                  "createdAt": "2020-03-21 09:19:57",
                  "code": "dashboard",
                  "name": "主页",
                  "iconUrl": null,
                  "sort": 0,
                  "uuid": 1,
                  "version": 0,
                  "url": "/dashboard",
                  "updatedAt": "2020-03-21 09:19:57"
              }
          ],
          "total": 12,
          "pageNumber": 0,
          "pageSize": 20
      }
      }
    }
  }
]
