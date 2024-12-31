import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import UpdateModal from "./UpdateModal";
import AddModal from "./AddModal";
import EventCard from './EventCard';

const AllEvents = (props) => {
    //initialisations
    const { toast } = useToast();
    const [Event, setEvent] = useState({
        id: 0,
        EventName: "",
        EventDesc: "",
        EventStTime: "",
        EventEndTime: "",
        EventDate: props.date,
        EventMonth: "",
        Tag: ""
    });
    const [EventArray, setEventArray] = useState([]);
    const [open, setOpen] = useState(false); // State to manage dialog visibility
    // fetching events
    useEffect(() => {
        if (document.getElementById("monthname")) {
            const txt = document.getElementById("monthname").innerText;
            setEvent((prevEvent) => ({
                ...prevEvent,
                EventDate: props.date, // Ensure this is set each time
                EventMonth: txt,       // Set the updated Month value
            }));
        }
        setEventArray([]);
        const arr = JSON.parse(localStorage.getItem("AllEvents"));
        const filteredEvents = arr.filter((ele) => ele.EventDate === props.date);
        setEventArray(filteredEvents);
    }, [props.date]);

    // add logic
    const onChange = (e) => {
        setEvent({ ...Event, [e.target.name]: e.target.value });
    };

    const onsubmit = (e) => {
        e.preventDefault();
        const AllEvents = JSON.parse(localStorage.getItem("AllEvents"));
        // overlapping event check
        const overlapevent = AllEvents.find((item) => {
            return (item.EventDate === Event.EventDate && item.EventMonth === Event.EventMonth && item.EventStTime === Event.EventStTime && item.EventEndTime === Event.EventEndTime)
        })
        if (overlapevent) {
            toast({
                title: "Error! Event Overlap.",
                description: "You cannot add 2 overlapping events.",
                className: "bg-white",
            });
        }
        else {
            Event.id = uuidv4();
            localStorage.setItem("AllEvents", JSON.stringify([...AllEvents, Event]));
            setEventArray([...EventArray, Event])
            // Show toast message
            toast({
                title: "Success! Added.",
                description: "Event was successfully saved.",
                className: "bg-white",
            });

            // Close the dialog after submission
            setOpen(false);
        }
    };
    // Deletion Code
    const deleteEvent = (id) => {
        const events = JSON.parse(localStorage.getItem("AllEvents"))
        let newarr = events.filter((item) => {
            return item.id !== id;
        });
        localStorage.setItem("AllEvents", JSON.stringify(newarr));
        newarr = newarr.filter((item) => {
            return item.EventDate === props.date
        })
        setEventArray(newarr);
        toast({
            title: "Success! Deleted.",
            description: "Event was successfully Deleted.",
            className: "bg-white",
        });
    }

    // Updation Code
    const [UpdationEvent, setUpdationEvent] = useState(null);
    const [OpenUMod, setOpenUMod] = useState(false)
    const fetchEvent = (id) => {
        const events = JSON.parse(localStorage.getItem("AllEvents"));
        const event = events.find((item) => item.id === id);
        if (event) {
            setUpdationEvent(event);
            setOpenUMod(true);
        }
    }
    const onUpdateChg = (e) => {
        setUpdationEvent({ ...UpdationEvent, [e.target.name]: e.target.value });
    }
    const update = (e) => {
        e.preventDefault();
        let events = JSON.parse(localStorage.getItem("AllEvents"))
        const event = events.find((item) => {
            return item.id === UpdationEvent.id;
        })
        events[events.indexOf(event)] = UpdationEvent;
        localStorage.setItem("AllEvents", JSON.stringify(events));
        events = events.filter((item) => { return item.EventDate === props.date })
        setEventArray(events);
        setOpenUMod(false);
        toast({
            title: "Success! Updated.",
            description: "Event was successfully Updated.",
            className: "bg-white",
        });
    }

    //search logic
    const [Query, setQuery] = useState("");
    const onSearch = (e) => {
        setQuery(e.target.value)
    }
    const search = () => {
        const events = JSON.parse(localStorage.getItem("AllEvents"));
        const event = events.filter((item) => {
            return item.EventName.toLowerCase() === Query.toLowerCase();
        })
        setQuery(event);
    }

    //export as json logic
    const ExportAsJSON = (e) => {
        e.preventDefault();
        const events = JSON.parse(localStorage.getItem("AllEvents"));
        const montheve = events.filter((item) => {
            return item.EventMonth === Event.EventMonth
        })
        if (montheve.length !== 0) {
            const jsondata = JSON.stringify(montheve, null, 2);
            const blob = new Blob([jsondata], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `Events${Event.EventMonth}.json`;
            a.click();

            // Clean up the URL object
            URL.revokeObjectURL(url);
        }
        else {
            toast({
                title: "Error! No Data.",
                description: "Please add events to download them.",
                className: "bg-white",
            });
        }
    }
    return (
        <>
            <div className="all-events text-gray-200 w-3/5">
                <div className="header flex justify-between items-center my-20 pl-12 pr-20">
                    <h1 className="text-3xl text-center font-semibold">Events Added</h1>
                    <div className="search flex w-fit items-center">
                        <input type="text" className='w-64 h-8 rounded-l-lg bg-transparent border border-gray-700 px-6 focus:outline-none border-r-0 focus:ring focus:ring-gray-700' placeholder='Search by Name' name="query" id="query" autoComplete='off' value={!Array.isArray(Query) ? Query : ""} onChange={onSearch} />
                        <button className='border border-gray-700 border-l-0 py-[5.2px] rounded-r-lg pr-4' onClick={search}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 opacity-50 hover:opacity-70">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        </button>

                    </div>
                </div>
                <div className={`events flex flex-wrap items-center w-full justify-center overflow-y-scroll h-72 ${EventArray.length !== 0 ? "block" : "hidden"}`}>

                    {EventArray.length !== 0 && !Array.isArray(Query) ?
                        EventArray.map((item, index) => {
                            return (
                                <EventCard key={index} event={item} deleteEvent={deleteEvent} fetchEvent={fetchEvent} />
                            );
                        })
                        : Query.length !== 0 ? Query.map((item, index) => {
                            return (
                                <EventCard key={index} event={item} deleteEvent={deleteEvent} fetchEvent={fetchEvent} />
                            );
                        }) : "No events match the given name"}
                </div>
                <div className="w-fit mx-auto">
                    {/* dialog to update an event */}
                    <UpdateModal props={{
                        OpenUMod,
                        setOpenUMod,
                        UpdationEvent,
                        onUpdateChg,
                        update
                    }} />
                    {/* dialog to add an event */}
                    <AddModal props={{
                        open,
                        setOpen,
                        Event,
                        onChange,
                        onsubmit
                    }} />
                    {/* export as json button */}
                    <button className={`border border-gray-700 absolute rounded-md px-2 py-2 hover:bg-gray-800 hover:border-0 ${EventArray.length!==0?"bottom-16":"bottom-[22.2rem]"}`} onClick={ExportAsJSON}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.5} stroke="currentColor" className="size-36">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
                        </svg>

                    </button>
                    <p className='text-gray-50 -mt-[94px] ml-44'>Export as JSON</p>
                </div>
            </div>
            <Toaster />
        </>
    );
};

export default AllEvents;
