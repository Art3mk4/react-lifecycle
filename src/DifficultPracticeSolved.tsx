import React, { ChangeEvent, Component } from "react";

type ImageSliderState = {
  id: number;
};

type ImageSliderProps = {
  interval: number;
};

export class ImageSlider extends Component<ImageSliderProps, ImageSliderState> {
  intervalId: number;

  constructor(props: ImageSliderProps) {
    super(props);
    this.state = {
      id: 1
    };
    this.intervalId = 0;
  }

  next = () => {
    this.setState((prevState) => {
      if (prevState.id === 100) return { id: 1 };
      return { id: prevState.id + 1 };
    });
  };

  back = () => {
    this.setState((prevState) => {
      if (prevState.id === 1) return { id: 100 };
      return { id: prevState.id - 1 };
    });
  };

  onNext = () => {
    this.next();
    this.restart();
  };

  onBack = () => {
    this.back();
    this.restart();
  };

  run = () => {
    this.intervalId = window.setInterval(
      this.next,
      this.props.interval || 1000
    );
  };

  stop = () => {
    clearInterval(this.intervalId);
  };

  restart = () => {
    this.stop();
    this.run();
  };

  componentDidMount() {
    this.run();
  }

  componentDidUpdate(props: ImageSliderProps) {
    if (props.interval !== this.props.interval) {
      this.restart();
    }
  }

  componentWillUnmount() {
    this.stop();
  }

  render() {
    const { id } = this.state;
    return (
      <div className="App">
        <img
          onMouseLeave={this.run}
          onMouseEnter={this.stop}
          alt=""
          src={`https://picsum.photos/id/${id}/200`}
        />
        <div>
          <button onClick={this.onBack}>back</button>
          <button onClick={this.onNext}>next</button>
        </div>
      </div>
    );
  }
}

type State = {
  interval: number;
};

type Props = {};

export class DifficultPracticeSolved extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      interval: 1000
    };
  }

  onChangeInterval = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      interval: parseInt(e.target.value.replace(/\D/g, ""), 10)
    });
  };

  render() {
    const { interval } = this.state;
    return (
      <div className="App">
        <div>
          <div>Интервал</div>
          <input value={interval} onChange={this.onChangeInterval} />
        </div>
        <ImageSlider interval={interval} />
      </div>
    );
  }
}
