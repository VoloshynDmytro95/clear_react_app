import { VosSelect } from "@/components/VosSelect/VosSelect";
import { Link } from "react-router-dom";
import Subtitle from "@/components/GeneralComponents/Subtitle";

const Manual = () => {
  return (
    <div className="flex flex-col h-screen">
      <Link to="/register" className="text-blue-500">
        {"<-"} Back
      </Link>
      <Subtitle>Текст підзаголовка</Subtitle>{" "}
      <div>
        <input type="text" placeholder="Name" />
        <input type="text" placeholder="Email" />
        <input type="text" placeholder="Password" />
        <input type="text" placeholder="Confirm password" />
      </div>
      <VosSelect />
    </div>
  );
};

export default Manual;
