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
import UserSignOut  from "./components/UserSignOut";
import SecuredArea from "./components/SecuredArea";
import PrivateRoute from "./components/PrivateRoute";
import UpdateCourse from "./components/UpdateCourse";
import CreateCourse from "./components/CreateCourse";

const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignOutWithContext = withContext(UserSignOut); 
const HeaderWithContext = withContext(Header);
const UpdateCourseWithContext = withContext(UpdateCourse);


class App extends Component {



  render() {
    return (
      <BrowserRouter>
        <div>
          <HeaderWithContext />
          <Switch>
            {/* <Route exact path="/" render={ props => <Header title="Courses" {...props} />}/> */}
            {/* <Route path="/courses/new" render={ props => <Header title="New Course" {...props} />}/>
            <Route path="/courses/:id" render={ props => <Header title="Course Detail" {...props} />}/> */}
            {/* <Route path="/" render={ props => <Header title="Adventures in Limbo" {...props} />}/> */}
            <PrivateRoute path="/courses/:id/update" component={UpdateCourseWithContext} />
            <PrivateRoute path="/courses/create" component={CreateCourseWithContext} />

          </Switch>
          <Switch>
            <Route exact path="/" component={CoursesWithContext} />
            <Route path="/courses/:id" component={CourseDetailWithContext} />
            <PrivateRoute path="/area51" component={SecuredArea}/>
            <Route path="/signIn" component={ UserSignInWithContext } />
            <Route path="/signUp" component={UserSignUpWithContext} />
            <Route path="/signOut" component={UserSignOutWithContext} />
            
          </Switch>

        </div>
      </BrowserRouter>
    );
  }
}
export default App;
