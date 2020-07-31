import React from 'react';
import {reduxForm, Field} from "redux-form";
import {Textarea} from "../common/FormControls/FormControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";

const maxLength100 = maxLengthCreator(100);

const AddMessageForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name="newMessagesBody"
                       placeholder="Enter Message"
                       component={Textarea}
                       validate={[required, maxLength100]} />
            </div>
            <div>
                <button>Send Message</button>
            </div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm({
    form: 'dialogAddMessageForm'
})(AddMessageForm)

export default AddMessageFormRedux;