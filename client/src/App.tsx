import React, { Component } from 'react';
import { getRankingsForCharacter } from './api/Network';
import { doThing } from './RankingsService';
// @ts-ignore
import { XYPlot, LineSeries, YAxis, XAxis, HorizontalGridLines, VerticalGridLines } from 'react-vis';

interface State {
  rankings: any
}
class App extends Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      rankings: {}
    }
  }
  async componentWillMount() {
    try {
      const rankings = await (getRankingsForCharacter('corrupting'));
      this.setState({
        rankings: doThing(rankings)
      })
    }
    catch (err) {
      console.log('something went wrong');
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <XYPlot height={500} width={800}>
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis xType="time-utc" title="date" />
            <YAxis title={this.state.rankings.name} />
            <LineSeries style={{
              strokeLinejoin: 'round',
              strokeWidth: 4
            }}
              data={this.state.rankings.data} />
          </XYPlot>
        </header>
      </div>
    );
  }
}

export default App;
