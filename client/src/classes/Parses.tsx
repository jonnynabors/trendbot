import React, { Component } from "react";
import { getParsesForCharacter } from "../api/Network";
import _ from "underscore";
import { CharacterRanking } from "../data/CharacterRanking";

interface State {
  parses: CharacterRanking[];
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
