import {
  AppBar,
  Box,
  Button,
  Drawer,
  Hidden,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useNavStyles } from "../Styles/useStyles";
import { menuTabs } from "./consts";
import { ReactComponent as LogoIcon } from "./assets/logo.svg";
import MenuIcon from "@material-ui/icons/Menu";

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
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue || 0);
    menuTabs[newValue]?.url && history.push(menuTabs[newValue].url);
  };
  const mobileredirectHandler = (newValue: number) => {
    history.push(menuTabs[newValue].url);
    drawerHandler();
  };
  React.useEffect(() => {
    menuTabs.forEach((x, index) => {
      x?.url === "/" + location.pathname.split("/")[1] && setValue(index);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const drawerHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Hidden mdUp>
        <>
          <Button
            style={{
              position: "fixed",
              left: 15,
              top: 10,
              backgroundColor: "#FE7B12",
              zIndex: 99,
              color: "#FFF",
            }}
            onClick={drawerHandler}
          >
            <MenuIcon />
          </Button>
          <Drawer open={isOpen} onClose={drawerHandler}>
            <Box marginY={2} marginX={0.5}>
              <Typography component="h6" className={navClasses.navItem}>
                Аккаунт
              </Typography>
              <Typography
                onClick={() => {
                  mobileredirectHandler(2);
                }}
                component="h6"
                className={navClasses.navItem}
              >
                Аналитика
              </Typography>
              <Typography
                onClick={() => {
                  mobileredirectHandler(1);
                }}
                component="h6"
                className={navClasses.navItem}
              >
                Галерея
              </Typography>
              <Typography
                onClick={() => {
                  mobileredirectHandler(0);
                }}
                component="h6"
                className={navClasses.navItem}
              >
                Добавить работу
              </Typography>
            </Box>
          </Drawer>
        </>
      </Hidden>
      <Hidden xsDown>
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
            </div>
          </Toolbar>
        </AppBar>
      </Hidden>
    </>
  );
};

export default TopBar;
