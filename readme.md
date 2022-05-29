# **Assignment Vouch Digital** 

| ***Tasks*** | Remark |
|:-------|:--------:|
|Add a new contact.|:heavy_check_mark: DONE
|Add bulk contacts.|:heavy_check_mark: DONE
|Fetch details of single contact.|:heavy_check_mark: DONE
|Fetch phase matching results.|:disappointed: UNRESOLVED QUERY 
|Fetch the list of contacts with pagination.|:heavy_check_mark: DONE
|Update the given contact.|:heavy_check_mark: DONE
|Delete the given contact.|:heavy_check_mark: DONE
|Add JWT authentication to secure API.|:heavy_check_mark: DONE
|Implement an endpoint to get the JWT token.|:heavy_check_mark: DONE

# File Structure
> #### addressBookModel.js
> - Address mongoose model.
> #### addressController.js 
> - Add a new contact.
> - Add bulk contacts. 
> - Fetch details of single contact (JWT PROTECTED).
> - Update the given contact.
> - Delete the given contact.
> - Fetch the list of contacts with pagination.
> #### userModel.js 
> - User mongoose model.
> #### userController.js 
> - Add JWT authentication to secure API.
> - Implement an endpoint to get the JWT token.
> #### router.js
> - Address routes.
> - User/Admin routes to get JSON web token.
> #### errController.js
> - Handle error responses.
> #### CustomError.js
> - Extends Error class.
> #### aap.js
> - Router mount.
> - Global error handler.
> - Invalid route handler.
> - Express, Morgan imports.
> #### AssignmentVouch.json
> - JSON data of hypothetical users for bulk inserts.
> #### Test.txt
> - Sample test case.
> #### server.js
> - MongoDB connection.
> - Backend application entry point.

