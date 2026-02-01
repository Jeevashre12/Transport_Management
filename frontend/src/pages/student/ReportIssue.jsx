function ReportIssue() {
  return (
    <div>
      <h2>Report Issue</h2>

      <select>
        <option>Bus Delay</option>
        <option>Overcrowding</option>
        <option>Bus Condition</option>
      </select>

      <textarea placeholder="Describe the issue" />

      <button>Submit Issue</button>
    </div>
  );
}

export default ReportIssue;
