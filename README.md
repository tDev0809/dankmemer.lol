<img width="64" height="64" align="left" style="float: left; margin: 10px 10px 0 0;" alt="Icon" src="https://imgur.com/TNMd4lE.png">

# Dank Memer's Website

> This is the repo for Dank Memer's current website.

<img alt="Screenshot" src="https://imgur.com/t7x6wyA.png">

## Setup

Node.js 16.6.0 or newer is required.

1. Run:

```bash
$ git clone https://github.com/DankMemer/dankmemer.lol.git
$ cd ./dankmemer.lol
```

2. Create .env file:

```shell
COOKIE_SECRET=secret
CLIENT_ID=id
CLIENT_SECRET=secret
CRYPT_KEYS=["key","key"]
DOMAIN=http://localhost:3000
MONGODB_URI=mongodb://127.0.0.1:27017
MONGODB_DB=website
```

-   You can generate CRYPT_KEYS by running:
    `node -p "[ 32, 16 ].map(n => crypto.randomBytes(n).toString('base64'))"`
-   COOKIE_SECRET should be at least 32 characters long. Generate one using:
    [`https://1password.com/password-generator/`](https://1password.com/password-generator/)

3. Run:

```bash
$ npm i
$ npm run dev
```

## Authors

-   **Ronin** - _Initial work_ - [TheCyberRonin](https://github.com/TheCyberRonin)
-   **Mel** - _Initial design_ - [Melmsie](https://github.com/melmsie)
-   **Aetheryx** - _Basically the whole thing_ - [Aetheryx](https://github.com/aetheryx)
-   **InBlue** - _Taken over work for redesign_ - [InBlue](https://github.com/inblue)
-   **Badosz** - _Rewrite and feedback page_ - [badosz0](https://github.com/badosz0)

## License

[MIT](https://tldrlegal.com/license/mit-license)
