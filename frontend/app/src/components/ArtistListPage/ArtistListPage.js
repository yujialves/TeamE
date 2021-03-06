// Kento Tanaka
// Room List of each artist on this service's home

import React, { useState, useEffect } from "react";
import styles from "./ArtistListPage.module.css";
import ArtistCard from "./ArtistCard/ArtistCard";
import Placeholder from "./ArtistCard/Placeholder";
import GlobalMenu from "./GlobalMenu/GlobalMenu";
import { useSelector } from "react-redux";
import axios from "axios";
import MediaQuery from "react-responsive";
import { Redirect } from "react-router";
import { baseURL } from "../../constants/baseUrl";

const ArtistListPage = () => {
  const [searchText, setSearchText] = useState("");
  const [searchArtists, setSearchArtists] = useState([]);
  const [pickupArtists, setPickupArtists] = useState([]);
  const [isPickupArtists, setIsPickupArtists] = useState(false);
  const [pickup, setPickup] = useState([]);

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    console.log(pickup);
    fetchPickup().then((pickup) => setPickup(pickup));
  }, []);

  const fetchPickup = async () => {
    try {
      const pickup_response = await axios.get(
        `${baseURL}/spotify/top-artist`,
        {
          headers: {
            access_token: token,
          },
        }
      );
      const pickupArtistsList = await pickup_response.data.artists.slice(0, 15);
      setPickupArtists(pickupArtistsList);
      setIsPickupArtists(true);
    } catch (err) {
      console.log(err);
    }
    return pickupArtists;
  };

  const onChangeHandler = async (text) => {
    setSearchText(text);
    try {
      const name = encodeURIComponent(text);
      const search_response = await axios.get(
        `${baseURL}/spotify/search-artist?name=${name}`,
        {
          headers: {
            access_token: token,
          },
        }
      );
      const searchArtistsList = await search_response.data.artists.slice(0, 5);
      setSearchArtists(searchArtistsList);
    } catch (err) {
      console.log(err);
    }
  };

  const placeholder_list = [];
  for (let i = 0; i < 10; i++) {
    placeholder_list.push(
      <li className="column">
        <Placeholder />
      </li>
    );
  }

  if (token === "") {
    return <Redirect to="/" />;
  }

  return (
    <div className={styles.container}>
      <GlobalMenu />
      <h1 className={styles.title}>Pick up</h1>
      <div className={styles.roomlist}>
        <MediaQuery query="(max-width: 959px) and (min-width: 480px)">
          　
          <ul className="ui three column grid">
            {isPickupArtists
              ? pickupArtists.map((pickup_artist, idx) => (
                  <li className="column" key={idx}>
                    <ArtistCard
                      name={pickup_artist.name}
                      image={pickup_artist.image && pickup_artist.image.url}
                      artistid={pickup_artist.id}
                    />
                  </li>
                ))
              : placeholder_list}
          </ul>
        </MediaQuery>
        <MediaQuery query="(max-width: 480px)">
          　
          <ul className="ui one column grid">
            {isPickupArtists
              ? pickupArtists.map((pickup_artist, idx) => (
                  <li className="column" key={idx}>
                    <ArtistCard
                      name={pickup_artist.name}
                      image={pickup_artist.image && pickup_artist.image.url}
                      artistid={pickup_artist.id}
                    />
                  </li>
                ))
              : placeholder_list}
          </ul>
        </MediaQuery>
        <MediaQuery query="(min-width: 960px)">
          <ul className="ui five column grid">
            {isPickupArtists
              ? pickupArtists.map((pickup_artist, idx) => (
                  <li className="column" key={idx}>
                    <ArtistCard
                      name={pickup_artist.name}
                      image={pickup_artist.image && pickup_artist.image.url}
                      artistid={pickup_artist.id}
                    />
                  </li>
                ))
              : placeholder_list}
          </ul>
        </MediaQuery>
      </div>

      <h1 className={styles.title}>Search</h1>
      <div className={styles.searchbar}>
        <div className="ui inverted huge icon input">
          <input
            type="text"
            placeholder="Search artists..."
            onChange={(input) => onChangeHandler(input.target.value)}
          />
          <i className="search icon"></i>
        </div>
      </div>

      <div className={styles.roomlist}>
        <MediaQuery query="(max-width: 959px) and (min-width: 480px)">
          　
          <ul className="ui three column grid">
            {searchArtists.map((search_artist, idx) => (
              <li className="column" key={idx}>
                <ArtistCard
                  name={search_artist.name}
                  image={search_artist.image && search_artist.image.url}
                  artistid={search_artist.id}
                />
              </li>
            ))}
          </ul>
        </MediaQuery>
        <MediaQuery query="(max-width: 480px)">
          　
          <ul className="ui two column grid">
            {searchArtists.map((search_artist, idx) => (
              <li className="column" key={idx}>
                <ArtistCard
                  name={search_artist.name}
                  image={search_artist.image && search_artist.image.url}
                  artistid={search_artist.id}
                />
              </li>
            ))}
          </ul>
        </MediaQuery>
        <MediaQuery query="(min-width: 960px)">
          <ul className="ui five column grid">
            {searchArtists.map((search_artist, idx) => (
              <li className="column" key={idx}>
                <ArtistCard
                  name={search_artist.name}
                  image={search_artist.image && search_artist.image.url}
                  artistid={search_artist.id}
                />
              </li>
            ))}
          </ul>
        </MediaQuery>
      </div>
    </div>
  );
};

export default ArtistListPage;
