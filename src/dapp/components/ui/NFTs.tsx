import React from "react";

import { Panel } from "../ui/Panel";
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
import building from "../../images/buildings/side-house-2.png";

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

const NFT_ITEMS = recipes.filter(
  (recipe) => recipe.type === "NFT" && !recipe.communityMember
);

export const NFTs: React.FC<Props> = ({
  onClose,
  balance,
  inventory,
  totalItemSupplies,
  level,
}) => {
  const [amount, setAmount] = React.useState(1);
  const [selectedRecipe, setSelectedRecipe] = React.useState(NFT_ITEMS[0]);
  const [machineState] = useService<
    Context,
    BlockchainEvent,
    BlockchainState
  >(service); // send
  const isUnsaved = machineState.context.blockChain.isUnsaved();

  console.log({ inventory });
  
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

  const boxes: BoxProps[] = NFT_ITEMS.map((recipe) => ({
    isSelected: recipe.name === selectedRecipe.name,
    onClick: () => changeRecipe(recipe),
    image: recipe.image,
  }));

  // Pad array with empty boxes
  for (let i = boxes.length; i < 10; i++) {
    boxes.push({ disabled: true });
  }

  // Currently only have statue supply so hardcode the rest to 5000
  const amountLeft =
    selectedRecipe.supply &&
    selectedRecipe.supply - totalItemSupplies[selectedRecipe.name];

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

    if (selectedRecipe.supply && amountLeft === 0) {
      return <span id="recipe-description">No supply left </span>;
    }

    const itemCount = inventory[selectedRecipe.name];
    const limit = selectedRecipe.limit || 1;

    if (itemCount < limit) {
      return (
        <>
          <div id="craft-count">
            <Message>{amount}</Message>
          </div>
          <Button onClick={craft} disabled={!canAfford}>
            <span id="craft-button-text">Craft</span>
          </Button>
        </>
      );
    }

    return <span id="recipe-description">Already minted</span>;
  };

  const canAfford = ingredientList.every(
    (ingredient) => ingredient.canAfford
  );

  return (
    <div id="crafting">
      <div id="crafting-left">
        <div id="crafting-items">
          {boxes.map((box) => (
            <Box
              count={box.count}
              onClick={box.onClick}
              image={box.image}
              isSelected={box.isSelected}
              disabled={box.disabled}
            />
          ))}
        </div>
        <div id="inventory-header">
          <img alt="img" src={basket} />
          <span>Inventory</span>
        </div>
        <div id="inventory">
          <InventoryItems inventory={inventory} />
        </div>
        <a
          href="https://docs.sunflower-farmers.com/crafting-guide"
          // target="_blank"
        >
          <h3 className="current-price-supply-demand">Read more</h3>
        </a>
      </div>
      <div id="recipe">
        <span className={`recipe-type recipe-nft`}>NFT</span>
        {selectedRecipe.supply && !isNaN(amountLeft) && (
          <span className="nft-count">{`${amountLeft} left!`}</span>
        )}
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
        {selectedRecipe.farmLevel && (
          <div className="ingredient">
            <div>
              <img alt="img" className="ingredient-image" src={building} />
              <span className="ingredient-count">Farm level</span>
            </div>
            <span
              className={`ingredient-text ${
                level < selectedRecipe.farmLevel &&
                "ingredient-insufficient"
              }`}
            >
              {selectedRecipe.farmLevel}
            </span>
          </div>
        )}
        <div id="craft-action">{Action()}</div>
        {selectedRecipe.openSeaLink && (
          <span id="recipe-description">
            <a
              // target="_blank"
              href={selectedRecipe.openSeaLink}
              style={{ color: "white", textDecoration: "underline" }}
            >
              View on OpenSea
            </a>
          </span>
        )}
      </div>
    </div>
  );
};
