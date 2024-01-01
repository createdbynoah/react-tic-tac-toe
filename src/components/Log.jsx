export default function Log({ turns }) {
  return (
    <ol id="log">
      {turns.map((turn, index) => {
        return (
          <li
            key={index}
          >{`Player ${turn.player} played at row ${turn.position[0]} and column ${turn.position[1]}`}</li>
        );
      })}
    </ol>
  );
}
