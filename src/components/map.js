import React from 'react'

const Map = ((cityName) => {
  return (
    <>
    <iframe 
        style={{borderRadius: '20px'}}
        width="500" 
        height="460" 
        id="gmap_canvas" 
        src={`https://maps.google.com/maps?q=${cityName.searchValue}&t="+false+"&z=13&ie=UTF8&iwloc=&output=embed`} 
        frameborder="0" 
        scrolling="no" 
        marginheight="0" 
        marginwidth="0">
    </iframe>
    </>
  )
})

export default Map