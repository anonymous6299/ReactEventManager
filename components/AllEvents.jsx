import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog";
import { Button } from "../src/components/ui/button";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

const AllEvents = (props) => {
    const { toast } = useToast();
    const [Month, setMonth] = useState("");
    const [Event, setEvent] = useState({
        EventName: "",
        EventDesc: "",
        EventStTime: "",
        EventEndTime: "",
        EventDate: props.date,
        EventMonth: "",
    });

    const [open, setOpen] = useState(false); // State to manage dialog visibility

    useEffect(() => {
        if (document.getElementById("monthname")) {
            const txt = document.getElementById("monthname").innerText;
            setMonth(txt);
            setEvent((prevEvent) => ({
                ...prevEvent,
                EventDate: props.date, // Ensure this is set each time
                EventMonth: txt,       // Set the updated Month value
            }));
        }
    }, [props.date]);

    const onChange = (e) => {
        setEvent({ ...Event, [e.target.name]: e.target.value });
    };

    const onsubmit = (e) => {
        e.preventDefault();
        const AllEvents = JSON.parse(localStorage.getItem("AllEvents")) || [];
        localStorage.setItem("AllEvents", JSON.stringify([...AllEvents, Event]));

        // Show toast message
        toast({
            title: "Success! Added.",
            description: "Event was successfully saved.",
            className: "bg-white",
        });

        // Close the dialog after submission
        setOpen(false);
    };

    return (
        <>
            <div className="all-events text-gray-200 w-3/5">
                <h1 className="text-3xl text-center w-full my-20 font-semibold">Events Added</h1>
                <div className="w-fit mx-auto">
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger className="w-fit mx-auto my-32">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.7} stroke="currentColor" className="border rounded-lg p-2 size-40 border-gray-700 mx-auto hover:bg-gray-800 hover:border-none">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            <p className="text-sm my-2">Click to start adding events</p>
                        </DialogTrigger>
                        <DialogContent className="bg-gray-100 border-0">
                            <DialogHeader>
                                <DialogTitle>Add an Event</DialogTitle>
                                <DialogDescription>
                                    Date : {props.date} {Month}
                                </DialogDescription>
                            </DialogHeader>
                            <div className="time flex w-full justify-between space-x-4">
                                <div className="inpstime flex flex-col space-y-1 w-full ">
                                    <label htmlFor="StartTime">Event Starts</label>
                                    <input type="time" id="StartTime" name="EventStTime" className="border border-gray-300 w-full rounded-md h-10 px-4 focus:outline-none focus:bg-white bg-transparent" value={Event.EventStTime} onChange={onChange} />
                                </div>
                                <div className="inpetime flex flex-col space-y-1 w-full ">
                                    <label htmlFor="EndTime">Event Ends</label>
                                    <input type="time" id="EndTime" name="EventEndTime" className="border border-gray-300 w-full rounded-md h-10 px-4 focus:outline-none focus:bg-white bg-transparent" value={Event.EventEndTime} onChange={onChange} />
                                </div>
                            </div>
                            <div className="inptname space-y-1">
                                <label htmlFor="EventName" className="text-gray-800">Event Name</label>
                                <input type="text" id="EventName" name="EventName" className="border border-gray-300 w-full rounded-md h-10 px-4 focus:outline-none focus:bg-white bg-transparent" value={Event.EventName} onChange={onChange} autoComplete="off"/>
                            </div>
                            <div className="inptdesc space-y-1">
                                <label htmlFor="EventDesc" className="text-gray-800">Description</label>
                                <input type="text" id="EventDesc" name="EventDesc" className="border border-gray-300 w-full rounded-md h-10 px-4 focus:outline-none focus:bg-white bg-transparent" placeholder="Optional" value={Event.EventDesc} onChange={onChange} autoComplete="off"/>
                            </div>
                            <div className="w-full flex justify-end">
                                <Button className="w-fit disabled:opacity-50" disabled={Event.EventName === "" || Event.EventEndTime === "" || Event.EventStTime === ""} onClick={onsubmit}>
                                    Add Event
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <Toaster />
        </>
    );
};

export default AllEvents;
