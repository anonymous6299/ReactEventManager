import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const EventCard = (props) => {
    return (
        <>
        {/* conditional classes for different tags */}
            <Card className={`w-64 flex flex-col border bg-transparent text-gray-50 ${props.event.Tag===""?" border-gray-700":props.event.Tag==="work"?"border-blue-600":props.event.Tag==="personal"?"border-green-600":props.event.Tag==="academic"?"border-purple-600":props.event.Tag==="social"?"border-pink-600":props.event.Tag==="finance"?"border-yellow-600":props.event.Tag==="household"?"border-teal-600":""} shadow-lg hover:shadow-gray-800 my-2 mx-2`}>
                <CardHeader>
                    {/* name as title */}
                    <CardTitle className="text-xl">{props.event.EventName.charAt(0).toUpperCase() + props.event.EventName.slice(1)}</CardTitle>
                    {/* desc in description */}
                    <CardDescription>{props.event.EventDesc !== "" ? props.event.EventDesc : "No Description added."}</CardDescription>
                </CardHeader>
                <CardContent>
                    {/* timings in content with AM/PM logic */}
                    <p><strong>{props.event.EventStTime}</strong> {props.event.EventStTime.slice(0, 2) < 12 ? "AM" : "PM"} - <strong>{props.event.EventEndTime}</strong> {props.event.EventEndTime.slice(0, 2) < 12 ? "AM" : "PM"}</p>
                </CardContent>
                {/* update delete options in footer */}
                <CardFooter className="w-full flex justify-between items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="size-5 hover:fill-gray-600 cursor-pointer" onClick={() => { props.fetchEvent(props.event.id) }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="size-5 hover:fill-gray-600 cursor-pointer" onClick={() => { props.deleteEvent(props.event.id) }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>

                </CardFooter>
            </Card>
        </>
    )
}

export default EventCard