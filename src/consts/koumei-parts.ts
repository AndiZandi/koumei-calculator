export interface KoumeiPart {
  name: string;
  displayName: string;
  purchasePrice: number;
  buildCost?: number;
}

interface BaseKoumeiItem {
  name: string;
  displayName: string;
  image?: string;
}

type BaseKoumeiItemWithSubItems = BaseKoumeiItem & {
  subItems: KoumeiPart[];
  purchasePrice?: never;
};

type BaseKoumeiItemWithDirectPurchasePrice = BaseKoumeiItem & {
  purchasePrice: number;
  subItems?: never;
};

// Only subItems OR purchasePrice, never both
export type KoumeiItem =
  | BaseKoumeiItemWithSubItems
  | BaseKoumeiItemWithDirectPurchasePrice;

export function isKoumeiItemWithSubItems(
  item: KoumeiItem
): item is BaseKoumeiItemWithSubItems {
  return 'subItems' in item && Array.isArray(item.subItems);
}

export const koumeiItems: KoumeiItem[] = [
  {
    name: 'koumei',
    displayName: 'Koumei',
    image: '/KoumeiFull.webp',
    subItems: [
      {
        name: 'koumei-blueprint',
        displayName: 'Koumei',
        purchasePrice: 165,
        buildCost: 30,
      },
      {
        name: 'neuroptics',
        displayName: 'Koumei Neuroptics',
        purchasePrice: 55,
        buildCost: 24,
      },
      {
        name: 'chassis',
        displayName: 'Koumei Chassis',
        purchasePrice: 55,
        buildCost: 24,
      },
      {
        name: 'systems',
        displayName: 'Koumei Systems',
        purchasePrice: 55,
        buildCost: 24,
      },
    ],
  },
  {
    name: 'koumei-helminth',
    displayName: 'Koumei Helminth Copy',
    image: '/KoumeiFull.webp',
    subItems: [
      {
        name: 'koumei-blueprint-helminth',
        displayName: 'Koumei - Helminth',
        purchasePrice: 165,
        buildCost: 30,
      },
      {
        name: 'neuroptics-helminth',
        displayName: 'Koumei Neuroptics - Helminth',
        purchasePrice: 55,
        buildCost: 24,
      },
      {
        name: 'chassis-helminth',
        displayName: 'Koumei Chassis - Helminth',
        purchasePrice: 55,
        buildCost: 24,
      },
      {
        name: 'systems-helminth',
        displayName: 'Koumei Systems - Helminth',
        purchasePrice: 55,
        buildCost: 24,
      },
    ],
  },
  {
    name: 'higasa',
    displayName: 'Higasa',
    image: '/Higasa.webp',
    subItems: [
      {
        name: 'higasa-blueprint',
        displayName: 'Higasa',
        purchasePrice: 135,
        buildCost: 5,
      },
      {
        name: 'higasa-barrel',
        displayName: 'Higasa Barrel',
        purchasePrice: 45,
        buildCost: 14,
      },
      {
        name: 'higasa-receiver',
        displayName: 'Higasa Receiver',
        purchasePrice: 45,
        buildCost: 14,
      },
      {
        name: 'higasa-stock',
        displayName: 'Higasa Stock',
        purchasePrice: 45,
        buildCost: 14,
      },
    ],
  },
  {
    name: 'amanata',
    displayName: 'Amanata',
    image: '/Amanata.webp',
    subItems: [
      {
        name: 'amanata-blueprint',
        displayName: 'Amanata',
        purchasePrice: 135,
        buildCost: 5,
      },
      {
        name: 'amanata-blade1',
        displayName: 'Amanata Blade #1',
        purchasePrice: 45,
        buildCost: 14,
      },
      {
        name: 'amanata-blade2',
        displayName: 'Amanata Blade #2',
        purchasePrice: 45,
        buildCost: 14,
      },
      {
        name: 'amanata-handle',
        displayName: 'Amanata Handle',
        purchasePrice: 45,
        buildCost: 14,
      },
    ],
  },
  {
    name: 'amanata-mod',
    displayName: 'Amanata Pressure Mod',
    image: '/AmanataPressureMod.webp',
    purchasePrice: 150,
  },
  {
    name: 'higasa-mod',
    displayName: 'Higasa Serration Mod',
    image: '/HigasaSerrationMod.webp',
    purchasePrice: 150,
  },
  {
    name: 'koumei-decoration',
    displayName: 'Koumei Decoration',
    purchasePrice: 200,
    image: '/koumeiDeco.jpg',
  },
] as const;

export type KoumeiItemName = (typeof koumeiItems)[number]['name'];

type ItemsWithSubItems = Extract<
  (typeof koumeiItems)[number],
  { subItems: readonly KoumeiPart[] }
>;
export type KoumeiSubItemName = ItemsWithSubItems['subItems'][number]['name'];
