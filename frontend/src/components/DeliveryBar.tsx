import Image from 'next/image'
import Link from "next/link";


export default function DeliveryBar() {
    return (
        <div className='flex flex-row w-auto h-[10vh] w-[35vh] m-2 pt-2 pl-4 pb-2 border-2 rounded-lg border-black bg-slate-200'>
            <div className='pr-5 border-1 rounded-lg w-auto'>
                <Link href={'https://food.grab.com/th/th/restaurants?search=korean-food&support-deeplink=true&searchParameter=korean-food'}>
                    <Image src={'https://drive.google.com/uc?id=1WlIsRboe2u2h5uig0L2Oh0UBnhmfKkEE'}
                        alt='grab' width={0} height={0} sizes='100vh' className='h-[100%] w-fit' />
                </Link>
            </div>
            <div className='pr-5 border-1 rounded-lg w-auto'>
                <Link href={'https://www.foodpanda.co.th/restaurant/u1go/korean-korean-food'}>
                    <Image src={'https://drive.google.com/uc?id=1SesflZc5H_314EyJKBw0J3SpD6E0fGqe'}
                        alt='foodpanda' width={0} height={0} sizes='100vh' className='h-[100%] w-fit' />
                </Link>
            </div>
            <div className='border-1 rounded-lg w-auto'>
                <Link href={'https://lineman.line.me/line-man-food-kimju-liff/'}>
                    <Image src={'https://drive.google.com/uc?id=12XnWJlgeHRMzmJJlkcjH4QpyaQ730fYp'}
                        alt='lineman' width={0} height={0} sizes='100vh' className='h-[100%] w-fit' />
                </Link>
            </div>
        </div>
    )
}