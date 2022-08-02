import { Outlet } from "react-router-dom";
import SettingsNavigation from "../components/user-settings/SettingsNavigation";

const SettingsPage = () => {
  return (
    <main className="main--alt">
      <div className="main--alt_sidebar">
        <SettingsNavigation />
      </div>
      <div className="main--alt_content">
        <Outlet />
      </div>
    </main>
  );
};

export default SettingsPage;
