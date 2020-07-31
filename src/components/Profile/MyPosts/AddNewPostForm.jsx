import React from 'react';
import {reduxForm, Field} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormControls/FormControls";

const maxLength10 = maxLengthCreator(10);

const AddNewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name="newPostText"
                       placeholder="Enter Message"
                       component={Textarea}
                       validate={[required, maxLength10]} />
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm({
    form: 'profileAddNewPostForm'
})(AddNewPostForm)

export default AddMessageFormRedux;