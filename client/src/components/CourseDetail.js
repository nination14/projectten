import React, { Component } from 'react'; 
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';

export default class CourseDetail extends Component {
  
    state = {
        course: {
            User: {
                firstName: 'Unknown',
                lastName: 'Author'
            }
        }
    }

    async componentDidMount() {
        const id = this.props.match.params.id;
        const course = await this.props.context.data.getCourse(id);   
        this.setState({course});
    }
    
    async deleteCourse() {
        const id = this.props.match.params.id;
        await this.props.context.deleteCourse(id);   //ToDo Fix ths
    }    
  
  
    render() {
        const course = this.state.course;
        return (
            <div>
            <div className="actions--bar">
            <div className="bounds">
                <div className="grid-100">
                    <span>
                        <Link className="button" to={`/courses/${course.id}/update`}>Update Course</Link>
                        <Link className="button" onClick={() => this.deleteCourse()} to='/' >Delete Course</Link>

                    </span>
                    <Link className="button button-secondary" to="/">Return to List</Link>
                </div>
            </div>
            </div>
            <div className="bounds course--detail">
            <div className="grid-66">
                <div className="course--header">
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">{course.title}</h3>
                <p>By {course.User.firstName} { course.User.lastName }</p>
                </div>
                <div className="course--description">
                    <ReactMarkdown>
                    { course.description }
                    </ReactMarkdown>
                </div>
            </div>
            <div className="grid-25 grid-right">
                <div className="course--stats">
                <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <h3>{ course.estimatedTime }</h3>
                    </li>
                    <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                        <ReactMarkdown>
                        { course.materialsNeeded }
                        </ReactMarkdown>
                    </li>
                </ul>
                </div>
            </div>
            </div>
        </div>
        );  
   }  
}
