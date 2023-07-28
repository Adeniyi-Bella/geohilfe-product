# GEOHILFE
<hr></hr>

<img width="800" alt="image" src="https://github.com/DigitalProductschool/batch19--drk/assets/37347588/529859b9-4e54-41d6-a6dd-ac9dc67721b1">

### Introduction:
Geohilfe aims to assist emergency services operators in locating patients by listening in to live patient calls. Geohilfe extracts keywords from the conversation (places, landmarks, streets) and displays them for the operator to select. Operators can choose which keywords are relevant and these are sent to the AI model. Using the selected keywords, a similarity function computes scores on where the patient is most likely located. The scores are sent back to the operator along with their respective grid information. These scores and grids are displayed for the operator to see.  

### Tech Stacks
- Frontend was bootstrapped with React JS
- Backend was developed with node js
- AI was developed with Python
- Twillio was used for call emulation

### Project Requirements to set up locally

- Node js ([Download here](https://nodejs.org/en/download))
- Git ([Download here](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git))
- Docker ([Download here](https://www.docker.com/products/docker-desktop/))
- Python3 ([Download here](https://www.python.org/downloads/))
- ngrok ([Download here](https://ngrok.com/download))

### Accounts needed for authentication
- Mapbox. Create an account ([here](https://account.mapbox.com/auth/signin/))
- ngrok. Create an account here ([here](https://dashboard.ngrok.com/signup))
- Twillio. Create an account here ([here](https://www.twilio.com/login))

### Setting up Locally. 

- `Step 1`: Cloning the repo
```bash
git clone <https://github.com/Adeniyi-Bella/geohilfe-product.git>
```
 
- `Step 2`: starting the front end locally
```bash
- Check the frontend directory for set-up procedures.
```


- `Step 3`: starting the ai
```bash
- Check ai directory for set-up procedures.
```

 - `Step 4`: set up the backend
```bash
- Check the server directory for set-up procedures
```
