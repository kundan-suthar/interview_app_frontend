import React, { useMemo } from "react"
import Countdown from "react-countdown"

interface CountDownProps {
    initialMinutes?: number
    onComplete?: () => void
}

const CountDown: React.FC<CountDownProps> = ({
    initialMinutes = 0.1,
    onComplete
}) => {
    const endTime = useMemo(() => Date.now() + initialMinutes * 60 * 1000, [initialMinutes]);

    const renderer = useMemo(() => ({ minutes, seconds, completed }: { minutes: number, seconds: number, completed: boolean }) => {
        if (completed) {
            return null;
        } else {
            // Render a countdown
            return (
                <span>
                    {minutes}:{seconds}{" "}
                </span>
            );
        }
    }, []);

    return (
        <Countdown
            date={endTime}
            renderer={renderer}
            onComplete={onComplete}
        />
    )
}

export default CountDown