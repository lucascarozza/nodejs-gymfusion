# GymFusion
GymFusion is as GymPass style app designed to bring flexibility and accessibility to fitness, making it easier than ever to explore and connect with gyms and wellness facilities. Built with a focus on convenience and user experience, it streamlines the way people approach their fitness routines

## Application Requirements  

### Functional Requirements  
- Users must be able to register.  
- Users must be able to authenticate.  
- Logged-in users must be able to view their profile.  
- Logged-in users must be able to see their total number of check-ins.  
- Logged-in users must be able to view their check-in history.  
- Users must be able to search for nearby gyms.  
- Users must be able to search for gyms by name.  
- Users must be able to check in at a gym.  
- User check-ins must be verifiable.  
- Admins must be able to register new gyms in the system.  

### Business Rules  
- Users cannot create an account using an email that is already registered.  
- Users cannot perform more than one check-in per day.  
- Users can only check in at a gym if they are within 100 meters of its location.  
- A check-in can only be validated within 20 minutes after it is created.  
- Only admins can validate check-ins.  
- Only admins can register new gyms in the system.  

### Non-Functional Requirements  
- User passwords must be encrypted.  
- Application data must be stored in a PostgreSQL database.  
- All data lists must be paginated, displaying 20 items per page.  
- Users must be identified using a JWT (JSON Web Token).