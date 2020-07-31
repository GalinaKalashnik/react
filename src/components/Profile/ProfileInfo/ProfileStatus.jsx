import React from 'react';

class ProfileStatus extends React.Component {
    //локальный стейт
    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        //setState асинхронен поэтому запустив console.log(this.state.editMode)
        //перед и после this.setState мы в обоих случаях получим false
        this.setState( {
            editMode: true
        })
    }

    deactivateEditMode = () => {
        this.setState( {
            editMode: false
        })

        this.props.updateStatus(this.state.status)
    }

    onStatusChange = (e) => {
        this.setState( {
            status: e.currentTarget.value
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.status !== this.props.status) {
            this.setState( {
                status: this.props.status
            })
        }
    }

    render() {
        return (
            <div>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={ this.activateEditMode }>{this.props.status || "-----"}</span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input onChange={this.onStatusChange} autoFocus={true} onBlur={ this.deactivateEditMode } value={this.state.status}/>
                    </div>
                }
            </div>
        )
    }
}
export default ProfileStatus;