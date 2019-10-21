import { Icon, Button, Input, AutoComplete } from 'antd';
import React, {Component} from 'react';
import { PROFILE_PIC_URL_PREFIX } from '../constants';
import nba from 'nba';
const  { Option }  = AutoComplete;


class SearchBar extends Component {
    state = {
        dataSource: [],
    };

   // const { Option } = AutoComplete;

    handleSearch = value => {
        console.log("key word=",value);
        this.setState({
            dataSource: !value ?
                [] : nba.searchPlayers(value).map(player => ({
                    fullName: player.fullName,
                    playerId: player.playerId,
                }))
        });
    }

    onSelect = (playerName) => {
        this.props.handleSelectPlayer(playerName);
    }

    render() {
        const { dataSource } = this.state;
        //console.log(dataSource);
        const options = dataSource.map((player) => (
            <Option key={player.fullName} value={player.fullName}          className="player-option">
                <img className="player-option-image" src={`${PROFILE_PIC_URL_PREFIX}/${player.playerId}.png`}/>
                <span className="player-option-label">{player.fullName}</span>
            </Option>
        ));
        console.log(options);
        return (
                <AutoComplete
                    className="search-bar"
                    size="large"
                    onSearch={this.handleSearch}
                    onSelect={this.onSelect}
                    placeholder="Search NBA Player"
                    optionLabelProp="value"
                    dataSource={options}
                >
                    <Input
                        suffix={
                            <Button
                                className="search-btn"
                                style={{ marginRight: -12 }}
                                size="large"
                                type="primary"
                            >
                                <Icon type="search" />
                            </Button>
                        }
                    />
                    <Input suffix={<Icon type="search" className="certain-category-icon" />} />
                </AutoComplete>
        );
    }
}

export default SearchBar;