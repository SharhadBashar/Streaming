import React from 'react';
import Modal from '../Modal';
import history from '../../History';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchStream, deleteStream} from '../../Actions';

class StreamDelete extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    onSubmit = () => {
        
    }
    renderActions() {
        return (
            //Can re write react.fragment as <> </>
            <React.Fragment>
                <Link to = '/' className = "ui button">Cancel</Link>
                <button 
                    className = "ui primary negative button" 
                    onClick = {() => {this.props.deleteStream(this.props.match.params.id)}}
                >
                    Delete
                </button>
            </React.Fragment>
        );
    }
    renderContent() {
        if (!this.props.stream) {
            return "";
        }
        return this.props.stream.title;
    }
    render() {
        return (
            <Modal
                title = "Delete Stream"
                content = {`Are you sure you want to delete Stream: ${this.renderContent()}?`}
                actions = {this.renderActions()}
                onDismiss = {() => history.push('/')}
            /> 
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {stream: state.streams[ownProps.match.params.id]}
};

export default connect(mapStateToProps, {
    fetchStream: fetchStream,
    deleteStream: deleteStream
})(StreamDelete);