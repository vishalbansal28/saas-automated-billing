import { Typography } from "antd";
import "./AppFooter.css"; // Import the CSS file

function AppFooter() {
  return (
    <div className="AppFooter">
      <Typography.Link className="footerLink" href="">LinkedIn</Typography.Link>
      <Typography.Link className="footerLink" href="https://www.google.com" target="_blank">
        @vishalbansal2024
      </Typography.Link>
      <Typography.Link className="footerLink" href="https://www.google.com" target="_blank">
        My Resume
      </Typography.Link>
    </div>
  );
}
export default AppFooter;
