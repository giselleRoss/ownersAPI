# Owners and Cars API

## Overview

The Owners and Cars API provides information about owners and their associated cars. It exposes endpoints to retrieve details about owners, their cars, and relationships between them.

## API Endpoints

### Get Owners

Retrieve a list of all owners.

- **Endpoint:** `/owners`
- **Method:** GET
- **Response:**
  ```json
  {
    "owners": [
      {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com",
      },
    ]
  }
### Get Cars

Retrieve a list of all cars.

- **Endpoint:** `/cars`
- **Method:** GET
- **Response:**
  ```json
  {
    "cars": [
      {
        "id": 1,
        "make": "Subaru",
        "model": "Crosstrek",
        "year": 2020,
      },
    ]
  }
### Get Cars By Owners

Retrieve a list of cars associated with a specific owner.

- **Endpoint:** `/owners/{ownerId}/cars`
- **Method:** GET
- **Parameters:** `{ownerId}`: ID of owner

- **Response:**
  ```json
  {
    "cars": [
      {
        "id": 1,
        "make": "Subaru",
        "model": "Crosstrek",
        "year": 2020,
      },
    ]
  }

### USAGE
1. Make requests to the provided endpoints based on your use case.
2. Ensure proper authentication and authorization mechanisms are implemented as needed.
3. Handle response data accordingly in your application.

Remember to replace placeholder values like `{ownerId}` and `{carId}` with actual parameter names in your API. Additionally, update the example responses with the actual structure returned by your API.
