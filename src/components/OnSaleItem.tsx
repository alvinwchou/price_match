// define type for onSaleItem we expect to receive from API
type OnSaleItemProps = {
    name: string;
    current_price: number;
    merchant_name: string;
    merchant_logo: string
    post_price_text: string;
    clean_image_url: string
  };

export default function OnSaleItem({name, current_price, merchant_name, merchant_logo, post_price_text, clean_image_url}: OnSaleItemProps) {

    if (!current_price) return

    return (
        <li className="p-4 border rounded bg-white bg-opacity-50">

            {/* header */}
            <div className="flex items-center mb-2">
                {/* image container */}
                <div className="border rounded-full overflow-hidden size-7">
                    <img src={merchant_logo} alt={`${merchant_name}'s logo`} />
                </div>
                {/* text container */}
                <div className="ml-2">
                    <p className="font-medium">{merchant_name}</p>
                </div>
            </div>

            {/* body */}
            <div className="flex items-center gap-2">
                {/* image container */}
                <div className="w-1/3">
                    <img className="w-full" src={clean_image_url} alt={`Image of ${name}`} />
                </div>
                {/* text container */}
                <div className="w-2/3">
                    <p>{name}</p>
                    <p>{current_price} {post_price_text}</p>
                </div>
            </div>
        </li>
    )
}