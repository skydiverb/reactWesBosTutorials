import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';

class App extends React.Component {
  constructor() {
    super();
    this.addFish = this.addFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    // getinitialstate or initialstate
    this.state = {
      fishes: {},
      order: {}
    };
  }
  addFish(fish){
    // update the state
    const fishes = {...this.state.fishes}; // It will take every item from the object and spread it into this fishes state
    // add in a new fish
    const timestamp = Date.now();
    fishes['fish-${timestamp}'] = fish;
    // set state or which state would you like to update
    this.setState({fishes: fishes});
  }

  loadSamples() {
    this.setState({
      fishes: sampleFishes
    });
  }

  addToOrder(key){
    // take a copy of our state
    const order = {...this.state.order};
    // update or add the new number of fish ordered
    order[key] = order[key] + 1 || 1;
    // update the state
    this.setState({ order: order }); // or just { order } which accomplishes the same
  }

  render() {
    return (
      <div className='catch-of-the-day'>
        <div className='menu'>
          <Header age="5000" cool={true} tagline="Fresh Seafood Market"/>
          <ul className="list-of-fishes">
            { // This curly brace tells JSX that we're running Javascript
              Object.keys(this.state.fishes)
              .map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}
                />)
              }
            }
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order}/>
        <Inventory addFish={this.addFish} loadSamples={this.loadSamples}/>
      </div>
      )
  }
}
export default App; // Exports the App Component
