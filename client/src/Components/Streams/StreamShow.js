import React from 'react';
import {connect} from 'react-redux';
import flv from 'flv.js';
import {fetchStream} from '../../Actions';


class StreamShow extends React.Component {
    constructor(props) {
        super(props);
        this.videoRef = React.createRef();
    }
    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.fetchStream(id);
        this.buildPlayer(id);
    }
    componentDidUpdate() {
        this.buildPlayer(this.props.match.params.id)
    }
    componentWillUnmount() {
        this.player.destroy();
    }

    buildPlayer(id) {
        if (this.player || !this.props.stream) {
            return;
        }
        this.player = flv.createPlayer({
            type: 'flv',
            url: `http://localhost:8000/live/${id}.flv`
        })
        this.player.attachMediaElement(this.videoRef.current);
        this.player.load();
    }
    render() {
        if (!this.props.stream) {
            return <div>Loading...</div>;
        }
        return (
            <div>
                <video ref = {this.videoRef} style = {{width: '100%'}} controls = {true}/>
                <h1>
                    {this.props.stream.title}
                </h1>
                <h5>{this.props.stream.desc}</h5>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {stream: state.streams[ownProps.match.params.id]}
};

export default connect(mapStateToProps, {
    fetchStream: fetchStream
})(StreamShow);