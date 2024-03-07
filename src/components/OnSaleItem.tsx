// define type for onSaleItem we expect to receive from API
type OnSaleItemProps = {
    name: string;
    current_price: number;
    merchant_name: string;
    merchant_logo: string
    post_price_text: string;
    clean_image_url: string
    valid_from: string
    valid_to: string
  };

export default function OnSaleItem({name, current_price, merchant_name, merchant_logo, post_price_text, clean_image_url, valid_from, valid_to}: OnSaleItemProps) {

    if (!current_price) return
    
    // function to show last day of sale
    const showEndsToday = (valid_to: string) => {
        // convert valid_to to Date
        const endDate = new Date(valid_to)
        // set time to 00:00:00:00
        endDate.setHours(0,0,0,0)

        const today = new Date()
        // set time to 00:00:00
        today.setHours(0,0,0,0)

        if (endDate.getTime() === today.getTime()) return true
    }

    // because we get to see a preview of flyers a day before we need to check and indicate it to users
    const showStartsTomorrow = (valid_from: string) => {
        // convert valid_from to Date
        const startDate = new Date(valid_from)

        const today = new Date()
        // set time to 00:00:00:00
        today.setHours(0,0,0,0)
        
        // set tomorrow's date
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
    
        if (startDate.getTime() === tomorrow.getTime()) return true
    }

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
                    {showEndsToday(valid_to) && <p className="text-red-500	">Ends today</p>}
                    {showStartsTomorrow(valid_from) && <p className="text-slate-500	">Starts tomorrow</p>}
                </div>
            </div>
        </li>
    )
}