'use client';

import { DisplayItem } from '@/app/_components/DisplayItem';
import { FatePearls } from '@/app/_components/FatePearls';
import {
  isKoumeiItemWithSubItems,
  KoumeiItemName,
  koumeiItems,
  KoumeiSubItemName,
} from '@/consts/koumei-parts';
import {
  calculateItemCost,
  getCompleteItemToRemoveAsWell,
  getSubitemBySubItemName,
  getToRemoveItemsAndNewItems,
} from '@/utils/utils';
import React from 'react';

export default function Home() {
  const [want, setWant] = React.useState<KoumeiItemName[]>([]);
  const [have, setHave] = React.useState<
    {
      name: KoumeiItemName | KoumeiSubItemName;
      status: 'crafted' | 'blueprint';
    }[]
  >([]);

  const [totalPearlsNeeded, setTotalPearlsNeeded] = React.useState(0);
  const [ownedFatePearls, setOwnedFatePearls] = React.useState(0);
  const [ownedPartsValue, setOwnedPartsValue] = React.useState(0);

  const [wantedKoumeiItems, setWantedKoumeiItems] = React.useState<
    (typeof koumeiItems)[number][]
  >([]);

  const toggleItemWant = (itemName: KoumeiItemName) => {
    if (want.includes(itemName)) {
      setWant(want.filter((i) => i !== itemName));
    } else {
      setWant([...want, itemName]);
    }
  };

  const itemHave = (itemName: KoumeiItemName | KoumeiSubItemName) => {
    const haveItem = have.find((i) => i.name === itemName);

    if (!haveItem) {
      setHave([
        ...have,
        {
          name: itemName,
          status: koumeiItems.find((i) => i.name === itemName)
            ? 'crafted'
            : 'blueprint',
        },
      ]);
    } else if (haveItem.status === 'blueprint') {
      const specialCases = [
        'koumei-blueprint',
        'koumei-blueprint-helminth',
        'higasa-blueprint',
        'amanata-blueprint',
      ];

      if (specialCases.includes(itemName)) {
        const data = getToRemoveItemsAndNewItems(
          itemName as
            | 'koumei-blueprint'
            | 'koumei-blueprint-helminth'
            | 'higasa-blueprint'
            | 'amanata-blueprint'
        );

        setHave([
          ...have.filter((i) => !data.removeItems.includes(i.name)),
          ...data.newItems,
        ]);
      } else {
        setHave([
          ...have.filter((i) => i.name !== itemName),
          { name: itemName, status: 'crafted' },
        ]);
      }
    } else {
      const specialSpecialCases = [
        'neuroptics',
        'chassis',
        'systems',
        'neuroptics-helminth',
        'chassis-helminth',
        'systems-helminth',
        'higasa-barrel',
        'higasa-receiver',
        'higasa-stock',
        'amanata-blade1',
        'amanata-blade2',
        'amanata-handle',
      ];

      if (specialSpecialCases.includes(itemName)) {
        const parentToRemove = getCompleteItemToRemoveAsWell(
          itemName as
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
        );
        setHave(
          have.filter((i) => i.name !== parentToRemove && i.name !== itemName)
        );
      } else {
        setHave(have.filter((i) => i.name !== itemName));
      }
    }
  };

  React.useEffect(() => {
    const total = want.reduce((acc, itemName) => {
      return (
        acc + calculateItemCost(koumeiItems.find((i) => i.name === itemName))
      );
    }, 0);
    setTotalPearlsNeeded(total);

    setWantedKoumeiItems(
      koumeiItems.filter((item) => want.includes(item.name))
    );
  }, [want]);

  React.useEffect(() => {
    const totalOwnedValue = have.reduce((acc, item) => {
      const koumeiItem = koumeiItems.find((i) => i.name === item.name);

      if (koumeiItem) {
        return acc + (koumeiItem.purchasePrice || 0);
      } else {
        const subItem = getSubitemBySubItemName(item.name);
        if (subItem) {
          // only blueprint
          if (item.status === 'blueprint') {
            return acc + (subItem.purchasePrice || 0);
          }
          // blueprint and crafted
          return acc + (subItem.buildCost || 0) + (subItem.purchasePrice || 0);
        }
        return acc;
      }
    }, 0);
    setOwnedPartsValue(totalOwnedValue);
  }, [have]);

  React.useEffect(() => {
    setHave((prevHave) =>
      prevHave.filter((entry) => {
        // Check if entry is a main item
        if (koumeiItems.some((item) => item.name === entry.name)) {
          return wantedKoumeiItems.some((item) => item.name === entry.name);
        }
        // Otherwise, it's a subitem
        return wantedKoumeiItems.some(
          (item) =>
            isKoumeiItemWithSubItems(item) &&
            item.subItems.some((sub) => sub.name === entry.name)
        );
      })
    );
  }, [wantedKoumeiItems]);

  return (
    <div className='p-8 flex flex-col gap-8 items-center font-lex'>
      <div>
        <h1 className='text-5xl'>Koumei Calculator</h1>
      </div>
      <div className='w-full'>
        <div className='flex gap-4 items-center mb-8'>
          <h2 className='text-3xl'>I want:</h2>
          <button
            onClick={() => setWant(koumeiItems.map((item) => item.name))}
            className='py-2 px-4 bg-red-900 rounded-lg hover:bg-red-800  text-white font-semibold active:bg-red-700'
          >
            Everything!
          </button>
        </div>

        <div className='flex items-center '>
          <FatePearls />
          <p className='text-xl'>
            Fate Pearls needed without any RNG drops: {totalPearlsNeeded}
          </p>
        </div>

        <div className='grid gap-8 grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 mt-4'>
          {koumeiItems.map((item) => (
            <DisplayItem
              key={item.name}
              name={item.name}
              displayName={item.displayName}
              image={item.image || '/KoumeiFull.webp'}
              onClick={() => toggleItemWant(item.name)}
              overlay={want.includes(item.name) ? 'checkmark' : 'none'}
            />
          ))}
        </div>
      </div>
      <div className='w-full mt-8'>
        <div className='flex justify-between'>
          <div>
            <div className='flex gap-4 items-center mb-8'>
              <h2 className='text-3xl'>I have:</h2>
            </div>

            <div>
              <div className='flex gap-2 items-center'>
                <FatePearls />
                <p className='text-xl'>Fate Pearls:</p>
                <input
                  type='number'
                  min={0}
                  max={99999}
                  value={ownedFatePearls}
                  onChange={(e) => setOwnedFatePearls(Number(e.target.value))}
                  className='rounded-lg px-3 py-2 bg-zinc-900 text-white border border-red-700 focus:outline-none focus:ring-2 focus:ring-red-900 transition'
                />
              </div>
              <p className='text-xl'>
                Blueprints/Items in value of: {ownedPartsValue}
              </p>
              <p className='text-xl'>
                Combined value of: {ownedPartsValue + ownedFatePearls}
              </p>
            </div>
          </div>
        </div>

        <div className='grid gap-8 grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7'>
          {wantedKoumeiItems
            .filter((i) => isKoumeiItemWithSubItems(i))
            .map((item) => (
              <React.Fragment key={item.name}>
                {item.subItems?.map((subItem) => (
                  <DisplayItem
                    key={subItem.name}
                    name={subItem.name}
                    displayName={subItem.displayName}
                    image={item.image || '/KoumeiFull.webp'}
                    onClick={() => itemHave(subItem.name)}
                    overlay={
                      have.find((i) => i.name === subItem.name)
                        ? have.find((i) => i.name === subItem.name)?.status ===
                          'blueprint'
                          ? 'blueprint'
                          : 'crafted'
                        : 'none'
                    }
                  />
                ))}
              </React.Fragment>
            ))}
          {wantedKoumeiItems
            .filter((i) => !isKoumeiItemWithSubItems(i))
            .map((item) => (
              <DisplayItem
                key={item.name}
                name={item.name}
                displayName={item.displayName}
                image={item.image || '/KoumeiFull.webp'}
                onClick={() => itemHave(item.name)}
                overlay={
                  have.find((i) => i.name === item.name) ? 'checkmark' : 'none'
                }
              />
            ))}
        </div>
      </div>

      <div className='w-full mt-8'>
        <div>
          <div className='flex gap-4 items-center mb-8'>
            <h2 className='text-3xl'>I need:</h2>
          </div>
          <div>
            <p className='text-xl flex items-center gap-2'>
              {totalPearlsNeeded - (ownedFatePearls + ownedPartsValue)} more
              <FatePearls />
              Fate Pearls, this equals roughly{' '}
              {Math.ceil(
                (totalPearlsNeeded - (ownedFatePearls + ownedPartsValue)) / 16
              )}{' '}
              shrine runs, or{' '}
              {Math.ceil(
                (totalPearlsNeeded - (ownedFatePearls + ownedPartsValue)) / 22
              )}{' '}
              Steelpath runs
            </p>
            <p className='text-xl flex items-center gap-2'>
              {totalPearlsNeeded - ownedPartsValue} total
              <FatePearls />
              Fate Pearls
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
