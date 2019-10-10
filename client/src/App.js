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
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import SecuredArea from "./components/SecuredArea";
import SecuredRoute from "./components/SecuredRoute";

const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);

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
            <SecuredRoute path="/area51" component={SecuredArea}/>
            <Route path="/signIn" component={ UserSignInWithContext } />
            <Route path="/signUp" component={UserSignUpWithContext} />
          </Switch>

        </div>
      </BrowserRouter>
    );
  }
}
export default App;
