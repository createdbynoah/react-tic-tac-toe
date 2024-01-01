# Tic Tac Toe

This is a simple implementation of the classic game Tic Tac Toe, built with React.

## Project Structure

```
07-tic-tac-toe/
    .gitignore
    index.html
    package.json
    public/
    src/
        App.jsx
        assets/
        components/
        index.css
        index.jsx
    vite.config.js
```

## Installation

To install the dependencies, run the following command:

```
npm install
```

## Running the Application

To start the application, run the following command:

```
npm run dev
```

The application will start and can be accessed at `http://localhost:5175`.

## Game Rules

The game is played on a grid that's 3 squares by 3 squares. You are X, your friend (or the computer in this case) is O. Players take turns putting their marks in empty squares. The first player to get 3 of her marks in a row (up, down, across, or diagonally) is the winner. When all 9 squares are full, the game is over.

## Components

- `Player`: Displays the current player.
- `GameBoard`: Renders the game board and handles the game logic.
- `Log`: Displays the game log.
- `GameOver`: Displays the game over message.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
