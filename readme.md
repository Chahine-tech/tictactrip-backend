# Text justification REST API

This REST API allows to justify a text passed in parameter. It returns the justified text with lines of the same length using spaces.

## Installation

```bash
$ npm install
$ yarn install
```

## Running the app

```bash
# development
$ npm run serve
$ yarn run serve

# production mode
$ npm run start
$ yarn run start
```

## Test

```bash
# unit tests
$ npm run test
```

## API Routes

## `/api-docs`

Documentation for api with swagger.

## `/api/token`

### URIs

| method | endpoint | headers | body    | Response                 | description                       |
| :----- | :------- | :------ | :------ | :----------------------- | :-------------------------------- |
| `POST` | `/`      | `null`  | `email` | `{ token: RandomToken }` | return a Token for using justify. |

## `/api/justify`

### URIs

| method | endpoint | headers                            | body   | Response                | description            |
| :----- | :------- | :--------------------------------- | :----- | :---------------------- | :--------------------- |
| `POST` | `/`      | `Token`,`Content-type: text/plain` | `text` | `{ text: JustifyText }` | return a justify text. |

Here we up !

## Authors

- [@Chahine-tech](https://www.github.com/Chahine-tech)

## License

[MIT](https://choosealicense.com/licenses/mit/)
