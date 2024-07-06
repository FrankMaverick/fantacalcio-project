import axios from 'axios';
import { PUBLIC_URL_API_BASEURL } from '$env/static/public';

/*
ALL PLAYERS
*/
export interface Player {
    id: number;
    name: string;
    playmaker: boolean;
    role: string;
    team: string;
    value: number;
    season_id: number;
    team_id: number;
    photo: string;
}

export interface PlayersList extends Array<Player> {}

export async function getPlayersList(): Promise<PlayersList> {
    try {
        const response = await axios.get(PUBLIC_URL_API_BASEURL, {
            params: { module: 'fantamaster', action: 'playerslist' }
        });
        return response.data.data.players.map((player: any) => ({
            id: player.id,
            name: player.name,
            playmaker: player.playmaker,
            role: player.role,
            team: player.team,
            value: player.value,
            season_id: player.season_id,
            team_id: player.team_id,
            photo: player.photo
        }));
    } catch (error) {
        console.error(error);
        throw error;
    }
}

/*
UNAVAILABLE PLAYERS
*/
export interface UnavailablePlayers {
    team: string;
    role: string;
    desc: string;
    name: string;
    type: string;
    source_desc: string;
    next_day: string;
    doubt: boolean;
}

export interface UnavailabilityInfo {
    day: string;
    unavailable: UnavailablePlayers[];
}

export function getUnavailablePlayers(): Promise<UnavailablePlayers[]> {
    return axios
        .get(PUBLIC_URL_API_BASEURL, { params: { module: 'fantamaster', action: 'unavailable' } })
        .then((response) => {
            return response.data.data.unavailable.map((player: any) => ({
                team: player.team,
                role: player.role,
                desc: player.desc,
                name: player.name,
                type: player.type,
                source_desc: player.source_desc,
                next_day: player.next_day,
                doubt: player.doubt
            }));
        })
        .catch((error) => {
            console.error(error);
            throw error;
        });
}

