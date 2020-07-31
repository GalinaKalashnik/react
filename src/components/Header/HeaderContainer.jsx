import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {logout} from '../../redux/auth-reducer';

class HeaderContainer extends React.Component{
    // componentDidMount() {
    //     this.props.getAuthUserData();
    // }

    render () {
        return <Header {...this.props} />
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
})


//------------------- вмето этого вссего используем compose ------------------
//     //getAuthUserData это action creater из src/redux/auth-reducer.js
// export default connect(mapStateToProps, {getAuthUserData})(HeaderContainer);
//------------------- вмето этого вссего используем compose ------------------

export default connect(mapStateToProps, {logout})(HeaderContainer);