define({ "api": [
  {
    "type": "post",
    "url": "/login",
    "title": "User Log In",
    "name": "Login",
    "version": "1.0.0",
    "group": "Create",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "usernameEmail",
            "description": "<p>Pass the username or email as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>Pass the password as body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n        \"err\": false,\n        \"message\": \"Login successfull.\",\n        \"status\": 200,\n        \"data\": {\n            \"authToken\": \"String\",\n            \"userDetails\": {\n                \"userId\": \"String\",\n                \"userName: \"String\" ,\n                \"email\": \"String\"\n            }\n        }\n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n        \"err\": true,\n        \"message\": \"This username does not exists.Login Failed.\",\n        \"status\": 500,\n        \"data\": null\n    }\n    \n    {\n        \"err\": true,\n        \"message\": \"The password is incorrect.Login Failed\",\n        \"status\": 500,\n        \"data\": null\n    }",
          "type": "json"
        }
      ]
    },
    "filename": "/home/admin-021/issueTrackerApp/backend/app/routes/appRoute.js",
    "groupTitle": "Create"
  },
  {
    "type": "post",
    "url": "/logOut",
    "title": "To log out the user",
    "name": "Logout",
    "version": "1.0.0",
    "group": "Create",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Pass the authToken as body parameter or header</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n        \"err\": false,\n        \"message\": \"Successfully logged out\",\n        \"status\": 200,\n        \"data\": {\n            \"n\": 1,\n            \"ok\": 1,\n            \"deletedCount\": 1\n        }\n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n        \"err\": true,\n        \"message\": \"Invalid/expired Auth token\",\n        \"status\": 500,\n        \"data\": null\n    }",
          "type": "json"
        }
      ]
    },
    "filename": "/home/admin-021/issueTrackerApp/backend/app/routes/appRoute.js",
    "groupTitle": "Create"
  },
  {
    "type": "post",
    "url": "/register",
    "title": "User Sign Up",
    "name": "Register",
    "version": "1.0.0",
    "group": "Create",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "username",
            "description": "<p>Pass the username as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>Pass the email as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>Pass the password as body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n        \"err\": false,\n        \"message\": \"A new user has been created successfully\",\n        \"status\": 200,\n        \"data\": {\n            \"createdOn\": \"String\",\n            \"modifiedOn\": \"String\",\n            \"userId\": \"String\",\n            \"userName\": \"String\",\n            \"email\": \"String\"\n        }\n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n        \"err\": true,\n        \"message\": \"A user with this email id already exists.\"\n    }\n    \n    {\n        \"err\": true,\n        \"message\": \"User name is not as per the norms.\",\n        \"status\": 500,\n        \"data\": null\n    }\n    \n    {\n        \"err\": true,\n        \"message\": \"Password should be alphanumeric and have at least 8 characters.\",\n        \"status\": 500,\n        \"data\": null\n    }",
          "type": "json"
        }
      ]
    },
    "filename": "/home/admin-021/issueTrackerApp/backend/app/routes/appRoute.js",
    "groupTitle": "Create"
  },
  {
    "type": "post",
    "url": "/notificationHistory/:userId",
    "title": "To view notification history",
    "name": "Reporter_Notification_History",
    "version": "1.0.0",
    "group": "Create",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "issueId",
            "description": "<p>Pass the issue id as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "msg",
            "description": "<p>Pass the notification message as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Pass the authToken as header</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n          \n          }\n      }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n          \"err\": true,\n          \"message\": \"Invalid/expired Auth token\",\n          \"status\": 500,\n          \"data\": null\n      }",
          "type": "json"
        }
      ]
    },
    "filename": "/home/admin-021/issueTrackerApp/backend/app/routes/appRoute.js",
    "groupTitle": "Create"
  },
  {
    "type": "post",
    "url": "/notificationHistory/:userId",
    "title": "To view notification history",
    "name": "Watcher_Notification_History",
    "version": "1.0.0",
    "group": "Create",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "issueId",
            "description": "<p>Pass the issue id as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "msg",
            "description": "<p>Pass the notification message as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Pass the authToken as header</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n             \n             }\n         }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n             \"err\": true,\n             \"message\": \"Invalid/expired Auth token\",\n             \"status\": 500,\n             \"data\": null\n         }",
          "type": "json"
        }
      ]
    },
    "filename": "/home/admin-021/issueTrackerApp/backend/app/routes/appRoute.js",
    "groupTitle": "Create"
  },
  {
    "type": "post",
    "url": "/addAsWatcher",
    "title": "To be added as watcher on an issue",
    "name": "addAsWatcher",
    "version": "1.0.0",
    "group": "Create",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "issueId",
            "description": "<p>Pass the issue id as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "username",
            "description": "<p>Pass the username as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>Pass the userId as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Pass the authToken as body parameter or header</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n        \"err\": false,\n        \"message\": \"You are added as a watcher successfully.\",\n        \"status\": 200,\n        \"data\": {\n            \"additionStatus\": \"OK\",\n            \"notifyMsg\": \"String\"\n        }\n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n        \"err\": true,\n        \"message\": \"Invalid/expired Auth token\",\n        \"status\": 500,\n        \"data\": null\n    }\n    {\n        \"err\": true,\n        \"message\": \"Some required parameters are missing.\",\n        \"status\": 500,\n        \"data\": null\n    }",
          "type": "json"
        }
      ]
    },
    "filename": "/home/admin-021/issueTrackerApp/backend/app/routes/appRoute.js",
    "groupTitle": "Create"
  },
  {
    "type": "post",
    "url": "/assignIssue",
    "title": "To be assign issue to other user",
    "name": "assignIssue",
    "version": "1.0.0",
    "group": "Create",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "issueId",
            "description": "<p>Pass the issue id as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "username",
            "description": "<p>Pass the username as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Pass the authToken as body parameter or header</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n      \"err\": false,\n      \"message\": \"Assignee updated successfully.\",\n      \"status\": 200,\n      \"data\": {\n          \"n\": 1,\n          \"nModified\": 1,\n          \"ok\": 1,\n          \"notifyMsg\": \"String\"\n      }\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n      \"err\": true,\n      \"message\": \"Invalid/expired Auth token\",\n      \"status\": 500,\n      \"data\": null\n  }\n  {\n      \"err\": true,\n      \"message\": \"Some required parameters are missing.\",\n      \"status\": 500,\n      \"data\": null\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "/home/admin-021/issueTrackerApp/backend/app/routes/appRoute.js",
    "groupTitle": "Create"
  },
  {
    "type": "post",
    "url": "/comment",
    "title": "To comment on an issue",
    "name": "comment",
    "version": "1.0.0",
    "group": "Create",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "issueId",
            "description": "<p>Pass the issue id as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "username",
            "description": "<p>Pass the username as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "comment",
            "description": "<p>Pass the comment as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Pass the authToken as body parameter or header</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n       \"err\": false,\n       \"message\": \"comment created successfully.\",\n       \"status\": 200,\n       \"data\": {\n           \"comment\": \"String\",\n           \"userName\": \"String\",\n           \"commentDate\": \"String\",\n           \"notifyMsg\": \"String\"\n       }\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n       \"err\": true,\n       \"message\": \"Invalid/expired Auth token\",\n       \"status\": 500,\n       \"data\": null\n   }\n   {\n       \"err\": true,\n       \"message\": \"Some required parameters are missing.\",\n       \"status\": 500,\n       \"data\": null\n   }",
          "type": "json"
        }
      ]
    },
    "filename": "/home/admin-021/issueTrackerApp/backend/app/routes/appRoute.js",
    "groupTitle": "Create"
  },
  {
    "type": "post",
    "url": "/createIssue",
    "title": "To report a bug",
    "name": "createIssue",
    "version": "1.0.0",
    "group": "Create",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "status",
            "description": "<p>Pass the authToken as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "assigneeName",
            "description": "<p>Pass the name of assignee as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>Pass the title as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "description",
            "description": "<p>Pass the description as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "attachments",
            "description": "<p>Pass the attachments file as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Pass the authToken as body parameter or header</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n        \"err\": false,\n        \"message\": \"New issue has been created.\",\n        \"status\": 200,\n        \"data\": [\n    {\n                \"creationDate\": \"String\",\n                \"creationDateString\": \"String\",\n                \"_id\": \"String\",\n                \"issueId\": \"String\",\n                \"status\": \"String\",\n                \"title\": \"String\",\n                \"reporterName\": \"String\",\n                \"assigneeName\": \"String\",\n                \"attachmentUrls\": [\n                    {\n                        \"_id\": \"String\",\n                        \"fileName\": \"String\",\n                        \"fileUrl\": \"String\"\n                    }\n                ],\n                \"description\": \"String\"\n            }\n        ]\n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n        \"err\": true,\n        \"message\": \"Invalid/expired Auth token\",\n        \"status\": 500,\n        \"data\": null\n    }\n    \n    {\n        \"err\": true,\n        \"message\": \"Some required parameters are missing.\",\n        \"status\": 500,\n        \"data\": null\n    }",
          "type": "json"
        }
      ]
    },
    "filename": "/home/admin-021/issueTrackerApp/backend/app/routes/appRoute.js",
    "groupTitle": "Create"
  },
  {
    "type": "post",
    "url": "/sortByColumns",
    "title": "Sort issues by various columns(title,status,date,reporter).Pass any one.",
    "name": "sortByColumns",
    "version": "1.0.0",
    "group": "Create",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "status",
            "description": "<p>Pass true as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "creationDate",
            "description": "<p>Pass true as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "reporterName",
            "description": "<p>Pass true as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>Pass true as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Pass the authToken as body parameter or header</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n      \"err\": false,\n      \"message\": \"Sorting done on basis of given cols.\",\n      \"status\": 200,\n      \"data\": [\n  {\n              \"creationDate\": \"String\",\n              \"creationDateString\": \"String\",\n              \"_id\": \"String\",\n              \"issueId\": \"String\",\n              \"status\": \"String\",\n              \"title\": \"String\",\n              \"assigneeName\": \"String\",\n              \"attachmentUrls\": [\n                  {\n                      \"_id\": \"String\",\n                      \"fileName\": \"String\",\n                      \"fileUrl\": \"String\"\n                  }\n              ],\n              \"description\": \"String\",\n              \"__v\": number\n          }\n      ]\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n      \"err\": true,\n      \"message\": \"Invalid/expired Auth token\",\n      \"status\": 500,\n      \"data\": null\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "/home/admin-021/issueTrackerApp/backend/app/routes/appRoute.js",
    "groupTitle": "Create"
  },
  {
    "type": "post",
    "url": "/sortSearch",
    "title": "To get details of a particular issue",
    "name": "sortSearch",
    "version": "1.0.0",
    "group": "Create",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "text",
            "description": "<p>Pass the text to search as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Pass the authToken as body parameter or header</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     \"err\": false,\n     \"message\": \"Search successfull.\",\n     \"status\": 200,\n     \"data\": [\n         \n {\n             \"creationDate\": \"String\",\n             \"creationDateString\": \"String\",\n             \"_id\": \"String\",\n             \"issueId\": \"String\",\n             \"status\": \"String\",\n             \"title\": \"String\",\n             \"assigneeName\": \"String\",\n             \"attachmentUrls\": [\n                 {\n                     \"_id\": \"String\",\n                     \"fileName\": \"String\",\n                     \"fileUrl\": \"String\"\n                 }\n             ],\n             \"description\": \"String\",\n             \"__v\": number\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     \"err\": true,\n     \"message\": \"Invalid/expired Auth token\",\n     \"status\": 500,\n     \"data\": null\n }\n {\n     \"err\": true,\n     \"message\": \"Error in sorting rows.\",\n     \"status\": 500,\n     \"data\": null\n }",
          "type": "json"
        }
      ]
    },
    "filename": "/home/admin-021/issueTrackerApp/backend/app/routes/appRoute.js",
    "groupTitle": "Create"
  },
  {
    "type": "get",
    "url": "/auth/facebook",
    "title": "- To login through facebook",
    "name": "Facebook_Login",
    "version": "1.0.0",
    "group": "Read",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    A facebook login page\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{}",
          "type": "json"
        }
      ]
    },
    "filename": "/home/admin-021/issueTrackerApp/backend/app/routes/appRoute.js",
    "groupTitle": "Read"
  },
  {
    "type": "get",
    "url": "/auth/google",
    "title": "To login through google",
    "name": "Google_Login",
    "version": "1.0.0",
    "group": "Read",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     A google login page\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{}",
          "type": "json"
        }
      ]
    },
    "filename": "/home/admin-021/issueTrackerApp/backend/app/routes/appRoute.js",
    "groupTitle": "Read"
  },
  {
    "type": "get",
    "url": "/notificationHistory/:userId",
    "title": "To view notification history",
    "name": "Notification_History",
    "version": "1.0.0",
    "group": "Read",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>Pass the user id as route parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Pass the authToken as header</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n       \n       }\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n       \"err\": true,\n       \"message\": \"Invalid/expired Auth token\",\n       \"status\": 500,\n       \"data\": null\n   }",
          "type": "json"
        }
      ]
    },
    "filename": "/home/admin-021/issueTrackerApp/backend/app/routes/appRoute.js",
    "groupTitle": "Read"
  },
  {
    "type": "get",
    "url": "/filterByDate/:creationDate",
    "title": "Filter the assigned issues by creation date",
    "name": "filterByDate",
    "version": "1.0.0",
    "group": "Read",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Pass the authToken as a query parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "creationDate",
            "description": "<p>pass creation date(in-YYYY-MM-DD format) as route parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n      \"err\": false,\n      \"message\": \"Date based issues are found.\",\n      \"status\": 200,\n      \"data\": [\n          {\n              \"creationDate\": \"String\",\n              \"creationDateString\": \"String\",\n              \"attachmentUrls\": [\n                  \"String\"\n              ],\n              \"_id\": \"String\",\n              \"issueId\": \"String\",\n              \"status\": \"String\",\n              \"title\": \"String\",\n              \"reporterId\": \"String\",\n              \"assigneeId\": \"String\",\n              \"__v\": number\n          }\n      ]\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n      \"err\": true,\n      \"message\": \"Auth token missing in the request\",\n      \"status\": 400,\n      \"data\": null\n  }\n  \n  {\n      \"err\": true,\n      \"message\": \"No issues exist with this date.\",\n      \"status\": 404,\n      \"data\": null\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "/home/admin-021/issueTrackerApp/backend/app/routes/appRoute.js",
    "groupTitle": "Read"
  },
  {
    "type": "get",
    "url": "/filterByReporter/:reporterName",
    "title": "Filter the assigned issues by resporter name",
    "name": "filterByReporter",
    "version": "1.0.0",
    "group": "Read",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Pass the authToken as a query parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "reporterName",
            "description": "<p>pass name of the reporter as route parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\"err\": false,\n\"message\": \"Reporter name based issues are found.\",\n\"status\": 200,\n\"data\": [\n    {\n        \"creationDate\": \"String\",\n        \"creationDateString\": \"String\",\n        \"_id\": \"String\",\n        \"issueId\": \"String\",\n        \"status\": \"String\",\n        \"title\": \"String\",\n        \"reporterName\": \"String\",\n        \"assigneeName\": \"String\",\n        \"attachmentUrls\": [\n            {\n                \"_id\": \"String\",\n                \"fileName\": \"String\",\n                \"fileUrl\": \"String\"\n            }\n        ],\n        \"description\": \"String\",\n        \"__v\": number\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n      \"err\": true,\n      \"message\": \"Auth token missing in the request\",\n      \"status\": 400,\n      \"data\": null\n  }\n  \n  {\n      \"err\": true,\n      \"message\": \"No issues exist with this reporter name.\",\n      \"status\": 404,\n      \"data\": null\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "/home/admin-021/issueTrackerApp/backend/app/routes/appRoute.js",
    "groupTitle": "Read"
  },
  {
    "type": "get",
    "url": "/filterByStatus/:status",
    "title": "Filter the assigned issues by status",
    "name": "filterByStatus",
    "version": "1.0.0",
    "group": "Read",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Pass the authToken as a query parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "status",
            "description": "<p>pass status(in-progress,backlog,in-test,done) as route parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n        \"err\": false,\n        \"message\": \"Status based issues are found.\",\n        \"status\": 200,\n        \"data\": [\n            {\n                \"createdOn\": \"2020-01-17T12:00:15.000Z\",\n                \"attachmentUrls\": [],\n                \"_id\": \"5e21a45f7e1b353d6d34e4d4\",\n                \"issueId\": \"41D9S9Vx\",\n                \"status\": \"done\",\n                \"title\": \"a production issue\",\n                \"reporterId\": \"DHvRE6KW\",\n                \"assigneeId\": \"106618984403917733636\",\n                \"__v\": 0\n            }\n        ]\n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n        \"err\": true,\n        \"message\": \"Auth token missing in the request\",\n        \"status\": 400,\n        \"data\": null\n    }\n    \n    {\n        \"err\": true,\n        \"message\": \"No issues exist with this status.\",\n        \"status\": 404,\n        \"data\": null\n    }",
          "type": "json"
        }
      ]
    },
    "filename": "/home/admin-021/issueTrackerApp/backend/app/routes/appRoute.js",
    "groupTitle": "Read"
  },
  {
    "type": "get",
    "url": "/filterByTitle/:title",
    "title": "Filter the assigned issues by title",
    "name": "filterByTitle",
    "version": "1.0.0",
    "group": "Read",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Pass the authToken as a query parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>Pass title of the issue as route parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\"err\": false,\n\"message\": \"Reporter name based issues are found.\",\n\"status\": 200,\n\"data\": [\n    {\n        \"creationDate\": \"String\",\n        \"creationDateString\": \"String\",\n        \"_id\": \"String\",\n        \"issueId\": \"String\",\n        \"status\": \"String\",\n        \"title\": \"String\",\n        \"assigneeName\": \"String\",\n        \"attachmentUrls\": [\n            {\n                \"_id\": \"String\",\n                \"fileName\": \"String\",\n                \"fileUrl\": \"String\"\n            }\n        ],\n        \"description\": \"String\",\n        \"__v\": number\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n      \"err\": true,\n      \"message\": \"Auth token missing in the request\",\n      \"status\": 400,\n      \"data\": null\n  }\n  \n  {\n      \"err\": true,\n      \"message\": \"No issues exist with this title.\",\n      \"status\": 404,\n      \"data\": null\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "/home/admin-021/issueTrackerApp/backend/app/routes/appRoute.js",
    "groupTitle": "Read"
  },
  {
    "type": "get",
    "url": "/filterByStatus/:status/:text",
    "title": "To filter the searchedd content by status",
    "name": "filterSearch_ByStatus",
    "version": "1.0.0",
    "group": "Read",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "text",
            "description": "<p>Pass the text as route parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "status",
            "description": "<p>Pass the status as route parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Pass the authToken as body parameter or header</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n      \"err\": false,\n      \"message\": \"Status based issues are found.\",\n      \"status\": 200,\n      \"data\": {\n   \"creationDate\": \"String\",\n              \"creationDateString\": \"String\",\n              \"_id\": \"String\",\n              \"issueId\": \"String\",\n              \"status\": \"String\",\n              \"title\": \"String\",\n              \"reporterName\": \"String\",\n              \"assigneeName\": \"String\",\n              \"attachmentUrls\": [\n                  {\n                      \"_id\": \"String\",\n                      \"fileName\": \"String\",\n                      \"fileUrl\": \"String\"\n                  }\n              ],\n              \"description\": \"String\"\n      }\n  \n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n      \"err\": true,\n      \"message\": \"Invalid/expired Auth token\",\n      \"status\": 500,\n      \"data\": null\n  }\n  \n  {\n      \"err\": true,\n      \"message\": \"No issues exist with this status.\",\n      \"status\": 404,\n      \"data\": null\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "/home/admin-021/issueTrackerApp/backend/app/routes/appRoute.js",
    "groupTitle": "Read"
  },
  {
    "type": "get",
    "url": "/filterByDate/:creationDate/:text",
    "title": "To filter the searched content by creation date",
    "name": "filter_search_ByDate",
    "version": "1.0.0",
    "group": "Read",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "text",
            "description": "<p>Pass the text as route parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "creationDate",
            "description": "<p>Pass the creation date as route parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Pass the authToken as body parameter or header</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n      \"err\": false,\n      \"message\": \"Date based issues are found.\",\n      \"status\": 200,\n      \"data\": {\n   \"creationDate\": \"String\",\n              \"creationDateString\": \"String\",\n              \"_id\": \"String\",\n              \"issueId\": \"String\",\n              \"status\": \"String\",\n              \"title\": \"String\",\n              \"reporterName\": \"String\",\n              \"assigneeName\": \"String\",\n              \"attachmentUrls\": [\n                  {\n                      \"_id\": \"String\",\n                      \"fileName\": \"String\",\n                      \"fileUrl\": \"String\"\n                  }\n              ],\n              \"description\": \"String\"\n      }\n  \n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n      \"err\": true,\n      \"message\": \"Invalid/expired Auth token\",\n      \"status\": 500,\n      \"data\": null\n  }\n  \n  {\n      \"err\": true,\n      \"message\": \"No issues exist with this date.\",\n      \"status\": 404,\n      \"data\": null\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "/home/admin-021/issueTrackerApp/backend/app/routes/appRoute.js",
    "groupTitle": "Read"
  },
  {
    "type": "get",
    "url": "/filterByReporter/:reporterName/:text",
    "title": "To filter the searched content by reporter name",
    "name": "filter_search_ByReporter",
    "version": "1.0.0",
    "group": "Read",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "text",
            "description": "<p>Pass the text as route parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "reporterName",
            "description": "<p>Pass the reporter name as route parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Pass the authToken as body parameter or header</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n      \"err\": false,\n      \"message\": \"Reporter name based issues are found.\",\n      \"status\": 200,\n      \"data\": {\n   \"creationDate\": \"String\",\n              \"creationDateString\": \"String\",\n              \"_id\": \"String\",\n              \"issueId\": \"String\",\n              \"status\": \"String\",\n              \"title\": \"String\",\n              \"reporterName\": \"String\",\n              \"assigneeName\": \"String\",\n              \"attachmentUrls\": [\n                  {\n                      \"_id\": \"String\",\n                      \"fileName\": \"String\",\n                      \"fileUrl\": \"String\"\n                  }\n              ],\n              \"description\": \"String\"\n      }\n  \n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n      \"err\": true,\n      \"message\": \"Invalid/expired Auth token\",\n      \"status\": 500,\n      \"data\": null\n  }\n  \n  {\n      \"err\": true,\n      \"message\": \"No issues exist with this reporter name.\",\n      \"status\": 404,\n      \"data\": null\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "/home/admin-021/issueTrackerApp/backend/app/routes/appRoute.js",
    "groupTitle": "Read"
  },
  {
    "type": "get",
    "url": "/filterByTitle/:title/:text",
    "title": "To filter the searched content title",
    "name": "filter_search_ByTitle",
    "version": "1.0.0",
    "group": "Read",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "text",
            "description": "<p>Pass the text as route parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>Pass the title of issue as route parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Pass the authToken as body parameter or header</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n        \"err\": false,\n        \"message\": \"Title based issues are found.\",\n        \"status\": 200,\n        \"data\": {\n     \"creationDate\": \"String\",\n                \"creationDateString\": \"String\",\n                \"_id\": \"String\",\n                \"issueId\": \"String\",\n                \"status\": \"String\",\n                \"title\": \"String\",\n                \"reporterName\": \"String\",\n                \"assigneeName\": \"String\",\n                \"attachmentUrls\": [\n                    {\n                        \"_id\": \"String\",\n                        \"fileName\": \"String\",\n                        \"fileUrl\": \"String\"\n                    }\n                ],\n                \"description\": \"String\"\n        }\n    \n      }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n        \"err\": true,\n        \"message\": \"Invalid/expired Auth token\",\n        \"status\": 500,\n        \"data\": null\n    }\n    \n    {\n        \"err\": true,\n        \"message\": \"No issues exist with this title.\",\n        \"status\": 404,\n        \"data\": null\n    }",
          "type": "json"
        }
      ]
    },
    "filename": "/home/admin-021/issueTrackerApp/backend/app/routes/appRoute.js",
    "groupTitle": "Read"
  },
  {
    "type": "get",
    "url": "/listWatchers/:issueId",
    "title": "To be list all watchers of an issue",
    "name": "listWatchers",
    "version": "1.0.0",
    "group": "Read",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "issueId",
            "description": "<p>Pass the issue id as route parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Pass the authToken as body parameter or header</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n      \"err\": false,\n      \"message\": \"All watchers are available .\",\n      \"status\": 200,\n      \"data\": {\n          \"DHvRE6KW\": \"String\",\n          \"106618984403917733636\": \"String\",\n          \"2687787044649693\": \"String\"\n      }\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n      \"err\": true,\n      \"message\": \"Invalid/expired Auth token\",\n      \"status\": 500,\n      \"data\": null\n  }\n  {\n      \"err\": true,\n      \"message\": \"Some required parameters are missing.\",\n      \"status\": 500,\n      \"data\": null\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "/home/admin-021/issueTrackerApp/backend/app/routes/appRoute.js",
    "groupTitle": "Read"
  },
  {
    "type": "get",
    "url": "/search/:text",
    "title": "To search issues by any text",
    "name": "search",
    "version": "1.0.0",
    "group": "Read",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "text",
            "description": "<p>Pass the text to search as route parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Pass the authToken as body parameter or header</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n      \"err\": false,\n      \"message\": \"Requested issue details have been found.\",\n      \"status\": 200,\n      \"data\": {\n   \"creationDate\": \"String\",\n              \"creationDateString\": \"String\",\n              \"_id\": \"String\",\n              \"issueId\": \"String\",\n              \"status\": \"String\",\n              \"title\": \"String\",\n              \"reporterName\": \"String\",\n              \"assigneeName\": \"String\",\n              \"attachmentUrls\": [\n                  {\n                      \"_id\": \"String\",\n                      \"fileName\": \"String\",\n                      \"fileUrl\": \"String\"\n                  }\n              ],\n              \"description\": \"String\"\n      }\n  \n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n      \"err\": true,\n      \"message\": \"Invalid/expired Auth token\",\n      \"status\": 500,\n      \"data\": null\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "/home/admin-021/issueTrackerApp/backend/app/routes/appRoute.js",
    "groupTitle": "Read"
  },
  {
    "type": "get",
    "url": "/comment",
    "title": "To show all comments on an issue",
    "name": "show_comments",
    "version": "1.0.0",
    "group": "Read",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "issueId",
            "description": "<p>Pass the issue id as route parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Pass the authToken as body parameter or header</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n       \"err\": false,\n       \"message\": \"comment created successfully.\",\n       \"status\": 200,\n       \"data\": {\n           \"comment\": \"String\",\n           \"userName\": \"String\",\n           \"commentDate\": \"String\",\n           \"notifyMsg\": \"String\"\n       }\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n       \"err\": true,\n       \"message\": \"Invalid/expired Auth token\",\n       \"status\": 500,\n       \"data\": null\n   }",
          "type": "json"
        }
      ]
    },
    "filename": "/home/admin-021/issueTrackerApp/backend/app/routes/appRoute.js",
    "groupTitle": "Read"
  },
  {
    "type": "get",
    "url": "/singleIssueDetails/:issueId",
    "title": "To get details of a particular issue",
    "name": "singleIssueDetails",
    "version": "1.0.0",
    "group": "Read",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "issueId",
            "description": "<p>Pass the issue id as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Pass the authToken as body parameter or header</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n      \"err\": false,\n      \"message\": \"Requested issue details have been found.\",\n      \"status\": 200,\n      \"data\": {\n   \"creationDate\": \"String\",\n              \"creationDateString\": \"String\",\n              \"_id\": \"String\",\n              \"issueId\": \"String\",\n              \"status\": \"String\",\n              \"title\": \"String\",\n              \"reporterName\": \"String\",\n              \"assigneeName\": \"String\",\n              \"attachmentUrls\": [\n                  {\n                      \"_id\": \"String\",\n                      \"fileName\": \"String\",\n                      \"fileUrl\": \"String\"\n                  }\n              ],\n              \"description\": \"String\"\n      }\n  \n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n      \"err\": true,\n      \"message\": \"Invalid/expired Auth token\",\n      \"status\": 500,\n      \"data\": null\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "/home/admin-021/issueTrackerApp/backend/app/routes/appRoute.js",
    "groupTitle": "Read"
  },
  {
    "type": "get",
    "url": "/viewDashboard",
    "title": "View the user dashboard",
    "name": "viewDashboard",
    "version": "1.0.0",
    "group": "Read",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Pass the authToken as a query parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n      \"err\": true,\n      \"message\": \"No issues are assigned to you.\",\n      \"status\": 404,\n      \"data\": null\n  }\n  \n  {\n      \"err\": false,\n      \"message\": \"Issues assigned to you are found.\",\n      \"status\": 200,\n      \"data\": [\n          {\n              \"creationDate\": \"String\",\n              \"creationDateString\": \"String\",\n              \"_id\": \"String\",\n              \"issueId\": \"String\",\n              \"status\": \"String\",\n              \"title\": \"String\",\n              \"assigneeName\": \"String\",\n              \"attachmentUrls\": [\n                  {\n                      \"_id\": \"String\",\n                      \"fileName\": \"String\",\n                      \"fileUrl\": \"String\"\n                  }\n              ],\n              \"description\": \"String\",\n              \"__v\": number\n          },",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n      \"err\": true,\n      \"message\": \"Invalid/expired Auth token\",\n      \"status\": 500,\n      \"data\": null\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "/home/admin-021/issueTrackerApp/backend/app/routes/appRoute.js",
    "groupTitle": "Read"
  },
  {
    "type": "put",
    "url": "/editIssue",
    "title": "To edit the details of an issue",
    "name": "editIssue",
    "version": "1.0.0",
    "group": "Update",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "issueId",
            "description": "<p>Pass the issue id as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "status",
            "description": "<p>Pass the status as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>Pass the title as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "description",
            "description": "<p>Pass the description as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "attachments",
            "description": "<p>Pass the attachments file as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Pass the authToken as body parameter or header</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n      \"err\": false,\n      \"message\": \"Issue details updated successfully.\",\n      \"status\": 200,\n      \"data\": [\n  {\n              \"creationDate\": \"String\",\n              \"creationDateString\": \"String\",\n              \"_id\": \"String\",\n              \"issueId\": \"String\",\n              \"status\": \"String\",\n              \"title\": \"String\",\n              \"reporterName\": \"String\",\n              \"assigneeName\": \"String\",\n              \"attachmentUrls\": [\n                  {\n                      \"_id\": \"String\",\n                      \"fileName\": \"String\",\n                      \"fileUrl\": \"String\"\n                  }\n              ],\n              \"description\": \"String\"\n          }\n      ]\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n      \"err\": true,\n      \"message\": \"Invalid/expired Auth token\",\n      \"status\": 500,\n      \"data\": null\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "/home/admin-021/issueTrackerApp/backend/app/routes/appRoute.js",
    "groupTitle": "Update"
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "/home/admin-021/issueTrackerApp/backend/app/doc/main.js",
    "group": "_home_admin_021_issueTrackerApp_backend_app_doc_main_js",
    "groupTitle": "_home_admin_021_issueTrackerApp_backend_app_doc_main_js",
    "name": ""
  }
] });
