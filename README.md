# Movie Mood

Movie Mood is a web application that suggests movies to users based on their prompts using keywords. It utilizes the Open Movie Database API (OMDB) and the Rapid API IMDb API to generate movie data. This readme file provides instructions on how to run the application on your local machine and contribute to its development.

## Product Description

Movie Mood aims to alleviate the decision fatigue that comes with choosing a movie to watch. Users can select a mood and a genre, and the application will suggest a movie based on their selections. Users can also search for movies by director/year/runtime and more!

## Technologies Used

Movie Mood is built using the following technologies:

Frontend:
- TypeScript
- React.js for user interface
- React Router for routing

Backend:
- Node.js and Express.js for server
- PostgreSQL and pg for database
- Knex for ORM

## Getting Started

To run the Movie Mood application on your local machine, please follow the steps below:

### Prerequisites

- Node.js and npm (Node Package Manager) should be installed on your machine.
- Clone the repository to your local machine.

### Backend Setup

1. Open your terminal and navigate to the `mm_back` directory.
   ```
   cd mm_back
   ```

2. Install the required dependencies by running the following command:
   ```
   npm install
   ```

3. Once the installation is complete, seed the database with movie data by running:
   ```
   npm run devSeed
   ```

4. Start the server by running the following command:
   ```
   npm dev
   ```

   The backend server should now be running on `http://localhost:8000`.

### Frontend Setup

1. Open another terminal window and navigate to the `mm_front` directory.
   ```
   cd mm_front
   ```

2. Install the required dependencies by running the following command:
   ```
   npm install
   ```

3. Start the frontend development server by running: 
   ```
   npm start
   ```

   The Movie Mood application should now be running on `http://localhost:3000` in your browser.

4. You would then have to change the fetch request in the Main.tsx file to `http://localhost:8000` to connect to the your local backend server.

## Usage

Once the app is open you will find instructions in the "How to Use" section.

## Configuration

You will have to create your own `.env` file in the `mm_back` directory and add the following environment variables:

DB_USER,
DB_NAME,

These will be used to connect to your local database.

## Contributing

We welcome and appreciate contributions to Movie Mood! If you would like to contribute, please follow these steps:

1. Fork the repository on GitHub.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with descriptive commit messages.
4. Push your changes to your forked repository.
5. Submit a pull request, explaining your changes and their purpose.

## API Keys

To successfully seed the data, you will need to obtain API keys for the OMDB API and the Rapid API IMDb API. Please refer to their respective documentation to obtain the necessary API keys.

Thank you for your interest in Movie Mood! We look forward to your contributions.

**Note:** Remember to keep your API keys secure and avoid sharing them publicly.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.
