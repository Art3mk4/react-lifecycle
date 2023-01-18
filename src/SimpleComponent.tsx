import { Component, PureComponent } from "react";
import deepEqual from "fast-deep-equal";
import "./styles.css";

export class SimplestComponent extends Component {
  componentDidMount() {
    console.log("componentDidMount", this);
  }

  componentWillUnmount() {
    console.log("componentWillUnmount", this);
  }

  render() {
    return <div>SimplestComponent</div>;
  }
}

type SimpleComponentProps = {
  message: string;
};

export class SimpleComponent extends Component<SimpleComponentProps> {
  handler(e: MouseEvent) {
    console.log({ x: e.pageX, y: e.pageY });
  }

  componentDidMount() {
    console.log("componentDidMount", this);
    window.addEventListener("click", this.handler);
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
    window.removeEventListener("click", this.handler);
  }

  render() {
    return <div>{this.props.message}</div>;
  }
}

type ComponentWithQueryProps = {
  id?: string;
};

type ComponentWithQueryState = {
  data: unknown;
};

export class ComponentWithQuery extends Component<
  ComponentWithQueryProps,
  ComponentWithQueryState
> {
  // data: unknown;

  constructor(props: ComponentWithQueryProps) {
    super(props);
    this.state = {
      data: null
    };

    // this.data = null;
  }

  componentDidMount() {
    console.log("componentDidMount", this);

    fetch(`https://jsonplaceholder.typicode.com/todos/${this.props.id || 1}`)
      .then((response) => response.json())
      .then((data) => {
        // this.data = data;
        // console.log(data);
        // this.forceUpdate();
        // this.state.data = data;
        this.setState({ data });
      });
  }

  componentWillUnmount() {
    console.log("componentDidMount");
  }

  componentDidUpdate(
    prevProps: ComponentWithQueryProps,
    prevState: ComponentWithQueryState
  ) {
    fetch(`https://jsonplaceholder.typicode.com/todos/${this.props.id || 1}`)
      .then((response) => response.json())
      .then((data) => {
        // this.data = data;
        // console.log(data);
        // this.forceUpdate();
        // this.state.data = data;
        this.setState({ data });
      });

    // console.log("componentDidUpdate", prevState, this.state);
  }

  render() {
    return (
      <div>
        ComponentWithQuery
        <div>{JSON.stringify(this.state.data)}</div>
        {/* <div>{JSON.stringify(this.data)}</div> */}
      </div>
    );
  }
}

type ComponentNotUpdatedProps = {
  data?: object;
  string?: string;
};

type ComponentNotUpdatedState = {
  count: number;
};

export class ComponentNotUpdated extends PureComponent<
  ComponentNotUpdatedProps,
  ComponentNotUpdatedState
> {
  constructor(props: ComponentNotUpdatedProps) {
    super(props);
    this.state = {
      count: 0
    };
  }

  shouldComponentUpdate(
    nextProps: ComponentNotUpdatedProps,
    nextState: ComponentNotUpdatedState
  ) {
    // return !(
    //   nextProps.string === this.props.string &&
    //   JSON.stringify(nextProps.data) === JSON.stringify(this.props.data) &&
    //   nextState.count === this.state.count
    // );

    return (
      !deepEqual(nextProps, this.props) || !deepEqual(nextState, this.state)
    );

    // return true;
    // return false;
  }

  render() {
    console.log("ComponentNotUpdated");
    return (
      <div>
        <button
          onClick={() =>
            this.setState((prevState) => ({ count: prevState.count + 1 }))
          }
        >
          увеличить
        </button>
        <div>{this.state.count}</div>
        ComponentNotUpdated
      </div>
    );
  }
}

type SimpleComponentWithStateState = {
  visible: boolean;
  count: number;
};
type SimpleComponentWithStateProps = object;

export class SimpleComponentWithState extends PureComponent<
  SimpleComponentWithStateProps,
  SimpleComponentWithStateState
> {
  constructor(props: SimpleComponentWithStateProps) {
    super(props);
    this.state = {
      visible: false,
      count: 1
    };
  }

  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.setState((prevState) => ({ visible: !prevState.visible }));
          }}
        >
          Показать/скрыть
        </button>
        <button
          onClick={() => {
            this.setState((prevState) => ({ count: prevState.count + 1 }));
          }}
        >
          увеличить
        </button>
        <div>{this.state.visible.toString()}</div>
        <div>{this.state.count.toString()}</div>
        <ComponentNotUpdated string="wew" data={{}} />
        {this.state.visible && <SimplestComponent />}
        {/* {this.state.visible && <SimpleComponent message="message" />} */}
        {/* {this.state.visible && (
          <ComponentWithQuery id={this.state.count.toString()} />
        )} */}
      </div>
    );
  }
}
