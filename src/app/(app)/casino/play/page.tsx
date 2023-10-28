"use client"
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { getGameIFrame } from '@/api';
import { useRef } from 'react';  // import useRef
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExpand, faExternalLink } from '@fortawesome/free-solid-svg-icons'


function Home(props:any) {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const id = useSearchParams()?.get("id");
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  var [IFrame, setIFrame] = useState("") as any;
  // const { id } = router.query;

  // useEffect(() => {
  //   setIsMounted(true);  // set component as mounted after it has rendered
  // }, []);

  // if (!isMounted) {
  //   return null;  // or return a loading spinner or any placeholder
  // }


  const { data: session } = useSession()
  const userdata = session as any;

    useEffect(() => {
      const fetchIFrame = async () => {
        let token = userdata?.user?.token;
        console.log('token', token)
        if(token){
          let response = await getGameIFrame(token, id);
          if (response.ok) {
            var result = await response.json();
            result = result.data;
            console.log('link', result);
            setIFrame(result);
          }
        }
      }
    fetchIFrame();
  }, []);  // <-- Empty dependency array ensures this effect runs only once.
  
  const toggleFullScreen = () => {
    const iframe: any = iframeRef.current;
    if (iframe) {
      if (!document.fullscreenElement) {
        iframe.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  }


  const openInNewTab = () => {
    window.open(IFrame, '_blank');
  }


  return (
    <div className="flex h-screen justify-center mt-10">
        <div className="relative w-[1125px] h-[670px]">
          <div className="banner mt-2.5 p-2.5 text-center text-white rounded-sm font-bold" style={{ 
              background: 'linear-gradient(135deg, #3F4D32 0%, #383838 400px)' 
          }}>
        </div>
        <div className="relative w-full" style={{ paddingBottom: "65%" }}>

            <iframe 
                ref={iframeRef}
                className="absolute top-0 left-0 w-full h-full border-0"
                src={IFrame !== "" ? IFrame : "about:blank"}
                frameBorder="0"
                allowFullScreen>

            </iframe> 

        </div>

        
        <div className="footer mt-0 p-2.5 text-center text-white rounded-sm font-bold" style={{ 
            background: 'linear-gradient(135deg, #3F4D32 0%, #383838 400px)' 
        }}>
        </div>

            <button 
                onClick={toggleFullScreen} 
                style={{ 
                    position: 'absolute', 
                    top: '10px', 
                    right: '10px', 
                    zIndex: 2000, 
                    color: 'white',
                    padding: '5px 10px',
                    borderRadius: '5px',
                    border: 'none',
                    cursor: 'pointer'
                }}>
                  <FontAwesomeIcon icon={faExpand} />
            </button>
            <button 
                onClick={openInNewTab} 
                style={{ 
                    position: 'absolute', 
                    top: '10px', 
                    right: '40px', 
                    zIndex: 2000, 
                    color: 'white',
                    padding: '5px 10px',
                    borderRadius: '5px',
                    border: 'none',
                    cursor: 'pointer'
                }}>
                  <FontAwesomeIcon icon={faExternalLink} />
            </button>
        </div>
    </div>
  );

}

export default Home;
