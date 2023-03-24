import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function UserStats() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [average, setAverage] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  const loggedUser = useSelector((state) => {
    return state.user;
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    countGeneralStats();
  }, [isLoading]);

  async function fetchUserData() {
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: loggedUser.id,
      }),
    };

    const response = await fetch(
      import.meta.env.VITE_BASE_URL + "/get_user_stats",
      params
    );
    const statsData = await response.json();
    setData(statsData);

    setIsLoading(false);
  }

  useEffect(() => {
    if (!isLoading) {
      setAverage((totalScore / data.length).toFixed(0));
    }
  }, [totalScore]);

  function countGeneralStats() {
    if (!isLoading && data.length > 0) {
      setTotalScore(
        data
          .map((element) => parseInt(element.score))
          .reduce((acc, elem) => acc + elem)
      );
    }
  }

  return isLoading ? null : (
    <div className="account__logged__buttons__up__stats">
      <h1>Vos Statistiques</h1>
      <hr />

      <div className="account__logged__buttons__up__stats__score">
        {totalScore > 0 ? (
          <div className="account__logged__buttons__up__stats__score__already">
            <p>
              Score total : <b>{totalScore} pts</b>{" "}
            </p>
            <p>
              Score moyen : <b>{average} pts</b>{" "}
            </p>
            <p>
              Vous avez joué <b>{data.length} parties </b>
            </p>
          </div>
        ) : (
          <div className="account__logged__buttons__up__stats__score__never">
            <p> Jouez votre première partie pour obtenir vos statistiques !</p>
          </div>
        )}
      </div>
    </div>
  );
}
