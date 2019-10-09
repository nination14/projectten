import React from 'react';

function ErrorMessages (props){
    const errors = props.errors;
    const title = props.title || "Validation errors";

    return errors && errors.length > 0 ?
            (<div>
                <h2 className="validation--errors--label">{ title }</h2>
                <div className="validation-errors">
                    <ul>
                        { errors.map( (error, i) => <li key={i}>{ error }</li> ) }
                    </ul>
                </div>
            </div>)
        : null;
}

export default ErrorMessages;