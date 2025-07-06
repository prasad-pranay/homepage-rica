import React, { useEffect, useRef, useState } from 'react'
import VariableProximity from '../reactbit/VariableProximity/VariableProximity'


const Quote = () => {

    const list = ["Stars can't shine without darkness.","Create a life you can’t wait to wake up to.","Do it with passion or not at all.","In the midst of chaos, there is also opportunity.","Be a voice, not an echo.","Dream big. Start small. Act now.","Let your light shine, even if it blinds others.","Every day is a fresh start.","Stay close to what makes you feel alive.","Chase the sun, even if you’ll never catch it."]
    const [randomQuote,SetRandomQuote] = useState("");
    const containerRef = useRef(null);
    
    useEffect(() => {
      SetRandomQuote(list[Math.floor(Math.random() * list.length)]);
    }, [])
    
    return (
        <div
        className='absolute bottom-2'
ref={containerRef}
// style={{position: 'relative'}}
>
  <VariableProximity
    label={randomQuote}
    className={'variable-proximity-demo text-gray-400 cursor-default'}
    fromFontVariationSettings="'wght' 400, 'opsz' 9"
    toFontVariationSettings="'wght' 1000, 'opsz' 40"
    containerRef={containerRef}
    radius={100}
    falloff='linear'
  />
</div>
        // <p className='text-gray-500 absolute bottom-2 '>{randomQuote}</p>
    )
}

export default Quote