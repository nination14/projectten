import React, { Component } from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import "./App.css";
import withContext from './Context';
import Header from "./components/Header";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";

const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
class App extends Component {



  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/" render={ props => <Header title="Courses" {...props} />}/>
            <Route path="/courses/new" render={ props => <Header title="New Course" {...props} />}/>
            <Route path="/courses/:id" render={ props => <Header title="Course Detail" {...props} />}/>
            <Route path="/" render={ props => <Header title="Adventures in Limbo" {...props} />}/>
          </Switch>
          <Switch>
            <Route exact path="/" component={CoursesWithContext} />
            <Route path="/courses/:id" component={CourseDetailWithContext} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
