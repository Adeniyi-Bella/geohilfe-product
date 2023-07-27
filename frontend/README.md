
<img width="800" alt="image" src="https://github.com/DigitalProductschool/batch19--drk/assets/37347588/04b316c7-6fe7-4f95-8d9f-f787aab6f580">

### Tech Stacks
- Frontend was bootstrapped with React JS

### Project Requirements to set up locally
- Node js ([Download here](https://nodejs.org/en/download))
- run <node -v> and <npm -v> to test if download was successful.

### Accounts needed for authentication
- Mapbox. Create an account ([here](https://account.mapbox.com/auth/signin/))

# Running **_locally_**

- cd into frontend directory from batch19--drk
- create a .env file in the root of the frontend directory and add the token below:
REACT_APP_MAPBOXGL_ACCESS_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx. You need to obtain your own token from mapbox.
- run  ```<npm i>``` from terminal to install neccessary dependencies
- run  ```<npm start>``` and the app should start on ```http://localhost:3000``` with ```Welcome to Geohilfe```.
- change the url to ```http://localhost:3000/app``` and the map should be displayed.
- If you are connected to the AI, you can already start adding keywords manually.
- run ```<npm build> ``` to build for production.

### Debugging
- In dev mode, there is a bug that makes the map not to load correctly. In this case, you have to reload.
- During development, you have to also follow the eslint rules, unless you would get eslint errors. 
