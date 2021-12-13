# Clone Trello frontend

Repository backend https://github.com/lthonny/trello_clone_backend

### Application functionality:

#### The board creator can:

- authorization and registration of new users
- create, delete, rename boards
- add, delete, change description and title, move from board to board
- tasks can be searched by title, description and assigned users
- inviting new or old users to the board using a special link works
- people can be assigned to the task
- view task history
- tasks can be zipped and unzipped
- google authorization is under construction

### Core technology stack:

- Angular

- Angular Material

- Bootstrap

### 1) To download all project dependencies, write:

    `npm ci`

### 2) Run npm start

    `npm run start`

### To change custom ports:

go to file
`src/environments/environment.prod.ts ` && `src/environments/environment.ts`

  ``` 
  export const environment = {
    production: false,
    frontUrl: "http://localhost:[PORT]",
    api: "http://localhost:[PORT_API]"
  }; 
  ```
go to file `proxy.conf.json`
  ```
  {
    "/api/*": {
      "target": "http://localhost:[PORT_API]",
      "secure": false,
      "logLevel": "debug",
      "changeOrigin": true
    }
   }
  ```

### Attention!
Goggle authorization will not work on non-custom ports, since they are registered in the GOOGLE API SERVICES.

### 🤝 Connect with me:

[<img alt="thonny | telegram" src="https://img.shields.io/badge/telegram-4680C2.svg?&style=for-the-badge&logo=telegram&logoColor=fff" />][telegram]
[<img alt="thonny | Instagram" src="https://img.shields.io/badge/instagram-E4405F.svg?&style=for-the-badge&logo=instagram&logoColor=fff" />][instagram]
[<img alt="thonny | VK" src="https://img.shields.io/badge/vk-4680C2.svg?&style=for-the-badge&logo=vk&logoColor=fff" />][vk]

[vk]: https://vk.com/thonny_v

[telegram]: https://t.me/thonnyDev

[instagram]: https://www.instagram.com/_th_vasiliy_/




