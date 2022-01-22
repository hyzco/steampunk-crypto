import React from "react";

import "./Land.css";

import { Square, Fruit, ActionableItem } from "../../types/contract";

import waterEdge from "../../images/water/edge.png";
import bone from "../../images/decorations/water/bone.png";
import wheel1 from "../../images/decorations/water/wheel1.png";
import whellHalf from "../../images/decorations/water/whell-half.png";
import whellHalf2 from "../../images/decorations/water/whell-half.png";

import { FirstBlock } from "./FirstBlock";
import { SecondLand } from "./SecondBlock";
import { ThirdBlock } from "./ThirdBlock";
import { FourthBlock } from "./FourthBlock";
import { FifthBlock } from "./FifthBlock";
import { Tiles } from "./Tiles";
import { Trees } from "./NewTrees";
import { Stones } from "./NewStone";
import { NFTs } from "./NFTs";
import { Chickens } from "./Chickens";
import { Iron } from "./Iron";
import { Gold } from "./Gold";
import { Barn } from "./Barn";
import { Blacksmith } from "./Blacksmith";
import { Machine } from "./Machine";
import { Market } from "./Market";
import { Reward } from "./Reward";
import { FruitItem } from "../../types/fruits";
import { Inventory, Supply } from "../../types/crafting";

import bridge from "../../images/decorations/bridge.png";


interface Props {
  land: Square[];
  balance: number;
  onHarvest: (landIndex: number) => void;
  onPlant: (landIndex: number) => void;
  selectedItem: ActionableItem;
  fruits: FruitItem[];
  account?: string;
  inventory: Inventory;
  totalItemSupplies: Inventory;
}

const columns = Array(60).fill(null);
const rows = Array(20).fill(null);

// Straight Wheel
const leftRandomStraight = Math.floor(Math.random() * (11 - 1 + 1)) + 1;
const topRandomStraight = Math.floor(Math.random() * (60 - 20 + 5)) + 20;

// Straight Half
const leftRandomHalf = Math.floor(Math.random() * (11 - 1 + 1)) + 1;
const topRandomHalf = Math.floor(Math.random() * (60 - 20 + 5)) + 20;

// Straight Half2
const leftRandomHalf2 = Math.floor(Math.random() * (11 - 1 + 1)) + 1;
const topRandomHalf2 = Math.floor(Math.random() * (60 - 20 + 5)) + 20;

// based on the amount of fields, determine the level
const landToLevel = {
  5: 1,
  8: 2,
  11: 3,
  14: 4,
  17: 5,
};

export const Land: React.FC<Props> = ({
  fruits,
  land,
  balance,
  onHarvest,
  onPlant,
  selectedItem,
  account,
  inventory,
  totalItemSupplies,
}) => {
  const level = landToLevel[land.length];

  return (
    <>
      <div id="waterTop" />
      {/* //seems useless  */}
      {/* {columns.map((_, column) =>
        rows.map((_, row) =>
          (column + row) % 2 ? null : (
            <div
              className="grass1"
              style={{
                position: "absolute",
                left: `calc(${(column - 25) * 62.5}px + 18px)`,
                top: `${row * 62.5}px`,
                width: "62.5px",
                height: "62.5px",
                background: "#4b4c5a",
              }}
            />
          )
        )
      )} */}
        {new Array(50).fill(null).map((_, index) => (
        <img
          className="water-edge"
          src={waterEdge}
          style={{
            position: "absolute",
            top: `80px`,
            left: `${index * 62.5}px`,
            zIndex: 1,
            transform: 'rotate(180.40deg)'
          }}
        />
      ))}
      <div className="farm">
        <div className="farm-container">
        <FirstBlock
          fruits={fruits}
          selectedItem={selectedItem}
          land={land}
          balance={balance}
          onHarvest={onHarvest}
          onPlant={onPlant}
        />
        <SecondLand
          fruits={fruits}
          selectedItem={selectedItem}
          land={land}
          balance={balance}
          onHarvest={onHarvest}
          onPlant={onPlant}
        />
        <ThirdBlock
          fruits={fruits}
          selectedItem={selectedItem}
          land={land}
          balance={balance}
          onHarvest={onHarvest}
          onPlant={onPlant}
        />
        <FourthBlock
          fruits={fruits}
          selectedItem={selectedItem}
          land={land}
          balance={balance}
          onHarvest={onHarvest}
          onPlant={onPlant}
        />
        <FifthBlock
          fruits={fruits}
          selectedItem={selectedItem}
          land={land}
          balance={balance}
          onHarvest={onHarvest}
          onPlant={onPlant}
        />

        <Trees inventory={inventory} />
        <Stones inventory={inventory} />
        <Iron inventory={inventory} />
        <Gold inventory={inventory} />

        <Chickens inventory={inventory} />
        <NFTs inventory={inventory} />

        <Barn farmSize={land.length} balance={balance} />
        {/* <Blacksmith
          inventory={inventory}
          totalItemSupplies={totalItemSupplies}
          balance={balance}
          level={level}
        /> */}
        <Machine
          inventory={inventory}
          totalItemSupplies={totalItemSupplies}
          balance={balance}
          level={level}
        />
        <Market />
        <Tiles />
        <Reward account={account} />

        {/* {
                    land.map((square, index) => (
                        <Field square={square} onClick={square.fruit === Fruit.None ? () => onPlant(index) : () => onHarvest(index)}/> 
                    ))
                } */}
        </div>
      </div>
      
      
      {new Array(50).fill(null).map((_, index) => (
        <img
          className="water-edge"
          src={waterEdge}
          style={{
            position: "absolute",
            left: `${index * 62.5}px`,
          }}
        />
      ))}
      {/* whell */}
     
      <img className="bridge" src={bridge} style={{
          position: "absolute",
          left: `800px`,
          top: `760px`,
        }} />
     
      <img
        className="wheel"
        src={wheel1}
        style={{
          position: "absolute",
          left: `${leftRandomStraight * 40}px`,
          top: `${800 + topRandomStraight}px`,
        }}
      />
      <img
        className="wheel"
        src={whellHalf}
        style={{
          position: "absolute",
          left: `${leftRandomHalf * 40}px`,
          top: `${800 + topRandomHalf}px`,
        }}
      />
      <img
        className="wheel"
        src={whellHalf2}
        style={{
          position: "absolute",
          left: `${leftRandomHalf2 * 40}px`,
          top: `${800 + topRandomHalf2}px`,
        }}
      />
      <img
        className="bone"
        src={bone}
        style={{
          position: "absolute",
          left: `${65 + 1000}px`,
          top: `${800 + 2}px`,
        }}
      />
      <img
        className="bone"
        src={bone}
        style={{
          position: "absolute",
          left: "921px",
          top: "841px",
        }}
      />
      <img
        className="bone"
        src={bone}
        style={{
          position: "absolute",
          left: "1139px",
          top: "859px",
        }}
      />
      <div id="waterBottom" />
    </>
  );
};
