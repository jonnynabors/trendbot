import React, { Component } from "react";
import { getRankingsForCharacter } from "../api/Network";
import { doThing } from "../RankingsService";
// @ts-ignore
import {
  XYPlot,
  LineMarkSeries,
  YAxis,
  XAxis,
  HorizontalGridLines,
  VerticalGridLines
} from "react-vis";
import _ from "underscore";

interface State {
  rankings: any;
  characterName: string;
}

class Rankings extends Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      rankings: {},
      characterName: ""
    };
  }

  async fetchCharacterData() {
    try {
      const rankings = await getRankingsForCharacter(this.state.characterName);
      const modifiedRankings = await doThing(rankings);
      this.setState({
        rankings: modifiedRankings
      });
    } catch (err) {
      console.log("something went wrong");
    }
  }

  renderGraphs() {
    if (_.isEmpty(this.state.rankings)) return <div>...Loading</div>;
    return this.state.rankings.map((ranking: any, index: number) => {
      return (
        <XYPlot height={300} width={500} key={index}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis xType="time-utc" title="date" />
          <YAxis title={ranking.name} />
          <LineMarkSeries
            style={{
              strokeLinejoin: "round",
              strokeWidth: 4
            }}
            data={ranking.data}
          />
        </XYPlot>
      );
    });
  }

  async submitCharacterName() {
    await this.fetchCharacterData();
  }

  handleChange(event: any) {
    this.setState({ characterName: event.target.value });
  }

  render() {
    if (!this.state.rankings) return <div>...Loading</div>;
    return (
      <div>
        <label>
          Name:
          <input
            type="text"
            value={this.state.characterName}
            onChange={this.handleChange.bind(this)}
          />
        </label>
        <button type="submit" onClick={this.submitCharacterName.bind(this)}>
          Submit
        </button>
        {this.renderGraphs()}
      </div>
    );
  }
}

export default Rankings;
