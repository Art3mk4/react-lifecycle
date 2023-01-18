import React, { Component } from "react";

type State = {
  name: string;
  email: string;
};

type Props = {};

/**
 * Необходимо создать обработчики для input. В input для name запрещаем ввод чисел
 */
export class SimplePractice extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      name: "",
      email: ""
    };
  }

  render() {
    const { name, email } = this.state;
    return (
      <div className="App">
        <div>
          <div>
            <span>name:</span>
            <span>{name}</span>
          </div>
          <input onChange={(e) => console.log(e.target.value)} />
        </div>
        <div>
          <div>
            <span>email:</span>
            <span>{email}</span>
          </div>
          <input onChange={(e) => console.log(e.target.value)} />
        </div>
      </div>
    );
  }
}
