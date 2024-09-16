# Virtual Classroom Manager

A terminal-based application for managing virtual classrooms, students, and assignments.

## Features

- **Classroom Management**: Create and manage classrooms.
- **Student Enrollment**: Enroll students into classrooms.
- **Assignment Scheduling**: Schedule assignments for specific classrooms.
- **Assignment Submission Tracking**: Track students' assignment submissions.
- **Attendance Management**: Mark attendance for students in classrooms.
- **Student Search**: Search for students enrolled in a specific classroom.
- **Statistics Reporting**: View overall statistics for classrooms, students, and assignments.
- **Assignment Listings**: List all assignments for a specific classroom.
  

## Commands

- add_classroom <class_name>
- add_student <student_id> <class_name>
- schedule_assignment <class_name> <assignment_details>
- list_assignments <classroom_name>
- submit_assignment <student_id> <class_name> <submission_details>
- mark_attendance <student_id> <class_name>
- search_students <class_name>
- report_statistics


## Setup

1. Clone the repository.
2. Run npm install to install dependencies.
3. Run npx tsc to compile TypeScript files.
4. Run node dist/VirtualClassroomManager.js to start the application.
