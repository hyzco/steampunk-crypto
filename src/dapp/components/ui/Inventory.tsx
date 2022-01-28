import React from "react";

import { FruitItem } from "../../types/fruits";

import { ActionableItem } from "../../types/contract"; // isFruit
import {
  Inventory as InventorySupply,
  Item,
  items,
} from "../../types/crafting"; //  Recipe, recipes,

import { InventoryItems } from "./InventoryItems";
import "./Inventory.css";

interface Props {
  balance: number;
  land: any[];
  fruits: FruitItem[];
  inventory: InventorySupply;
}

export const Inventory: React.FC<Props> = ({
  balance,
  land,
  fruits,
  inventory,
}) => {
  const [selectedItem, onSelectItem] = React.useState<ActionableItem>(items[0]);

  const item = selectedItem as Item;

  return (
    <div id="crafting">
      <div id="crafting-left">
        <InventoryItems
          onSelectItem={onSelectItem}
          selectedItem={selectedItem}
          inventory={inventory}
        />
        <a
          href="https://docs.sunflower-farmers.com/crafting-guide"
          // target="_blank"
        >
          <h3 className="current-price-supply-demand">Read more</h3>
        </a>
      </div>
      <div id="recipe">
        <>
          <span className="recipe-type">{item.type}</span>
          <span id="recipe-title">{item.name}</span>
          <div id="crafting-item">
            <img alt="img" src={item.image} />
          </div>

          <span id="recipe-description">{item.description}</span>
        </>
      </div>
    </div>
  );
};
