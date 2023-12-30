/*
import { ClockIcon } from "@heroicons/react/24/solid";

function Timer(props: {
    state?: "inactive" | "active";
    time: { seconds: number; minutes: number; hours: number };
}) {
    return (
        <>
            <div
                className={`cursor-pointer transition-colors gap-2 shadow-md rounded-full flex items-center px-4 py-2 ${
                    props?.state === "inactive" ? "bg-gray-300" : "bg-info-main"
                }`}
            >
                <ClockIcon className="w-6 text-white"></ClockIcon>
                <span className="font-semibold text-white">
 {!!props.time.hours && (
     <>{props.time.hours.toString().padStart(2, "0")}:</>
 )}
                    {props.time.minutes.toString().padStart(2, "0")}:
                    {props.time.seconds.toString().padStart(2, "0")}


            </div>
        </>
);
}

export default Timer;*/
