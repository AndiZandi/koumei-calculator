import {
  KoumeiItem,
  koumeiItems,
  KoumeiPart,
  KoumeiSubItemName,
} from '@/consts/koumei-parts';

export const calculateItemCost = (item?: KoumeiItem): number => {
  if (!item) return 0;

  const itemPrice = item?.purchasePrice || 0;
  const subItemsPrice =
    item?.subItems?.reduce((subAcc, subItem) => {
      return subAcc + (subItem.buildCost || 0) + (subItem.purchasePrice || 0);
    }, 0) || 0;

  return itemPrice + subItemsPrice;
};

export const getSubitemBySubItemName = (
  subItemName: KoumeiSubItemName
): KoumeiPart | undefined => {
  for (const item of koumeiItems) {
    const subItem = item.subItems?.find(
      (subItem) => subItem.name === subItemName
    );
    if (subItem) {
      return subItem;
    }
  }
  return undefined;
};

export const getToRemoveItemsAndNewItems = (
  itemName:
    | 'koumei-blueprint'
    | 'koumei-blueprint-helminth'
    | 'higasa-blueprint'
    | 'amanata-blueprint'
): {
  removeItems: string[];
  newItems: { name: string; status: 'crafted' | 'blueprint' }[];
} => {
  const item = koumeiItems.find((i) =>
    i.subItems?.map((s) => s.name).includes(itemName)
  );

  return {
    removeItems: item?.subItems?.map((s) => s.name) || [],

    newItems:
      item?.subItems
        ?.map((s) => s.name)
        .map((name) => ({ name, status: 'crafted' })) || [],
  };
};

export const getCompleteItemToRemoveAsWell = (
  subItem:
    | 'neuroptics'
    | 'chassis'
    | 'systems'
    | 'neuroptics-helminth'
    | 'chassis-helminth'
    | 'systems-helminth'
    | 'higasa-barrel'
    | 'higasa-receiver'
    | 'higasa-stock'
    | 'amanata-blade1'
    | 'amanata-blade2'
    | 'amanata-handle'
) => {
  switch (subItem) {
    case 'neuroptics':
    case 'chassis':
    case 'systems':
      return 'koumei-blueprint';
    case 'neuroptics-helminth':
    case 'chassis-helminth':
    case 'systems-helminth':
      return 'koumei-blueprint-helminth';
    case 'higasa-barrel':
    case 'higasa-receiver':
    case 'higasa-stock':
      return 'higasa-blueprint';
    case 'amanata-blade1':
    case 'amanata-blade2':
    case 'amanata-handle':
      return 'amanata-blueprint';
  }
};
