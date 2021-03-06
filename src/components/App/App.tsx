import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import styles from './App.scss';
import {AboutPage, NotFoundPage} from '../Pages';
import Head from '../Head';
import ConferencePage from '../ConferencePage';
import ConferenceNewPage from '../ConferenceNewPage';

export default function App() {
  return (
    <div className={styles.App}>
      <Head />
      <div>
        <Switch>
          <Route path="/pages/:page" component={renderPages} />
          <Route path="/conferences/new" component={ConferenceNewPage} />
          <Route path="/cfp/:topic/:country" render={renderCFP} />
          <Route path="/cfp/:topic/" render={renderCFP} />
          <Route path="/cfp" render={renderCFP} />
          <Route path="/:year/:topic/:country" render={redirect} />
          <Route path="/:topic/:country" render={redirectOrRender} />
          <Route path="/:topic" component={ConferencePage} />
          <Route exact path="/" component={ConferencePage} />
          <Route component={ConferencePage} />
        </Switch>
      </div>
    </div>
  );
}
function renderCFP({match}: any) {
  return <ConferencePage match={match} showCFP />;
}

function renderPages({match}: any) {
  switch(match.params.page) {
    case 'about':
    return <AboutPage />;
  }
  return <NotFoundPage />;
}

function redirect(props: any) {
  const {topic, country} = props.match.params;

  return <Redirect to={`/${topic}/${country}`} />;
}

/*
  Old routes were /:year/:topic and now is /:topic/:country
  If we detect that :topic is a year, the user actually wanted to reach
  the new route /:topic
*/
function redirectOrRender(props: any) {
  const {topic, country} = props.match.params;

  if (isYear(topic)) {
    return <Redirect to={`/${country}`} />;
  } else {
    return <ConferencePage {...props} fallback={redirectToTopic} />;
  }
}

function isYear(year: string) {
  return (year.length === 4 && !isNaN(parseInt(year, 10)));
}

function redirectToTopic(topic: string) {
  return <Redirect to={`/${topic}`} />;
}
