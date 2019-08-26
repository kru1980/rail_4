import React, { useState } from "react";
import { Link } from "../routes";
import fetch from "isomorphic-unfetch";

import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/layouts/BasePage";

const Portfolios = ({ shows }) => {
  const list = shows =>
    shows.map(show => (
      <li key={show.id}>
        <Link route={`/portfolio/${show.id}`}>
          <a>{show.name}</a>
        </Link>
      </li>
    ));

  return (
    <BaseLayout>
      <BasePage>
        <h3>Page Batman </h3>
        <h4>List shows:</h4>
        <ul>{shows ? list(shows) : <p>Список шоу пуст</p>}</ul>
      </BasePage>
    </BaseLayout>
  );
};

Portfolios.getInitialProps = async () => {
  const res = await fetch("https://api.tvmaze.com/search/shows?q=batman");
  const data = await res.json();
  const shows = data.map(entry => entry.show);

  return { shows };
};

export default Portfolios;
