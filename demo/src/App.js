import { useCronParser } from "use-cron-parser";
import { format } from "date-fns";
import "./App.css";

function App() {
  const cronExpression = "10 0 * * *";
  const generator = useCronParser(cronExpression);

  return (
    <div className="App">
      <div style={{ fontWeight: "bold" }}>Cron expression</div>
      <div style={{ marginBottom: 30 }}>{cronExpression}</div>
      <div>
        Next occurrence scheduled at{" "}
        {format(generator.next().value, "dd/MM/yyyy HH:mm:ss")}
      </div>
    </div>
  );
}

export default App;
