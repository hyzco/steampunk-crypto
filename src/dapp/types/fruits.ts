import Big from "big.js";

import sunflower from "../images/sunflower/fruit.gif";
import potato from "../images/potato/fruit.gif";
import beetroot from "../images/beetroot/fruit.gif";
import pumpkin from "../images/pumpkin/fruit.gif";
import cauliflower from "../images/cauliflower/fruit.png";
import radish from "../images/radish/fruit.png";
import parsnip from "../images/parsnip/fruit.png";

export enum Fruit {
  None = "0",
  Sunflower = "1",
  Potato = "2",
  Beetroot = "3",
  Pumpkin = "4",
  Cauliflower = "5",
  Parsnip = "6",
  Radish = "7",
}

export interface FruitItem {
  fruit: Fruit;
  name: string;
  image: string;
  buyPrice: number;
  sellPrice: number;
  landRequired: number;
  harvestMinutes: number;
}

export const FRUITS: FruitItem[] = [
  {
    fruit: Fruit.Sunflower,
    name: "MK1",
    image: sunflower,
    buyPrice: 0.01,
    sellPrice: 0.02,
    landRequired: 5,
    harvestMinutes: 1,
  },
  {
    fruit: Fruit.Potato,
    name: "MK2",
    image: potato,
    buyPrice: 0.1,
    sellPrice: 0.16,
    landRequired: 5,
    harvestMinutes: 5,
  },
  {
    fruit: Fruit.Beetroot,
    name: "MK3",
    image: beetroot,
    buyPrice: 1,
    sellPrice: 0.4,
    landRequired: 5,
    harvestMinutes: 60,
  },
  {
    fruit: Fruit.Pumpkin,
    name: "MK4",
    image: pumpkin,
    buyPrice: 1,
    sellPrice: 1.8,
    landRequired: 5,
    harvestMinutes: 4 * 60,
  },
  {
    fruit: Fruit.Cauliflower,
    name: "Cauliflower",
    image: cauliflower,
    buyPrice: 4,
    sellPrice: 8,
    landRequired: 11,
    harvestMinutes: 8 * 60,
  },
  {
    fruit: Fruit.Parsnip,
    name: "Parsnip",
    image: parsnip,
    buyPrice: 10,
    sellPrice: 16,
    landRequired: 14,
    harvestMinutes: 24 * 60,
  },
  {
    fruit: Fruit.Radish,
    name: "Radish",
    image: radish,
    buyPrice: 50,
    sellPrice: 80,
    landRequired: 17,
    harvestMinutes: 3 * 24 * 60,
  },
];

export function getFruit(fruit: Fruit) {
  return FRUITS.find((item) => item.fruit === fruit);
}

// Apply the market rate against to get the current buy and sell prices
export function getMarketFruits(marketRate: number) {
  console.log({ marketRate });
  return FRUITS.map((fruit) => ({
    ...fruit,
    buyPrice: Big(fruit.buyPrice).div(marketRate).toNumber(),
    sellPrice: Big(fruit.sellPrice).div(marketRate).toNumber(),
  }));
}
