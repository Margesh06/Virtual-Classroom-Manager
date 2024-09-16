"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
// Terminal interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
// Global state
const state = {
    classrooms: new Map(),
    students: new Set(),
    assignments: new Set()
};
// Utility function to handle errors
const handleError = (message) => {
    console.error(`Error: ${message}`);
};
// Utility function to handle logging
const log = (message) => {
    console.log(message);
};
// Classroom operations
class ClassroomManager {
    static addClassroom(name) {
        if (state.classrooms.has(name)) {
            handleError(`Classroom ${name} already exists.`);
            return;
        }
        state.classrooms.set(name, { name, assignments: new Map(), students: new Set() });
        log(`Classroom ${name} has been created.`);
    }
    static addStudent(id, className) {
        if (!state.classrooms.has(className)) {
            handleError(`Classroom ${className} does not exist.`);
            return;
        }
        state.classrooms.get(className).students.add(id);
        state.students.add(id);
        log(`Student ${id} has been enrolled in ${className}.`);
    }
    static scheduleAssignment(className, details) {
        if (!state.classrooms.has(className)) {
            handleError(`Classroom ${className} does not exist.`);
            return;
        }
        const assignmentId = `${className}_${Date.now()}`;
        state.classrooms.get(className).assignments.set(assignmentId, { details, submissions: new Map() });
        state.assignments.add(assignmentId);
        log(`Assignment scheduled with ID ${assignmentId} for ${className}.`);
    }
    static submitAssignment(studentId, className, assignmentId, details) {
        if (!state.classrooms.has(className)) {
            handleError(`Classroom ${className} does not exist.`);
            return;
        }
        const classroom = state.classrooms.get(className);
        const assignment = classroom.assignments.get(assignmentId);
        if (!assignment) {
            handleError(`Assignment ${assignmentId} does not exist for ${className}.`);
            return;
        }
        assignment.submissions.set(studentId, details);
        log(`Assignment ${assignmentId} submitted by Student ${studentId} in ${className}.`);
    }
    static markAttendance(studentId, className) {
        if (!state.classrooms.has(className)) {
            handleError(`Classroom ${className} does not exist.`);
            return;
        }
        if (!state.classrooms.get(className).students.has(studentId)) {
            handleError(`Student ${studentId} is not enrolled in ${className}.`);
            return;
        }
        log(`Attendance marked for Student ${studentId} in ${className}.`);
    }
    static searchStudents(className) {
        if (!state.classrooms.has(className)) {
            handleError(`Classroom ${className} does not exist.`);
            return;
        }
        const students = Array.from(state.classrooms.get(className).students);
        log(`Students in ${className}: ${students.join(', ')}`);
    }
    static reportStatistics() {
        const numClassrooms = state.classrooms.size;
        const numStudents = state.students.size;
        const numAssignments = state.assignments.size;
        log(`Statistics: Classrooms: ${numClassrooms}, Students: ${numStudents}, Assignments: ${numAssignments}`);
    }
    static listAssignments(className) {
        if (!state.classrooms.has(className)) {
            handleError(`Classroom ${className} does not exist.`);
            return;
        }
        const assignments = Array.from(state.classrooms.get(className).assignments.entries());
        if (assignments.length === 0) {
            log(`No assignments scheduled for ${className}.`);
            return;
        }
        log(`Assignments for ${className}:`);
        assignments.forEach(([id, assignment]) => {
            log(`ID: ${id}, Details: ${assignment.details}`);
        });
    }
}
// Main loop
const handleInput = (input) => {
    const [command, ...args] = input.trim().split(' ');
    try {
        switch (command) {
            case 'add_classroom':
                ClassroomManager.addClassroom(args.join(' '));
                break;
            case 'add_student':
                ClassroomManager.addStudent(args[0], args[1]);
                break;
            case 'schedule_assignment':
                ClassroomManager.scheduleAssignment(args[0], args.slice(1).join(' '));
                break;
            case 'submit_assignment':
                ClassroomManager.submitAssignment(args[0], args[1], args[2], args.slice(3).join(' '));
                break;
            case 'mark_attendance':
                ClassroomManager.markAttendance(args[0], args[1]);
                break;
            case 'search_students':
                ClassroomManager.searchStudents(args[0]);
                break;
            case 'report_statistics':
                ClassroomManager.reportStatistics();
                break;
            case 'list_assignments':
                ClassroomManager.listAssignments(args[0]);
                break;
            default:
                handleError('Unknown command');
        }
    }
    catch (error) {
        if (error instanceof Error) {
            handleError(`An error occurred: ${error.message}`);
        }
        else {
            handleError('An unknown error occurred');
        }
    }
};
// Start the CLI
rl.on('line', handleInput);
