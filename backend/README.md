# Running ***locally*** 
Inside the backend folder run: 

```
./gradlew bootRun
```
# Building the container image using the default builder

**Note**: /.gradlew is a script, ensure that it has Unix-style LF line endings before building the image. 

```
pack build backend-app:dev --path . 
```
# Running the container image

**Note**: Start the database with Docker compose before starting the backend container.
```
docker compose up -d
```

```
docker run --rm -p 8080:8080 -e "SPRING_PROFILES_ACTIVE=dev" backend-app:dev  
```

> --rm Automatically remove the container when it exits

> -p 8080:8080 expose port 8080 to other Docker containers on the same network and 8080 to the host

> -e SPRING_PROFILES_ACTIVE=dev Pass SPRING_PROFILES_ACTIVE as environment variable to Spring Boot app to activate dev profile


