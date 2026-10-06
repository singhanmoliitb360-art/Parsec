---
status: draft
---

# Technical Specification

## Recommended Build
Build the proof of concept as a simple browser-based web app using:
- HTML
- CSS
- JavaScript
- localStorage for persistent sample data

This is the simplest beginner-friendly way to validate the matching idea without needing a backend or database.

## Product Goal
To help a creator feel that an ambitious project is possible by showing likely collaborators who match both:
- the skills needed
- the interest in the project idea

## Architecture
### Frontend Only
The app will run entirely in the browser and use localStorage to simulate a small data layer.

### Data Stored in Browser
- projects
- contributor profiles
- matched connections

### Core Data Structures

#### User
- id
- name
- bio
- skills: string[]
- interests: string[]

#### Project
- id
- title
- description
- skills: string[]
- interests: string[]

#### Connection
- projectId
- userId

## User Flows
### Creator Flow
1. Create a project
2. Add required skills and interests
3. Select the project
4. Review match results
5. See fit score and overlap
6. Connect with a contributor

### Contributor Flow
1. Create a profile
2. Add skills and interests
3. Wait to be matched to a project
4. Be discoverable to creators

## Matching Logic
The app compares each project against each contributor profile using:
- shared skills
- shared interests

Suggested calculation:
- each shared skill adds weight
- each shared interest adds weight
- total points produce a fit percentage

Example:
- Skill match: 3/5
- Interest match: 2/3
- Final score: calculated as a percentage

This makes the result understandable, even without a complex recommendation engine.

## UI Layout
### Page 1: Project Creation
- title
- description
- needed skills
- project interests

### Page 2: Profile Creation
- name
- bio
- skills
- interests

### Page 3: Match Results
For each candidate:
- name
- skill overlap
- interest overlap
- fit percentage
- profile summary
- connect button

## MVP Features
- create project
- create contributor profile
- select a project
- match contributors to the selected project
- show a fit score
- connect/invite candidate

## Out of Scope
- user authentication
- backend API
- database storage
- messaging
- payments
- profit-sharing logic
- collaboration workflow tools

## Why this is the right fit
This approach keeps the project beginner-friendly and lets us validate the central concept quickly:
- creators can see if their idea is realistically buildable with the right people
- contributors can be discovered by skill and interest
- the app tests the core collaborative-match idea without a lot of infrastructure overhead

## Acceptance Criteria
The app is complete for MVP if:
- a creator can create a project
- a contributor can create a profile
- the app can rank candidates for a project
- the app shows a score based on skills and interest
- the creator can click “Connect” for a candidate
- the prototype demonstrates that project fit is visible and understandable

## Recommended Next Step
Move into implementation by building:
- project creation form
- profile form
- project match list
- simple score calculation
- connect button

This is the concrete technical direction for the prototype.