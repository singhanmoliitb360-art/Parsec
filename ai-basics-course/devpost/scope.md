---
status: draft
---

# Scope

## Problem
Solo creators often have strong ideas but not enough time, skill overlap, or network to turn those ideas into working projects. They may struggle to find collaborators who are actually a fit, not just interested in the concept.

## Goal
Create a simple web app that helps a creator quickly identify contributors who are a good match for a project based on skills, interests, and availability.

## Core User Need
A creator should be able to post a project idea and immediately see people who are likely to be a good fit, so they can connect and collaborate without manually searching through a large pool of strangers.

## User Stories
- As a creator, I want to post a project idea so that I can attract contributors.
- As a creator, I want to list the skills and interests needed for the project so that matching is meaningful.
- As a contributor, I want to create a profile with my skills and interests so that I can be discovered.
- As a creator, I want to see matched contributors and the reason they fit so that I can quickly decide who to contact.
- As a contributor, I want to view project details so that I can decide if I’m interested in joining.

## MVP Features
- Creator account
- Contributor account
- Project creation form
  - project title
  - short description
  - required skills
  - interests or tags
- Contributor profile
  - name
  - skills
  - interests
  - availability
  - short bio
- Matching logic based on skill and interest overlap
- Match results screen showing:
  - contributor name
  - matched skills
  - matched interests
  - confidence / fit reason
- Ability for the creator to view a contributor profile
- Ability for the creator to contact or invite a contributor

## Out of Scope for This Version
- Real-time chat
- Payment and revenue sharing
- Ownership calculations
- Full project management dashboards
- AI-generated project breakdowns
- Complex recommendation systems
- Full social networking features

## Success Criteria
The first version is successful if a creator can:
1. create a project idea,
2. define the skills and interests needed,
3. see a list of likely collaborators,
4. understand why they match,
5. decide who to contact without needing a large marketplace or complex workflow.

## Decision
This is a focused proof-of-concept: a simple web app that proves the core matching experience works for creators and contributors.