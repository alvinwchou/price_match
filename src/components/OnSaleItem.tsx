// define type for onSaleItem we expect to receive from API
type OnSaleItemProps = {
    name: string;
    current_price: number;
    merchant_name: string;
  };

export default function OnSaleItem({name, current_price, merchant_name}: OnSaleItemProps) {
    console.log(current_price)
    if (!current_price) return

    return (
        <li className="border">
            <p>{name}</p>
            <p>{current_price}</p>
            <p>{merchant_name}</p>
        </li>
    )
}