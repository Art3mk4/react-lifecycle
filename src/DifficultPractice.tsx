import React, { ChangeEvent, Component } from "react";

type ImageSliderState = {
  id: number;
};

type ImageSliderProps = {
  interval: number;
};

/**
 * При нажатии на кнопки изменяется id на единицу.
 * Максимальное значение id - 100, минимальное - 1
 * Слайдер автоматически по заданному в props интервалу отображает следующую картинку
 * Необходимо учесть случай, когда интервал изменяется
 * *При наведении останавливать слайдер, при покидании - запускать
 */
export class ImageSlider extends Component<ImageSliderProps, ImageSliderState> {
  constructor(props: ImageSliderProps) {
    super(props);
    this.state = {
      id: 1
    };
  }

  render() {
    const { id } = this.state;
    return (
      <div className="App">
        <img
          // *При наведении останавливать слайдер, при покидании - запускать
          onMouseLeave={console.log}
          onMouseEnter={console.log}
          alt=""
          src={`https://picsum.photos/id/${id}/200`}
        />
        <div>
          <button>back</button>
          <button>next</button>
        </div>
      </div>
    );
  }
}

type State = {
  interval: number;
};

type Props = {};

/** Этот компонент управляет изменением интервала ImageSlider
 * Необходимо написать обработчик для input, который будет оставлять только числа
 */
export class DifficultPractice extends Component<Props, State> {
  render() {
    return (
      <div className="App">
        <div>
          <div>Интервал</div>
          <input />
        </div>
        <ImageSlider interval={1000} />
      </div>
    );
  }
}
