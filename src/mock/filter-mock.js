const generateFilter = (cards) => ({
  watchlist: cards.filter((card) => card.isWatchlist).length,
  alreadyWatched: cards.filter((card) => card.isAlreadyWatched).length,
  favorite: cards.filter((card) => card.isFavorite).length,
})


export {generateFilter};
