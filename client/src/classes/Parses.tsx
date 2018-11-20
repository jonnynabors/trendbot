import React, { Component } from "react";
import { getParsesForCharacter } from "../api/Network";
import _ from "underscore";
import {
  XYPlot,
  LineMarkSeries,
  YAxis,
  XAxis,
  HorizontalGridLines,
  VerticalGridLines
} from "react-vis";
import { CharacterRanking } from "../data/CharacterRanking";
import { buildParsesForEachBoss } from "../CharacterRankingService";
import { Grid } from "@material-ui/core";

interface State {
  parses: any[];
  characterName: string;
}

class Parses extends Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      parses: [],
      characterName: ""
    };
  }

  async fetchCharacterParses() {
    try {
      const parses = await getParsesForCharacter(this.state.characterName);
      const updatedParses = await buildParsesForEachBoss(parses);
      this.setState({
        parses: updatedParses
      });
    } catch (err) {
      console.log("something went wrong");
    }
  }

  async submitCharacterName() {
    await this.fetchCharacterParses();
  }

  handleChange(event: any) {
    this.setState({ characterName: event.target.value });
  }

  renderGraphs() {
    if (_.isEmpty(this.state.parses)) return <div>...Loading</div>;
    return this.state.parses.map((ranking: any, index: number) => {
      console.log(ranking);
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

  render() {
    if (!this.state.parses) return <div>...Loading</div>;
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
        <Grid container spacing={8}>
          {this.renderGraphs()}
        </Grid>
      </div>
    );
  }
}

export default Parses;
