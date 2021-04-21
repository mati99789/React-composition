import React from 'react';

const DropDownItem = (props) => {
  return (
    <li onClick={props.chooseItem} className={props.className}>
      {props.content}
    </li>
  );
};

export default DropDownItem;
