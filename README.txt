# Movie Mood

Movie Mood is a web application that suggests movies to users based on their prompts using keywords. It utilizes the Open Movie Database API (OMDB) and the Rapid API IMDb API to generate movie data. This readme file provides instructions on how to run the application on your local machine and contribute to its development.

## Getting Started

To run the Movie Mood application on your local machine, please follow the steps below:

### Prerequisites

- Node.js and npm (Node Package Manager) should be installed on your machine.

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
   npm run seed
   ```

4. Start the server by running the following command:
   ```
   npm start
   ```

   The backend server should now be running on `http://localhost:3001`.

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
