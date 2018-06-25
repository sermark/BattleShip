import * as React from 'react';
import BattleField from "./battleField";

class Main extends  React.Component<any, any> {
	constructor(props:any) {
		super(props);
		this.state = {
			coordsArray: []
		};

		this.initGame = this.initGame.bind(this);
		this.getRandomCoord = this.getRandomCoord.bind(this);
		this.isItemInArray = this.isItemInArray.bind(this);
	}
	
	public componentDidMount() {
		this.initGame();
	}

  public initGame() {
		this.generateShips();
  }

/* tslint:disable:prefer-for-of */
	public isItemInArray(array:any, item:any):boolean {
		if ( typeof array === 'undefined') {
			return false;
		}

		if ( array.length === 0) {
			return false;
		}
		for (let i = 0; i < array.length; i++) {
			if (array[i][0] === item[0] && array[i][1] === item[1]) {
			return true;
			}
		}
		return false;
	}
	
	public isCorrectCoords(source:any, array:any) {
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < source.length; j++) {
        const wrongX = array[i][0] >= (source[j][0] - 1) && array[i][0] <= (source[j][0] + 1);
        const wrongY = array[i][1] >= (source[j][1] - 1) && array[i][1] <= (source[j][1] + 1);
        if (wrongX || wrongY) {
          return false;
        }
      }
    }
    return true;
	}
	
	public setUnavailableCells(unavailableArray:any, array:any) {
    for (let i = 0; i < array.length; i++) {
      const item = array[i];
      for (let x = item[0] - 1; x <= item[0] + 1; x++) {
        for (let y = item[1] - 1; y <= item[1] + 1; y++) {
          if (x >= 0 && y >= 0 && !this.isItemInArray(unavailableArray, [x, y])) {
            unavailableArray.push([x, y]);
          }
        }
      }
    }
	}
	
	public generateShips() {
    const unavailableCoords:any = [];
    // generate L ship
    const coordsArray = this.generateLShipCoords();
    this.setUnavailableCells(unavailableCoords, coordsArray);

    // generate I ship
    let iShipCoords = [];

    do {
      iShipCoords = this.generateIShipCoords();
    } while (!this.isCorrectCoords(coordsArray, iShipCoords));

    coordsArray.push(...iShipCoords);
    this.setUnavailableCells(unavailableCoords, iShipCoords);

    // generate dot ships
    let dotShip1Coords = [];

    do {
      dotShip1Coords = [this.getRandomCoord(), this.getRandomCoord()];
    } while (this.isItemInArray(unavailableCoords, dotShip1Coords));

    coordsArray.push(dotShip1Coords);
    this.setUnavailableCells(unavailableCoords, [dotShip1Coords]);

    let dotShip2Coords = [];

    do {
      dotShip2Coords = [this.getRandomCoord(), this.getRandomCoord()];
    } while (this.isItemInArray(unavailableCoords, dotShip2Coords));

		coordsArray.push(dotShip2Coords);
		
		this.setState({
			coordsArray
		});
	}
	
	public generateIShipCoords() {
    const items = [];
    const shipLength = 4;
    const fieldLength = 10;
    const x = this.getRandomCoord();
    const y = this.getRandomCoord();
    const orientation = this.getRandomShipOrientation();
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
	
	public generateLShipCoords() {
    const items = [];
    const shipLength = 3;
    const fieldLength = 10;
    const x = this.getRandomCoord();
    const y = this.getRandomCoord();
    const orientation = this.getRandomShipOrientation();
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
	
	public getRandomCoord():number {
    return Math.floor(Math.random() * 10);
  }

  public getRandomShipOrientation() {
    const options = ['vertical', 'horizontal'];
    return options[Math.floor(Math.random() * options.length)];
	}
	
	public render() {
		return (
			<div>
				{/* <BattleField /> */}
				  <BattleField coordsArray={this.state.coordsArray} isItemInArray={this.isItemInArray}/>  
			</div>
		)
	}
}

export default Main;