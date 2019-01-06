import React, { Component } from 'react';
import Tone from 'tone';

import Key from './Key';
import './index.css';

class Piano extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentNotes: []
        };

        const reverb = new Tone.Freeverb(0.7).toMaster();
        const filter = new Tone.Filter(100, 'lowpass').toMaster();
        const eq = new Tone.EQ3(-10, -10, -20).toMaster();
        this.synth = new Tone.PolySynth({
            oscillator: {
                partials: [0, 2, 3, 4]
            },
            volume: -10
        })
            .chain(reverb)
            .chain(eq)
            .chain(filter)
            .toMaster();
    }

    noteOn = note => {
        this.setState(
            { currentNotes: [...this.state.currentNotes, note] },
            () => {
                this.synth.triggerAttackRelease(note);
                console.log(note);
            }
        );
    };
    noteOff = note => {
        this.setState(
            {
                currentNotes: this.state.currentNotes.filter(n => {
                    return n !== note;
                })
            },
            () => {
                this.synth.triggerRelease(note);
                console.log('TURNED OFF A NOTE!');
            }
        );
    };

    render() {
        if (this.props.oldKeys) {
            this.props.oldKeys.forEach(key => {
                this.noteOff(key);
                this.props.extractKey(key);
            });
        }
        if (this.props.newKeys) {
            this.props.newKeys.forEach(key => {
                this.noteOn(key);
                this.props.insertKey(key);
            });
            const keyList = this.props.allKeys.map(key => (
                <Key
                    key={key}
                    synth={this.synth}
                    note={key}
                    active={this.state.currentNotes.includes(key)}
                    noteOn={this.noteOn}
                    noteOff={this.noteOff}
                />
            ));
            return (
                <div
                    className="container"
                    ref={node =>
                        node && node.setAttribute('touch-action', 'none')
                    }
                >
                    {keyList}
                </div>
            );
        }
    }
}
export default Piano;
