import React from "react";
import styles from "./ArtistListItem.module.css";

const ArtistListItem = (props) => {
  return (
    <div>
      <div className={styles.container}>
        <p className={styles.name}>{props.name}</p>
        <div>
          <i
            className={"far fa-edit fa-2x " + styles.icon}
            onClick={props.onEdit}
          ></i>
          <i
            className={"fas fa-trash-alt fa-2x " + styles.icon}
            onClick={props.onDelete}
          ></i>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default ArtistListItem;