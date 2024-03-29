import React from "react";

import { Button } from "../ui/Button";
import { Message } from "../ui/Message";
import { InventoryItems } from "../ui/InventoryItems";

import {
  Context,
  BlockchainEvent,
  BlockchainState,
  service,
} from "../../machine";

// import hammer from "../../images/ui/hammer.png";
import basket from "../../images/ui/basket.png";

import arrowUp from "../../images/ui/arrow_up.png";
import arrowDown from "../../images/ui/arrow_down.png";

import { recipes, Recipe, Inventory } from "../../types/crafting"; // Item
import { Box, BoxProps } from "./Box";

import "./Crafting.css";
import { useService } from "@xstate/react";

interface Props {
  onClose: () => void;
  balance: number;
  inventory: Inventory;
  totalItemSupplies: Inventory;
  level: number;
}

const TOOLS = recipes.filter(
  (recipe) => recipe.type === "ERC20" && !recipe.communityMember
);

export const Tools: React.FC<Props> = ({
  onClose,
  balance,
  inventory,
  totalItemSupplies,
  level,
}) => {
  const [amount, setAmount] = React.useState(1);
  const [selectedRecipe, setSelectedRecipe] = React.useState(TOOLS[0]);
  const [machineState] = useService<
    Context,
    BlockchainEvent,
    BlockchainState
  >(service); // send
  const isUnsaved = machineState.context.blockChain.isUnsaved();

  const changeRecipe = (recipe: Recipe) => {
    setAmount(1);
    setSelectedRecipe(recipe);
  };

  const craft = () => {
    service.send("CRAFT", {
      recipe: selectedRecipe,
      amount,
    });
    onClose();
  };

  const boxes: BoxProps[] = TOOLS.map((recipe) => ({
    isSelected: recipe.name === selectedRecipe.name,
    onClick: () => changeRecipe(recipe),
    image: recipe.image,
  }));

  // Pad array with empty boxes
  for (let i = boxes.length; i < 10; i++) {
    boxes.push({ disabled: true });
  }

  const ingredientList = selectedRecipe.ingredients.map((ingredient) => {
    const inventoryCount =
      ingredient.name === "$SPM" ? balance : inventory[ingredient.name];
    const price = ingredient.amount * amount;
    return {
      name: ingredient.name,
      image: ingredient.image,
      price,
      canAfford: inventoryCount >= price,
    };
  });

  const Action = () => {
    if (selectedRecipe.isLocked) {
      return <span id="recipe-description">Coming soon...</span>;
    }

    if (isUnsaved) {
      return (
        <div className="upgrade-required">
          <Message>
            Save your farm first
            <img alt="img"
              //src={cancel}
              className="insufficient-funds-cross"
            />
          </Message>
        </div>
      );
    }

    return (
      <>
        <div id="craft-count">
          <Message>{amount}</Message>
          <div id="arrow-container">
            <img
              className="craft-arrow"
              alt="Step up donation value"
              src={arrowUp}
              onClick={() => setAmount((r) => r + 1)}
            />
            {amount > 1 && (
              <img 
                className="craft-arrow"
                alt="Step down donation value"
                src={arrowDown}
                onClick={() => setAmount((r) => r - 1)}
              />
            )}
          </div>
        </div>
        <Button onClick={craft} disabled={!canAfford}>
          <span id="craft-button-text">Craft</span>
        </Button>
      </>
    );
  };

  const canAfford = ingredientList.every(
    (ingredient) => ingredient.canAfford
  );

  return (
    <div id="crafting">
      <div id="crafting-left">
        <div id="crafting-items">
          {/* {boxes.map((box) => (
            <Box
              count={box.count}
              onClick={box.onClick}
              image={box.image}
              isSelected={box.isSelected}
              disabled={box.disabled}
            />
          ))} */}
        </div>
        {/* <div id="inventory-header">
          <img alt="img" src={basket} />
          <span>Inventory</span>
        </div>
        <div id="inventory">
          <InventoryItems inventory={inventory} />
        </div> */}
        {/* <a
          href="https://docs.sunflower-farmers.com/crafting-guide"
          target="_blank"
        > */}
        <div className="lottery-container">
          <h3 className="current-price-supply-demand">Coming Soon</h3>
        </div>
        {/* </a> */}
      </div>
      {/* <div id="recipe">
        <span className={`recipe-type recipe-erc20`}>ERC20</span>
        <span id="recipe-title">{selectedRecipe.name}</span>
        <div id="crafting-item">
          <img alt="img" src={selectedRecipe.image} />
        </div>
        <span id="recipe-description">{selectedRecipe.description}</span>

        <div id="ingredients">
          {ingredientList.map((ingredient) => (
            <div className="ingredient">
              <div>
                <img alt="img" className="ingredient-image" src={ingredient.image} />
                <span className="ingredient-count">{ingredient.name}</span>
              </div>
              <span
                className={`ingredient-text ${
                  !ingredient.canAfford && "ingredient-insufficient"
                }`}
              >
                {ingredient.price}
              </span>
            </div>
          ))}
        </div>
        <div id="craft-action">{Action()}</div>
      </div> */}
    </div>
  );
};
