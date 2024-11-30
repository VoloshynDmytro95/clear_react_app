import { Link } from "react-router-dom";

const Manual = () => {
  return (
    <div className="flex flex-col h-screen">
      <Link to="/register" className="text-blue-500">
        {"<-"} Back
      </Link>
      <h2>Manual register</h2>
      <div>
        <input type="text" placeholder="Name" />
        <input type="text" placeholder="Email" />
        <input type="text" placeholder="Password" />
        <input type="text" placeholder="Confirm password" />
      </div>
    </div>
  );
};

export default Manual;