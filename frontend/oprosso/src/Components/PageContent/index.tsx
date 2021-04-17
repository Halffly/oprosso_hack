import { Container } from "@material-ui/core";
import React from "react";
import { Route, Switch } from "react-router-dom";
import AnalyticsDetails from "../AnalyticsDetails";
import AnalyticsHome from "../AnalyticsHome";
import CreateScreen from "../CreateScreen";
import Gallery from "../Gallery";
import TestScreen from "../TestScreen";

const PageContent = () => {
  return (
    <Container maxWidth="lg">
      <main>
        <Switch>
          <Route path="/analytics/:id" exact>
            <AnalyticsDetails />
          </Route>
          <Route path="/test/:id" exact>
            <TestScreen />
          </Route>
          <Route path="/create" exact>
            <CreateScreen />
          </Route>
          <Route path="/analyticsHome" exact>
            <AnalyticsHome />
          </Route>
          <Route path="/" exact>
            <Gallery />
          </Route>
        </Switch>
      </main>
    </Container>
  );
};

export default PageContent;
