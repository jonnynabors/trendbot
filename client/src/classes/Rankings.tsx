import React, { Component } from "react";
import { getRankingsForCharacter } from "../api/Network";
import { buildRankingForEachBoss } from "../RankingsService";
import _ from "underscore";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
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

  determineRankingColor(ranking: number) {
    if (ranking > 89) return "gold";
    else if (ranking > 70) return "blueviolet";
    else if (ranking > 50) return "dodgerblue";
    else if (ranking > 25) return "green";
    return "gray";
  }

  renderGraphs() {
    if (_.isEmpty(this.state.rankings)) return <div>...Loading</div>;
    return this.state.rankings.map((ranking: Ranking[], index: number) => {
      if (ranking[0]) {
        const rankingColor = this.determineRankingColor(ranking[0].percentile);
        return (
          <Grid item key={index} spacing={8} xs={12} sm={6}>
            <Card style={{ backgroundColor: rankingColor }}>
              <CardContent>
                <Typography>{ranking[0].encounterName}</Typography>
                <Typography>Percentile: {ranking[0].percentile}</Typography>
                <Typography>Spec: {ranking[0].spec}</Typography>
                <Typography>
                  Date: {new Date(ranking[0].startTime).toDateString()}
                </Typography>
                <Typography>iLvl: {ranking[0].ilvlKeyOrPatch}</Typography>
              </CardContent>
            </Card>
          </Grid>
        );
      }
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
        <Grid container spacing={8}>
          {this.renderGraphs()}
        </Grid>
      </div>
    );
  }
}

export default Rankings;
