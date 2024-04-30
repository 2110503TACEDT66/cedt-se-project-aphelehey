'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './banner.module.css'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useDispatch } from 'react-redux'
import { reset } from '@/redux/features/cartSlice'

export default function Banner() {
    const covers = ['/img/cover.jpg']
    const [index, setindex] = useState(0)
    const router = useRouter()
    const dispatch = useDispatch()

    const { data: session } = useSession()
    console.log(session?.user.token)
    console.log(session?.user.email)

    const debugResetState = () => {
        dispatch(reset(""))
        console.log("resetted state")
    }

    return (
        <div className={styles.banner}>
            <Image src='/img/cover.jpg' alt='cover' fill={true} priority className='object-cover' />
            <div>
                <h1 className='text-5xl font-bold text-white relative top-[200px] z-20 text-center custom-text-shadow'>Seoul Delights</h1>
                <h3 className='text-3xl font-serif text-white z-20 relative text-center top-[200px] custom-text-shadow'>Experience the Taste of Seoul: Where Delights Await!</h3>
            </div>
            {
                session ? <div className='z-30 absolute top-5 right-10 font-semibold text-white text-xl custom-text-shadow' onClick={()=>debugResetState()}> Hello {session.user?.name}</div> : null
            }
            <button className='bg-black text-white border border-white
            font-semibold py-2 px-2 m-2 rounded z-30 absolute bottom-5 right-[40%] left-[40%] 
            hover:bg-white hover:text-black hover:border-transparent'
                onClick={(e) => { e.stopPropagation(); router.push('/car') }}>
                Select Restaurant</button>
        </div>
    )
}

