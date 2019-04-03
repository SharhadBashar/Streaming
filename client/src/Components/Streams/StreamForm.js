import React from 'react';
import {Field, reduxForm} from 'redux-form';

class StreamForm extends React.Component{
    renderInput = ({input, label, meta}) => {
        const className = `field ${meta.touched && meta.error ? 'error' : ''}`
        return (
            <div className = {className}>
                <label>{label}</label>
                <input {...input} autoComplete = "off"/>
                {this.renderError(meta)}
            </div>
            
        );
    };

    renderError({error, touched}) {
        if (touched && error) {
            return (
                <div className = "ui error message">
                    <div className = "header">{error}</div>
                </div>
            );
        }
    }

    onSubmit = (formValues) => {
        this.props.onSubmit(formValues);
    }

    render() {
        return (
            <form onSubmit = {this.props.handleSubmit(this.onSubmit)} className = "ui form error">
                <Field name = "title" component={this.renderInput} label = "Title"/>
                <Field name = "desc" component={this.renderInput} label = "Description"/>
                <button className = "ui button primary">Submit</button>
            </form>
        );
    }
}

const validate = (formValues) => {
    const errors = {};
    if (!formValues.title) {
        errors.title ='Please enter a title';
    }
    if (!formValues.desc) {
        errors.desc ='Please enter a description';
    }
    return errors;
};

export default reduxForm({
    form: 'form',
    validate: validate
})(StreamForm);