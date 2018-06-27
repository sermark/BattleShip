import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../redux/actions';
import BattleField from './battleField';
import Message from './message';

interface IMainProps {
  battleShip: any;
  actions: any;
}

interface IMainState {
  isVisible: boolean;
}

class Main extends React.Component<IMainProps, IMainState> {
  constructor(props: IMainProps) {
    super(props);
    this.isItemInArray = this.isItemInArray.bind(this);
    this.handleToogleVisability = this.handleToogleVisability.bind(this);

    this.state = {
      isVisible: false
    }
  }

  public componentDidMount() {
    this.generateShips();
  }

  public handleToogleVisability(): void {
    this.setState({
      isVisible: !this.state.isVisible
    });
  }

  public isItemInArray(array: number[][], item: number[]): boolean {
    if (typeof array === 'undefined') {
      return false;
    }

    if (array.length === 0) {
      return false;
    }
    for (const elem of array) {
      if (elem[0] === item[0] && elem[1] === item[1]) {
        return true;
      }
    }
    return false;
  }

  public isCorrectCoords(source: number[][], array: number[][]): boolean {
    for (const elemArray of array) {
      for (const elemSource of source) {
        const wrongX = elemArray[0] >= (elemSource[0] - 1) && elemArray[0] <= (elemSource[0] + 1);
        const wrongY = elemArray[1] >= (elemSource[1] - 1) && elemArray[1] <= (elemSource[1] + 1);
        if (wrongX || wrongY) {
          return false;
        }
      }
    }
    return true;
  }

  public setUnavailableCells(unavailableArray: number[][], array: number[][]): void {
    for (const elem of array) {
      const item: number[] = elem;
      for (let x = item[0] - 1; x <= item[0] + 1; x++) {
        for (let y = item[1] - 1; y <= item[1] + 1; y++) {
          if (x >= 0 && y >= 0 && !this.isItemInArray(unavailableArray, [x, y])) {
            unavailableArray.push([x, y]);
          }
        }
      }
    }
  }

  public generateShips(): void {
    const unavailableCoords: number[][] = [];
    // create L-shaped ship.
    const coordsArray: number[][] = [];
    const lShipCoords: number[][] = this.generateLShipCoords();

    const lShip = {
      coord: lShipCoords,
      isSank: false,
      name: 'Lship',
    }

    coordsArray.push(...lShip.coord);
    this.setUnavailableCells(unavailableCoords, coordsArray);

    // create I-shaped ship.
    let iShipCoords: number[][] = [];

    do {
      iShipCoords = this.generateIShipCoords();
    } while (!this.isCorrectCoords(coordsArray, iShipCoords));

    const iShip = {
      coord: iShipCoords,
      isSank: false,
      name: 'Iship',
    }

    coordsArray.push(...iShip.coord);
    this.setUnavailableCells(unavailableCoords, iShipCoords);

    // create dot ships.
    let dotShip1Coords: number[] = [];

    do {
      dotShip1Coords = [this.getRandomCoord(), this.getRandomCoord()];
    } while (this.isItemInArray(unavailableCoords, dotShip1Coords));

    const dotOneShip = {
      coord: [dotShip1Coords],
      isSank: false,
      name: 'dotShip1',
    }

    coordsArray.push(...dotOneShip.coord);
    this.setUnavailableCells(unavailableCoords, [dotShip1Coords]);

    let dotShip2Coords: number[] = [];

    do {
      dotShip2Coords = [this.getRandomCoord(), this.getRandomCoord()];
    } while (this.isItemInArray(unavailableCoords, dotShip2Coords));

    const dotTwoShip = {
      coord: [dotShip2Coords],
      isSank: false,
      name: 'dotShip2',
    }

    coordsArray.push(...dotTwoShip.coord);

    const ships: any = [];
    ships.push(lShip, iShip, dotOneShip, dotTwoShip);

    this.props.actions.fetchShips(ships);
  }

  public generateIShipCoords(): number[][] {
    const items: number[][] = [];
    const shipLength: number = 4;
    const fieldLength: number = 10;
    const x: number = this.getRandomCoord();
    const y: number = this.getRandomCoord();
    const orientation: string = this.getRandomShipOrientation();
    items.push([x, y]);

    if (orientation === 'vertical') {
      if (y + shipLength > fieldLength - 1) {
        items.push([x, y - 1]);
        items.push([x, y - 2]);
        items.push([x, y - 3]);
      } else {
        items.push([x, y + 1]);
        items.push([x, y + 2]);
        items.push([x, y + 3]);
      }
    } else {
      if (x + shipLength > fieldLength - 1) {
        items.push([x - 1, y]);
        items.push([x - 2, y]);
        items.push([x - 3, y]);
      } else {
        items.push([x + 1, y]);
        items.push([x + 2, y]);
        items.push([x + 3, y]);
      }
    }

    return items;
  }

  public generateLShipCoords(): number[][] {
    const items: number[][] = [];
    const shipLength: number = 3;
    const fieldLength: number = 10;
    const x: number = this.getRandomCoord();
    const y: number = this.getRandomCoord();
    const orientation: string = this.getRandomShipOrientation();
    items.push([x, y]);

    if (orientation === 'vertical') {
      if (y + shipLength > fieldLength - 1) {
        if (x - 1 < 0) {
          items.push([x + 1, y]);
          items.push([x + 1, y - 1]);
          items.push([x + 1, y - 2]);
        } else {
          items.push([x - 1, y]);
          items.push([x - 1, y - 1]);
          items.push([x - 1, y - 2]);
        }
      } else {
        if (x - 1 < 0) {
          items.push([x + 1, y]);
          items.push([x + 1, y + 1]);
          items.push([x + 1, y + 2]);
        } else {
          items.push([x - 1, y]);
          items.push([x - 1, y + 1]);
          items.push([x - 1, y + 2]);
        }
      }
    } else {
      if (x + shipLength > fieldLength - 1) {
        if (y - 1 < 0) {
          items.push([x, y + 1]);
          items.push([x - 1, y + 1]);
          items.push([x - 2, y + 1]);
        } else {
          items.push([x, y - 1]);
          items.push([x - 1, y - 1]);
          items.push([x - 2, y - 1]);
        }
      } else {
        if (y - 1 < 0) {
          items.push([x, y + 1]);
          items.push([x + 1, y + 1]);
          items.push([x + 2, y + 1]);
        } else {
          items.push([x, y - 1]);
          items.push([x + 1, y - 1]);
          items.push([x + 2, y - 1]);
        }
      }
    }
    return items;
  }

  public getRandomCoord(): number {
    return Math.floor(Math.random() * 10);
  }

  public getRandomShipOrientation(): string {
    const options = ['vertical', 'horizontal'];
    return options[Math.floor(Math.random() * options.length)];
  }

  public render() {
    const { isVisible } = this.state;
    const { battleShip } = this.props;
    const isSankAll = battleShip.every((elem: any) => elem.isSank)
    return (
      <div>
        <BattleField isItemInArray={this.isItemInArray} isVisible={isVisible}/>
        {isSankAll ? <Message text={'Game Over'} /> : null}
        <button  className={'button'} onClick={this.handleToogleVisability}>Toggle Visibility</button>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => {
  const { battleShip } = state;
  return {
    battleShip
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
