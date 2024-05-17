
# Patient Registration and Hospital Data API - Lattice selection test

This document provides the details of the RESTful APIs designed for a platform where psychiatrists can register their patients and fetch hospital-related data. The platform allows psychiatrists, who belong to predefined hospitals, to manage patient registrations and retrieve information about psychiatrists and their patients within a hospital.

## API Endpoints


## 3.  Register New Patient

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

201 Created: Validation failed.
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
<img width="600" alt="image" src="https://github.com/justagit07/Lattice_Selection_Test/assets/122598221/58396166-8313-4cb9-8039-b394f5446ba6">

---
---



## 4. Fetch Hospital Psychiatrists and Patient Details

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

`API_KEY`

`ANOTHER_API_KEY`


