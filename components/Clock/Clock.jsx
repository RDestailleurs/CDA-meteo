import { s } from './Clock.style'
import {Txt} from '../Txt'
import { nowTOHHMM } from '../services/date-services'
import { useEffect, useState } from 'react'
export function Clock(){
    const[time,setTime] = useState(nowTOHHMM())
    useEffect(()=> {
        const interval = setInterval(()=> {
            setTime(nowTOHHMM())
        },1000);
        return () => {
            clearInterval(interval)
        }
    },[time])
    return <>
    <Txt>{time}</Txt>
    </>
}