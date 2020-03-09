import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { CardsContext } from "../../DataStore/CardsContext";
import { HeroContext } from "../../DataStore/HeroContext";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component='div'
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

export function CastSelect(props) {
  const [value, setValue] = useState(0);
  const [hero, setHero] = useContext(HeroContext);
  const { pageCount, page, setPage, settings, setSettings } = useContext(
    CardsContext
  );
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper
    }
  }));
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const heroList = [
    "Rogue",
    "Druid",
    "Warrior",
    "Paladin",
    "Warlock",
    "Mage",
    "Priest",
    "Shaman",
    "Hunter"
  ];

  const HeroTabs = () => {
    return heroList
      .filter((heroElement) => heroElement === hero)
      .map((chosenHero) => (
        <Tab
          onClick={() => {
            console.log("click");
            setSettings({ ...settings, class: chosenHero.toLowerCase() });
          }}
          label={chosenHero}
          {...a11yProps(0)}
        />
      ));
  };

  return (
    <div className={classes.root}>
      <AppBar position='static' id='back-to-top-anchor'>
        <Tabs
          onChange={handleChange}
          value={value}
          variant='scrollable'
          scrollButtons='auto'
          aria-label='simple tabs example'
        >
          <Tab
            onClick={() => setSettings({ ...settings, class: "neutral" })}
            label='Neutral'
            {...a11yProps(0)}
          />
          <HeroTabs />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} />
      <TabPanel value={value} index={1} />
      <div>
        <Button
          style={{ float: "left" }}
          onClick={() => {
            if (page <= 1) setPage(pageCount);
            else setPage(page - 1);
          }}
          variant='outlined'
          color='primary'
        >
          Previous Page
        </Button>

        <Button
          style={{ float: "right" }}
          variant='outlined'
          color='primary'
          onClick={() => {
            if (page >= pageCount) setPage(1);
            else setPage(page + 1);
          }}
        >
          Next Page
        </Button>
      </div>
    </div>
  );
}
