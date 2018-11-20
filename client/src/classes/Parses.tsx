import React, { Component } from "react";
import { getRankingsForCharacter, getParsesForCharacter } from "../api/Network";
import { buildRankingForEachBoss } from "../RankingsService";
import _ from "underscore";
import { Card, CardContent, Typography } from "@material-ui/core";
import { Ranking } from "../data/Ranking";

interface State {
  parses: any;
  characterName: string;
}

class Parses extends Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      parses: {},
      characterName: ""
    };
  }

  async fetchCharacterParses() {
    try {
      const parses = await getParsesForCharacter(this.state.characterName);
      console.log(parses);
      this.setState({
        parses
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
      </div>
    );
  }
}

export default Parses;
