import "./App.css";
import Header from "./Header";
import Connect_Footer from "./components/Connect_Footer";
import Connect from "./components/Connect";

function ConnectPage() {
  return (
    <div className="app-container">
      <Header />
      <Connect />
      <Connect_Footer />
    </div>
  );
}

export default ConnectPage;
