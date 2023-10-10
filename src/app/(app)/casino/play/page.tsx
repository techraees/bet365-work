"use client"
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { getGameIFrame } from '@/api';

function Home(props:any) {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const id = useSearchParams()?.get("id");
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


  return (
      <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
        <iframe 
          width="1125" 
          height="670" 
          src={IFrame !== "" ? IFrame : "about:blank"}
          frameBorder="0" 
          allowFullScreen>
        </iframe>

    </div>
  );
}

export default Home;
