// define type for onSaleItem we expect to receive from API
type OnSaleItemProps = {
    name: string;
    current_price: number;
    merchant_name: string;
    post_price_text: string;
  };

export default function OnSaleItem({name, current_price, merchant_name, post_price_text}: OnSaleItemProps) {

    if (!current_price) return

    return (
        <li className="border">
            <p>{name}</p>
            <p>{current_price} {post_price_text}</p>
            <p>{merchant_name}</p>
        </li>
    )
}