// games.js
// A 220-item catalog generated from templates so you have 200+ entries immediately.
// Replace `link` with your own game pages/iframes later.

(function () {
  const GENRES = [
    "Action","Adventure","Arcade","Puzzle","Strategy","RPG","Sports","Racing",
    "Shooter","Platformer","Simulation","Card","Board","Idle","Music","Horror"
  ];

  const TAGS = [
    "Singleplayer","Multiplayer","Retro","Pixel","3D","2D","Casual","Hardcore",
    "Fast","Chill","Story","Endless","Time Attack","Physics","Co-op","Competitive"
  ];

  function pick(arr, i) { return arr[i % arr.length]; }
  function makeId(n) { return String(n).padStart(3, "0"); }

  const games = [];
  const total = 220;

  for (let n = 1; n <= total; n++) {
    const genre = pick(GENRES, n);
    const t1 = pick(TAGS, n * 3);
    const t2 = pick(TAGS, n * 5 + 1);
    const title = `${genre} Game ${makeId(n)}`;

    games.push({
      id: `game-${makeId(n)}`,
      title,
      genre,
      tags: Array.from(new Set([t1, t2])),
      description: `A ${genre.toLowerCase()}-style experience with ${t1.toLowerCase()} and ${t2.toLowerCase()} vibes.`,
      link: "#"
    });
  }

  // Expose globally for app.js
  window.GAMES = games;
})();
