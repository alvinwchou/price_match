import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import OnSaleItem from "./OnSaleItem";

type OnSaleListProps = {
  itemName: string;
};

type OnSaleItem = {
  name: string;
  current_price: number;
  merchant_name: string;
  merchant_logo: string
  post_price_text: string;
  clean_image_url: string
  valid_from: string
  valid_to: string
}

export default function OnSaleList({ itemName }: OnSaleListProps) {
  const [onSaleItems, setOnSaleItems] = useState<OnSaleItem[]>([]);

  useEffect(() => {
    axios({
      url: `https://backflipp.wishabi.com/flipp/items/search?locale=en-ca&postal_code=m1w2z6&q=${itemName}`,
    }).then((apiData: AxiosResponse<any>) => {
      console.log(apiData.data.items)
      // setOnSaleItems(apiData.data.items);
      findLowestPriced(apiData.data.items)
      // setOnSaleItems(apiData.data.items);

    })
  }, [itemName]);
  // show unique post_price_text
  // useEffect(() => {
  //   axios({
  //     url: `https://backflipp.wishabi.com/flipp/items/search?locale=en-ca&postal_code=m1w2z6&q=FreshCo`,
  //   }).then((apiData: AxiosResponse<any>) => {
  //     // console.log(apiData.data.items);
  //     const test: any[] = []
  //     apiData.data.items.map((item: { post_price_text: any; }) => {
  //       test.push(item.post_price_text)
  //     })
  //     console.log(Array.from(new Set(test)));
      
  //   })
  // }, []);

  // function to find the lowest priced item
  const findLowestPriced = (items: any[]) => {
    let lowestPricedItemInfo
    let lowestPriced = Infinity

    items.map((item: { current_price: number; }) => {
      if (item.current_price && item.current_price < lowestPriced) {
        lowestPriced = item.current_price
        lowestPricedItemInfo = item
      }
    }) 

    if (lowestPricedItemInfo) {
      setOnSaleItems([lowestPricedItemInfo]);
    } else {
      setOnSaleItems([]);
    }
  }
  
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
