
This project is a resume builder designed to generate tailored resumes by combining user-provided experience and job descriptions. Users can input their experience either through unstructured text or structured fields. They can also supply a specific job description. Both inputs are used to generate resumes through prompts.

The system supports versioning of work experiences—each time a user saves their experience, a new version is created. Resumes can be generated based on specific versions of both job descriptions and experiences. Each resume generation references the exact source version it was built from.

The goal is to develop a React prototype that visually represents this system.


How It Works (Simple Steps):
Input Experience

User types experience (free text or structured fields).

Each time user saves, it creates a new version.

Input Job Description

User adds the job description they are applying for.

Each job description is saved as a separate entry.

Generate Resume

The system combines a selected experience version and job description to create a resume.

Each resume is linked to the source experience version and job description.