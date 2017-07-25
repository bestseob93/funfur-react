import React, { Component } from 'react';

class MyPageFinishScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            count: 3
        };

        this.countDown = this.countDown.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
    }

    componentDidMount() {
        this.startTimer();
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.count === 0) {
            this.stopTimer();
            this.props.history.push('/ceo');
        }
    }

    componentWillUnmount () {
        clearInterval(this.timer)
    }

    countDown() {
        this.setState({
            count: this.state.count - 1
        });
    }

    startTimer() {
        this.timer = setInterval(this.countDown, 1000);
    }

    stopTimer() {
        clearInterval(this.timer);
    }

    render() {

        return (
            <div className="container"> 
                   <p>성공적으로 변경되었습니다.</p>
                   <p>{this.state.count}초 후 홈으로 이동합니다.</p>
            </div>
        );
    }
}

export default MyPageFinishScreen;