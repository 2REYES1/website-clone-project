# Alyssa Press Project

## Introduction

Hello! I am Alyssa, a fourth-year Computer Science major at the University of California, Irvine (UCI). My interests are strongly rooted in front-end development and machine learning.

When I'm not diving deep into code, you'll likely find me on a basketball court or golf course! Both sports offer a perfect balance to technology-heavy days, allowing me to stay active and mentally refreshed. Besides this, I also love exploring new hobbies or skills. I find challenges like this very addicting.

## Features Implemented

### 1. Stacked Books (Main Page)
- Links to Book Covers & Descriptions Page based on the book the user clicks.
- On mouse hold, the other books separate, allowing the user to see quick information about the book they are holding down on.

### 2. Book Covers & Descriptions Page
- 3D model book that moves.
- User is able to hold and rotate the 3D book as they wish.
- Dynamically changes to the dominant color of the book selected.
- Book title and description displayed.
- Button to buy the book (not linked).
- Opens up to the desired book based on the book selected from the Stacked Books page or the Sidebar.

### 3. Sidebar
- Links to Book Covers & Descriptions Page based on the book the user clicks.
- Animation to expand sidebar tabs when hovering.
- Animation to expand the current hovered tab the longest.
- Shows a back button when on the Book Covers & Descriptions Page (not shown on the Stacked Books page).

### 4. Book Logo at the Top Left
- 3D model book that moves.
- User is able to hold and rotate the 3D book as they wish.
- Links to Stacked Books page.

### 5. Implemented Vite within Next.js
- Main React project folder “alyssa-press” is a Next.js React project.
- The folder “ui-library” within it is a Vite React project.
- Used `3DBook.tsx` component from the Vite “ui-library.”

## Time Spent and Challenges

### Time Spent
- Roughly **24 hours** spent on the project.
- A lot of time was dedicated to reading documentation and familiarizing myself with new technologies.

### Challenges
- **Implementing Vite within Next.js**: From research, I learned Vite and Next.js are not commonly used together because Next.js has its own optimized build system, so it doesn’t need Vite.
- **Implementing 3D Model**: Encountered compatibility issues with `@react-three/fiber` in Next.js version 15 and React version 19.
- **Deployment**: The production build used in deployment did not function the same as the development build. This highlighted the importance of testing the deployment early.

## Lessons Learned & What I Gained

- **Test Deployment Early**: One main takeaway from this project is to test the deployment early. As mentioned, the production build on the deployment server didn’t function the same as the development build, leading to issues with routing and linking that weren’t apparent until deployment. Due to time constraints, I couldn’t resolve some of these hidden bugs.
  
- **Better Planning**: Another lesson learned is the importance of better planning. Researching the dependencies or node packages beforehand would have saved me time and prevented compatibility issues. You can also see in my many branches where I messed up!

- **Experience with New Technologies**: Despite the challenges, I gained valuable knowledge and experience from the technologies I used:
    - **Windsurf & AI Compatibilities**: This allowed me to quickly learn and implement new features, including working with the `three.js` and `node-vibrant` packages.
    - **First Time Deploying to Firebase**: I have primarily deployed using AWS or GitHub Pages, so learning the basics of Firebase was an exciting new experience.
    - **TailwindCSS**: This was my first time using TailwindCSS. While I'm more familiar with Bootstrap in past projects, I found TailwindCSS much more flexible, which allowed me to create a custom design with more control.
