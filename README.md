
# Smart todo

RESTfull Node.js API that applies the best development and security approaches.

Also applied automated tests that check all possible use cases.



## Technologies

 - [Nest.js](https://nestjs.com)
 - [Typeorm](https://typeorm.io)
 - [Postgres](https://node-postgres.com/)
 - [Typescript](https://www.typescriptlang.org)
 - [Passport.js](http://www.passportjs.org)
 - [Bcrypt](https://www.npmjs.com/package/bcrypt)
 - [RxJS](https://rxjs.dev)
 - [UUID](https://www.npmjs.com/package/uuid)


## Main commands

You can use [npm](https://www.npmjs.com) or [yarn](https://yarnpkg.com)
```bash
  start

  start:dev

  start:prod

  build

  test:e2e
```

For more information: [Nest.js commands](https://docs.nestjs.com/cli/scripts)


## API Reference

#### Registration

This endpoint needs for create a new user.

```http
  POST /auth/registration
```

| Body parameter | Type     | Validation                |
| :-------- | :------- | :------------------------- |
| `first_name` | `string` | **Required** |
| `last_name` | `string` | **Required** |
| `email` | `string` | **Required** & **isEmail** |
| `password` | `string` | **Required** |

#### Authentication

This endpoint needs for log in to system and getting a **access token**.

```http
  POST /auth/login
```

| Body parameter | Type     | Validation                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required** & **isEmail** |
| `password` | `string` | **Required** |

**For others endpoints needs access token in Authorization header:**
```
Authorization: Bearer <token>
```

#### Get user tasks

```http
  GET /tasks
```

#### Get user task by id

```http
  GET /tasks/${id}
```

| Query parameter | Type     | Validation                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required** |


#### Create user task

```http
  POST /tasks
```

| Body parameter | Type     | Validation                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required** |
| `description` | `string` | **Required** |
| `checked` | `boolean` | **Default: false** |
| `priority` | `string` | **low or normal or hight** |


#### Update user task by id

```http
  PUT /tasks/${id}
```

| Body parameter | Type     | Validation                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **-** |
| `description` | `string` | **-** |
| `checked` | `boolean` | **-** |
| `priority` | `string` | **-** |

*you can update only the data you need*


#### Delete user task by id

```http
  DELETE /tasks/${id}
```


#### Get all system users

```http
  GET /users
```


#### Get current user

```http
  GET /users/${id}
```
| Query parameter | Type     | Validation                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required** |


#### Delete user by id

```http
  DELETE /users/${id}
```


## Environment Variables

To use this project, you will need to add the following environment variables to your .env file

`APP_ENV` *(test | development | production)*

`DB_PORT`

`DB_USERNAME`

`DB_PASSWORD`

`DB_NAME`

`TEST_DB_PORT`

`TEST_DB_USERNAME`

`TEST_DB_PASSWORD`

`TEST_DB_NAME`


# Security

We care about the security of our application.

To identify our users we use [JSON Web token](https://jwt.io)

Your active session can last up to 24 hours, after which you will be automatically logged out.

Also, unauthorized users do not have access to personal data.

All passwords entered by users are hashed.
This means that no one will be able to find out your password, even if they gain access to the database.


## License

Smart todo is [MIT licensed](LICENSE).
