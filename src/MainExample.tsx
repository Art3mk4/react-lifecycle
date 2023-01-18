import { Component } from "react";
import { ShowLyfecycle } from "./ShowLyfecycle";
import "./styles.css";

const SimpleChildren = () => <div>some component</div>;
const BrokenChildren = () => {
  throw new Error("some error");
};

type State = {
  error: boolean;
  random: number;
  mounted: boolean;
};

type Props = {};

export class MainExample extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      error: false,
      random: Math.random(),
      mounted: true
    };

    this.toggleMounted = this.toggleMounted.bind(this);
  }

  toggleError = () => {
    this.setState((v) => ({ error: !v.error }));
  };

  toggleMounted() {
    this.setState((v) => ({ mounted: !v.mounted }));
  }

  updateRandom = () => {
    this.setState({ random: Math.random() });
  };

  render() {
    const { error, random, mounted } = this.state;
    return (
      <div className="App">
        <div>
          <button onClick={this.toggleMounted}>
            {mounted ? "Размонтировать" : "Монтировать"}
          </button>
          <button onClick={this.toggleError}>
            {error ? "Убрать ошибку" : "Ошибка"}
          </button>
          <button onClick={this.updateRandom}>Обновить компонент</button>
        </div>
        {mounted && (
          <ShowLyfecycle value={random}>
            {error ? <BrokenChildren /> : <SimpleChildren />}
          </ShowLyfecycle>
        )}
      </div>
    );
  }
}
