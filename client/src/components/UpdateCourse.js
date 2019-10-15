// import React, { Component } from 'react';

// export default class UpdateCourse extends Component {

//     state = {
//       title: '', 
//       description: '',
//       estimatedTime: '',
//       materialsNeeded: '', 
//       errors: []
//     }
  
//     // if the status of the data is 404, redirect to not found page.
//     //otherwise set the boxes with appropriate information
//     componentDidMount() {
//           this.props.context.data.getCourse(this.props.match.params.id)
//             .then(data => {
//               if (data.status === 404) {
//                 this.setState({ errors: [{ message: data.message }] });
//                 this.props.history.push('/notfound');
//               } else {
//                 this.setState({
//                     title: data.title,
//                     description: data.description,
//                     estimatedTime: data.estimatedTime,
//                     materialsNeeded: data.materialsNeeded,
//                     authorFirstName: data.User.firstName,
//                     authorLastName: data.User.lastName,
//                     errors: []
//                 });
//               }
  
//           //If the user is authenticated, update course, otherwise send to forbidden page
  
//           if (data) {
//             if (data.User.id === this.props.context.authenticatedUser.userId) {
//               document.title = "Updating Course";
//             } else {
//               this.props.history.push('/forbidden');
//             }
//           } else {
//             this.props.history.push('/notfound');
//           }
//         })
//         .catch(err => {
//           console.log(err);
//           this.props.history.push('/error');
//         })
//     }
  
//     change = (event) => {
//       const name = event.target.name;
//       const value = event.target.value;
  
//       this.setState(() => {
//         return {
//           [name]: value
//         };
//       });
//     }
  
//     submit = () => {
//       const { context } = this.props;
  
//       const {
//         userId,
//         emailAddress
//       } = context.authenticatedUser;
  
//       const {
//         title,
//         description,
//         estimatedTime,
//         materialsNeeded
//       } = this.state;
  
//       const course = {
//         userId,
//         title,
//         description,
//         estimatedTime,
//         materialsNeeded
//       };
  
//       const id = this.props.match.params.id;
//       // const password = prompt('Please confirm password.');
  
//       context.data.updateCourse(id, course, emailAddress, context.userPassword)
//         .then(errors => {
//           if (errors.length) {
//             this.setState({ errors });
//           } else {
//             this.props.history.push('/');
//           }
//         })
//         .catch((err) => {
//           console.log(err);
//           this.props.history.push('/error');
//         });
//     }
  
//     cancel = () => {
//       const id = this.props.match.params.id;
//       this.props.history.push(`/courses/${id}`);
//     }
  
//     render() {
  
//       const {
//         title,
//         description,
//         estimatedTime,
//         materialsNeeded,
//         errors,
//       } = this.state;
  
//       const {
//         firstName, 
//         lastName
//       } = this.props.context.authenticatedUser;
  
  
//       return (
//         <div className="bounds course--detail">
//           <h1>Update Course</h1>
//           <div>
//             <Form
//               cancel={this.cancel}
//               errors={errors}
//               submit={this.submit}
//               submitButtonText="Update Course"
//               elements={() => (
//                 <React.Fragment>
//                   <div className="grid-66">
//                     <div className="course--header">
//                       <h4 className="course--label">Course</h4>
//                       <div>
//                         <input 
//                           id="title" 
//                           name="title" 
//                           type="text" 
//                           className="input-title course--title--input" 
//                           placeholder="Course title..."
//                           value={title}
//                           onChange={this.change} />
//                       </div>
//                       <p>By {`${firstName} ${lastName}`}</p>
//                     </div>
//                     <div className="course--description">
//                       <div>
//                         <textarea 
//                           id="description" 
//                           name="description" 
//                           className="" 
//                           placeholder="Course description..." 
//                           value={description}
//                           onChange={this.change} />
//                       </div>
//                     </div>
//                   </div>
//                   <div className="grid-25 grid-right">
//                     <div className="course--stats">
//                       <ul className="course--stats--list">
//                         <li className="course--stats--list--item">
//                           <h4>Estimated Time</h4>
//                           <div>
//                             <input 
//                               id="estimatedTime" name="estimatedTime" 
//                               type="text" className="course--time--input"
//                               placeholder="Hours" 
//                               value={estimatedTime}
//                               onChange={this.change} />
//                           </div>
//                         </li>
//                         <li className="course--stats--list--item">
//                           <h4>Materials Needed</h4>
//                           <div>
//                             <textarea 
//                               id="materialsNeeded" name="materialsNeeded" 
//                               className="" 
//                               placeholder="List materials..." 
//                               value={materialsNeeded}
//                               onChange={this.change} />
//                           </div>
//                         </li>
//                       </ul>
//                     </div>
//                   </div>
//                 </React.Fragment>
//             )} />
//           </div>
//         </div>
//       );
//     }
//   }