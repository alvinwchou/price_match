interface ExcludeListProps {
    excludeItem: string;
}

export default function ExcludeList({ excludeItem }: ExcludeListProps) {
    return (
        <div className="flex justify-between items-center border-b py-1">
            <li className="text-xs">{excludeItem}</li>
            <button className="border rounded p-1 text-xs">Add&nbsp;Back</button>
        </div>
    )
}

