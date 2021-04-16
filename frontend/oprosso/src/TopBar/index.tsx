import { AppBar, Box, Tab, Tabs, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useNavStyles } from "../Styles/useStyles";
import { menuTabs } from "./consts";
import { ReactComponent as LogoIcon } from "./assets/logo.svg";

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const TopBar = () => {
  const navClasses = useNavStyles();
  const history = useHistory();
  const [value, setValue] = React.useState<number>();
  const location = useLocation();
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue || 0);
    menuTabs[newValue]?.url && history.push(menuTabs[newValue].url);
  };
  React.useEffect(() => {
    menuTabs.forEach((x, index) => {
      x?.url === "/" + location.pathname.split("/")[1] && setValue(index);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <AppBar position="static" className={navClasses.appBar}>
        <Toolbar>
          <div className={navClasses.contentWrapper}>
            <Box display="flex">
              <LogoIcon />
              <Typography component="h6" className={navClasses.name}>
                Oprosso
              </Typography>
            </Box>
            <Tabs
              className={navClasses.tabsWrapper}
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
            >
              {menuTabs.map((tab, index) => (
                <Tab
                  disabled={tab?.disabled}
                  label={
                    <Typography component="h6" className={navClasses.navItem}>
                      {tab.label}
                    </Typography>
                  }
                  {...a11yProps(index)}
                />
              ))}
            </Tabs>
            {/* <TabPanel value={value} index={0}>
              Item One
            </TabPanel>
            <TabPanel value={value} index={1}>
              Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
              Item Three
            </TabPanel> */}
            {/* <Box display="flex">
              <Typography component="h6" className={navClasses.navItem}>
                Аккаунт
              </Typography>
              <Typography component="h6" className={navClasses.navItem}>
                Аналитика
              </Typography>
              <Typography component="h6" className={navClasses.navItem}>
                Галерея
              </Typography>
              <Typography component="h6" className={navClasses.navItem}>
                Добавить работу
              </Typography>
            </Box> */}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default TopBar;
