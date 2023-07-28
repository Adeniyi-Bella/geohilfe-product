<img width="800" alt="image" src="https://github.com/DigitalProductschool/batch19--drk/assets/37347588/04b316c7-6fe7-4f95-8d9f-f787aab6f580">

# Geohilfe Frontend

## Table of Contents

- [Technologies Used](#technologies-used)
- [Project Requirements to set up locally](#project-requirements-to-set-up-locally)
- [Accounts needed for authentication](#accounts-needed-for-authentication)
- [Running locally](#running-locally)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Debugging](#Debugging)

## Technologies Used
- Frontend was bootstrapped with React JS
- Axios for API requests
- Recoil for state management

## Project Requirements to set up locally
- Node js ([Download here](https://nodejs.org/en/download))
- run <node -v> and <npm -v> to test if download was successful.

## Accounts needed for authentication
- Mapbox. Create an account ([here](https://account.mapbox.com/auth/signin/))

## Running locally

- cd into frontend directory from batch19--drk
- create a .env file in the root of the frontend directory and add the token below:
REACT_APP_MAPBOXGL_ACCESS_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx. You need to obtain your own token from mapbox.
- run  ```<npm i>``` from terminal to install neccessary dependencies
- run  ```<npm start>``` and the app should start on ```http://localhost:3000``` with ```Welcome to Geohilfe```.
- change the url to ```http://localhost:3000/app``` and the map should be displayed.
- If you are connected to the AI, you can already start adding keywords manually.
- run ```<npm build> ``` to build for production.

## Usage
If the backend and AI are running, when you make a call you should start seeing the keywords being displayed. 
Clicking a keyword zooms into the grid with the highest probability.

## Folder Structure

```bash
frontend/
  ├── public/
  ├── src/
  │   ├── components/
  │   │   ├── CallerTab/
  │   │   ├── Footer/
  │   │   └── ...
  │   ├── icons
          ├── LocationIcon.js/
  │   ├── recoil
          ├── atoms.js
  │   ├── routes
          ├── Routes.jsx
  │   ├── services
          ├── BackendService.js
  │   ├── App.jsx
  │   ├── index.jsx
  ├── package.json
  ├── README.md
  └── ...
```

## Debugging
- In dev mode, there is a bug that makes the map not to load correctly. In this case, you have to reload.
- During development, you have to also follow the eslint rules, unless you would get eslint errors. 
