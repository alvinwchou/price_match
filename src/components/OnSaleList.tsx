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
}

export default function OnSaleList({ itemName }: OnSaleListProps) {
  const [onSaleItems, setOnSaleItems] = useState<OnSaleItem[]>([]);

  useEffect(() => {
    axios({
      url: `https://backflipp.wishabi.com/flipp/items/search?locale=en-ca&postal_code=m1w2z6&q=${itemName}`,
    }).then((apiData: AxiosResponse<any>) => {
      console.log(apiData.data.items);
      setOnSaleItems(apiData.data.items);
    })
  }, [itemName]);

  return (
    <li className="flex flex-col justify-between p-4 mb-5 aborder rounded bg-white bg-opacity-50">
      <p>{itemName}</p>
      <ul>
        {onSaleItems.map((onSaleItem, index) => {
          console.log(onSaleItem)
          return (
            <OnSaleItem key={index} {...onSaleItem}/>
          );
        })}
      </ul>
    </li>
  );
}
