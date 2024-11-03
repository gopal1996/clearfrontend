import { NavBar } from "@/components/common/nav-bar/nav-bar";
import classes from "./challenge.module.scss";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={classes.bodyWrapper}>
      <NavBar />
      <div className={classes.bodyContent}>{children}</div>
    </div>
  );
}
