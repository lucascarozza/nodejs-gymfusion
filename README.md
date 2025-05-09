# GymFusion API (REST SOLID)
GymFusion is a RESTful API inspired by GymPass, designed to streamline fitness routines by connecting users with gyms and wellness facilities. Built with Node.js, TypeScript, and SOLID principles, it prioritizes security, scalability, and a seamless user experience. Developed as part of my studies at Rocketseat.

## Features
- **User Authentication**: Secure JWT-based registration and login.
- **Check-In System**:
  - Users can check in at gyms within 100 meters of their location.
  - Daily check-in limits to prevent abuse.
- **Gym Management**:
  - Search gyms by name or proximity.
  - Admins can register new gyms.
- **Check-In Validation**:
  - Admins can validate check-ins within 20 minutes of creation.
- **User Profile & History**:
  - View profiles with total check-ins.
  - Paginated check-in history (20 items per page).
- **CI/CD**: Automated testing via GitHub Actions (unit and E2E).

## Technologies Used
- **Back-End**: Node.js with TypeScript.
- **Database**: PostgreSQL with Prisma ORM.
- **Testing**: TDD approach with Vitest and Supertest.
- **Infrastructure**: Docker for containerized environments.
- **Security**: Password encryption, JWT authentication.
- **Architecture**: Dependency Inversion Principle for repositories.

## Application Requirements

### Functional Requirements
- User registration and authentication.
- Check-in creation with location validation.
- Gym search by name or proximity.
- Admin-only gym registration and check-in validation.
- Paginated data lists (users, check-ins, gyms).

### Business Rules
- One check-in per user per day.
- Check-ins allowed only within 100 meters of a gym.
- Check-in validation expires after 20 minutes.
- Admin privileges required for gym registration and check-in validation.

### Non-Functional Requirements
- Encrypted user passwords.
- PostgreSQL database with Dockerized setup.
- 100% test coverage for core functionalities.

## Testing
- **Unit Tests**: Isolated service logic testing with Vitest.
- **Integration Tests**: API endpoints validated with Supertest (HTTP requests/responses).
- **E2E Tests**: Full workflow simulations (e.g., user registers → checks in → admin validates).
- **CI/CD**: GitHub Actions runs all tests (unit, integration, E2E) on every push.

## My Journey
This project was a cornerstone of my back-end development studies at Rocketseat. Implementing SOLID principles and TDD challenged me to write clean, maintainable code while ensuring reliability through rigorous testing. The dependency inversion pattern for repositories taught me the value of decoupling layers, and working with real-world constraints like location validation deepened my problem-solving skills. Overcoming Docker-PostgreSQL integration hurdles and mastering Prisma’s ORM capabilities were pivotal moments in my growth as a developer.