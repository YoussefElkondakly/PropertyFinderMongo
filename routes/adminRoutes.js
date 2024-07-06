/*
Implement an endpoint for admin users to return statistics about how many ads or requests exist for a user (client or agent) and the total amount of those ads or requests.
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
*/

router.use(authController.protect, authController.accessManager("admin"));



