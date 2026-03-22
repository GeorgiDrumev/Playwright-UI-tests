export type { ProductData } from "@dtos/product.dto";
import type { ProductData } from "@dtos/product.dto";

export const INVALID_PRODUCT_ID = 999;

export const expectedProducts: ProductData[] = [
  {
    id: 4,
    name: "Sauce Labs Backpack",
    price: 29.99,
    description:
      "carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.",
    imageName: "sauce-backpack-1200x1500.0a0b85a3.jpg",
  },
  {
    id: 0,
    name: "Sauce Labs Bike Light",
    price: 9.99,
    description:
      "A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.",
    imageName: "bike-light-1200x1500.37c843b0.jpg",
  },
  {
    id: 1,
    name: "Sauce Labs Bolt T-Shirt",
    price: 15.99,
    description:
      "Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.",
    imageName: "bolt-shirt-1200x1500.c2599ac5.jpg",
  },
  {
    id: 5,
    name: "Sauce Labs Fleece Jacket",
    price: 49.99,
    description:
      "It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.",
    imageName: "sauce-pullover-1200x1500.51d7ffaf.jpg",
  },
  {
    id: 2,
    name: "Sauce Labs Onesie",
    price: 7.99,
    description:
      "Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel.",
    imageName: "red-onesie-1200x1500.2ec615b2.jpg",
  },
  {
    id: 3,
    name: "Test.allTheThings() T-Shirt (Red)",
    price: 15.99,
    description:
      "This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.",
    imageName: "red-tatt-1200x1500.30dadef4.jpg",
  },
];
