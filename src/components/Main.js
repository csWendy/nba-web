import React from 'react';
import { ShotChart } from './ShotChart';
import { Profile } from './Profile';
import nba from 'nba';

export class Main extends React.Component {
    state = {
        playerInfo: {},
    }
    componentDidMount() {
        window.nba = nba;
        nba.stats.playerInfo({ PlayerID: 201939})
            .then((response) => {
                console.log(response);
                const { commonPlayerInfo, playerHeadlineStats } = response;
                const playerInfo = { ...commonPlayerInfo[0], ...playerHeadlineStats[0] };
                console.log(playerInfo);
                this.setState({ playerInfo });
            });
    }

    render() {
        return (
            <div className="main">
                <Profile playerInfo={this.state.playerInfo} />
                <ShotChart playerId={201939} />
            </div>
        );
    }
}
