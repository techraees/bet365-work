"use client"
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { getGameIFrame } from '@/api';
import { useRef } from 'react';  // import useRef
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExpand } from '@fortawesome/free-solid-svg-icons'

function Home(props:any) {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const id = useSearchParams()?.get("id");
  var [IFrame, setIFrame] = useState("") as any;
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
          // setSlots(slotsData.data);
        }

      }
    }
    fetchIFrame();
  }, [userdata]);

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

  return (
    <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ position: 'relative', width: '1125px', height: '670px' }}>
          <div className="banner" style={{
            marginTop: '10px',
            padding: '10px',
            background: 'linear-gradient(135deg, #3F4D32 0%, #383838 400px)',
            textAlign: 'center',
            color: 'white',
            borderRadius: '1px',
            fontWeight: 'bold',
        }}>
            KETHEA
        </div>
            <iframe 
                ref={iframeRef}
                width="1125" 
                height="670" 
                src={IFrame !== "" ? IFrame : "about:blank"}
                frameBorder="0" 
                allowFullScreen>
            </iframe>

        <div className="footer" style={{
            marginTop: '0px',
            padding: '10px',
            background: 'linear-gradient(135deg, #3F4D32 0%, #383838 400px)',
            textAlign: 'center',
            color: 'white',
            borderRadius: '1px',
            fontWeight: 'bold',
        }}>
          KETHEA
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
        </div>
    </div>
  );

}

export default Home;
