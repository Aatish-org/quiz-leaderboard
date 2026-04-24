# Quiz Leaderboard System - Internship Assignment

This project is a solution for the backend integration challenge. It's a Node.js application that polls a quiz API, processes the data to handle duplicates, aggregates scores, and submits a final, sorted leaderboard.

---

## Features

- **API Polling:** Systematically polls the `/quiz/messages` endpoint 10 times with a 5-second delay between each call.
- **Data Deduplication:** Correctly handles duplicate score entries by using a unique key (`roundId` + `participant`).
- **Score Aggregation:** Accurately calculates the total score for each participant.
- **Leaderboard Generation:** Creates a leaderboard sorted in descending order of scores.
- **Automated Submission:** Submits the final leaderboard to the `/quiz/submit` endpoint for validation.
- **Modular Code Structure:** The code is organized into separate modules for configuration, API services, and main business logic for maintainability and clarity.

---

## Project Structure

```
.
├── apiService.js   # Handles all external API communication
├── config.js       # Stores configuration constants (URLs, REG_NO)
├── index.js        # Main entry point and orchestration logic
├── package.json    # Project dependencies and scripts
└── README.md       # This file
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

---

## Getting Started

Follow these steps to set up and run the project on your local machine.

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install Dependencies

Install the necessary libraries (like `axios`) by running:

```bash
npm install
```

### 3. Run the Application

Execute the main script to start the process:

```bash
node index.js
```

The script will log its progress through each phase, from polling the API to submitting the final result, and will print the server's response upon completion.

---
