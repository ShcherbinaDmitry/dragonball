export default class DBService {
  constructor() {
    this._apiBase = 'http://localhost:3001/games';
    console.log('Making new dbservice');
  }

  getGames = async () => {
    console.log('Getting games');
    const result = await fetch(this._apiBase);

    if (!result.ok) {
      throw new Error(`Could not fetch games, recieved ${result.status}`);
    }

    return await result.json();
  }

  addGame = async () => {

  }

  updateGame = async (id) => {

  }

  deleteGame = async (id) => {

  }
}