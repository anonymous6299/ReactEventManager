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
const UpdateModal = ({props}) => {
    const Tag = ["work", "personal", "academic", "social", "finance", "household"];
    return (
        <>
        {/* update event modal,same as add modal */}
            <Dialog open={props.OpenUMod} onOpenChange={props.setOpenUMod}>
                <DialogTrigger>
                </DialogTrigger>
                <DialogContent className="bg-gray-100 border-0">
                <DialogHeader>
                        <div className="flex w-full justify-between mt-2">
                            {/* title and desc */}
                            <div>
                                <DialogTitle>Update an Event</DialogTitle>
                                <DialogDescription>
                                    Date : {props.UpdationEvent?.EventDate} {props.UpdationEvent?.EventMonth}
                                </DialogDescription>
                            </div>

                            {/* tag */}
                            <div>
                                <Select
                                    name="Tag"
                                    value={props.UpdationEvent?.Tag}
                                    onValueChange={(value) => props.onUpdateChg({ target: { name: 'Tag', value } })}
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
                    <div className="time flex w-full justify-between space-x-4">
                        <div className="inpstime flex flex-col space-y-1 w-full ">
                            <label htmlFor="StartTime">Event Starts</label>
                            <input autoComplete="off" type="time" id="StartTime" name="EventStTime" className="border border-gray-300 w-full rounded-md h-10 px-4 focus:outline-none focus:bg-white bg-transparent" value={props.UpdationEvent?.EventStTime} onChange={props.onUpdateChg} />
                        </div>
                        <div className="inpetime flex flex-col space-y-1 w-full ">
                            <label htmlFor="EndTime">Event Ends</label>
                            <input autoComplete="off" type="time" id="EndTime" name="EventEndTime" className="border border-gray-300 w-full rounded-md h-10 px-4 focus:outline-none focus:bg-white bg-transparent" value={props.UpdationEvent?.EventEndTime} onChange={props.onUpdateChg} />
                        </div>
                    </div>
                    <div className="inptname space-y-1">
                        <label htmlFor="EventName" className="text-gray-800">Event Name</label>
                        <input autoComplete="off" type="text" id="EventName" name="EventName" className="border border-gray-300 w-full rounded-md h-10 px-4 focus:outline-none focus:bg-white bg-transparent" value={props.UpdationEvent?.EventName} onChange={props.onUpdateChg} />
                    </div>
                    <div className="inptdesc space-y-1">
                        <label htmlFor="EventDesc" className="text-gray-800">Description</label>
                        <input autoComplete="off" type="text" id="EventDesc" name="EventDesc" className="border border-gray-300 w-full rounded-md h-10 px-4 focus:outline-none focus:bg-white bg-transparent" placeholder="Optional" value={props.UpdationEvent?.EventDesc} onChange={props.onUpdateChg}  />
                    </div>
                    <div className="w-full flex justify-end">
                        <Button className="w-fit disabled:opacity-50" disabled={props.UpdationEvent?.EventName === "" || props.UpdationEvent?.EventEndTime === "" || props.UpdationEvent?.EventStTime === ""} onClick={props.update}>
                            Update
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default UpdateModal