
# Patient Registration and Hospital Data API - Lattice selection test

This document provides the details of the RESTful APIs designed for a platform where psychiatrists can register their patients and fetch hospital-related data. The platform allows psychiatrists, who belong to predefined hospitals, to manage patient registrations and retrieve information about psychiatrists and their patients within a hospital.

## API Endpoints

## 1. Register Hospital
```
POST /api/hospital/register
```
Description:This API registers a new hospital.



## Request Body

```
{
    "name":"AIIMS - All India Institute Of Medical Science",
    "address":"Delhi  India"
}
```


## Response:

201 Created: Hospital registered successfully.
 400 Bad Request: Validation failed.

```
{
    "message": "Hospital register Sucessfully",
    "hospital_id": "6646ecba31614d1752464af5"
}
```
[Link to postman hospital registration]
https://speeding-trinity-601338.postman.co/workspace/Backend-learning~e0e2a590-b942-432e-af5e-755b4db78e35/request/32662180-44b3bd53-4caf-4060-be31-8ef831a5d08a?ctx=documentation
<img width="885" alt="image" src="https://github.com/justagit07/Lattice_Selection_Test/assets/122598221/c697e7e8-0549-4a8a-ab40-3e147656756b">

---
---
<br>

## 2. Register Psychiatrist

```
POST /api/psychiatrist/register
```
Description: This API registers a new psychiatrist and associates them with a hospital.



## Request Body

```
{
    "name": "Dr. Deepak",
    "hospitalName":"AIIMS - All India Institute Of Medical Science"
}
```

## Response:

201 Created: Psychiatrist registered successfully.
 400 Bad Request: Validation failed.

```
{
    "message": "Psychiatrist is registred sucessfully",
    "_id": "6646f0fcab135489f720548f"
}
```
[Link to postman Psychiatrist registration]
https://speeding-trinity-601338.postman.co/workspace/Backend-learning~e0e2a590-b942-432e-af5e-755b4db78e35/request/32662180-8b545458-3035-401a-b3bb-ef0159b17d36?ctx=documentation
<img width="884" alt="image" src="https://github.com/justagit07/Lattice_Selection_Test/assets/122598221/a7d3c234-19dc-45b6-a007-18d25f233894">

***
***
<br>


## 3.  Register New Patient

****************** TASK - 1 ****************************

```
POST /api/patients/register
```
Description: This API registers a new patient under a psychiatrist in a hospital. The required patient details are validated before registration.



## Request Body

```
{
  "name": "Anita Roy",
  "address": "444 Tulip Street, Hyderabad",
  "email": "anita.roy@example.com",
  "phoneNumber": "+919876543218",
  "password": "Passw78rdMNO",
  "patientPhoto": "https://example.com/photos/anitaroy.jpg",
  "hospitalName": "Apollo Hospitals",
  "psychiatristName": "Dr. Arvind singh"
}



```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. Name of patient |
| `address` | `string` | **Required**. minimum 10 characters.  |
| `email` | `string` | **Required**. must be a valid email address.  |
| `phoneNumber` | `string` | **Required**. must be at least 10 digits including the country code.  |
| `password` | `string` | **Required**. must contain at least one uppercase letter, one lowercase letter, and one number. Minimum length is 8 characters, and maximum length is 15 characters.  |
| `patientPhoto` | `string` | **Required**.  must be a valid base64 encoded string.  |
| `hospitalName` | `string` | **Required**.  hospital should be already registred in database  |
| `psychiatristName` | `string` | **Required**. psychiatristName should be already registred in database  |


## Response:

201 Created:Patient registered successfully .

 400 Bad Request: Validation failed.

```
{
    "message": "Patient registered successfully",
    "patientID": "6646f5d36e55818601d26f3f",
    "newPatient": {
        "name": "Anita Roy",
        "address": "444 Tulip Street, Hyderabad",
        "email": "anita.roy@example.com",
        "phoneNumber": "+919876543218",
        "password": "Passw78rdMNO",
        "patientPhoto": "https://example.com/photos/anitaroy.jpg",
        "hospitalId": "6645fc01dec08c1fe05f984b",
        "psychiatristId": "66460dfbdec08c1fe05f9854",
        "_id": "6646f5d36e55818601d26f3f",
        "__v": 0
    }
}
```
[Link to postman Patient registration]
https://speeding-trinity-601338.postman.co/workspace/Backend-learning~e0e2a590-b942-432e-af5e-755b4db78e35/request/32662180-188abd20-1bda-4ea3-9e10-1f72b6a4a211?ctx=documentation
<img width="600" alt="image" src="https://github.com/justagit07/Lattice_Selection_Test/assets/122598221/58396166-8313-4cb9-8039-b394f5446ba6">

---
---



## 4. Fetch Hospital Psychiatrists and Patient Details

****************** TASK - 2 ****************************

```http
GET /api/hospital/details
```
Description: This API fetches all psychiatrists, their count, and patient details for a specified hospital.


## Request Body

```
{
    "hospitalId": "6645fcd6dec08c1fe05f984d"
}


```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `hospitalId` | `string` | **Required**. Valid hospitalId |

## Response:

201 Created: Data retrieved successfully.

 400 Bad Request: Hospital not found.

```
{
  {
    "hospitalName": "Jawaharlal Nehru Medical College and Hospital",
    "totalPsychiatristsCount": 5,
    "totalPatientsCount": 6,
    "psychiatristDetails": [
        {
            "_id": "66460e73dec08c1fe05f9868",
            "name": "Dr. Jatin sharma",
            "patientCount": 1
        },
        {
            "_id": "66460e86dec08c1fe05f986c",
            "name": "Dr.  Jawan sharma",
            "patientCount": 1
        },
        {
            "_id": "66460ea1dec08c1fe05f9870",
            "name": "Dr.  Jivika",
            "patientCount": 1
        },
        {
            "_id": "66460ea8dec08c1fe05f9874",
            "name": "Dr.  Jiya",
            "patientCount": 2
        },
        {
            "_id": "66460eb8dec08c1fe05f9878",
            "name": "Dr.  Jiyansh Rawat",
            "patientCount": 1
        }
    ]
}
}

```
[Link to postman Fetch Details]
https://speeding-trinity-601338.postman.co/workspace/Backend-learning~e0e2a590-b942-432e-af5e-755b4db78e35/request/32662180-36642265-8fa1-44d5-ba7b-8e0faa48787e?ctx=documentation
<img width="874" alt="image" src="https://github.com/justagit07/Lattice_Selection_Test/assets/122598221/0b0fdb8b-f540-43a3-9264-aa39edc1dfee">

---
---

## ENVIROMENT VARIABLES

Below are the enviroment variable which should be placed inside the .env file 

`MONGO_URI` - Add the mongodb String here

`PORT` - 3000

---
---
<br>

## POSTMAN LINK 

The below link are the POSTMAN link to check the api.

`Patient Registration` :  https://speeding-trinity-601338.postman.co/workspace/Backend-learning~e0e2a590-b942-432e-af5e-755b4db78e35/request/32662180-188abd20-1bda-4ea3-9e10-1f72b6a4a211?ctx=documentation
<br>

<br>
`Fetch Hospital Details` : https://speeding-trinity-601338.postman.co/workspace/Backend-learning~e0e2a590-b942-432e-af5e-755b4db78e35/request/32662180-36642265-8fa1-44d5-ba7b-8e0faa48787e?ctx=documentation
<br>

---
---



___


## Major Libraries and Frameworks Used

### 1. Express

Reason: Express is a fast, unopinionated, minimalist web framework for Node.js, making it ideal for building RESTful APIs quickly and efficiently.


### 2. Mongoose
Reason: Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It provides a straightforward, schema-based solution to model application data, with built-in type casting, validation, query building, and business logic hooks.




### 3. dotenv
Reason: dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. This is essential for managing configuration and secrets separately from the codebase, enhancing security and flexibility.



### 4. body-parser

Reason: body-parser is a middleware for parsing incoming request bodies in a middleware before your handlers, available under the req.body property. It's essential for handling POST requests in Express applications.


### 5. nodemon (Dev Dependency)

Reason: nodemon is a utility that automatically restarts the node application when file changes in the directory are detected. This significantly improves the development workflow by eliminating the need to manually restart the server after every change.

___
<br>

## SCHEMA  JSON  

[schema.json](https://github.com/justagit07/Lattice_Selection_Test/files/15345125/schema.json){

    /*  HOSPITAL  SCHEMA  YOU CAN ALSO CHECK SCHEMA IN THE MODELS SECTIONS  OF MY CODE BASE */
    
    "Hospital": {
        
      "name": {
        "type": "String",
        "required": true
      },
      "address": {
        "type": "String",
        "required": true
      },
      "psychiatrists": [
        {
          "type": "ObjectId",
          "ref": "Psychiatrist"
        }
      ],
      "patients": [
        {
          "type": "ObjectId",
          "ref": "Patient"
        }
      ]
    },


 /*  PSYCHIATRIST   SCHEMA  */
    


    "Psychiatrist": {
      "name": {
        "type": "String",
        "required": true
      },
      "hospitalId": {
        "type": "ObjectId",
        "ref": "Hospital",
        "required": true
      },
      "patients": [
        {
          "type": "ObjectId",
          "ref": "Patient"
        }
      ]
    },


 /*  PATIENT SCHEMA  */
    

    "Patient": {

      "name": {
        "type": "String",
        "required": true
      },
      "address": {
        "type": "String",
        "required": true,
        "minlength": 10
      },
      "email": {
        "type": "String",
        "required": true
      },
      "phoneNumber": {
        "type": "String",
        "required": true
      },
      "password": {
        "type": "String",
        "required": true,
        "minlength": 8,
        "maxlength": 15
      },
      "patientPhoto": {
        "type": "String",
        "required": true
      },
      "hospitalId": {
        "type": "ObjectId",
        "ref": "Hospital",
        "required": true
      },
      "psychiatristId": {
        "type": "ObjectId",
        "ref": "Psychiatrist",
        "required": true
      }
      
      
    }
  }
***
***


  
## Deployment
1. Clone the Repository


```bash
git clone https://github.com/example/repo.git
cd repo

```
2.Install Dependencies

```bash
npm install
```
3. Create a .env File


```bash
MONGO_URI=<your-mongodb-connection-string>
PORT=3000
```
4. Start the Server


```bash
npm run dev
```





