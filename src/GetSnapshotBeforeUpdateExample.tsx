import React, { Component, PureComponent, createRef } from "react";

type TestComponentProps = {
  height: number;
};

type Shapshot = {
  prevHeight: number;
};

export class TestComponent extends Component<TestComponentProps> {
  rootElement = createRef<HTMLDivElement>();

  // Получение данных о состоянии dom до изменения dom
  getSnapshotBeforeUpdate(): Shapshot {
    console.log(
      "getSnapshotBeforeUpdate",
      this.rootElement.current!.scrollHeight
    );
    return { prevHeight: this.rootElement.current!.scrollHeight };
  }

  componentDidUpdate(
    prevProps: unknown,
    prevState: unknown,
    { prevHeight }: Shapshot
  ) {
    const diff = this.rootElement.current!.scrollHeight - prevHeight;
    console.log("componentDidUpdate", this.rootElement.current!.scrollHeight);
    this.rootElement.current!.style.backgroundColor =
      diff > 0 ? "red" : "green";
  }

  render() {
    const { height } = this.props;

    return (
      <div ref={this.rootElement} style={{ height }}>
        {height}
      </div>
    );
  }
}

type State = {
  height: number;
};

type Props = {};

export class GetSnapshotBeforeUpdateExample extends PureComponent<
  Props,
  State
> {
  constructor(props: Props) {
    super(props);
    this.state = {
      height: 0
    };
  }

  randomHeight = () => {
    this.setState({ height: Math.ceil(Math.random() * 100) });
  };

  render() {
    const { height } = this.state;
    return (
      <div className="App">
        <div>
          <button onClick={this.randomHeight}>изменить высоту</button>
        </div>
        <TestComponent height={height} />
      </div>
    );
  }
}
