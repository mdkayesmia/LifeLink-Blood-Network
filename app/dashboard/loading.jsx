export default function Loading() {
  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <div style={styles.spinner}></div>
        <div style={styles.glow}></div>
        <p style={styles.text}>Loading your dashboard</p>
        <p style={styles.subText}>Please wait...</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "radial-gradient(circle at top, #0f172a, #020617)",
  },

  wrapper: {
    textAlign: "center",
    position: "relative",
  },

  spinner: {
    width: "90px",
    height: "90px",
    borderRadius: "50%",
    border: "6px solid rgba(255,255,255,0.08)",
    borderTop: "6px solid #38bdf8",
    borderRight: "6px solid #a78bfa",
    animation: "spin 1s linear infinite",
    margin: "0 auto",
  },

  glow: {
    position: "absolute",
    top: "10px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "90px",
    height: "90px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(56,189,248,0.25), transparent 70%)",
    animation: "pulse 1.5s ease-in-out infinite",
    filter: "blur(8px)",
    zIndex: -1,
  },

  text: {
    marginTop: "20px",
    color: "#e2e8f0",
    fontSize: "18px",
    fontWeight: "500",
  },

  subText: {
    color: "#94a3b8",
    fontSize: "13px",
    marginTop: "5px",
  },
};