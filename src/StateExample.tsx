import { Component, PureComponent } from "react";
import "./styles.css";

type State = {
  count: number;
  changed: boolean;
};

type Props = {};

export class StateExample extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      count: 0,
      changed: false
    };

    this.toggleChanged = this.toggleChanged.bind(this);
    this.doChanged = this.doChanged.bind(this);
    this.doUnchanged = this.doUnchanged.bind(this);
  }

  increase = () => {
    this.setState((prevState) => ({ count: prevState.count + 1 }));
  };

  setCountIsOne = () => {
    this.setState({ count: 1 });
  };

  toggleChanged() {
    this.setState((prevState) => ({ changed: !prevState.changed }));
  }

  doChanged() {
    // this.setState({ count: 1 });
    this.setState({ changed: true });
  }

  doUnchanged() {
    this.setState({ changed: false });
  }

  render() {
    const { count, changed } = this.state;
    // console.log("render", this);
    return (
      <div className="App">
        <div>
          <button onClick={this.doChanged}>changed: true</button>
          <button onClick={this.doUnchanged}>changed: false</button>
          <button onClick={this.toggleChanged}>toggle changed</button>
          <button onClick={this.increase}>Увеличить счетчик</button>
          <button onClick={this.setCountIsOne}>счетчик = 1</button>
        </div>
        <div>{count}</div>
        {changed.toString()}
      </div>
    );
  }
}
