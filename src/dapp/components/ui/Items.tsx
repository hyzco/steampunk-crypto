import React from "react";
import basket from "../../images/ui/basket.png";
// import hammer from "../../images/ui/hammer.png";
import close from "../../images/ui/close.png";
import leftEdgeInner from "../../images/ui/panel/lt_box_9slice_lc.png";
import rightEdgeInner from "../../images/ui/panel/lt_box_9slice_rc.png";
import topEdgeInner from "../../images/ui/panel/lt_box_9slice_tc.png";
import topLeftInner from "../../images/ui/panel/lt_box_9slice_tl.png";
import topRightInner from "../../images/ui/panel/lt_box_9slice_tr.png";
import plantIcon from "../../images/ui/plant.png";
import { ActionableItem, isFruit } from "../../types/contract"; // Fruit
import { Inventory as InventorySupply } from "../../types/crafting"; // Item, items, Recipe recipes,
import { FruitItem } from "../../types/fruits";
import { Inventory } from "./Inventory";
import "./Inventory.css";
import { Plants } from "./Plants";






type Tab = "Plants" | "Items";

interface Props {
  selectedItem: ActionableItem;
  onSelectItem: (item: ActionableItem) => void;
  balance: number;
  land: any[];
  fruits: FruitItem[];
  onClose: () => void;
  inventory: InventorySupply;
}

export const Items: React.FC<Props> = ({
  selectedItem,
  onSelectItem,
  balance,
  land,
  fruits,
  onClose,
  inventory,
}) => {
  const [tab, setTab] = React.useState<Tab>(
    isFruit(selectedItem) ? "Plants" : "Items"
  );

  return (
    <div>
      <img alt="img" src={close} className="close-icon" onClick={onClose} />
      <div id="inventory-tabs">
        <div
          className={`inventory-tab ${tab === "Plants" && "active-tab"}`}
          onClick={() => setTab("Plants")}
        >
          <img src={plantIcon} alt="basket" className="tab-icon" />
          <span>Plants</span>
          {tab === "Plants" && (
            <>
              <img alt="img" id="panel-left-edge" src={leftEdgeInner} />
              <img alt="img" id="panel-right-edge" src={rightEdgeInner} />
              <img alt="img" id="panel-top-edge" src={topEdgeInner} />
              <img alt="img" id="panel-top-left" src={topLeftInner} />
              <img alt="img" id="panel-top-right" src={topRightInner} />
            </>
          )}
        </div>

        <div
          className={`inventory-tab ${tab === "Items" && "active-tab"}`}
          onClick={() => setTab("Items")}
        >
          <img src={basket} alt="basket" className="tab-icon" />
          <span>Inventory</span>
          {tab === "Items" && (
            <>
              <img alt="img" id="panel-left-edge" src={leftEdgeInner} />
              <img alt="img" id="panel-right-edge" src={rightEdgeInner} />
              <img alt="img" id="panel-top-edge" src={topEdgeInner} />
              <img alt="img" id="panel-top-left" src={topLeftInner} />
              <img alt="img" id="panel-top-right" src={topRightInner} />
            </>
          )}
        </div>
      </div>
      {tab === "Plants" && (
        <Plants
          selectedItem={selectedItem}
          onSelectItem={onSelectItem}
          fruits={fruits}
          land={land}
          balance={balance}
        />
      )}
      {tab === "Items" && (
        <Inventory
          selectedItem={selectedItem}
          onSelectItem={onSelectItem}
          fruits={fruits}
          land={land}
          balance={balance}
          inventory={inventory}
        />
      )}
    </div>
  );
};
