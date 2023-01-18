import React, { ChangeEvent, Component } from "react";

type ControlledProps = {
  value: string;
  onChange: (value: string) => void;
};

type UncontrolledState = {
  value: string;
};

export class Controlled extends Component<ControlledProps> {
  onChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.props.onChange(e.target.value);
  };

  render() {
    const { value } = this.props;
    return <input value={value} onChange={this.onChange} />;
  }
}

export class Uncontrolled extends Component<{}, UncontrolledState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      value: ""
    };
  }

  onChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: e.target.value });
  };

  render() {
    const { value } = this.state;
    return <input value={value} onChange={this.onChange} />;
  }
}

type State = UncontrolledState & { selfChanged: boolean };

// Данный паттер не рекомендуется и представлен исключительно в академических целях
export class Mixed extends Component<Partial<ControlledProps>, State> {
  constructor(props: ControlledProps) {
    super(props);
    this.state = {
      value: "",
      selfChanged: false
    };
  }

  static getDerivedStateFromProps(props: ControlledProps, state: State) {
    if (state.selfChanged) {
      console.log("prevent change by parent");
      return { selfChanged: false };
    } else {
      console.log("change by parent");
      return { value: props.value };
    }
  }

  // componentDidUpdate(prevProps: ControlledProps) {
  //   if (prevProps.value !== this.props.value) {
  //     this.setState({ value: this.props.value?.toString() });
  //   }
  // }

  selfOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const { onChange } = this.props;
    if (onChange) {
      this.setState({ value, selfChanged: true });
      onChange(value);
    } else {
      this.setState({ value, selfChanged: false });
    }
  };

  render() {
    const { value } = this.state;
    console.log("mixed");
    return <input value={value} onChange={this.selfOnChange} />;
  }
}

export class GetDerivedStateFromPropsExample extends Component<
  {},
  UncontrolledState
> {
  constructor(props: {}) {
    super(props);
    this.state = {
      value: ""
    };
  }

  onChange = (value: string) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;

    // return <Controlled value={value} onChange={this.onChange} />;
    // return <Uncontrolled />;

    // return (
    //   <div>
    //     <Mixed />
    //     <button onClick={() => this.onChange(Math.random().toString(16))}>
    //       Изменить
    //     </button>
    //   </div>
    // );

    console.log("root", { value });

    return (
      <div>
        {/* <Mixed /> */}
        <Mixed value={value} onChange={this.onChange} />
        <button onClick={() => this.onChange(Math.random().toString(16))}>
          Изменить
        </button>
      </div>
    );
  }
}
