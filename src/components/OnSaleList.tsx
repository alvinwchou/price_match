import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

// define type for onSaleItem we expect to receive from API
type OnSaleItem = {
  name: string;
  current_price: number;
  merchant_name: string;
};

type OnSaleList = {
  itemName: string;
};

export default function OnSaleList({ itemName }: OnSaleList) {
  const [onSaleItems, setOnSaleItems] = useState<OnSaleItem[]>([]);

  useEffect(() => {
    axios({
      url: `https://backflipp.wishabi.com/flipp/items/search?locale=en-ca&postal_code=m1w2z6&q=${itemName}`,
    }).then((apiData: AxiosResponse<any>) => {
      // console.log(apiData.data.items);
      setOnSaleItems(apiData.data.items);
    })
  }, [itemName]);

  return (
    <li className="flex flex-col justify-between p-4 border rounded">
      <p>{itemName}</p>
      <ul>
        {onSaleItems.map((onSaleItem) => {
          return (
            <li>
              <p>{onSaleItem.name}</p>
              <p>{onSaleItem.current_price}</p>
              <p>{onSaleItem.merchant_name}</p>
            </li>
          );
        })}
      </ul>
    </li>
  );
}
