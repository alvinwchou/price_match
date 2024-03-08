import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import OnSaleItem from "./OnSaleItem";

type OnSaleListProps = {
  id: string
  itemName: string;
};

type OnSaleItem = {
  id: string
  name: string;
  current_price: number;
  merchant_name: string;
  merchant_logo: string
  post_price_text: string;
  clean_image_url: string
  valid_from: string
  valid_to: string
}

export default function OnSaleList({ id, itemName }: OnSaleListProps) {
  const [onSaleItems, setOnSaleItems] = useState<OnSaleItem[]>([]);

  useEffect(() => {
    axios({
      url: `https://backflipp.wishabi.com/flipp/items/search?locale=en-ca&postal_code=m1w2z6&q=${itemName}`,
    }).then((apiData: AxiosResponse<any>) => {
      console.log(apiData.data.items)
      findLowestPriced(apiData.data.items)
    })
  }, [itemName]);

  // function to find the lowest priced item
  const findLowestPriced = (items: any[]) => {
    let lowestPricedItemInfo
    let lowestPriced = Infinity;
  
    items.forEach((item: any) => {
      // create a variabe that includes the grocery list item id
      const onSaleItem: OnSaleItem = {
        id: id,
        name: item.name,
        current_price: item.current_price,
        merchant_name: item.merchant_name,
        merchant_logo: item.merchant_logo,
        post_price_text: item.post_price_text,
        clean_image_url: item.clean_image_url,
        valid_from: item.valid_from,
        valid_to: item.valid_to
      };
  
      if (item.current_price && item.current_price < lowestPriced) {
        lowestPriced = item.current_price;
        lowestPricedItemInfo = onSaleItem;
      }
    });
  
    if (lowestPricedItemInfo) {
      setOnSaleItems([lowestPricedItemInfo]);
    } else {
      setOnSaleItems([]);
    }
  };
  
  
  return (
    onSaleItems.length != 0 &&
    <li className="flex flex-col justify-between p-4 mb-5 aborder rounded bg-white bg-opacity-50">
      <p>{itemName}</p>
      <ul>
        {onSaleItems.map((onSaleItem, index) => {
          return (
            <OnSaleItem key={index} {...onSaleItem}/>
          );
        })}
      </ul>
    </li>
  );
}
