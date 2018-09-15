# github-profile-chart

Visualize your github profile.

> Inspired by Molunerfinn's [node-github-profile-summary](https://github.com/Molunerfinn/node-github-profile-summary)

Live at: [http://ghprofile.breezymelon.com/](http://ghprofile.breezymelon.com/)

## Features

1. Responsive layout
2. Simple and fresh interface
3. Support exporting images

## Skills & Dependencies

- [Vue](https://github.com/vuejs/vue)
- [Koa](https://github.com/koajs/koa)
- [Antv/g2](https://github.com/antvis/g2)
- [Melongrid.css](https://github.com/MrElvin/MelonGrid.css)
- [Github api v4](https://developer.github.com/v4/)

## Screenshot

> Take my account as an example, sorry for my poor github data.

### Your beautiful profile

![MrElvin's Github Profile](http://pic.breezymelon.com/github-profile-chart/MrElvin's GitHub Profile.png)

### Save and Download your profile as an image

![MrElvin's Github Profile](http://pic.breezymelon.com/github-profile-chart/MrElvin's GitHub Profile.png)

## Run locally

### Project config

1. First you should generate a github personal access token at [https://github.com/settings/tokens](https://github.com/settings/tokens)

2. Second you have to create a file in the project folder which name is `project.config.json`. For example:

```json
{
  "PORT": 8080,
  "SOCKET_PORT": 3000,
  "JWT_SECRET": "github-profile-chart",
  "IS_STAR_REQUIRED": false,
  "TOKEN": "yourgithubpersonalaccesstoken"
}
```
- PORT
    
    backend server port
- SOCKET_PORT

    socket server port
- JWT_SECRET

    any string you like (use for json web token)
- IS_STAR_REQUIRED

    if this field is true, you can only analyze the gist who has starred the repository (Recommend: false)
- TOKEN

    paste your github personal access token here

### Install

```shell
git clone git@github.com:MrElvin/github-profile-chart.git
cd github-profile-chart
npm install
```

### Run

```shell
npm run build
node app.js
```

Open `http://localhost:3000` in your browser.

Enjoy ^_^

## License

[MIT](https://github.com/MrElvin/github-profile-chart/blob/dev/LICENSE)
