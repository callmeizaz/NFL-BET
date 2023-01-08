const contestList = [
  {
    id: "1",
    player: {
      photoUrl:
        "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/19562.png",
      name: "Austin Ekeler",
      team: {
        name: "Los Angeles Chargers",
        code: "LAC",
      },
      teamId: "LAC",
      position: "RB",
      entry: 125,
      maxWin: 120,
      spread: "-5",
    },
    opponent: {
      photoUrl:
        "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/17923.png",
      name: "Ezekiel Elliott",
      team: {
        name: "Dallas Cowboys",
        code: "DAL",
      },
      teamId: "DAL",
      position: "RB",
      entry: 3,
      maxWin: 10,
      spread: "+5",
    },
    winBonus: true,
  },
  {
    id: "2",
    player: {
      photoUrl:
        "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/21752.png",
      name: "Chase Claypool",
      team: {
        name: "Pittsburgh Steelers",
        code: "PIT",
      },
      teamId: "PIT",
      position: "WR",
      entry: 50,
      maxWin: 45,
      spread: "-5",
    },
    opponent: {
      photoUrl:
        "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/19318.png",
      name: "Kendrick Bourne",
      team: {
        name: "New England Patriots",
        code: "NE",
      },
      teamId: "NE",
      position: "WR",
      entry: 30,
      maxWin: 100,
      spread: "+5",
    },
    winBonus: false,
  },
];

export { contestList };
