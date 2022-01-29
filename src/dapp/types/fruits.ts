import Big from "big.js";

import MK1 from "../images/sunflower/fruit.gif";
import MK2 from "../images/potato/fruit.gif";
import MK3 from "../images/beetroot/fruit.gif";
import MK4 from "../images/pumpkin/fruit.gif";
// import cauliflower from "../images/cauliflower/fruit.png";
// import radish from "../images/radish/fruit.png";
// import parsnip from "../images/parsnip/fruit.png";

export enum Fruit {
  None = "0",
  MK1 = "1",
  MK2 = "2",
  MK3 = "3",
  MK4 = "4",
  // Cauliflower = "5",
  // Parsnip = "6",
  // Radish = "7",
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
    fruit: Fruit.MK1,
    name: "MK1",
    image: MK1,
    buyPrice: 0.01,
    sellPrice: 5,
    landRequired: 5,
    harvestMinutes: 5,
  },
  {
    fruit: Fruit.MK2,
    name: "MK2",
    image: MK2,
    buyPrice: 0.1,
    sellPrice: 0.16,
    landRequired: 8,
    harvestMinutes: 2 * 60,
  },
  {
    fruit: Fruit.MK3,
    name: "MK3",
    image: MK3,
    buyPrice: 0.2,
    sellPrice: 0.36,
    landRequired: 11,
    harvestMinutes: 4 * 60,
  },
  {
    fruit: Fruit.MK4,
    name: "MK4",
    image: MK4,
    buyPrice: 0.4,
    sellPrice: 0.8,
    landRequired: 14,
    harvestMinutes: 8 * 60,
  },
  // {
  //   fruit: Fruit.Cauliflower,
  //   name: "Cauliflower",
  //   image: cauliflower,
  //   buyPrice: 4,
  //   sellPrice: 8,
  //   landRequired: 11,
  //   harvestMinutes: 8 * 60,
  // },
  // {
  //   fruit: Fruit.Parsnip,
  //   name: "Parsnip",
  //   image: parsnip,
  //   buyPrice: 10,
  //   sellPrice: 16,
  //   landRequired: 14,
  //   harvestMinutes: 24 * 60,
  // },
  // {
  //   fruit: Fruit.Radish,
  //   name: "Radish",
  //   image: radish,
  //   buyPrice: 50,
  //   sellPrice: 80,
  //   landRequired: 17,
  //   harvestMinutes: 3 * 24 * 60,
  // },
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
