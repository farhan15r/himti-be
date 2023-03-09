# REST API

## Installation

```
// using npm
npm install

// using yarn
yarn install
```

## Using

### POST /users

#### req

```json
{
  "name": "Otong Surotong",
  "username": "otong123",
  "email": "otong@mail.com",
  "password": "12345678",
  "repeatPassword": "12345678"
}
```

#### res

if success

```json
{
  "code": 201,
  "message": "Created",
  "data": {
    "username": "otong123"
  }
}
```

if fail

```json
{
  "code": 400,
  "message": "Username already exists" // or some other message of error
}
```
