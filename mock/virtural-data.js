export default {
    /**
     * contacts.js
     */
    getUserProfileByUserId:{
        "country": {},
        "role": {
          "createdAt": "2020-04-29 13:52:17",
          "code": "1",
          "name": "开发者",
          "terminal": "ORG",
          "version": 38,
          "uuid": 1,
          "updatedAt": "2020-05-09 12:26:18"
        },
        "unionId": "a8074f37ee942a6860a756984a7fc1d1",
        "gender": "Gender_Type_Female",
        "org": {
          "createdAt": "2020-04-29 13:52:58",
          "name": "天邮平台0754971220",
          "uuid": 1,
          "version": 13,
          "updatedAt": "2020-05-08 16:37:51"
        },
        "city": {},
        "version": 9,
        "uuid": 7,
        "enabled": true,
        "createdAt": "2020-05-08 13:59:06",
        "province": {},
        "headimgurl": "http://10.10.10.199:40001/v1/file/5eb607a8b1b79708b8dec134",
        "nickname": "Chloe",
        "state": {
          "createdAt": "2020-04-29 13:52:58",
          "code": "enabled",
          "stateType": "COMMON",
          "name": "有效状态",
          "sort": 20,
          "version": 6,
          "uuid": 2,
          "entity": "user",
          "updatedAt": "2020-05-07 16:01:51"
        },
        "position": null,
        "department": {
          "createdAt": "2020-05-09 10:09:23",
          "code": "test",
          "groupId": "@TGS#1NGH2XNG2",
          "name": "测试部门",
          "uuid": 4,
          "version": 1,
          "updatedAt": "2020-05-09 10:09:24"
        },
        "updatedAt": "2020-05-09 10:10:07"
      },
    /**
     * department.js
     */
    getDepartment:{
        "items": [
          {
            "parent": {},
            "createdAt": "2020-05-09 10:23:52",
            "code": "test2",
            "manager": {},
            "groupId": "@TGS#1S423XNGW",
            "name": "测试2部",
            "version": 1,
            "uuid": 7,
            "users": {},
            "updatedAt": "2020-05-09 10:23:53"
          },
          {
            "parent": {},
            "createdAt": "2020-05-09 10:09:23",
            "code": "test",
            "manager": {},
            "groupId": "@TGS#1NGH2XNG2",
            "name": "测试部门",
            "version": 1,
            "uuid": 4,
            "users": [
              {
                "uuid": 7
              }
            ],
            "updatedAt": "2020-05-09 10:09:24"
          },
          {
            "parent": {},
            "createdAt": "2020-04-29 13:52:58",
            "code": "department1",
            "manager": {},
            "children": [
              {
                "parent": {
                  "createdAt": "2020-04-29 13:52:58",
                  "code": "department1",
                  "groupId": "@TGS#1HHGM6MGM",
                  "name": "部门1",
                  "uuid": 1,
                  "version": 5,
                  "updatedAt": "2020-05-08 11:57:50"
                },
                "createdAt": "2020-04-29 13:52:59",
                "code": "department3",
                "manager": {
                  "createdAt": "2020-04-29 13:53:57",
                  "unionId": "2a8e7a4ddb5caa599c41575ef9a5cdda",
                  "gender": "Gender_Type_Male",
                  "nickname": "Jedi",
                  "headimgurl": "http://10.10.10.199:40001/v1/file/5eb52f0239a7227d1ef4dfbd",
                  "position": "MANAGER",
                  "uuid": 3,
                  "version": 14,
                  "enabled": true,
                  "updatedAt": "2020-05-09 10:01:06"
                },
                "children": [
                  {
                    "parent": {
                      "createdAt": "2020-04-29 13:52:59",
                      "code": "department3",
                      "groupId": "@TGS#1IIGM6MGO",
                      "name": "部门2",
                      "uuid": 2,
                      "version": 6,
                      "updatedAt": "2020-05-09 09:41:33"
                    },
                    "createdAt": "2020-04-29 13:52:59",
                    "code": "department2",
                    "manager": {},
                    "groupId": "@TGS#1JJGM6MGQ",
                    "name": "部门3",
                    "version": 5,
                    "uuid": 3,
                    "users": [
                      {
                        "uuid": 2
                      }
                    ],
                    "updatedAt": "2020-05-09 09:41:43"
                  }
                ],
                "groupId": "@TGS#1IIGM6MGO",
                "name": "部门2",
                "version": 6,
                "uuid": 2,
                "users": [
                  {
                    "uuid": 5
                  }
                ],
                "updatedAt": "2020-05-09 09:41:33"
              }
            ],
            "groupId": "@TGS#1HHGM6MGM",
            "name": "部门1",
            "version": 5,
            "uuid": 1,
            "users": [
              {
                "uuid": 3
              }
            ],
            "updatedAt": "2020-05-08 11:57:50"
          }
        ],
        "total": 5,
        "pageNumber": 0,
        "pageSize": 20
      },
      createDepartment:{
          code: '200'
      },
      updateDepartment: {
        code: '200'
      },
      getDepartmentUser: {
        "items": [
          {
            "role": {
              "createdAt": "2020-04-29 13:52:17",
              "code": "1",
              "name": "开发者",
              "terminal": "ORG",
              "version": 38,
              "uuid": 1,
              "updatedAt": "2020-05-09 12:26:18"
            },
            "unionId": "7e4d22aa9870ffa5983587e64bab284c",
            "gender": null,
            "org": {
              "createdAt": "2020-04-29 13:52:58",
              "name": "天邮平台0754971220",
              "uuid": 1,
              "version": 13,
              "updatedAt": "2020-05-08 16:37:51"
            },
            "uuid": 5,
            "version": 4,
            "enabled": true,
            "createdAt": "2020-04-30 12:10:33",
            "headimgurl": "https://www.gravatar.com/avatar/eecd39de3bb422a1fec61af1054cc820?d=robohash&s=256",
            "nickname": "用户nfzsa4",
            "state": {
              "createdAt": "2020-04-29 13:52:58",
              "code": "enabled",
              "stateType": "COMMON",
              "name": "有效状态",
              "sort": 20,
              "uuid": 2,
              "version": 6,
              "entity": "user",
              "updatedAt": "2020-05-07 16:01:51"
            },
            "position": null,
            "department": {
              "createdAt": "2020-04-29 13:52:59",
              "code": "department3",
              "groupId": "@TGS#1IIGM6MGO",
              "name": "部门2",
              "uuid": 2,
              "version": 6,
              "updatedAt": "2020-05-09 09:41:33"
            },
            "userinfo": {
              "isOnLine": false,
              "mobile": "13700000003",
              "uuid": 5
            },
            "updatedAt": "2020-05-07 16:32:36"
          }
        ],
        "total": 1,
        "pageNumber": 0,
        "pageSize": 20
      },
      getDepartmentDetail: {
        "parent": {
          "createdAt": "2020-04-29 13:52:58",
          "code": "department1",
          "groupId": "@TGS#1HHGM6MGM",
          "name": "部门1",
          "uuid": 1,
          "version": 5,
          "updatedAt": "2020-05-08 11:57:50"
        },
        "createdAt": "2020-04-29 13:52:59",
        "code": "department3",
        "manager": {
          "createdAt": "2020-04-29 13:53:57",
          "unionId": "2a8e7a4ddb5caa599c41575ef9a5cdda",
          "gender": "Gender_Type_Male",
          "nickname": "Jedi",
          "headimgurl": "http://10.10.10.199:40001/v1/file/5eb52f0239a7227d1ef4dfbd",
          "position": "MANAGER",
          "uuid": 3,
          "version": 14,
          "enabled": true,
          "updatedAt": "2020-05-09 10:01:06"
        },
        "children": [
          {
            "createdAt": "2020-04-29 13:52:59",
            "code": "department2",
            "groupId": "@TGS#1JJGM6MGQ",
            "name": "部门3",
            "version": 5,
            "uuid": 3,
            "updatedAt": "2020-05-09 09:41:43"
          }
        ],
        "groupId": "@TGS#1IIGM6MGO",
        "name": "部门2",
        "version": 6,
        "uuid": 2,
        "users": [
          {
            "createdAt": "2020-04-30 12:10:33",
            "unionId": "7e4d22aa9870ffa5983587e64bab284c",
            "gender": null,
            "nickname": "用户nfzsa4",
            "headimgurl": "https://www.gravatar.com/avatar/eecd39de3bb422a1fec61af1054cc820?d=robohash&s=256",
            "position": null,
            "uuid": 5,
            "version": 4,
            "enabled": true,
            "updatedAt": "2020-05-07 16:32:36"
          }
        ],
        "updatedAt": "2020-05-09 09:41:33"
      },
      getDepartmentList:{
        "items": [
          {
            "parent": {},
            "createdAt": "2020-05-09 10:23:52",
            "code": "test2",
            "manager": {},
            "groupId": "@TGS#1S423XNGW",
            "name": "测试2部",
            "version": 1,
            "uuid": 7,
            "users": {},
            "updatedAt": "2020-05-09 10:23:53"
          },
          {
            "parent": {},
            "createdAt": "2020-05-09 10:09:23",
            "code": "test",
            "manager": {},
            "groupId": "@TGS#1NGH2XNG2",
            "name": "测试部门",
            "version": 1,
            "uuid": 4,
            "users": [
              {
                "uuid": 7
              }
            ],
            "updatedAt": "2020-05-09 10:09:24"
          },
          {
            "parent": {
              "createdAt": "2020-04-29 13:52:59",
              "code": "department3",
              "groupId": "@TGS#1IIGM6MGO",
              "name": "部门2",
              "uuid": 2,
              "version": 6,
              "updatedAt": "2020-05-09 09:41:33"
            },
            "createdAt": "2020-04-29 13:52:59",
            "code": "department2",
            "manager": {},
            "groupId": "@TGS#1JJGM6MGQ",
            "name": "部门3",
            "version": 5,
            "uuid": 3,
            "users": [
              {
                "uuid": 2
              }
            ],
            "updatedAt": "2020-05-09 09:41:43"
          },
          {
            "parent": {
              "createdAt": "2020-04-29 13:52:58",
              "code": "department1",
              "groupId": "@TGS#1HHGM6MGM",
              "name": "部门1",
              "uuid": 1,
              "version": 5,
              "updatedAt": "2020-05-08 11:57:50"
            },
            "createdAt": "2020-04-29 13:52:59",
            "code": "department3",
            "manager": {
              "createdAt": "2020-04-29 13:53:57",
              "unionId": "2a8e7a4ddb5caa599c41575ef9a5cdda",
              "gender": "Gender_Type_Male",
              "nickname": "Jedi",
              "headimgurl": "http://10.10.10.199:40001/v1/file/5eb52f0239a7227d1ef4dfbd",
              "position": "MANAGER",
              "uuid": 3,
              "version": 14,
              "enabled": true,
              "updatedAt": "2020-05-09 10:01:06"
            },
            "groupId": "@TGS#1IIGM6MGO",
            "name": "部门2",
            "version": 6,
            "uuid": 2,
            "users": [
              {
                "uuid": 5
              }
            ],
            "updatedAt": "2020-05-09 09:41:33"
          },
          {
            "parent": {},
            "createdAt": "2020-04-29 13:52:58",
            "code": "department1",
            "manager": {},
            "groupId": "@TGS#1HHGM6MGM",
            "name": "部门1",
            "version": 5,
            "uuid": 1,
            "users": [
              {
                "uuid": 3
              }
            ],
            "updatedAt": "2020-05-08 11:57:50"
          }
        ],
        "total": 5,
        "pageNumber": 0,
        "pageSize": 20
      },
      getAllDepartments: {
        "items": [
          {
            "parent": {},
            "createdAt": "2020-05-09 10:23:52",
            "code": "test2",
            "manager": {},
            "groupId": "@TGS#1S423XNGW",
            "name": "测试2部",
            "version": 1,
            "uuid": 7,
            "users": {},
            "updatedAt": "2020-05-09 10:23:53"
          },
          {
            "parent": {},
            "createdAt": "2020-05-09 10:09:23",
            "code": "test",
            "manager": {},
            "groupId": "@TGS#1NGH2XNG2",
            "name": "测试部门",
            "version": 1,
            "uuid": 4,
            "users": [
              {
                "uuid": 7
              }
            ],
            "updatedAt": "2020-05-09 10:09:24"
          },
          {
            "parent": {
              "createdAt": "2020-04-29 13:52:59",
              "code": "department3",
              "groupId": "@TGS#1IIGM6MGO",
              "name": "部门2",
              "uuid": 2,
              "version": 6,
              "updatedAt": "2020-05-09 09:41:33"
            },
            "createdAt": "2020-04-29 13:52:59",
            "code": "department2",
            "manager": {},
            "groupId": "@TGS#1JJGM6MGQ",
            "name": "部门3",
            "version": 5,
            "uuid": 3,
            "users": [
              {
                "uuid": 2
              }
            ],
            "updatedAt": "2020-05-09 09:41:43"
          },
          {
            "parent": {
              "createdAt": "2020-04-29 13:52:58",
              "code": "department1",
              "groupId": "@TGS#1HHGM6MGM",
              "name": "部门1",
              "uuid": 1,
              "version": 5,
              "updatedAt": "2020-05-08 11:57:50"
            },
            "createdAt": "2020-04-29 13:52:59",
            "code": "department3",
            "manager": {
              "createdAt": "2020-04-29 13:53:57",
              "unionId": "2a8e7a4ddb5caa599c41575ef9a5cdda",
              "gender": "Gender_Type_Male",
              "nickname": "Jedi",
              "headimgurl": "http://10.10.10.199:40001/v1/file/5eb52f0239a7227d1ef4dfbd",
              "position": "MANAGER",
              "uuid": 3,
              "version": 14,
              "enabled": true,
              "updatedAt": "2020-05-09 10:01:06"
            },
            "groupId": "@TGS#1IIGM6MGO",
            "name": "部门2",
            "version": 6,
            "uuid": 2,
            "users": [
              {
                "uuid": 5
              }
            ],
            "updatedAt": "2020-05-09 09:41:33"
          },
          {
            "parent": {},
            "createdAt": "2020-04-29 13:52:58",
            "code": "department1",
            "manager": {},
            "groupId": "@TGS#1HHGM6MGM",
            "name": "部门1",
            "version": 5,
            "uuid": 1,
            "users": [
              {
                "uuid": 3
              }
            ],
            "updatedAt": "2020-05-08 11:57:50"
          }
        ],
        "total": 5,
        "pageNumber": 0,
        "pageSize": 20
      },
      /**
       * employee.js
       */
      getEmployeeList: {
        "items": [
          {
            "role": {
              "createdAt": "2020-04-29 13:52:17",
              "code": "1",
              "name": "开发者",
              "terminal": "ORG",
              "version": 38,
              "uuid": 1,
              "updatedAt": "2020-05-09 12:26:18"
            },
            "unionId": "a8074f37ee942a6860a756984a7fc1d1",
            "gender": "Gender_Type_Female",
            "org": {
              "createdAt": "2020-04-29 13:52:58",
              "name": "天邮平台0754971220",
              "uuid": 1,
              "version": 13,
              "updatedAt": "2020-05-08 16:37:51"
            },
            "uuid": 7,
            "version": 9,
            "enabled": true,
            "createdAt": "2020-05-08 13:59:06",
            "headimgurl": "http://10.10.10.199:40001/v1/file/5eb607a8b1b79708b8dec134",
            "nickname": "Chloe",
            "state": {
              "createdAt": "2020-04-29 13:52:58",
              "code": "enabled",
              "stateType": "COMMON",
              "name": "有效状态",
              "sort": 20,
              "uuid": 2,
              "version": 6,
              "entity": "user",
              "updatedAt": "2020-05-07 16:01:51"
            },
            "position": null,
            "department": {
              "createdAt": "2020-05-09 10:09:23",
              "code": "test",
              "groupId": "@TGS#1NGH2XNG2",
              "name": "测试部门",
              "uuid": 4,
              "version": 1,
              "updatedAt": "2020-05-09 10:09:24"
            },
            "userinfo": {
              "mobile": "13700000004",
              "uuid": 7
            },
            "updatedAt": "2020-05-09 10:10:07"
          },
          {
            "role": {
              "createdAt": "2020-04-29 13:52:17",
              "code": "1",
              "name": "开发者",
              "terminal": "ORG",
              "version": 38,
              "uuid": 1,
              "updatedAt": "2020-05-09 12:26:18"
            },
            "unionId": "10d993286ce8aa410af963ceae8a0ef7",
            "gender": null,
            "org": {
              "createdAt": "2020-04-29 13:52:58",
              "name": "天邮平台0754971220",
              "uuid": 1,
              "version": 13,
              "updatedAt": "2020-05-08 16:37:51"
            },
            "uuid": 6,
            "version": 3,
            "enabled": true,
            "createdAt": "2020-05-06 16:28:28",
            "headimgurl": "https://www.gravatar.com/avatar/79fb79588bcf64787fab17cc4f6f1b9c?d=robohash&s=256",
            "nickname": "用户rgf4xd",
            "state": {
              "createdAt": "2020-04-29 13:52:58",
              "code": "enabled",
              "stateType": "COMMON",
              "name": "有效状态",
              "sort": 20,
              "uuid": 2,
              "version": 6,
              "entity": "user",
              "updatedAt": "2020-05-07 16:01:51"
            },
            "position": null,
            "department": {},
            "userinfo": {
              "mobile": "13700000005",
              "uuid": 6
            },
            "updatedAt": "2020-05-08 10:59:06"
          },
          {
            "role": {
              "createdAt": "2020-04-29 13:52:17",
              "code": "1",
              "name": "开发者",
              "terminal": "ORG",
              "version": 38,
              "uuid": 1,
              "updatedAt": "2020-05-09 12:26:18"
            },
            "unionId": "7e4d22aa9870ffa5983587e64bab284c",
            "gender": null,
            "org": {
              "createdAt": "2020-04-29 13:52:58",
              "name": "天邮平台0754971220",
              "uuid": 1,
              "version": 13,
              "updatedAt": "2020-05-08 16:37:51"
            },
            "uuid": 5,
            "version": 4,
            "enabled": true,
            "createdAt": "2020-04-30 12:10:33",
            "headimgurl": "https://www.gravatar.com/avatar/eecd39de3bb422a1fec61af1054cc820?d=robohash&s=256",
            "nickname": "用户nfzsa4",
            "state": {
              "createdAt": "2020-04-29 13:52:58",
              "code": "enabled",
              "stateType": "COMMON",
              "name": "有效状态",
              "sort": 20,
              "uuid": 2,
              "version": 6,
              "entity": "user",
              "updatedAt": "2020-05-07 16:01:51"
            },
            "position": null,
            "department": {
              "createdAt": "2020-04-29 13:52:59",
              "code": "department3",
              "groupId": "@TGS#1IIGM6MGO",
              "name": "部门2",
              "uuid": 2,
              "version": 6,
              "updatedAt": "2020-05-09 09:41:33"
            },
            "userinfo": {
              "mobile": "13700000003",
              "uuid": 5
            },
            "updatedAt": "2020-05-07 16:32:36"
          },
          {
            "role": {
              "createdAt": "2020-04-29 13:52:17",
              "code": "1",
              "name": "开发者",
              "terminal": "ORG",
              "version": 38,
              "uuid": 1,
              "updatedAt": "2020-05-09 12:26:18"
            },
            "unionId": "2a8e7a4ddb5caa599c41575ef9a5cdda",
            "gender": "Gender_Type_Male",
            "org": {
              "createdAt": "2020-04-29 13:52:58",
              "name": "天邮平台0754971220",
              "uuid": 1,
              "version": 13,
              "updatedAt": "2020-05-08 16:37:51"
            },
            "uuid": 3,
            "version": 14,
            "enabled": true,
            "createdAt": "2020-04-29 13:53:57",
            "headimgurl": "http://10.10.10.199:40001/v1/file/5eb52f0239a7227d1ef4dfbd",
            "nickname": "Jedi",
            "state": {
              "createdAt": "2020-04-29 13:52:58",
              "code": "enabled",
              "stateType": "COMMON",
              "name": "有效状态",
              "sort": 20,
              "uuid": 2,
              "version": 6,
              "entity": "user",
              "updatedAt": "2020-05-07 16:01:51"
            },
            "position": "MANAGER",
            "department": {
              "createdAt": "2020-04-29 13:52:58",
              "code": "department1",
              "groupId": "@TGS#1HHGM6MGM",
              "name": "部门1",
              "uuid": 1,
              "version": 5,
              "updatedAt": "2020-05-08 11:57:50"
            },
            "userinfo": {
              "mobile": "13700000002",
              "uuid": 3
            },
            "updatedAt": "2020-05-09 10:01:06"
          },
          {
            "role": {
              "createdAt": "2020-04-29 13:52:17",
              "code": "1",
              "name": "开发者",
              "terminal": "ORG",
              "version": 38,
              "uuid": 1,
              "updatedAt": "2020-05-09 12:26:18"
            },
            "unionId": "b53e0915d3b244db66a9bd74524b6931",
            "gender": "Gender_Type_Female",
            "org": {
              "createdAt": "2020-04-29 13:52:58",
              "name": "天邮平台0754971220",
              "uuid": 1,
              "version": 13,
              "updatedAt": "2020-05-08 16:37:51"
            },
            "uuid": 2,
            "version": 6,
            "enabled": true,
            "createdAt": "2020-04-29 13:53:54",
            "headimgurl": "https://www.gravatar.com/avatar/24fe9a1a26e3007977b6f5eabdd64afa?d=robohash&s=256",
            "nickname": "用户gativs",
            "state": {
              "createdAt": "2020-04-29 16:14:36",
              "code": "wait_payment",
              "stateType": "BEGIN",
              "name": "待支付",
              "sort": 10,
              "uuid": 4,
              "version": 4,
              "entity": "order",
              "updatedAt": "2020-04-30 17:01:18"
            },
            "position": "MANAGER",
            "department": {
              "createdAt": "2020-04-29 13:52:59",
              "code": "department2",
              "groupId": "@TGS#1JJGM6MGQ",
              "name": "部门3",
              "uuid": 3,
              "version": 5,
              "updatedAt": "2020-05-09 09:41:43"
            },
            "userinfo": {
              "mobile": "13700000001",
              "uuid": 2
            },
            "updatedAt": "2020-05-08 13:50:30"
          }
        ],
        "total": 5,
        "pageNumber": 0,
        "pageSize": 20
      },
      getEmpByDepartId:{
        "items": [
          {
            "role": {
              "createdAt": "2020-04-29 13:52:17",
              "code": "1",
              "name": "开发者",
              "terminal": "ORG",
              "version": 38,
              "uuid": 1,
              "updatedAt": "2020-05-09 12:26:18"
            },
            "unionId": "2a8e7a4ddb5caa599c41575ef9a5cdda",
            "gender": "Gender_Type_Male",
            "org": {
              "createdAt": "2020-04-29 13:52:58",
              "name": "天邮平台0754971220",
              "uuid": 1,
              "version": 13,
              "updatedAt": "2020-05-08 16:37:51"
            },
            "uuid": 3,
            "version": 14,
            "enabled": true,
            "createdAt": "2020-04-29 13:53:57",
            "headimgurl": "http://10.10.10.199:40001/v1/file/5eb52f0239a7227d1ef4dfbd",
            "nickname": "Jedi",
            "state": {
              "createdAt": "2020-04-29 13:52:58",
              "code": "enabled",
              "stateType": "COMMON",
              "name": "有效状态",
              "sort": 20,
              "uuid": 2,
              "version": 6,
              "entity": "user",
              "updatedAt": "2020-05-07 16:01:51"
            },
            "position": "MANAGER",
            "department": {
              "createdAt": "2020-04-29 13:52:58",
              "code": "department1",
              "groupId": "@TGS#1HHGM6MGM",
              "name": "部门1",
              "uuid": 1,
              "version": 5,
              "updatedAt": "2020-05-08 11:57:50"
            },
            "userinfo": {
              "isOnLine": false,
              "mobile": "13700000002",
              "uuid": 3
            },
            "updatedAt": "2020-05-09 10:01:06"
          }
        ],
        "total": 1,
        "pageNumber": 0,
        "pageSize": 20
      },addEmployee:{
          code: '200'
      },
      getUserByPhone:{
        "country": {},
        "role": {
          "createdAt": "2020-04-29 13:52:17",
          "code": "1",
          "name": "开发者",
          "terminal": "ORG",
          "version": 38,
          "uuid": 1,
          "updatedAt": "2020-05-09 12:26:18"
        },
        "unionId": "a8074f37ee942a6860a756984a7fc1d1",
        "gender": "Gender_Type_Female",
        "org": {
          "createdAt": "2020-04-29 13:52:58",
          "name": "天邮平台0754971220",
          "uuid": 1,
          "version": 13,
          "updatedAt": "2020-05-08 16:37:51"
        },
        "city": {},
        "version": 9,
        "uuid": 7,
        "enabled": true,
        "createdAt": "2020-05-08 13:59:06",
        "province": {},
        "headimgurl": "http://10.10.10.199:40001/v1/file/5eb607a8b1b79708b8dec134",
        "nickname": "Chloe",
        "state": {
          "createdAt": "2020-04-29 13:52:58",
          "code": "enabled",
          "stateType": "COMMON",
          "name": "有效状态",
          "sort": 20,
          "version": 6,
          "uuid": 2,
          "entity": "user",
          "updatedAt": "2020-05-07 16:01:51"
        },
        "position": null,
        "department": {
          "createdAt": "2020-05-09 10:09:23",
          "code": "test",
          "groupId": "@TGS#1NGH2XNG2",
          "name": "测试部门",
          "uuid": 4,
          "version": 1,
          "updatedAt": "2020-05-09 10:09:24"
        },
        "updatedAt": "2020-05-09 10:10:07"
      },
      departSetting: {
          code: '200',
      },
      addEmployForUser: {
          code: '200'
      },
      deleteUserByUnionId: {
        code: '200'
      },
      locateUserRole: {
        code: '200'
      },
      /**
       * menuManage
       */
      addMenu: {
          code: '200'
      },
      getMenuList:{
        "items": [
          {
            "parent": {},
            "createdAt": "2020-04-29 13:53:01",
            "code": "home",
            "roles": [
              {
                "createdAt": "2020-04-29 13:52:17",
                "code": "1",
                "name": "开发者",
                "terminal": "ORG",
                "version": 38,
                "uuid": 1,
                "updatedAt": "2020-05-09 12:26:18"
              },
              {
                "createdAt": "2020-04-29 13:52:58",
                "code": "platform_manager",
                "name": "平台管理员",
                "terminal": "ORG",
                "version": 14,
                "uuid": 3,
                "updatedAt": "2020-05-09 17:19:07"
              },
              {
                "createdAt": "2020-04-29 13:52:58",
                "code": "platform_super",
                "name": "平台超管",
                "terminal": "ORG",
                "version": 12,
                "uuid": 4,
                "updatedAt": "2020-05-09 17:19:07"
              },
              {
                "createdAt": "2020-04-29 13:52:58",
                "code": "platform_employee",
                "name": "平台员工",
                "terminal": "ORG",
                "version": 8,
                "uuid": 5,
                "updatedAt": "2020-05-06 09:24:38"
              }
            ],
            "name": "主页",
            "iconUrl": "dashboard",
            "sort": 1,
            "uuid": 1,
            "version": 1,
            "url": "/d/dashboard",
            "updatedAt": "2020-04-29 14:51:39"
          },
          {
            "parent": {},
            "createdAt": "2020-04-29 13:53:01",
            "code": "conversation",
            "roles": [
              {
                "createdAt": "2020-04-29 13:52:17",
                "code": "1",
                "name": "开发者",
                "terminal": "ORG",
                "version": 38,
                "uuid": 1,
                "updatedAt": "2020-05-09 12:26:18"
              },
              {
                "createdAt": "2020-04-29 13:52:58",
                "code": "platform_super",
                "name": "平台超管",
                "terminal": "ORG",
                "version": 12,
                "uuid": 4,
                "updatedAt": "2020-05-09 17:19:07"
              },
              {
                "createdAt": "2020-04-29 13:52:58",
                "code": "platform_employee",
                "name": "平台员工",
                "terminal": "ORG",
                "version": 8,
                "uuid": 5,
                "updatedAt": "2020-05-06 09:24:38"
              }
            ],
            "name": "会话",
            "iconUrl": "form",
            "sort": 1,
            "uuid": 3,
            "version": 2,
            "url": "/d/conversation/conversation/list",
            "updatedAt": "2020-05-08 14:17:16"
          },
          {
            "parent": {},
            "createdAt": "2020-04-29 13:53:01",
            "code": "management",
            "roles": [
              {
                "createdAt": "2020-04-29 13:52:58",
                "code": "platform_manager",
                "name": "平台管理员",
                "terminal": "ORG",
                "version": 14,
                "uuid": 3,
                "updatedAt": "2020-05-09 17:19:07"
              },
              {
                "createdAt": "2020-04-29 13:52:58",
                "code": "platform_employee",
                "name": "平台员工",
                "terminal": "ORG",
                "version": 8,
                "uuid": 5,
                "updatedAt": "2020-05-06 09:24:38"
              }
            ],
            "name": "第二页",
            "iconUrl": "nested",
            "sort": 2,
            "uuid": 5,
            "version": 1,
            "url": "/d/management",
            "updatedAt": "2020-04-29 17:44:52"
          },
          {
            "parent": {},
            "createdAt": "2020-04-29 13:53:01",
            "code": "friend",
            "roles": [
              {
                "createdAt": "2020-04-29 13:52:17",
                "code": "1",
                "name": "开发者",
                "terminal": "ORG",
                "version": 38,
                "uuid": 1,
                "updatedAt": "2020-05-09 12:26:18"
              },
              {
                "createdAt": "2020-04-29 13:52:58",
                "code": "platform_super",
                "name": "平台超管",
                "terminal": "ORG",
                "version": 12,
                "uuid": 4,
                "updatedAt": "2020-05-09 17:19:07"
              },
              {
                "createdAt": "2020-04-29 13:52:58",
                "code": "platform_employee",
                "name": "平台员工",
                "terminal": "ORG",
                "version": 8,
                "uuid": 5,
                "updatedAt": "2020-05-06 09:24:38"
              }
            ],
            "name": "联系人",
            "iconUrl": "example",
            "sort": 3,
            "uuid": 2,
            "version": 1,
            "url": "/d/friend/friend/list",
            "updatedAt": "2020-05-08 14:17:40"
          },
          {
            "parent": {},
            "createdAt": "2020-04-29 14:09:46",
            "code": "manager",
            "children": [
              {
                "parent": {
                  "createdAt": "2020-04-29 14:09:46",
                  "code": "manager",
                  "name": "管理",
                  "iconUrl": "table",
                  "sort": 27,
                  "uuid": 9,
                  "version": 13,
                  "url": "/d/management",
                  "updatedAt": "2020-05-08 14:18:46"
                },
                "createdAt": "2020-04-29 14:25:40",
                "code": "userManage",
                "roles": [
                  {
                    "createdAt": "2020-04-29 13:52:17",
                    "code": "1",
                    "name": "开发者",
                    "terminal": "ORG",
                    "version": 38,
                    "uuid": 1,
                    "updatedAt": "2020-05-09 12:26:18"
                  },
                  {
                    "createdAt": "2020-04-29 13:52:17",
                    "code": "user",
                    "name": "普通用户",
                    "terminal": "USER",
                    "version": 3,
                    "uuid": 2,
                    "updatedAt": "2020-05-08 11:44:21"
                  },
                  {
                    "createdAt": "2020-04-29 13:52:58",
                    "code": "platform_manager",
                    "name": "平台管理员",
                    "terminal": "ORG",
                    "version": 14,
                    "uuid": 3,
                    "updatedAt": "2020-05-09 17:19:07"
                  },
                  {
                    "createdAt": "2020-04-29 13:52:58",
                    "code": "platform_employee",
                    "name": "平台员工",
                    "terminal": "ORG",
                    "version": 8,
                    "uuid": 5,
                    "updatedAt": "2020-05-06 09:24:38"
                  }
                ],
                "name": "用户管理",
                "iconUrl": "",
                "sort": 1,
                "uuid": 14,
                "version": 1,
                "url": "/d/management/user/list",
                "updatedAt": "2020-04-29 14:49:48"
              },
              {
                "parent": {
                  "createdAt": "2020-04-29 14:09:46",
                  "code": "manager",
                  "name": "管理",
                  "iconUrl": "table",
                  "sort": 27,
                  "uuid": 9,
                  "version": 13,
                  "url": "/d/management",
                  "updatedAt": "2020-05-08 14:18:46"
                },
                "createdAt": "2020-04-29 17:42:14",
                "code": "dasdas",
                "roles": {},
                "name": "iidasdas",
                "iconUrl": "",
                "sort": 1,
                "uuid": 21,
                "version": 0,
                "url": "/d/d//d",
                "updatedAt": "2020-04-29 17:42:14"
              },
              {
                "parent": {
                  "createdAt": "2020-04-29 14:09:46",
                  "code": "manager",
                  "name": "管理",
                  "iconUrl": "table",
                  "sort": 27,
                  "uuid": 9,
                  "version": 13,
                  "url": "/d/management",
                  "updatedAt": "2020-05-08 14:18:46"
                },
                "createdAt": "2020-04-29 14:17:09",
                "code": "employee",
                "roles": [
                  {
                    "createdAt": "2020-04-29 13:52:17",
                    "code": "1",
                    "name": "开发者",
                    "terminal": "ORG",
                    "version": 38,
                    "uuid": 1,
                    "updatedAt": "2020-05-09 12:26:18"
                  },
                  {
                    "createdAt": "2020-04-29 13:52:58",
                    "code": "platform_employee",
                    "name": "平台员工",
                    "terminal": "ORG",
                    "version": 8,
                    "uuid": 5,
                    "updatedAt": "2020-05-06 09:24:38"
                  }
                ],
                "name": "员工管理",
                "iconUrl": "",
                "sort": 4,
                "uuid": 13,
                "version": 0,
                "url": "/d/management/employee/list",
                "updatedAt": "2020-04-29 14:17:09"
              },
              {
                "parent": {
                  "createdAt": "2020-04-29 14:09:46",
                  "code": "manager",
                  "name": "管理",
                  "iconUrl": "table",
                  "sort": 27,
                  "uuid": 9,
                  "version": 13,
                  "url": "/d/management",
                  "updatedAt": "2020-05-08 14:18:46"
                },
                "createdAt": "2020-04-29 14:14:55",
                "code": "roleManager",
                "roles": [
                  {
                    "createdAt": "2020-04-29 13:52:17",
                    "code": "1",
                    "name": "开发者",
                    "terminal": "ORG",
                    "version": 38,
                    "uuid": 1,
                    "updatedAt": "2020-05-09 12:26:18"
                  },
                  {
                    "createdAt": "2020-04-29 13:52:58",
                    "code": "platform_employee",
                    "name": "平台员工",
                    "terminal": "ORG",
                    "version": 8,
                    "uuid": 5,
                    "updatedAt": "2020-05-06 09:24:38"
                  }
                ],
                "name": "角色管理",
                "iconUrl": "",
                "sort": 6,
                "uuid": 11,
                "version": 0,
                "url": "/d/management/role/list",
                "updatedAt": "2020-04-29 14:14:55"
              },
              {
                "parent": {
                  "createdAt": "2020-04-29 14:09:46",
                  "code": "manager",
                  "name": "管理",
                  "iconUrl": "table",
                  "sort": 27,
                  "uuid": 9,
                  "version": 13,
                  "url": "/d/management",
                  "updatedAt": "2020-05-08 14:18:46"
                },
                "createdAt": "2020-04-29 14:16:02",
                "code": "departManage",
                "roles": [
                  {
                    "createdAt": "2020-04-29 13:52:17",
                    "code": "1",
                    "name": "开发者",
                    "terminal": "ORG",
                    "version": 38,
                    "uuid": 1,
                    "updatedAt": "2020-05-09 12:26:18"
                  },
                  {
                    "createdAt": "2020-04-29 13:52:58",
                    "code": "platform_employee",
                    "name": "平台员工",
                    "terminal": "ORG",
                    "version": 8,
                    "uuid": 5,
                    "updatedAt": "2020-05-06 09:24:38"
                  }
                ],
                "name": "部门管理",
                "iconUrl": "",
                "sort": 9,
                "uuid": 12,
                "version": 0,
                "url": "/d/management/department/list",
                "updatedAt": "2020-04-29 14:16:02"
              },
              {
                "parent": {
                  "createdAt": "2020-04-29 14:09:46",
                  "code": "manager",
                  "name": "管理",
                  "iconUrl": "table",
                  "sort": 27,
                  "uuid": 9,
                  "version": 13,
                  "url": "/d/management",
                  "updatedAt": "2020-05-08 14:18:46"
                },
                "createdAt": "2020-04-29 14:11:44",
                "code": "menu",
                "roles": [
                  {
                    "createdAt": "2020-04-29 13:52:17",
                    "code": "1",
                    "name": "开发者",
                    "terminal": "ORG",
                    "version": 38,
                    "uuid": 1,
                    "updatedAt": "2020-05-09 12:26:18"
                  },
                  {
                    "createdAt": "2020-04-29 13:52:58",
                    "code": "platform_employee",
                    "name": "平台员工",
                    "terminal": "ORG",
                    "version": 8,
                    "uuid": 5,
                    "updatedAt": "2020-05-06 09:24:38"
                  }
                ],
                "name": "菜单管理",
                "iconUrl": "",
                "sort": 10,
                "uuid": 10,
                "version": 0,
                "url": "/d/management/menu/list",
                "updatedAt": "2020-04-29 14:11:44"
              },
              {
                "parent": {
                  "createdAt": "2020-04-29 14:09:46",
                  "code": "manager",
                  "name": "管理",
                  "iconUrl": "table",
                  "sort": 27,
                  "uuid": 9,
                  "version": 13,
                  "url": "/d/management",
                  "updatedAt": "2020-05-08 14:18:46"
                },
                "createdAt": "2020-05-09 09:31:14",
                "code": "orgManage",
                "roles": [
                  {
                    "createdAt": "2020-04-29 13:52:17",
                    "code": "1",
                    "name": "开发者",
                    "terminal": "ORG",
                    "version": 38,
                    "uuid": 1,
                    "updatedAt": "2020-05-09 12:26:18"
                  },
                  {
                    "createdAt": "2020-04-29 13:52:58",
                    "code": "platform_manager",
                    "name": "平台管理员",
                    "terminal": "ORG",
                    "version": 14,
                    "uuid": 3,
                    "updatedAt": "2020-05-09 17:19:07"
                  }
                ],
                "name": "企业管理",
                "iconUrl": "",
                "sort": 39,
                "uuid": 22,
                "version": 0,
                "url": "/d/management/org/list",
                "updatedAt": "2020-05-09 09:31:14"
              }
            ],
            "roles": [
              {
                "createdAt": "2020-04-29 13:52:17",
                "code": "1",
                "name": "开发者",
                "terminal": "ORG",
                "version": 38,
                "uuid": 1,
                "updatedAt": "2020-05-09 12:26:18"
              },
              {
                "createdAt": "2020-04-29 13:52:17",
                "code": "user",
                "name": "普通用户",
                "terminal": "USER",
                "version": 3,
                "uuid": 2,
                "updatedAt": "2020-05-08 11:44:21"
              },
              {
                "createdAt": "2020-04-29 13:52:58",
                "code": "platform_manager",
                "name": "平台管理员",
                "terminal": "ORG",
                "version": 14,
                "uuid": 3,
                "updatedAt": "2020-05-09 17:19:07"
              },
              {
                "createdAt": "2020-04-29 13:52:58",
                "code": "platform_employee",
                "name": "平台员工",
                "terminal": "ORG",
                "version": 8,
                "uuid": 5,
                "updatedAt": "2020-05-06 09:24:38"
              }
            ],
            "name": "管理",
            "iconUrl": "table",
            "sort": 27,
            "uuid": 9,
            "version": 13,
            "url": "/d/management",
            "updatedAt": "2020-05-08 14:18:46"
          },
          {
            "parent": {},
            "createdAt": "2020-05-09 12:26:06",
            "code": "template",
            "roles": [
              {
                "createdAt": "2020-04-29 13:52:17",
                "code": "1",
                "name": "开发者",
                "terminal": "ORG",
                "version": 38,
                "uuid": 1,
                "updatedAt": "2020-05-09 12:26:18"
              }
            ],
            "name": "模板",
            "iconUrl": "eye",
            "sort": 33,
            "uuid": 23,
            "version": 0,
            "url": "/d/template",
            "updatedAt": "2020-05-09 12:26:06"
          },
          {
            "parent": {},
            "createdAt": "2020-04-29 17:23:45",
            "code": "stateSetting",
            "children": [
              {
                "parent": {
                  "createdAt": "2020-04-29 17:23:45",
                  "code": "stateSetting",
                  "name": "状态机",
                  "iconUrl": "eye-open",
                  "sort": 34,
                  "uuid": 17,
                  "version": 4,
                  "url": "/d/stateSetting",
                  "updatedAt": "2020-05-08 14:18:17"
                },
                "createdAt": "2020-04-29 17:30:39",
                "code": "UserState",
                "roles": [
                  {
                    "createdAt": "2020-04-29 13:52:17",
                    "code": "1",
                    "name": "开发者",
                    "terminal": "ORG",
                    "version": 38,
                    "uuid": 1,
                    "updatedAt": "2020-05-09 12:26:18"
                  }
                ],
                "name": "用户状态机",
                "iconUrl": "",
                "sort": 6,
                "uuid": 18,
                "version": 0,
                "url": "/d/stateSetting/list/user",
                "updatedAt": "2020-04-29 17:30:39"
              },
              {
                "parent": {
                  "createdAt": "2020-04-29 17:23:45",
                  "code": "stateSetting",
                  "name": "状态机",
                  "iconUrl": "eye-open",
                  "sort": 34,
                  "uuid": 17,
                  "version": 4,
                  "url": "/d/stateSetting",
                  "updatedAt": "2020-05-08 14:18:17"
                },
                "createdAt": null,
                "code": "orderState",
                "roles": [
                  {
                    "createdAt": "2020-04-29 13:52:17",
                    "code": "1",
                    "name": "开发者",
                    "terminal": "ORG",
                    "version": 38,
                    "uuid": 1,
                    "updatedAt": "2020-05-09 12:26:18"
                  }
                ],
                "name": "订单状态机",
                "iconUrl": null,
                "sort": 16,
                "uuid": 19,
                "version": 1,
                "url": "/d/stateSetting/list/order",
                "updatedAt": "2020-05-07 10:08:28"
              }
            ],
            "roles": [
              {
                "createdAt": "2020-04-29 13:52:17",
                "code": "1",
                "name": "开发者",
                "terminal": "ORG",
                "version": 38,
                "uuid": 1,
                "updatedAt": "2020-05-09 12:26:18"
              }
            ],
            "name": "状态机",
            "iconUrl": "eye-open",
            "sort": 34,
            "uuid": 17,
            "version": 4,
            "url": "/d/stateSetting",
            "updatedAt": "2020-05-08 14:18:17"
          },
          {
            "parent": {},
            "createdAt": "2020-04-29 13:53:01",
            "code": "orgInterface",
            "roles": [
              {
                "createdAt": "2020-04-29 13:52:17",
                "code": "1",
                "name": "开发者",
                "terminal": "ORG",
                "version": 38,
                "uuid": 1,
                "updatedAt": "2020-05-09 12:26:18"
              }
            ],
            "name": "企业端接口",
            "iconUrl": "link",
            "sort": 107,
            "uuid": 4,
            "version": 1,
            "url": "http://10.10.10.199:40001/swagger-ui.html",
            "updatedAt": "2020-04-29 14:50:54"
          },
          {
            "parent": {},
            "createdAt": "2020-04-29 13:53:01",
            "code": "oauthInterface",
            "roles": [
              {
                "createdAt": "2020-04-29 13:52:17",
                "code": "1",
                "name": "开发者",
                "terminal": "ORG",
                "version": 38,
                "uuid": 1,
                "updatedAt": "2020-05-09 12:26:18"
              }
            ],
            "name": "登录端接口",
            "iconUrl": "tree",
            "sort": 202,
            "uuid": 7,
            "version": 1,
            "url": "http://10.10.10.199:40000/swagger-ui.html",
            "updatedAt": "2020-04-29 14:50:59"
          },
          {
            "parent": {},
            "createdAt": "2020-04-29 13:53:01",
            "code": "dbStructure",
            "roles": [
              {
                "createdAt": "2020-04-29 13:52:17",
                "code": "1",
                "name": "开发者",
                "terminal": "ORG",
                "version": 38,
                "uuid": 1,
                "updatedAt": "2020-05-09 12:26:18"
              }
            ],
            "name": "数据格式",
            "iconUrl": "password",
            "sort": 300,
            "uuid": 6,
            "version": 1,
            "url": "http://10.10.10.199:40001/structure",
            "updatedAt": "2020-04-29 14:50:47"
          }
        ],
        "total": 19,
        "pageNumber": 0,
        "pageSize": 20
      },
      getMenuListByRole:{
        "items": [
          {
            "parent": {},
            "createdAt": "2020-04-29 13:53:01",
            "code": "home",
            "name": "主页",
            "iconUrl": "dashboard",
            "sort": 1,
            "uuid": 1,
            "version": 1,
            "url": "/d/dashboard",
            "updatedAt": "2020-04-29 14:51:39"
          },
          {
            "parent": {},
            "createdAt": "2020-04-29 13:53:01",
            "code": "conversation",
            "name": "会话",
            "iconUrl": "form",
            "sort": 1,
            "uuid": 3,
            "version": 2,
            "url": "/d/conversation/conversation/list",
            "updatedAt": "2020-05-08 14:17:16"
          },
          {
            "parent": {},
            "createdAt": "2020-04-29 13:53:01",
            "code": "friend",
            "name": "联系人",
            "iconUrl": "example",
            "sort": 3,
            "uuid": 2,
            "version": 1,
            "url": "/d/friend/friend/list",
            "updatedAt": "2020-05-08 14:17:40"
          },
          {
            "parent": {},
            "createdAt": "2020-04-29 14:09:46",
            "code": "manager",
            "children": [
              {
                "parent": {
                  "createdAt": "2020-04-29 14:09:46",
                  "code": "manager",
                  "name": "管理",
                  "iconUrl": "table",
                  "sort": 27,
                  "uuid": 9,
                  "version": 13,
                  "url": "/d/management",
                  "updatedAt": "2020-05-08 14:18:46"
                },
                "createdAt": "2020-04-29 14:25:40",
                "code": "userManage",
                "name": "用户管理",
                "iconUrl": "",
                "sort": 1,
                "uuid": 14,
                "version": 1,
                "url": "/d/management/user/list",
                "updatedAt": "2020-04-29 14:49:48"
              },
              {
                "parent": {
                  "createdAt": "2020-04-29 14:09:46",
                  "code": "manager",
                  "name": "管理",
                  "iconUrl": "table",
                  "sort": 27,
                  "uuid": 9,
                  "version": 13,
                  "url": "/d/management",
                  "updatedAt": "2020-05-08 14:18:46"
                },
                "createdAt": "2020-04-29 14:17:09",
                "code": "employee",
                "name": "员工管理",
                "iconUrl": "",
                "sort": 4,
                "uuid": 13,
                "version": 0,
                "url": "/d/management/employee/list",
                "updatedAt": "2020-04-29 14:17:09"
              },
              {
                "parent": {
                  "createdAt": "2020-04-29 14:09:46",
                  "code": "manager",
                  "name": "管理",
                  "iconUrl": "table",
                  "sort": 27,
                  "uuid": 9,
                  "version": 13,
                  "url": "/d/management",
                  "updatedAt": "2020-05-08 14:18:46"
                },
                "createdAt": "2020-04-29 14:14:55",
                "code": "roleManager",
                "name": "角色管理",
                "iconUrl": "",
                "sort": 6,
                "uuid": 11,
                "version": 0,
                "url": "/d/management/role/list",
                "updatedAt": "2020-04-29 14:14:55"
              },
              {
                "parent": {
                  "createdAt": "2020-04-29 14:09:46",
                  "code": "manager",
                  "name": "管理",
                  "iconUrl": "table",
                  "sort": 27,
                  "uuid": 9,
                  "version": 13,
                  "url": "/d/management",
                  "updatedAt": "2020-05-08 14:18:46"
                },
                "createdAt": "2020-04-29 14:16:02",
                "code": "departManage",
                "name": "部门管理",
                "iconUrl": "",
                "sort": 9,
                "uuid": 12,
                "version": 0,
                "url": "/d/management/department/list",
                "updatedAt": "2020-04-29 14:16:02"
              },
              {
                "parent": {
                  "createdAt": "2020-04-29 14:09:46",
                  "code": "manager",
                  "name": "管理",
                  "iconUrl": "table",
                  "sort": 27,
                  "uuid": 9,
                  "version": 13,
                  "url": "/d/management",
                  "updatedAt": "2020-05-08 14:18:46"
                },
                "createdAt": "2020-04-29 14:11:44",
                "code": "menu",
                "name": "菜单管理",
                "iconUrl": "",
                "sort": 10,
                "uuid": 10,
                "version": 0,
                "url": "/d/management/menu/list",
                "updatedAt": "2020-04-29 14:11:44"
              },
              {
                "parent": {
                  "createdAt": "2020-04-29 14:09:46",
                  "code": "manager",
                  "name": "管理",
                  "iconUrl": "table",
                  "sort": 27,
                  "uuid": 9,
                  "version": 13,
                  "url": "/d/management",
                  "updatedAt": "2020-05-08 14:18:46"
                },
                "createdAt": "2020-05-09 09:31:14",
                "code": "orgManage",
                "name": "企业管理",
                "iconUrl": "",
                "sort": 39,
                "uuid": 22,
                "version": 0,
                "url": "/d/management/org/list",
                "updatedAt": "2020-05-09 09:31:14"
              }
            ],
            "name": "管理",
            "iconUrl": "table",
            "sort": 27,
            "uuid": 9,
            "version": 13,
            "url": "/d/management",
            "updatedAt": "2020-05-08 14:18:46"
          },
          {
            "parent": {},
            "createdAt": "2020-05-09 12:26:06",
            "code": "template",
            "name": "模板",
            "iconUrl": "eye",
            "sort": 33,
            "uuid": 23,
            "version": 0,
            "url": "/d/template",
            "updatedAt": "2020-05-09 12:26:06"
          },
          {
            "parent": {},
            "createdAt": "2020-04-29 17:23:45",
            "code": "stateSetting",
            "children": [
              {
                "parent": {
                  "createdAt": "2020-04-29 17:23:45",
                  "code": "stateSetting",
                  "name": "状态机",
                  "iconUrl": "eye-open",
                  "sort": 34,
                  "uuid": 17,
                  "version": 4,
                  "url": "/d/stateSetting",
                  "updatedAt": "2020-05-08 14:18:17"
                },
                "createdAt": "2020-04-29 17:30:39",
                "code": "UserState",
                "name": "用户状态机",
                "iconUrl": "",
                "sort": 6,
                "uuid": 18,
                "version": 0,
                "url": "/d/stateSetting/list/user",
                "updatedAt": "2020-04-29 17:30:39"
              },
              {
                "parent": {
                  "createdAt": "2020-04-29 17:23:45",
                  "code": "stateSetting",
                  "name": "状态机",
                  "iconUrl": "eye-open",
                  "sort": 34,
                  "uuid": 17,
                  "version": 4,
                  "url": "/d/stateSetting",
                  "updatedAt": "2020-05-08 14:18:17"
                },
                "createdAt": null,
                "code": "orderState",
                "name": "订单状态机",
                "iconUrl": null,
                "sort": 16,
                "uuid": 19,
                "version": 1,
                "url": "/d/stateSetting/list/order",
                "updatedAt": "2020-05-07 10:08:28"
              }
            ],
            "name": "状态机",
            "iconUrl": "eye-open",
            "sort": 34,
            "uuid": 17,
            "version": 4,
            "url": "/d/stateSetting",
            "updatedAt": "2020-05-08 14:18:17"
          },
          {
            "parent": {},
            "createdAt": "2020-04-29 13:53:01",
            "code": "orgInterface",
            "name": "企业端接口",
            "iconUrl": "link",
            "sort": 107,
            "uuid": 4,
            "version": 1,
            "url": "http://10.10.10.199:40001/swagger-ui.html",
            "updatedAt": "2020-04-29 14:50:54"
          },
          {
            "parent": {},
            "createdAt": "2020-04-29 13:53:01",
            "code": "oauthInterface",
            "name": "登录端接口",
            "iconUrl": "tree",
            "sort": 202,
            "uuid": 7,
            "version": 1,
            "url": "http://10.10.10.199:40000/swagger-ui.html",
            "updatedAt": "2020-04-29 14:50:59"
          },
          {
            "parent": {},
            "createdAt": "2020-04-29 13:53:01",
            "code": "dbStructure",
            "name": "数据格式",
            "iconUrl": "password",
            "sort": 300,
            "uuid": 6,
            "version": 1,
            "url": "http://10.10.10.199:40001/structure",
            "updatedAt": "2020-04-29 14:50:47"
          }
        ],
        "total": 17,
        "pageNumber": 0,
        "pageSize": 20
      },addMenuForRole:{
          code: '200'
      },
      delMenuById: {
          code: '200'
      },
      editMenu:{
          code: '200'
      },
      /**
       * roleManage.js
       */
      getRoleList: {
        "items": [
          {
            "createdAt": "2020-05-06 11:30:37",
            "code": "test",
            "name": "testsdad",
            "terminal": "ORG",
            "version": 1,
            "uuid": 7,
            "updatedAt": "2020-05-06 11:34:40"
          },
          {
            "createdAt": "2020-04-29 13:52:58",
            "code": "platform_employee",
            "name": "平台员工",
            "terminal": "ORG",
            "version": 8,
            "uuid": 5,
            "updatedAt": "2020-05-06 09:24:38"
          },
          {
            "createdAt": "2020-04-29 13:52:58",
            "code": "platform_super",
            "name": "平台超管",
            "terminal": "ORG",
            "version": 12,
            "uuid": 4,
            "updatedAt": "2020-05-09 17:19:07"
          },
          {
            "createdAt": "2020-04-29 13:52:58",
            "code": "platform_manager",
            "name": "平台管理员",
            "terminal": "ORG",
            "version": 14,
            "uuid": 3,
            "updatedAt": "2020-05-09 17:19:07"
          },
          {
            "createdAt": "2020-04-29 13:52:17",
            "code": "user",
            "name": "普通用户",
            "terminal": "USER",
            "version": 3,
            "uuid": 2,
            "updatedAt": "2020-05-08 11:44:21"
          },
          {
            "createdAt": "2020-04-29 13:52:17",
            "code": "1",
            "name": "开发者",
            "terminal": "ORG",
            "version": 38,
            "uuid": 1,
            "updatedAt": "2020-05-09 12:26:18"
          }
        ],
        "total": 6,
        "pageNumber": 0,
        "pageSize": 20
      },addRole:{
          code: '200'
      },getORGList:{
        "items": [
          {
            "createdAt": "2020-05-09 17:19:04",
            "name": "天邮平台1609468040",
            "description": null,
            "uuid": 4,
            "version": 1,
            "updatedAt": "2020-05-09 17:19:07"
          },
          {
            "createdAt": "2020-05-09 17:15:07",
            "name": "天邮平台5985811566",
            "description": null,
            "uuid": 3,
            "version": 1,
            "updatedAt": "2020-05-09 17:15:12"
          },
          {
            "createdAt": "2020-05-09 17:11:28",
            "name": "天邮平台4412266160",
            "description": null,
            "uuid": 2,
            "version": 1,
            "updatedAt": "2020-05-09 17:12:13"
          },
          {
            "createdAt": "2020-04-29 13:52:58",
            "name": "天邮平台0754971220",
            "description": null,
            "uuid": 1,
            "version": 13,
            "updatedAt": "2020-05-08 16:37:51"
          }
        ],
        "total": 4,
        "pageNumber": 0,
        "pageSize": 20
      },
      editRole:{
          code: '200'
      },
      deleteRole:{
          code: ''
      },
  login: {
    "access_token": "b544bff9-bf98-4098-ac57-c64a5dea8e24",
    "token_type": "bearer",
    "refresh_token": "5fc57d4e-f337-4ef7-8461-49381b23fc33",
    "expires_in": 275659,
    "scope": "all",
    "unionID": "aecf55fce5940142aeb36bf8123b0125",
    "userSig": "eJw1jk0LgkAURf-LbAt943M*GmgVElRQqZHbyikekYmNgxD990Tr7u65HLhvlm*ywHY1NZYZ5AIlAEwH6m3DDIsCYGN-lfdTXVPJDI8BMFIg9LhQaStHVxoEjgrG8L9It56HW3*BzD8trs7LGNKEeIoIE1cUO3lsF1Wb5-vDbN2FyfwnOnr0r7jQsVKopf58AZzKMHg_",
    "userID": "13700000001"
  },
  listEvent: {
    "items": {
      "user": [
        {
          "createdAt": "2020-04-16 14:30:53",
          "code": "520",
          "guardSpel": null,
          "name": "德玛西亚孤立事件",
          "action": "doTest",
          "description": "德玛西亚孤立事件描述",
          "sort": 10,
          "terminal": "ORG",
          "version": 0,
          "uuid": 19,
          "entity": "user",
          "updatedAt": "2020-04-16 14:30:53"
        },
        {
          "createdAt": "2020-04-16 14:19:47",
          "code": "12345",
          "guardSpel": null,
          "name": "杜亮测试孤立事件and状态",
          "action": "doTest",
          "description": "测试孤立事件and状态",
          "sort": 10,
          "terminal": "ORG",
          "version": 0,
          "uuid": 18,
          "entity": "user",
          "updatedAt": "2020-04-16 14:19:47"
        },
        {
          "createdAt": "2020-04-16 13:46:42",
          "code": "123123",
          "guardSpel": null,
          "name": "杜亮测试孤立事件",
          "action": "doKick",
          "description": "杜亮测试孤立事件",
          "sort": 10,
          "terminal": "ORG",
          "version": 0,
          "uuid": 17,
          "entity": "user",
          "updatedAt": "2020-04-16 13:46:42"
        },
        {
          "createdAt": "2020-04-16 13:39:42",
          "code": "1234",
          "guardSpel": null,
          "name": "测试事件",
          "action": "doEnable",
          "description": "测试事件功能",
          "sort": 10,
          "terminal": "ORG",
          "version": 0,
          "uuid": 15,
          "entity": "user",
          "updatedAt": "2020-04-16 13:39:42"
        },
        {
          "createdAt": "2020-04-07 16:32:41",
          "code": "test",
          "guardSpel": null,
          "name": "testEvent",
          "action": "doEnable",
          "description": "test",
          "sort": 20,
          "terminal": "ORG",
          "version": 0,
          "uuid": 14,
          "entity": "user",
          "updatedAt": "2020-04-07 16:32:41"
        },
        {
          "createdAt": "2020-04-03 13:37:37",
          "code": "testEvent4",
          "guardSpel": null,
          "name": "testEvent4",
          "action": "doEnable",
          "description": "testEvent4",
          "sort": 10,
          "terminal": "ORG",
          "version": 2,
          "uuid": 12,
          "entity": "user",
          "updatedAt": "2020-04-08 11:17:22"
        },
        {
          "createdAt": "2020-04-03 13:36:18",
          "code": "testEvent3",
          "guardSpel": null,
          "name": "testEvent3",
          "action": "doEnable",
          "description": "testEvent2",
          "sort": 30,
          "terminal": "ORG",
          "version": 2,
          "uuid": 11,
          "entity": "user",
          "updatedAt": "2020-04-09 10:35:17"
        },
        {
          "createdAt": "2020-04-03 13:33:32",
          "code": "testEvent2",
          "guardSpel": null,
          "name": "testEvent2",
          "action": "doKick",
          "description": "testEvent",
          "sort": 40,
          "terminal": "ORG",
          "version": 6,
          "uuid": 9,
          "entity": "user",
          "updatedAt": "2020-04-09 10:56:31"
        },
        {
          "createdAt": "2020-04-03 13:32:01",
          "code": "testEvent",
          "guardSpel": null,
          "name": "testEvent",
          "action": null,
          "description": "testEvent",
          "sort": 10,
          "terminal": "ORG",
          "version": 0,
          "uuid": 6,
          "entity": "user",
          "updatedAt": "2020-04-03 13:32:01"
        },
        {
          "createdAt": null,
          "code": "sth",
          "guardSpel": null,
          "name": "随意",
          "action": "doEnable",
          "description": "nothing",
          "sort": 40,
          "terminal": "ORG",
          "version": 2,
          "uuid": 4,
          "entity": "user",
          "updatedAt": "2020-04-08 13:15:11"
        },
        {
          "createdAt": "2020-03-21 09:19:54",
          "code": "kick",
          "guardSpel": null,
          "name": "强制下线",
          "action": "doKick",
          "description": null,
          "sort": 30,
          "terminal": "ORG",
          "version": 0,
          "uuid": 3,
          "entity": "user",
          "updatedAt": "2020-03-21 09:19:54"
        },
        {
          "createdAt": "2020-03-21 09:19:54",
          "code": "enable",
          "guardSpel": null,
          "name": "有效",
          "action": "doEnable",
          "description": null,
          "sort": 10,
          "terminal": "ORG",
          "version": 1,
          "uuid": 2,
          "entity": "user",
          "updatedAt": "2020-03-21 09:19:54"
        },
        {
          "createdAt": "2020-03-21 09:19:54",
          "code": "disable",
          "guardSpel": null,
          "name": "禁止",
          "action": "doDisable",
          "description": null,
          "sort": 20,
          "terminal": "ORG",
          "version": 1,
          "uuid": 1,
          "entity": "user",
          "updatedAt": "2020-03-21 09:19:54"
        }
      ]
    },
    "total": 13,
    "pageNumber": 0,
    "pageSize": 20
  },
  userInfo: {
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
  },
  userMenu: {
    "items": [
      {
        "parent": {},
        "createdAt": "2020-04-29 13:53:01",
        "code": "home",
        "name": "主页",
        "iconUrl": "dashboard",
        "sort": 1,
        "uuid": 1,
        "version": 1,
        "url": "/d/dashboard",
        "updatedAt": "2020-04-29 14:51:39"
      },
      {
        "parent": {},
        "createdAt": "2020-04-29 13:53:01",
        "code": "conversation",
        "name": "会话",
        "iconUrl": "form",
        "sort": 1,
        "uuid": 3,
        "version": 2,
        "url": "/d/conversation/conversation/list",
        "updatedAt": "2020-05-08 14:17:16"
      },
      {
        "parent": {},
        "createdAt": "2020-04-29 13:53:01",
        "code": "friend",
        "name": "联系人",
        "iconUrl": "example",
        "sort": 3,
        "uuid": 2,
        "version": 1,
        "url": "/d/friend/friend/list",
        "updatedAt": "2020-05-08 14:17:40"
      },
      {
        "parent": {},
        "createdAt": "2020-04-29 14:09:46",
        "code": "manager",
        "children": [
          {
            "parent": {
              "createdAt": "2020-04-29 14:09:46",
              "code": "manager",
              "name": "管理",
              "iconUrl": "table",
              "sort": 27,
              "uuid": 9,
              "version": 13,
              "url": "/d/management",
              "updatedAt": "2020-05-08 14:18:46"
            },
            "createdAt": "2020-04-29 14:25:40",
            "code": "userManage",
            "name": "用户管理",
            "iconUrl": "",
            "sort": 1,
            "uuid": 14,
            "version": 1,
            "url": "/d/management/user/list",
            "updatedAt": "2020-04-29 14:49:48"
          },
          {
            "parent": {
              "createdAt": "2020-04-29 14:09:46",
              "code": "manager",
              "name": "管理",
              "iconUrl": "table",
              "sort": 27,
              "uuid": 9,
              "version": 13,
              "url": "/d/management",
              "updatedAt": "2020-05-08 14:18:46"
            },
            "createdAt": "2020-04-29 14:17:09",
            "code": "employee",
            "name": "员工管理",
            "iconUrl": "",
            "sort": 4,
            "uuid": 13,
            "version": 0,
            "url": "/d/management/employee/list",
            "updatedAt": "2020-04-29 14:17:09"
          },
          {
            "parent": {
              "createdAt": "2020-04-29 14:09:46",
              "code": "manager",
              "name": "管理",
              "iconUrl": "table",
              "sort": 27,
              "uuid": 9,
              "version": 13,
              "url": "/d/management",
              "updatedAt": "2020-05-08 14:18:46"
            },
            "createdAt": "2020-04-29 14:14:55",
            "code": "roleManager",
            "name": "角色管理",
            "iconUrl": "",
            "sort": 6,
            "uuid": 11,
            "version": 0,
            "url": "/d/management/role/list",
            "updatedAt": "2020-04-29 14:14:55"
          },
          {
            "parent": {
              "createdAt": "2020-04-29 14:09:46",
              "code": "manager",
              "name": "管理",
              "iconUrl": "table",
              "sort": 27,
              "uuid": 9,
              "version": 13,
              "url": "/d/management",
              "updatedAt": "2020-05-08 14:18:46"
            },
            "createdAt": "2020-04-29 14:16:02",
            "code": "departManage",
            "name": "部门管理",
            "iconUrl": "",
            "sort": 9,
            "uuid": 12,
            "version": 0,
            "url": "/d/management/department/list",
            "updatedAt": "2020-04-29 14:16:02"
          },
          {
            "parent": {
              "createdAt": "2020-04-29 14:09:46",
              "code": "manager",
              "name": "管理",
              "iconUrl": "table",
              "sort": 27,
              "uuid": 9,
              "version": 13,
              "url": "/d/management",
              "updatedAt": "2020-05-08 14:18:46"
            },
            "createdAt": "2020-04-29 14:11:44",
            "code": "menu",
            "name": "菜单管理",
            "iconUrl": "",
            "sort": 10,
            "uuid": 10,
            "version": 0,
            "url": "/d/management/menu/list",
            "updatedAt": "2020-04-29 14:11:44"
          },
          {
            "parent": {
              "createdAt": "2020-04-29 14:09:46",
              "code": "manager",
              "name": "管理",
              "iconUrl": "table",
              "sort": 27,
              "uuid": 9,
              "version": 13,
              "url": "/d/management",
              "updatedAt": "2020-05-08 14:18:46"
            },
            "createdAt": "2020-05-09 09:31:14",
            "code": "orgManage",
            "name": "企业管理",
            "iconUrl": "",
            "sort": 39,
            "uuid": 22,
            "version": 0,
            "url": "/d/management/org/list",
            "updatedAt": "2020-05-09 09:31:14"
          }
        ],
        "name": "管理",
        "iconUrl": "table",
        "sort": 27,
        "uuid": 9,
        "version": 13,
        "url": "/d/management",
        "updatedAt": "2020-05-08 14:18:46"
      },
      {
        "parent": {},
        "createdAt": "2020-05-09 12:26:06",
        "code": "template",
        "name": "模板",
        "iconUrl": "eye",
        "sort": 33,
        "uuid": 23,
        "version": 0,
        "url": "/d/template",
        "updatedAt": "2020-05-09 12:26:06"
      },
      {
        "parent": {},
        "createdAt": "2020-04-29 17:23:45",
        "code": "stateSetting",
        "children": [
          {
            "parent": {
              "createdAt": "2020-04-29 17:23:45",
              "code": "stateSetting",
              "name": "状态机",
              "iconUrl": "eye-open",
              "sort": 34,
              "uuid": 17,
              "version": 4,
              "url": "/d/stateSetting",
              "updatedAt": "2020-05-08 14:18:17"
            },
            "createdAt": "2020-04-29 17:30:39",
            "code": "UserState",
            "name": "用户状态机",
            "iconUrl": "",
            "sort": 6,
            "uuid": 18,
            "version": 0,
            "url": "/d/stateSetting/list/user",
            "updatedAt": "2020-04-29 17:30:39"
          },
          {
            "parent": {
              "createdAt": "2020-04-29 17:23:45",
              "code": "stateSetting",
              "name": "状态机",
              "iconUrl": "eye-open",
              "sort": 34,
              "uuid": 17,
              "version": 4,
              "url": "/d/stateSetting",
              "updatedAt": "2020-05-08 14:18:17"
            },
            "createdAt": null,
            "code": "orderState",
            "name": "订单状态机",
            "iconUrl": null,
            "sort": 16,
            "uuid": 19,
            "version": 1,
            "url": "/d/stateSetting/list/order",
            "updatedAt": "2020-05-07 10:08:28"
          }
        ],
        "name": "状态机",
        "iconUrl": "eye-open",
        "sort": 34,
        "uuid": 17,
        "version": 4,
        "url": "/d/stateSetting",
        "updatedAt": "2020-05-08 14:18:17"
      },
      {
        "parent": {},
        "createdAt": "2020-04-29 13:53:01",
        "code": "orgInterface",
        "name": "企业端接口",
        "iconUrl": "link",
        "sort": 107,
        "uuid": 4,
        "version": 1,
        "url": "http://10.10.10.199:40001/swagger-ui.html",
        "updatedAt": "2020-04-29 14:50:54"
      },
      {
        "parent": {},
        "createdAt": "2020-04-29 13:53:01",
        "code": "oauthInterface",
        "name": "登录端接口",
        "iconUrl": "tree",
        "sort": 202,
        "uuid": 7,
        "version": 1,
        "url": "http://10.10.10.199:40000/swagger-ui.html",
        "updatedAt": "2020-04-29 14:50:59"
      },
      {
        "parent": {},
        "createdAt": "2020-04-29 13:53:01",
        "code": "dbStructure",
        "name": "数据格式",
        "iconUrl": "password",
        "sort": 300,
        "uuid": 6,
        "version": 1,
        "url": "http://10.10.10.199:40001/structure",
        "updatedAt": "2020-04-29 14:50:47"
      }
    ],
    "total": 17,
    "pageNumber": 0,
    "pageSize": 20
  },
  stateMachine: {
    "items": {
      "order": [{
          "code": "start",
          "exitAction": null,
          "stateType": "COMMON",
          "thenGuardSpel": null,
          "description": "start",
          "sort": null,
          "uuid": 10,
          "version": 1,
          "createdAt": null,
          "enterAction": null,
          "firstGuardSpel": null,
          "name": "订单",
          "entity": "order",
          "updatedAt": null
        },
        {
          "code": "end",
          "exitAction": null,
          "stateType": "COMMON",
          "thenGuardSpel": null,
          "description": "end",
          "sort": 10,
          "uuid": 11,
          "version": 0,
          "createdAt": "2020-04-16 11:06:39",
          "enterAction": null,
          "firstGuardSpel": null,
          "name": "end",
          "entity": "order",
          "updatedAt": "2020-04-16 11:06:39"
        },
        {
          "code": "underway",
          "exitAction": null,
          "stateType": "COMMON",
          "thenGuardSpel": null,
          "description": "underway",
          "sort": 10,
          "uuid": 12,
          "version": 0,
          "createdAt": "2020-04-16 13:39:28",
          "enterAction": null,
          "firstGuardSpel": null,
          "name": "underway",
          "entity": "order",
          "updatedAt": "2020-04-16 13:39:28"
        },
        {
          "code": "paid",
          "exitAction": null,
          "stateType": "COMMON",
          "thenGuardSpel": null,
          "description": "paid",
          "sort": 10,
          "uuid": 17,
          "version": 0,
          "createdAt": "2020-04-16 15:41:13",
          "enterAction": null,
          "firstGuardSpel": null,
          "name": "已支付",
          "entity": "order",
          "updatedAt": "2020-04-16 15:41:13"
        }
      ],
      "user": [{
          "code": "created",
          "exitAction": null,
          "stateType": "BEGIN",
          "thenGuardSpel": null,
          "description": null,
          "sort": 10,
          "uuid": 1,
          "version": 43,
          "createdAt": "2020-03-21 09:19:54",
          "enterAction": null,
          "firstGuardSpel": null,
          "name": "初始状态",
          "entity": "user",
          "updatedAt": "2020-04-16 14:38:28"
        },
        {
          "code": "testState",
          "exitAction": null,
          "stateType": "COMMON",
          "thenGuardSpel": null,
          "description": "testState",
          "sort": 10,
          "uuid": 4,
          "version": 24,
          "createdAt": "2020-04-03 15:24:14",
          "enterAction": null,
          "firstGuardSpel": null,
          "name": "testState",
          "entity": "user",
          "updatedAt": "2020-04-16 14:38:31"
        },
        {
          "code": "testState1",
          "exitAction": null,
          "stateType": "COMMON",
          "thenGuardSpel": null,
          "description": "testState",
          "sort": 10,
          "uuid": 5,
          "version": 2,
          "createdAt": "2020-04-03 15:24:28",
          "enterAction": null,
          "firstGuardSpel": null,
          "name": "testState1",
          "entity": "user",
          "updatedAt": "2020-04-16 14:38:37"
        },
        {
          "code": "enable",
          "exitAction": null,
          "stateType": "COMMON",
          "thenGuardSpel": null,
          "description": "启用状态",
          "sort": 10,
          "uuid": 8,
          "version": 0,
          "createdAt": "2020-04-08 14:00:04",
          "enterAction": null,
          "firstGuardSpel": null,
          "name": "启用",
          "entity": "user",
          "updatedAt": "2020-04-08 14:00:04"
        },
        {
          "code": "default",
          "exitAction": null,
          "stateType": "COMMON",
          "thenGuardSpel": null,
          "description": "default",
          "sort": 10,
          "uuid": 9,
          "version": 2,
          "createdAt": "2020-04-16 09:40:28",
          "enterAction": null,
          "firstGuardSpel": null,
          "name": "默认",
          "entity": "user",
          "updatedAt": "2020-04-16 14:35:47"
        },
        {
          "code": "1234",
          "exitAction": null,
          "stateType": "COMMON",
          "thenGuardSpel": null,
          "description": "杜亮测试状态熟悉功能",
          "sort": 10,
          "uuid": 13,
          "version": 0,
          "createdAt": "2020-04-16 13:44:58",
          "enterAction": null,
          "firstGuardSpel": null,
          "name": "杜亮测试状态",
          "entity": "user",
          "updatedAt": "2020-04-16 13:44:58"
        },
        {
          "code": "1314",
          "exitAction": null,
          "stateType": "BEGIN",
          "thenGuardSpel": null,
          "description": "德玛西亚测试状态",
          "sort": 10,
          "uuid": 14,
          "version": 1,
          "createdAt": "2020-04-16 14:30:06",
          "enterAction": null,
          "firstGuardSpel": null,
          "name": "德玛西亚状态",
          "entity": "user",
          "updatedAt": "2020-04-16 14:40:27"
        },
        {
          "code": "normal",
          "exitAction": null,
          "stateType": "COMMON",
          "thenGuardSpel": null,
          "description": "",
          "sort": 10,
          "uuid": 15,
          "version": 0,
          "createdAt": "2020-04-16 14:46:26",
          "enterAction": null,
          "firstGuardSpel": null,
          "name": "normal",
          "entity": "user",
          "updatedAt": "2020-04-16 14:46:26"
        },
        {
          "code": "paid",
          "exitAction": null,
          "stateType": "COMMON",
          "thenGuardSpel": null,
          "description": "paid",
          "sort": 10,
          "uuid": 16,
          "version": 0,
          "createdAt": "2020-04-16 15:40:42",
          "enterAction": null,
          "firstGuardSpel": null,
          "name": "已支付",
          "entity": "user",
          "updatedAt": "2020-04-16 15:40:42"
        },
        {
          "code": "enabled",
          "exitAction": null,
          "stateType": "COMMON",
          "thenGuardSpel": null,
          "description": null,
          "sort": 20,
          "uuid": 3,
          "version": 3,
          "createdAt": "2020-03-21 09:19:54",
          "enterAction": null,
          "firstGuardSpel": null,
          "name": "有效状态",
          "entity": "user",
          "updatedAt": "2020-04-16 14:38:39"
        },
        {
          "code": "disabled",
          "exitAction": null,
          "stateType": "COMMON",
          "thenGuardSpel": null,
          "description": null,
          "sort": 30,
          "uuid": 2,
          "version": 2,
          "createdAt": "2020-03-21 09:19:54",
          "enterAction": null,
          "firstGuardSpel": null,
          "name": "禁止状态",
          "entity": "user",
          "updatedAt": "2020-04-16 14:38:42"
        },
        {
          "code": "testState3",
          "exitAction": "doDisable",
          "stateType": "CHOICE",
          "thenGuardSpel": "none",
          "description": "test",
          "sort": 40,
          "uuid": 6,
          "version": 1,
          "createdAt": "2020-04-07 17:18:33",
          "enterAction": "doEnable",
          "firstGuardSpel": "none",
          "name": "testState3",
          "entity": "user",
          "updatedAt": "2020-04-16 14:36:29"
        }
      ]
    },
    "total": 16,
    "pageNumber": 0,
    "pageSize": 20
  },
  role: {
    "items": [{
        "createdAt": "2020-03-21 09:19:54",
        "code": "platform_employee",
        "name": "平台员工",
        "terminal": "ORG",
        "version": 0,
        "uuid": 5,
        "updatedAt": "2020-03-21 09:19:54"
      },
      {
        "createdAt": "2020-03-21 09:19:54",
        "code": "platform_super",
        "name": "平台超管",
        "terminal": "ORG",
        "version": 0,
        "uuid": 4,
        "updatedAt": "2020-03-21 09:19:54"
      },
      {
        "createdAt": "2020-03-21 09:19:54",
        "code": "platform_manager",
        "name": "平台管理员",
        "terminal": "ORG",
        "version": 0,
        "uuid": 3,
        "updatedAt": "2020-03-21 09:19:54"
      }
    ],
    "total": 3,
    "pageNumber": 0,
    "pageSize": 20
  },
  user: {
    "items": [{
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
      "uuid": 2,
      "version": 1,
      "enabled": true,
      "createdAt": "2020-03-21 14:23:58",
      "headimgurl": "https://www.gravatar.com/avatar/24fe9a1a26e3007977b6f5eabdd64afa?d=robohash&s=256",
      "nickname": "用户gativs",
      "state": {},
      "department": {},
      "updatedAt": "2020-03-21 14:23:59"
    }],
    "total": 1,
    "pageNumber": 0,
    "pageSize": 20
  }, //员工列表
  user_action: {
    "items": [
      "doEnable",
      "doDisable",
      "doKick",
      "doSpeak",
      "doTest"
    ],
    "total": 5,
    "pageNumber": 0,
    "pageSize": 0
  },
  user_unused_event: {
    "items": [{
        "code": "enable",
        "sources": {},
        "roles": [{
            "createdAt": "2020-03-21 09:19:54",
            "code": "platform_manager",
            "name": "平台管理员",
            "terminal": "ORG",
            "version": 0,
            "uuid": 3,
            "updatedAt": "2020-03-21 09:19:54"
          },
          {
            "createdAt": "2020-03-21 09:19:54",
            "code": "platform_super",
            "name": "平台超管",
            "terminal": "ORG",
            "version": 0,
            "uuid": 4,
            "updatedAt": "2020-03-21 09:19:54"
          }
        ],
        "description": null,
        "sort": 10,
        "terminal": "ORG",
        "version": 1,
        "uuid": 2,
        "target": {
          "createdAt": "2020-03-21 09:19:54",
          "code": "enabled",
          "stateType": "COMMON",
          "name": "有效状态",
          "sort": 20,
          "version": 3,
          "uuid": 3,
          "entity": "user",
          "updatedAt": "2020-04-16 14:38:39"
        },
        "createdAt": "2020-03-21 09:19:54",
        "guardSpel": null,
        "name": "有效",
        "action": "doEnable",
        "entity": "user",
        "updatedAt": "2020-03-21 09:19:54"
      },
      {
        "code": "testEvent4",
        "sources": {},
        "roles": [{
            "createdAt": "2020-03-21 09:19:54",
            "code": "platform_manager",
            "name": "平台管理员",
            "terminal": "ORG",
            "version": 0,
            "uuid": 3,
            "updatedAt": "2020-03-21 09:19:54"
          },
          {
            "createdAt": "2020-03-21 09:19:54",
            "code": "platform_super",
            "name": "平台超管",
            "terminal": "ORG",
            "version": 0,
            "uuid": 4,
            "updatedAt": "2020-03-21 09:19:54"
          },
          {
            "createdAt": "2020-03-21 09:19:54",
            "code": "platform_employee",
            "name": "平台员工",
            "terminal": "ORG",
            "version": 0,
            "uuid": 5,
            "updatedAt": "2020-03-21 09:19:54"
          }
        ],
        "description": "testEvent4",
        "sort": 10,
        "terminal": "ORG",
        "version": 2,
        "uuid": 12,
        "target": {
          "createdAt": "2020-03-21 09:19:54",
          "code": "created",
          "stateType": "BEGIN",
          "name": "初始状态",
          "sort": 10,
          "version": 43,
          "uuid": 1,
          "entity": "user",
          "updatedAt": "2020-04-16 14:38:28"
        },
        "createdAt": "2020-04-03 13:37:37",
        "guardSpel": null,
        "name": "testEvent4",
        "action": "doEnable",
        "entity": "user",
        "updatedAt": "2020-04-08 11:17:22"
      },
      {
        "code": "1234",
        "sources": {},
        "roles": [{
          "createdAt": "2020-03-21 09:19:54",
          "code": "platform_employee",
          "name": "平台员工",
          "terminal": "ORG",
          "version": 0,
          "uuid": 5,
          "updatedAt": "2020-03-21 09:19:54"
        }],
        "description": "测试事件功能",
        "sort": 10,
        "terminal": "ORG",
        "version": 0,
        "uuid": 15,
        "target": {
          "createdAt": "2020-03-21 09:19:54",
          "code": "created",
          "stateType": "BEGIN",
          "name": "初始状态",
          "sort": 10,
          "version": 43,
          "uuid": 1,
          "entity": "user",
          "updatedAt": "2020-04-16 14:38:28"
        },
        "createdAt": "2020-04-16 13:39:42",
        "guardSpel": null,
        "name": "测试事件",
        "action": "doEnable",
        "entity": "user",
        "updatedAt": "2020-04-16 13:39:42"
      },
      {
        "code": "123123",
        "sources": {},
        "roles": [{
          "createdAt": "2020-03-21 09:19:54",
          "code": "platform_employee",
          "name": "平台员工",
          "terminal": "ORG",
          "version": 0,
          "uuid": 5,
          "updatedAt": "2020-03-21 09:19:54"
        }],
        "description": "杜亮测试孤立事件",
        "sort": 10,
        "terminal": "ORG",
        "version": 0,
        "uuid": 17,
        "target": {
          "createdAt": "2020-04-16 13:44:58",
          "code": "1234",
          "stateType": "COMMON",
          "name": "杜亮测试状态",
          "description": "杜亮测试状态熟悉功能",
          "sort": 10,
          "version": 0,
          "uuid": 13,
          "entity": "user",
          "updatedAt": "2020-04-16 13:44:58"
        },
        "createdAt": "2020-04-16 13:46:42",
        "guardSpel": null,
        "name": "杜亮测试孤立事件",
        "action": "doKick",
        "entity": "user",
        "updatedAt": "2020-04-16 13:46:42"
      },
      {
        "code": "12345",
        "sources": {},
        "roles": [{
            "createdAt": "2020-03-21 09:19:54",
            "code": "platform_manager",
            "name": "平台管理员",
            "terminal": "ORG",
            "version": 0,
            "uuid": 3,
            "updatedAt": "2020-03-21 09:19:54"
          },
          {
            "createdAt": "2020-03-21 09:19:54",
            "code": "platform_super",
            "name": "平台超管",
            "terminal": "ORG",
            "version": 0,
            "uuid": 4,
            "updatedAt": "2020-03-21 09:19:54"
          },
          {
            "createdAt": "2020-03-21 09:19:54",
            "code": "platform_employee",
            "name": "平台员工",
            "terminal": "ORG",
            "version": 0,
            "uuid": 5,
            "updatedAt": "2020-03-21 09:19:54"
          }
        ],
        "description": "测试孤立事件and状态",
        "sort": 10,
        "terminal": "ORG",
        "version": 0,
        "uuid": 18,
        "target": {
          "createdAt": "2020-04-16 13:44:58",
          "code": "1234",
          "stateType": "COMMON",
          "name": "杜亮测试状态",
          "description": "杜亮测试状态熟悉功能",
          "sort": 10,
          "version": 0,
          "uuid": 13,
          "entity": "user",
          "updatedAt": "2020-04-16 13:44:58"
        },
        "createdAt": "2020-04-16 14:19:47",
        "guardSpel": null,
        "name": "杜亮测试孤立事件and状态",
        "action": "doTest",
        "entity": "user",
        "updatedAt": "2020-04-16 14:19:47"
      },
      {
        "code": "disable",
        "sources": {},
        "roles": [{
            "createdAt": "2020-03-21 09:19:54",
            "code": "platform_manager",
            "name": "平台管理员",
            "terminal": "ORG",
            "version": 0,
            "uuid": 3,
            "updatedAt": "2020-03-21 09:19:54"
          },
          {
            "createdAt": "2020-03-21 09:19:54",
            "code": "platform_super",
            "name": "平台超管",
            "terminal": "ORG",
            "version": 0,
            "uuid": 4,
            "updatedAt": "2020-03-21 09:19:54"
          }
        ],
        "description": null,
        "sort": 20,
        "terminal": "ORG",
        "version": 1,
        "uuid": 1,
        "target": {
          "createdAt": "2020-03-21 09:19:54",
          "code": "disabled",
          "stateType": "COMMON",
          "name": "禁止状态",
          "sort": 30,
          "version": 2,
          "uuid": 2,
          "entity": "user",
          "updatedAt": "2020-04-16 14:38:42"
        },
        "createdAt": "2020-03-21 09:19:54",
        "guardSpel": null,
        "name": "禁止",
        "action": "doDisable",
        "entity": "user",
        "updatedAt": "2020-03-21 09:19:54"
      },
      {
        "code": "test",
        "sources": {},
        "roles": {},
        "description": "test",
        "sort": 20,
        "terminal": "ORG",
        "version": 0,
        "uuid": 14,
        "target": {
          "createdAt": "2020-03-21 09:19:54",
          "code": "created",
          "stateType": "BEGIN",
          "name": "初始状态",
          "sort": 10,
          "version": 43,
          "uuid": 1,
          "entity": "user",
          "updatedAt": "2020-04-16 14:38:28"
        },
        "createdAt": "2020-04-07 16:32:41",
        "guardSpel": null,
        "name": "testEvent",
        "action": "doEnable",
        "entity": "user",
        "updatedAt": "2020-04-07 16:32:41"
      },
      {
        "code": "kick",
        "sources": {},
        "roles": [{
          "createdAt": "2020-03-21 09:19:54",
          "code": "platform_employee",
          "name": "平台员工",
          "terminal": "ORG",
          "version": 0,
          "uuid": 5,
          "updatedAt": "2020-03-21 09:19:54"
        }],
        "description": null,
        "sort": 30,
        "terminal": "ORG",
        "version": 0,
        "uuid": 3,
        "target": {},
        "createdAt": "2020-03-21 09:19:54",
        "guardSpel": null,
        "name": "强制下线",
        "action": "doKick",
        "entity": "user",
        "updatedAt": "2020-03-21 09:19:54"
      },
      {
        "code": "testEvent3",
        "sources": {},
        "roles": [{
            "createdAt": "2020-03-21 09:19:54",
            "code": "platform_super",
            "name": "平台超管",
            "terminal": "ORG",
            "version": 0,
            "uuid": 4,
            "updatedAt": "2020-03-21 09:19:54"
          },
          {
            "createdAt": "2020-03-21 09:19:54",
            "code": "platform_employee",
            "name": "平台员工",
            "terminal": "ORG",
            "version": 0,
            "uuid": 5,
            "updatedAt": "2020-03-21 09:19:54"
          }
        ],
        "description": "testEvent2",
        "sort": 30,
        "terminal": "ORG",
        "version": 2,
        "uuid": 11,
        "target": {
          "createdAt": "2020-03-21 09:19:54",
          "code": "created",
          "stateType": "BEGIN",
          "name": "初始状态",
          "sort": 10,
          "version": 43,
          "uuid": 1,
          "entity": "user",
          "updatedAt": "2020-04-16 14:38:28"
        },
        "createdAt": "2020-04-03 13:36:18",
        "guardSpel": null,
        "name": "testEvent3",
        "action": "doEnable",
        "entity": "user",
        "updatedAt": "2020-04-09 10:35:17"
      },
      {
        "code": "sth",
        "sources": {},
        "roles": [{
            "createdAt": "2020-03-21 09:19:54",
            "code": "platform_manager",
            "name": "平台管理员",
            "terminal": "ORG",
            "version": 0,
            "uuid": 3,
            "updatedAt": "2020-03-21 09:19:54"
          },
          {
            "createdAt": "2020-03-21 09:19:54",
            "code": "platform_super",
            "name": "平台超管",
            "terminal": "ORG",
            "version": 0,
            "uuid": 4,
            "updatedAt": "2020-03-21 09:19:54"
          },
          {
            "createdAt": "2020-03-21 09:19:54",
            "code": "platform_employee",
            "name": "平台员工",
            "terminal": "ORG",
            "version": 0,
            "uuid": 5,
            "updatedAt": "2020-03-21 09:19:54"
          }
        ],
        "description": "nothing",
        "sort": 40,
        "terminal": "ORG",
        "version": 2,
        "uuid": 4,
        "target": {
          "code": "testState3",
          "exitAction": "doDisable",
          "stateType": "CHOICE",
          "description": "test",
          "thenGuardSpel": "none",
          "sort": 40,
          "version": 1,
          "uuid": 6,
          "createdAt": "2020-04-07 17:18:33",
          "enterAction": "doEnable",
          "firstGuardSpel": "none",
          "name": "testState3",
          "entity": "user",
          "updatedAt": "2020-04-16 14:36:29"
        },
        "createdAt": null,
        "guardSpel": null,
        "name": "随意",
        "action": "doEnable",
        "entity": "user",
        "updatedAt": "2020-04-08 13:15:11"
      },
      {
        "code": "testEvent2",
        "sources": {},
        "roles": [{
            "createdAt": "2020-03-21 09:19:54",
            "code": "platform_manager",
            "name": "平台管理员",
            "terminal": "ORG",
            "version": 0,
            "uuid": 3,
            "updatedAt": "2020-03-21 09:19:54"
          },
          {
            "createdAt": "2020-03-21 09:19:54",
            "code": "platform_super",
            "name": "平台超管",
            "terminal": "ORG",
            "version": 0,
            "uuid": 4,
            "updatedAt": "2020-03-21 09:19:54"
          },
          {
            "createdAt": "2020-03-21 09:19:54",
            "code": "platform_employee",
            "name": "平台员工",
            "terminal": "ORG",
            "version": 0,
            "uuid": 5,
            "updatedAt": "2020-03-21 09:19:54"
          }
        ],
        "description": "testEvent",
        "sort": 40,
        "terminal": "ORG",
        "version": 6,
        "uuid": 9,
        "target": {
          "createdAt": "2020-03-21 09:19:54",
          "code": "enabled",
          "stateType": "COMMON",
          "name": "有效状态",
          "sort": 20,
          "version": 3,
          "uuid": 3,
          "entity": "user",
          "updatedAt": "2020-04-16 14:38:39"
        },
        "createdAt": "2020-04-03 13:33:32",
        "guardSpel": null,
        "name": "testEvent2",
        "action": "doKick",
        "entity": "user",
        "updatedAt": "2020-04-09 10:56:31"
      }
    ],
    "total": 11,
    "pageNumber": 0,
    "pageSize": 20
  },
  department: {
    "items": [{
        "parent": {},
        "createdAt": "2020-03-21 09:19:57",
        "code": "department3",
        "manager": {},
        "groupId": "@TGS#1LBLJLJGA",
        "name": "财务部",
        "uuid": 4,
        "version": 1,
        "updatedAt": "2020-03-21 09:19:57"
      },
      {
        "parent": {},
        "createdAt": "2020-03-21 09:19:55",
        "code": "department2",
        "manager": {},
        "children": [{
          "parent": {
            "createdAt": "2020-03-21 09:19:55",
            "code": "department2",
            "groupId": "@TGS#1N7KJLJGV",
            "name": "技术部",
            "uuid": 2,
            "version": 1,
            "updatedAt": "2020-03-21 09:19:55"
          },
          "createdAt": "2020-03-21 09:19:56",
          "code": "department2_2",
          "manager": {},
          "groupId": "@TGS#1QALJLJGE",
          "name": "平台部",
          "uuid": 3,
          "version": 1,
          "updatedAt": "2020-03-21 09:19:56"
        }],
        "groupId": "@TGS#1N7KJLJGV",
        "name": "技术部",
        "uuid": 2,
        "version": 1,
        "updatedAt": "2020-03-21 09:19:55"
      },
      {
        "parent": {},
        "createdAt": "2020-03-21 09:19:54",
        "code": "department1",
        "manager": {},
        "groupId": "@TGS#1B6KJLJGI",
        "name": "市场部",
        "uuid": 1,
        "version": 1,
        "updatedAt": "2020-03-21 09:19:55"
      }
    ],
    "total": 4,
    "pageNumber": 0,
    "pageSize": 20
  }
}
