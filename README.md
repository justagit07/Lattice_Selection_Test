
# Patient Registration and Hospital Data API - Lattice selection test

This document provides the details of the RESTful APIs designed for a platform where psychiatrists can register their patients and fetch hospital-related data. The platform allows psychiatrists, who belong to predefined hospitals, to manage patient registrations and retrieve information about psychiatrists and their patients within a hospital.

## API Endpoints


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


