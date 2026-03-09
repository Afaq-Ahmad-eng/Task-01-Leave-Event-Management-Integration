# Task 01: Leave & Event Management Intergration

This is the first task of my internship at AptechMedia.

## Project Objective

Enhance the existing Office Management Website by developing Leave 
Management and Event Management modules and integrating them with the 
already implemented Attendance system. 

## Module 1: Leave Management System (Completed)
### Employee Side: 
   - [ ] Employee should be able to apply for leave.  
   - [ ] Required fields: 
       -  Leave Type (Casual / Sick / Emergency) 
       -  Start Date 
       -  End Date 
       -  Reason 
  - [ ] Proper validation must be implemented: 
       -  End date cannot be before start date. 
       -  Overlapping leave requests should not be allowed. 
### Admin Side: 
  - [ ] Admin should be able to: 
       -  View all leave requests. 
       -  Approve or reject requests. 
       -  Add optional remarks. 
### Attendance Integration: 
  - [ ] If leave is approved: 
       -  Automatically mark those dates as “Leave” in the existing attendance system. 
       -  Attendance for those dates should not be manually editable. 
  - [ ] If leave is rejected:
       -  No changes should be made to attendance.


## Author: 
  Afaq Ahmad
