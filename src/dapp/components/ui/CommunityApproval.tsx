import React, { useState } from "react";

// import { Panel } from "../ui/Panel";
import { Button } from "../ui/Button";
// import { Message } from "../ui/Message";
// import { InventoryItems } from "../ui/InventoryItems";

import {
  Context,
  BlockchainEvent,
  BlockchainState,
  service,
} from "../../machine";

import matic from "../../images/ui/matic.png";
import icon from "../../images/ui/icon.png";
import carry from "../../images/characters/goblin_carry.gif";

import { Recipe } from "../../types/crafting"; //  Inventory, Item  recipes
// import { Box, BoxProps } from "./Box";

import "./Crafting.css";
import { useService } from "@xstate/react";
import { COMMUNITY_CRAFTING_ADDRESS } from "../../Blockchain";

interface Props {
  onClose: () => void;
  balance: number;
  recipe: Recipe;
  quickSwapRate: number;
}

export const CommunityApproval: React.FC<Props> = ({
  onClose,
  balance,
  recipe,
  quickSwapRate,
}) => {
  const [isApproving, setIsApproving] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [error, setError] = useState("");
  const [machineState] = useService<
    Context,
    BlockchainEvent,
    BlockchainState
  >(service); // send
  // const isUnsaved = machineState.context.blockChain.isUnsaved();
  const sunflowerTokenAmount = recipe.ingredients[0].amount;

  const sunflowerTokens = recipe.ingredients[0].amount;
  const maticPrice = sunflowerTokens * quickSwapRate;

  const craft = () => {
    service.send("CRAFT", {
      recipe,
      amount: 1,
      eth: maticPrice,
    });
    onClose();
  };

  const approve = async () => {
    setIsApproving(true);
    setError("");

    try {
      await machineState.context.blockChain.approve(
        COMMUNITY_CRAFTING_ADDRESS,
        sunflowerTokenAmount
      );
      setIsApproved(true);
    } catch (e) {
      console.log(e);
      setError(`Unable to approve`);
    } finally {
      setIsApproving(false);
    }
  };

  return (
    <div id="crafting">
      <div id="community-left">
        <span className="community-guide-text">
          Crafting this item will burn your tokens into the liquidity pool.
        </span>
        <span className="community-guide-text">
          Please note that prices change frequently and the $SPM amount may
          have a slippage. By crafting you accept these conditions.
        </span>
        {!isApproved && (
          <div>
            <span className="community-guide-text">
              Step 1 - Approve $SPM
            </span>
            {!isApproving && <Button onClick={approve}>Approve</Button>}
            {isApproving && (
              <>
                <div id="approving-animation">
                  <img alt="img" id="approving-goblin" src={carry} />
                  <img alt="img" id="approving-sff" src={icon} />
                </div>
                <span className="community-guide-text">Approving...</span>
              </>
            )}
          </div>
        )}

        {isApproved && (
          <div>
            <span className="community-guide-text">Step 2 - Craft</span>
            <Button onClick={craft}>Craft</Button>
          </div>
        )}

        {error && <span id="community-error">{error}</span>}
      </div>
      <div id="recipe">
        <span className={`recipe-type recipe-nft`}>NFT</span>
        <span id="recipe-title">{recipe.name}</span>
        <div id="crafting-item">
          <img alt="img" src={recipe.image} />
        </div>
        <span id="recipe-description">{recipe.description}</span>

        <div id="ingredients">
          <div className="ingredient">
            <div>
              <img alt="img" className="ingredient-image" src={icon} />
              <span className="ingredient-count">$SPM</span>
            </div>
            <span className={`ingredient-text`}>
              {sunflowerTokenAmount}
            </span>
          </div>
          <div className="ingredient">
            <div>
              <img alt="img" className="ingredient-image" src={matic} />
              <span className="ingredient-count">$MATIC</span>
            </div>
            <span className={`ingredient-text`}>
              {maticPrice.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
