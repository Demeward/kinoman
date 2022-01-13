const createTotalMovieCountTemplate = (totalFilms) => {
  return (
    `<section class="footer__statistics">
      <p>${totalFilms.length} movies inside</p>
    </section>`
  )
};

export {createTotalMovieCountTemplate};
