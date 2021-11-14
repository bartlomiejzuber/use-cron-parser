import { useCronParser } from 'use-cron-parser'
import "./App.css";

function App() {
  const cronExpression = "10 * * * *";
  const generator = useCronParser(cronExpression);

  return (
    <div className="App">
      <div>{cronExpression}</div>
      <div>{generator.next()}</div>
    </div>
  );
}

export default App;
