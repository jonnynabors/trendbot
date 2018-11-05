import React, { Component } from 'react';
import { getRankingsForCharacter } from './api/Network';
import { doThing } from './RankingsService';
// @ts-ignore
import { XYPlot, LineMarkSeries, YAxis, XAxis, HorizontalGridLines, VerticalGridLines } from 'react-vis';
import _ from 'underscore';

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
      const modifiedRankings = await (doThing(rankings));
      this.setState({
        rankings: modifiedRankings
      })
    }
    catch (err) {
      console.log('something went wrong');
    }
  }

  renderGraphs() {
    if (_.isEmpty(this.state.rankings)) return <div>...Loading</div>
      return this.state.rankings.map((ranking: any, index: number) => {
        return (
          <XYPlot height={300} width={500} key={index}>
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis xType="time-utc" title="date" />
            <YAxis title={ranking.name} />
            <LineMarkSeries
              style={{
                strokeLinejoin: 'round',
                strokeWidth: 4
              }}
              data={ranking.data}
            />
          </XYPlot>
        )
      })
    
  }

  render() {
    if (!this.state.rankings) return <div>...Loading</div>
    return (
      <div className="App">
        {this.renderGraphs()}
      </div>
    );
  }
}

export default App;
