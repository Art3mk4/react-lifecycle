import React, { Component, PureComponent } from "react";

type ShowLyfecycleProps = {
  value: unknown; // не важно
  children: React.ReactChildren | React.ReactNode;
};

type ShowLyfecycleState = {
  test: boolean;
  error: Error | null;
};

export class ShowLyfecycle extends Component<
  ShowLyfecycleProps,
  ShowLyfecycleState
> {
  constructor(props: ShowLyfecycleProps) {
    super(props);

    this.state = {
      test: false,
      error: null
    };

    this.changeState = this.changeState.bind(this);
    this.resetError = this.resetError.bind(this);
  }

  changeState() {
    this.setState((v) => ({ test: !v.test }));
  }

  resetError() {
    this.setState({ error: null });
  }

  // Методы жизненного цикла

  // Изменить состояние из-за проспов
  static getDerivedStateFromProps(
    props: ShowLyfecycleProps,
    state: ShowLyfecycleState
  ) {
    console.log("getDerivedStateFromProps", { props, state });
    return null;
  }

  // Добавляем обработчики событий
  // side effects, запросы
  componentDidMount() {
    console.log("componentDidMount");
  }

  // Оптимизация
  shouldComponentUpdate(
    nextProps: ShowLyfecycleProps,
    nextState: ShowLyfecycleState
  ) {
    console.log("shouldComponentUpdate", { nextProps, nextState });
    return true; // Всегда обновлять
    // return shallowCompare(this, nextProps, nextState); // Поведение по умолчанию
    // return false; // Никогда не обновлять
  }

  // Получение данных о состоянии dom до изменения dom
  getSnapshotBeforeUpdate(
    prevProps: ShowLyfecycleProps,
    prevState: ShowLyfecycleState
  ) {
    console.log("getSnapshotBeforeUpdate", { prevProps, prevState });
    return { context: "test" };
  }

  // // При ошибке изменить состояние
  static getDerivedStateFromError(error: Error) {
    console.log("getDerivedStateFromError", { error });
    return { error };
  }

  // Среагировать на ошибку, логировать ошибку
  componentDidCatch(error: Error, info: unknown) {
    this.setState({ error });
    console.log("componentDidCatch", { error, info });
  }

  // Обработка пропсов и состояния
  componentDidUpdate(
    prevProps: ShowLyfecycleProps,
    prevState: ShowLyfecycleState,
    snapshot: unknown
  ) {
    console.log("componentDidUpdate", { prevProps, prevState, snapshot });
  }

  // Отписка от всех обработчиков
  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  // Обязательный метод: создание разметки
  render() {
    console.log("render", this.state);

    if (this.state.error) {
      return (
        <div>
          Неожиданная ошибка, мы автоматически регистрируем все ошибки и скоро
          все исправим
          <div>
            <button onClick={this.resetError}>Сбросить ошибку</button>
          </div>
        </div>
      );
    }
    return (
      <div>
        <button onClick={this.changeState}>Изменить внутренее состояние</button>
        {this.props.children}
        {this.props.value}
        <div>{`${this.state.test}`}</div>
      </div>
    );
  }
}
