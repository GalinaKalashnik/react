import React from 'react';
import s from "../common/FormControls/FormControls.module.css";
import {reduxForm, Field} from "redux-form";
import {createField, Input} from "../common/FormControls/FormControls";
import {required} from "../../utils/validators/validators";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";

//что  б ы в коде не писать props.handleSubmit  props.error используем деструктуризацию
//вместо
// const LoginForm = (props) => {
//пишем {handleSubmit, error}
const LoginForm = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField("Email", "email", [required], Input)}
            {createField("Password", "password", [required], Input, {type: "password"})}
            {createField("Email", "email", [], Input, {type: "checkbox"}, "Remember me")}
            {console.log(captchaUrl)}
            {captchaUrl &&
                <div>
                    <img src={captchaUrl}/>
                    {createField("Captcha", "captcha", [required], Input)}
                </div>
                }
            {/*error появляется в проспах благодаря stopSubmit('login', {_error: 'Email or password is wrong'}); из src/redux/auth-reducer.js*/}
            { error && <div className={s.formSummaryError}>{error}</div> }
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
    }

    if(props.isAuth) {
        return <Redirect to={"/profile"} />
    }
    return (
        <div>
            <h1 className={s.login}>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})

//{login} ccылка на санккриетер из src/redux/auth-reducer.js
export default connect(mapStateToProps, {login} )(Login);