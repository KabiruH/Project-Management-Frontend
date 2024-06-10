# Web Application README
## Overview

This web application is designed to manage and track participant enrollments in various programs, including their payments and the award centers they are associated with. The flow chart below illustrates the overall process flow of the application.

# Key Components

### Award Centers
These are the locations or institutions where participants can receive awards or recognitions. This component is linked to the Payments and Programs modules.

### Participants
This module manages information about the individuals enrolled in various programs. It interacts with the Programs, Enrollments, and Award Centers modules.

### Programs
These are the various courses or activities participants can enroll in. This module is central to the application's operation, linking with Participants, Payments, and Enrollments.

### Payments
This component handles all financial transactions related to participant enrollments in programs. It ensures that payments are tracked and processed correctly.

### Enrollments
This module manages the enrollment status of participants in programs. It tracks the enrollment dates and any related information.

## Process Flow

### Participants Enrollment
Participants enroll in programs through the Enrollments module.

### Program Enrollment Status
The system checks if the enrollment has an end date:
Yes: If the enrollment has an end date, it proceeds to check if the program duration is over.
No: The participant remains enrolled.

### Program Duration Check
If the enrollment has an end date, the system checks if the program duration is over:
Yes: The participant is marked as having completed the program.
No: The participant remains enrolled.

### Program Completion
Once a participant has completed a program, the completion status is updated, and the system may interact with the Award Centers for any awards.

## Usage
### Setting Up

Clone the repository:
bash

        git clone git@github.com:KabiruH/Project-Management-Frontend.Git

### Navigate to the project directory:

bash

        cd web-app

### Install dependencies:

        npm install

### Start the application:

bash

        npm start

## Features

Enroll Participants: Easily enroll participants into various programs.
Track Payments: Manage and track all payments associated with program enrollments.
Manage Award Centers: Associate participants with award centers for recognition.
Monitor Program Status: Keep track of participant enrollment status and program completion.

## Contributing

Fork the repository.
Create a new branch:

    bash

        git checkout -b feature/your-feature

### Commit your changes:

bash

        git commit -m "Add your feature"

### Push to the branch:

bash

    git push origin feature/your-feature

Open a pull request.

## License

This project is licensed under the MIT License