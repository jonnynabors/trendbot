import React, { Component } from "react";
import { getRankingsForCharacter } from "../api/Network";
import { buildRankingForEachBoss } from "../RankingsService";
import _ from "underscore";
import { Card, CardContent, Typography } from "@material-ui/core";
import { Ranking } from "../data/Ranking";

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
      const modifiedRankings = await buildRankingForEachBoss(rankings);
      this.setState({
        rankings: modifiedRankings
      });
    } catch (err) {
      console.log("something went wrong");
    }
  }

  renderGraphs() {
    if (_.isEmpty(this.state.rankings)) return <div>...Loading</div>;
    return this.state.rankings.map((ranking: Ranking[], index: number) => {
      if (ranking[0])
        return (
          <Card key={index}>
            <CardContent>
              <Typography>
                {ranking[0].encounterName}
              </Typography>
              <Typography>
                Percentile: {ranking[0].percentile}
              </Typography>
              <Typography>
                Spec: {ranking[0].spec}
              </Typography>
            </CardContent>
          </Card>
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
