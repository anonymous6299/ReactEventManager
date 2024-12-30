import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../src/components/ui/button"

const AllEvents = () => {
    return (
        <>
            <div className="all-events text-gray-200 w-3/5">
                <h1 className="text-3xl text-center w-full my-20 font-semibold">Events Added</h1>
                <div className="w-fit mx-auto">
                    <Dialog>
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
                                </DialogDescription>
                            </DialogHeader>
                            <div className="time flex w-full justify-between space-x-4">
                                <div className="inpstime flex flex-col space-y-1 w-full ">
                                    <label htmlFor="StartTime">Event Starts</label>
                                    <input type="time" name="StartTime" id="StartTime" className="border border-gray-300 w-full rounded-md h-10 px-4 focus:outline-none focus:bg-white bg-transparent"/>
                                </div>
                                <div className="inpetime flex flex-col space-y-1 w-full ">
                                    <label htmlFor="EndTime">Event Ends</label>
                                    <input type="time" name="EndTime" id="EndTime" className="border border-gray-300 w-full rounded-md h-10 px-4 focus:outline-none focus:bg-white bg-transparent"/>
                                </div>
                            </div>
                            <div className="inptname space-y-1">
                                <label htmlFor="EventName" className="text-gray-800">Event Name</label>
                                <input type="text" id="EventName" name="EventName" className="border border-gray-300 w-full rounded-md h-10 px-4 focus:outline-none focus:bg-white bg-transparent" />
                            </div>
                            <div className="inptdesc space-y-1">
                                <label htmlFor="EventDesc" className="text-gray-800">Description</label>
                                <input type="text" id="EventDesc" name="EventDesc" className="border border-gray-300 w-full rounded-md h-10 px-4 focus:outline-none focus:bg-white bg-transparent" placeholder="Optional" />
                            </div>
                            <div className="w-full flex justify-end"><Button className="w-fit">Add Event</Button></div>
                        </DialogContent>
                    </Dialog>
                </div>

            </div>
        </>
    )
}

export default AllEvents