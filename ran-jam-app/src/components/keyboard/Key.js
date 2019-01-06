import React, { Component } from 'react';

import './index.css';

class Key extends Component {
    render() {
        const actualClassName = () => {
            if (this.props.active) {
                return 'key change';
            } else {
                return 'key';
            }
        };
        return (
            <div className="container">
                <button
                    className={actualClassName()}
                    onMouseDown={() => this.props.noteOn(this.props.note)}
                    onMouseUp={() => this.props.noteOff(this.props.note)}
                    onKeyDown={() => this.props.noteOn(this.props.note)}
                    onKeyUp={() => this.props.noteOff(this.props.note)}
                >
                    {this.props.note}
                </button>
            </div>
        );
    }
}
export default Key;
