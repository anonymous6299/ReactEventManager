import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Button } from "../src/components/ui/button";

const AddModal = ({ props }) => {
    //available tags
    const Tag = ["work", "personal", "academic", "social", "finance", "household"];

    return (
        <>
            {/*Dialog Component */}
            <Dialog open={props.open} onOpenChange={props.setOpen}>
                {/* opens the dialog */}
                <DialogTrigger className="w-fit mx-auto my-16 -ml-24 mr-20">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.7} stroke="currentColor" className="border rounded-lg p-2 size-40 border-gray-700 mx-auto hover:bg-gray-800 hover:border-none">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    <p className="text-sm my-2">Click to add events</p>
                </DialogTrigger>

                {/* content */}
                <DialogContent className="bg-gray-100 border-0">
                    {/* header */}
                    <DialogHeader>
                        <div className="flex w-full justify-between mt-2">
                            {/* title and desc */}
                            <div>
                                <DialogTitle>Add an Event</DialogTitle>
                                <DialogDescription>
                                    Date : {props.Event.EventDate} {props.Event.EventMonth}
                                </DialogDescription>
                            </div>

                            {/* tag */}
                            <div>
                                <Select
                                    name="Tag"
                                    value={props.Event.Tag}
                                    onValueChange={(value) => props.onChange({ target: { name: 'Tag', value } })}
                                >
                                    <SelectTrigger className="w-fit">
                                        <SelectValue placeholder="Tag" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {/* Render Tag Options */}
                                        {Tag.map((item, index) => {
                                            return (
                                                <SelectItem key={index} value={item}>
                                                    {item.charAt(0).toUpperCase() + item.slice(1)}
                                                </SelectItem>
                                            );
                                        })}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </DialogHeader>

                    {/* time input */}
                    <div className="time flex w-full justify-between space-x-4">
                        {/* start */}
                        <div className="inpstime flex flex-col space-y-1 w-full ">
                            <label htmlFor="StartTime">Event Starts</label>
                            <input
                                autoComplete="off"
                                type="time"
                                id="StartTime"
                                name="EventStTime"
                                className="border border-gray-300 w-full rounded-md h-10 px-4 focus:outline-none focus:bg-white bg-transparent"
                                value={props.Event.EventStTime}
                                onChange={props.onChange}
                            />
                        </div>

                        {/* end */}
                        <div className="inpetime flex flex-col space-y-1 w-full ">
                            <label htmlFor="EndTime">Event Ends</label>
                            <input
                                autoComplete="off"
                                type="time"
                                id="EndTime"
                                name="EventEndTime"
                                className="border border-gray-300 w-full rounded-md h-10 px-4 focus:outline-none focus:bg-white bg-transparent"
                                value={props.Event.EventEndTime}
                                onChange={props.onChange}
                            />
                        </div>
                    </div>

                    {/* event name */}
                    <div className="inptname space-y-1">
                        <label htmlFor="EventName" className="text-gray-800">Event Name</label>
                        <input
                            autoComplete="off"
                            type="text"
                            id="EventName"
                            name="EventName"
                            className="border border-gray-300 w-full rounded-md h-10 px-4 focus:outline-none focus:bg-white bg-transparent"
                            value={props.Event.EventName}
                            onChange={props.onChange}
                        />
                    </div>

                    {/* desc */}
                    <div className="inptdesc space-y-1">
                        <label htmlFor="EventDesc" className="text-gray-800">Description</label>
                        <input
                            autoComplete="off"
                            type="text"
                            id="EventDesc"
                            name="EventDesc"
                            className="border border-gray-300 w-full rounded-md h-10 px-4 focus:outline-none focus:bg-white bg-transparent"
                            placeholder="Optional"
                            value={props.Event.EventDesc}
                            onChange={props.onChange}
                        />
                    </div>

                    {/* submit */}
                    <div className="w-full flex justify-end">
                        <Button
                            className="w-fit disabled:opacity-50"
                            disabled={
                                props.Event.EventName === "" ||
                                props.Event.EventEndTime === "" ||
                                props.Event.EventStTime === ""
                            }
                            onClick={props.onsubmit}
                        >
                            Add Event
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default AddModal;
