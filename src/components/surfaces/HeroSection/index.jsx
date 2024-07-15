import {useRef, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

const HeroSection = ({timeline})=>{
    let title = useRef(null)
    let paragraph = useRef(null)
    let paragraph2 = useRef(null)
    let button = useRef(null)
    let button2 = useRef(null)
    let illustration = useRef(null)
    const navigate = useNavigate()

useEffect(() => {
    timeline.from(title,{
        duration: 0.5,
        opacity: 0,
        y: 100
    }).from(paragraph,{
        duration: 0.6,
        opacity: 0,
        y: 100
    },"-=.5").from(paragraph2,{
        duration: 0.7,
        opacity: 0,
        y: 100
    },"-=.5").from(illustration,{
        duration: 0.5,
        opacity: 0,
        y: 100
    }).from(button, {
        duration: 0.5,
        opacity: 0,
        y: 100
    }
    ).from(button2, {
        duration: 0.5,
        opacity: 0,
        y: 100
    }
    )
   
},[])
    return(
        <div className="grid md:grid-cols-2 items-center justify-center grow w-full bg-secondary">
            <section className="pl-12 py-8 flex flex-col gap-6 ">
                <h4 ref={el => title = el} className="text-[28px] font-[700] text-white font-sans">
                Welcome to PA-K Projects Management Portal
                </h4>
                <p ref={el => paragraph = el} className="text-gray-300 mb-4">
                    The President’s Award - Kenya (PA-K) is an exciting self-development programme established by an Act of Parliament, President’s Award Act No. 30 of 2017. Available to all young people across the country, PA-K equips them with positive life skills to make a difference for themselves, their communities, the country, and the world.
                </p>
               
                <button onClick={()=>navigate('/signup')} ref={el=>button=el} className=' mr-auto py-2 px-6 text-white bg-buttonBg rounded-[2px]'>Get started</button>
            </section> 
            <div className="md:pl-12 py-8 hidden md:flex flex-col " >
                <img ref={el=>illustration = el} src='../assets/hero-illustration.png' alt='Hero Image' className="w-full h-full object-cover" />
            </div>
           
        </div>
    )
}

export default HeroSection;