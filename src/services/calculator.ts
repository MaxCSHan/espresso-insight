import { User } from "../interface/iUser";
import { Product } from "../interface/iProduct";
import { Flavors } from "../interface/iFlavors";
const roastW = 0.5;
const flavorW = (1 - roastW) / 6;
const weight: number[] = [0.5, ...Array(6).fill(flavorW)];

const dotProduct = (vecA: number[], vecB: number[], vecW: number[]): number => {
  let product = 0;
  for (let i = 0; i < vecA.length; i++) {
    product += vecA[i] * vecB[i] * vecW[i];
  }
  return product;
};

const magnitude = (vec: number[], vecW: number[]): number => {
  let sum = 0;
  for (let i = 0; i < vec.length; i++) {
    sum += vec[i] * vec[i] * vecW[i];
  }
  return Math.sqrt(sum);
};

const cosineSimilarity = (
  vecA: number[],
  vecB: number[],
  vecW: number[]
): number => {
  return (
    dotProduct(vecA, vecB, vecW) /
    (magnitude(vecA, vecW) * magnitude(vecB, vecW))
  );
};

const normalize = (vecA: number[]): number[] => {
  const sumReducer = (accumulator: number, currentValue: number) =>
    accumulator + currentValue;
  const sum = vecA.reduce(sumReducer);
  const mean = sum / vecA.length;
  return vecA.map((ele) => ele - mean);
};

const roastToScore = (roast: string): number => {
  const flavorScale = 10;
  const bandwitdh = flavorScale / 3;
  const weight = 1;

  switch (roast) {
    case "light":
      return -1;
    case "medium":
      return 0;
    case "dark":
      return 1;
    default:
      return 0;
  }
};

const flavortoVector = (flavors: Flavors): number[] => {
  return Object.keys(flavors).map((key) => flavors[key as keyof Flavors]);
};

const calcCompatibilityScore = (user: User, product: Product): number => {
  /** w/o roast */
  const vectorUser = [...flavortoVector(user.flavors)];
  /** w/ roast */
  const vectorUser1 = [
    roastToScore(user.roasts),
    ...flavortoVector(user.flavors),
  ];
  /** w/o roast */
  const vectorProduct = [...flavortoVector(product.flavors)];
  /** w/ roast */
  const vectorProduct1 = [
    roastToScore(product.roast),
    ...flavortoVector(product.flavors),
  ];

  /** Non-weighted Score w/o roast */
  const flavorSimilarity = cosineSimilarity(
    vectorUser,
    vectorProduct,
    Array(6).fill(100 / 6)
  );

  /** Weighted Score including roast */
  const flavorSimilarity1 = cosineSimilarity(
    vectorUser1,
    vectorProduct1,
    weight
  );

  return flavorSimilarity1;
};

export { flavortoVector, calcCompatibilityScore };
