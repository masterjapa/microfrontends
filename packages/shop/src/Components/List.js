import React, { useEffect } from "react";

const Items = [
  {
    id: 0,
    name: "Item",
    price: 100,
  },
  {
    id: 1,
    name: "Another Item",
    price: 150,
  },
  {
    id: 2,
    name: "Something else",
    price: 98,
  },
  {
    id: 3,
    name: "Yet Another",
    price: 30,
  },
  {
    id: 4,
    name: "Final one",
    price: 20,
  },
];

export default ({ addItem, removeItem }) => {
  return (
    <div
      style={{
        border: `1px solid rgba(120, 0, 102, 0.5)`,
        padding: `0.5rem 2rem`,
        borderRadius: `10px`,
        flex: 1,
      }}
    >
      <h1 style={{ textAlign: "left" }}>Choose your product</h1>
      <ul style={{ padding: 0 }}>
        {Items.map((item, key) => {
          return (
            <li
              key={`${key}-${item.id}`}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: `3px 0`,
              }}
            >
              <b>{`${item.name} $${item.price}`}</b>
              <div>
                <button onClick={() => addItem(item)}>add</button>
                {` `}
                <button onClick={() => removeItem(item)}>remove</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
