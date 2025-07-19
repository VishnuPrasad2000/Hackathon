import Dashboard from "layouts/dashboard";
import PhoneNumberIndex from "layouts/Phone_Number";
import Assistant from "layouts/billing";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import CallLogIndex from "layouts/Calllog";
import { IoIosDocument } from "react-icons/io";
import { BsFillPersonFill } from "react-icons/bs";
import { BsCreditCardFill } from "react-icons/bs";
import { IoStatsChart } from "react-icons/io5";
import { IoHome,IoMegaphone } from "react-icons/io5";
import callDetails from "layouts/Calllog/callDetails";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <IoHome size="15px" color="inherit" />,
    component: Dashboard,
    noCollapse: true,
  },
  //   {
  //   type: "collapse",
  //   name: "test",
  //   key: "test",
  //   route: "/call Information",
  //   icon: <IoHome size="15px" color="inherit" />,
  //   component: callDetails,
  //   noCollapse: true,
  // },
  {
    type: "collapse",
    name: "Call Log",
    key: "Call Log",
    route: "/calllog",
    icon: <IoMegaphone size="15px" color="inherit" />,
    component: CallLogIndex,
    noCollapse: true,
  },
  {
    name: "Call Detail",
    key: "CallLogDetail",
    route: "/call-log/:id",
    component: callDetails,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Phone Number",
    key: "phonenumber",
    route: "/phonenumber",
    icon: <IoStatsChart size="15px" color="inherit" />,
    component: PhoneNumberIndex,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Assistant",
    key: "assistant",
    route: "/assistant",
    icon: <BsCreditCardFill size="15px" color="inherit" />,
    component: Assistant,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    route: "/profile",
    icon: <BsFillPersonFill size="15px" color="inherit" />,
    component: Profile,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Sign Out",
    key: "sign-out",
    route: "/authentication/sign-in",
    icon: <IoIosDocument size="15px" color="inherit" />,
    component: SignIn,
    noCollapse: true,
  }
];

export default routes;
