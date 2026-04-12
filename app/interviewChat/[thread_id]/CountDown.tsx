import { useEffect, useRef, useState } from "react"

interface CountDownProps {
    initialMinutes?: number
    onComplete?: () => void
}

const CountDown: React.FC<CountDownProps> = ({
    initialMinutes = 0.1,
    onComplete
}) => {
    const [time, setTime] = useState<number>(initialMinutes * 60)
    const [isActive, setIsActive] = useState<boolean>(true)
    const hasRun = useRef(false)
    useEffect(() => {
        if (hasRun.current) return
        let interval: NodeJS.Timeout | null = null

        if (isActive && time > 0) {
            interval = setInterval(() => {
                setTime((prevTime: number) => prevTime - 1)
            }, 1000)
        } else if (time === 0) {
            setIsActive(false)
            onComplete?.() // Call callback if provided
            hasRun.current = true
        }

        return () => {
            if (interval) clearInterval(interval)
        }
    }, [isActive, time, onComplete])

    const formatTime = (seconds: number): string => {
        const minutes: number = Math.floor(seconds / 60)
        const remainingSeconds: number = seconds % 60
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
    }

    return (
        <>
            {formatTime(time)}
        </>
    )
}

export default CountDown