export default class DBService {
  constructor() {
    this._apiBase = 'http://localhost:3000/api/games';
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

  getGame = async (id) => {
    console.log('Getting a game by id');
  }

  addGame = async (game) => {
    console.log('Adding a game');
    console.log(game);

    const game1 = {
      name: 'DragonBall Game Generic Name 1',
      jpname: 'Japanese Name ',
      image: './path_to_image.jpg',
      region: 'Europe',
      condition: 'Mint',
      note: 'Generic description',
      platform: 'PS4',
    };

    const res = await fetch(this._apiBase, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(game),
    });

    console.log(res);
  }

  updateGame = async (id) => {
    console.log('Updating a game');
  }

  deleteGame = async (id) => {
    console.log('Deleting a game');
    const res = await fetch(`${this._apiBase}/${id}`, {
      method: 'DELETE',
    })

    console.log(res);
  }
}