### Task Description

Develop a matching system that connects property requests with relevant ads based on specific criteria.
We have 3 resources
Property request: when you need to rent or buy a property you make a request on the application with your specific needs and there are real estate agents on the application they will contact you to get what you need
Ad: agents can create ads for clients who want to rent or buy a property
User: 
client: the user who can make requests 
Agent: the user who can make ads
Admin: a super admin who can do anything 

### Requirements

1. **Database Schema Design:**
   - Create a schema for storing property requests, including attributes like:
     - `propertyType` ‘VILLA’ | ‘HOUSE’ |’LAND’ | ‘APARTMENT’
     - @`area`
     - @`price`
     - `city`
     - @`district`
     - `description`
     - `refreshedAt`: Date (date of last time user refreshed his request)
   - Create a schema for storing ads with same attributes.

   - Create a schema for users who will use the system, with the following attributes:
     - `name`
     - `phone` (unique)
     - `role`: 'ADMIN' | 'CLIENT' | 'AGENT'
     - `status`: 'ACTIVE' | 'DELETED'
   - Ads and requests should be linked to users who create them.

2. **API Endpoints:**
   - Implement an endpoint for creating property requests used by clients only.
   - Implement an endpoint for updating property requests (description - area - price).
   - Implement an endpoint for creating ads used by agents only.
   *aggregation EndPoint*
   **HardMatchig**
   <!-- - Implement an endpoint that matches property requests with relevant ads based on district, price, and area.For User -->
     <!-- - The endpoint should take an ad `_id` and return matching property requests, sorted by refreshedAt date descending. with Agent -->
     - Include a price tolerance of +/- 10% in the matching system.
        - example: if ad price is 100 then requests with price 90 to 110 will be matched
     - Include pagination in the response using MongoDB aggregation with a `single` database call.
     - Ensure that the matching logic is efficient and can handle a large number of requests and ads (performance considerations).

   - Implement an endpoint for admin users to return statistics about how many ads or requests exist for a user (client or agent) and the total amount of those ads or requests.
     - Only admins can access this endpoint.
     - Use MongoDB's aggregation framework to implement this endpoint.
     - Response example
```javascript
{
  data: [{
    name: XXX,
    role: XXX,
    ...other user data,
    adsCount: 0,
    totalAdsAmount: 0,
    requestsCount: 10,
    totalRequestsAmount: 23600,
  }],
  page: 1,
  limit: 10
  total: 200
  hasNextPage: true
  hasPreviousPage: false
}
```

- Implement endpoint for login using phone and password `(password must be secured)`

3. **Authentication and Authorization:**
   - Implement authentication using JWT tokens.
   - Ensure that all endpoints require authentication, and restrict access to endpoints based on user roles (agents for creating ads, clients for creating requests, admins for admin stats).

### Tech Stack
- Node.js
- MongoDB (mongoose)

### Deliverables

1. Source code repository on GitHub containing:
   - Implemented schemas
   - API endpoint code
   - Matching logic
   - Authentication and authorization logic

2. Detailed instructions on how to run the project locally.

3. Any assumptions or decisions made during the implementation process.

4. A sample DB backup file to test the implemented functionality.