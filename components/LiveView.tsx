"use client";

import React, { useEffect, useRef, useState } from 'react';

export default function LiveView() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [status, setStatus] = useState<string>('Disconnected');

  useEffect(() => {
    let pc: RTCPeerConnection | null = null;

    const connect = async () => {
      setStatus('Connecting...');
      pc = new RTCPeerConnection();
      
      pc.addTransceiver('video', { direction: 'recvonly' });

      pc.ontrack = (event) => {
        if (videoRef.current && event.streams[0]) {
          videoRef.current.srcObject = event.streams[0];
          setStatus('Connected (Live WebRTC Stream)');
        }
      };

      pc.onconnectionstatechange = () => {
        if (pc?.connectionState === 'connected') {
          setStatus('Connected (Live WebRTC Stream)');
        } else if (pc?.connectionState === 'failed' || pc?.connectionState === 'disconnected') {
          setStatus('Disconnected');
        }
      };

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      try {
        // We port-forwarded the GCP node's 8080 to localhost:8080
        const response = await fetch('http://localhost:8080/offer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sdp: pc.localDescription?.sdp,
            type: pc.localDescription?.type,
          }),
        });

        const answer = await response.json();
        await pc.setRemoteDescription(answer);
      } catch (err) {
        console.error('Failed to connect to WebRTC bridge:', err);
        setStatus('Connection Failed. Is the WebRTC bridge running on port 8080?');
      }
    };

    connect();

    return () => {
      pc?.close();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-900 rounded-lg shadow-xl w-full max-w-5xl mx-auto mt-8">
      <div className="flex w-full justify-between items-center mb-4 px-2">
        <h2 className="text-xl font-bold text-white font-mono flex items-center">
          <span className="mr-2">🔴</span> Glazyr Cloud Browser: Live View
        </h2>
        <div className={`px-3 py-1 rounded text-sm font-semibold ${status.includes('Connected') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
          {status}
        </div>
      </div>
      
      <div className="relative w-full aspect-video bg-black rounded-md overflow-hidden border border-gray-700 shadow-inner">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-contain"
        />
        {status !== 'Connected (Live WebRTC Stream)' && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-500 font-mono">
            Waiting for NeuralChromium_Video stream...
          </div>
        )}
      </div>
    </div>
  );
}
