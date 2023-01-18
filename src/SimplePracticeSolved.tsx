import React, { ChangeEvent, Component } from "react";

type State = {
  name: string;
  email: string;
};

type Props = {};

export class SimplePracticeSolved extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      name: "",
      email: ""
    };
  }

  onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ name: e.target.value.replace(/\d/g, "") });
  };

  onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ email: e.target.value });
  };

  render() {
    const { name, email } = this.state;
    return (
      <div className="App">
        <div>
          <div>
            <span>name:</span>
            <span>{name}</span>
          </div>
          <input value={name} onChange={this.onChangeName} />
        </div>
        <div>
          <div>
            <span>email:</span>
            <span>{email}</span>
          </div>
          <input onChange={this.onChangeEmail} />
        </div>
      </div>
    );
  }
}
