function RequestRoute() {
  return (
    <div>
      <h2>Request Route Change</h2>

      <label>Current Route</label>
      <input value="Erode – College" disabled />

      <label>Requested Route</label>
      <select>
        <option>Gobi – College</option>
        <option>Tiruppur – College</option>
      </select>

      <label>Reason</label>
      <textarea />

      <button>Submit Request</button>
    </div>
  );
}

export default RequestRoute;
