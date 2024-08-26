import React, { useEffect, useRef, useState } from "react";
import "./SnippingTool.css";

const mouseDown = {
  x: 0,
  y: 0,
};

const mouse = {
  x: 0,
  y: 0,
  mouseDown: false,
};

function SnippingTool({ isOpen, close = () => {}, onImageCapture = () => {} }) {
  let [captureStream, setCaptureStream] = useState(null);
  const videoRef = useRef();
  const canvasRef = useRef();
  useEffect(() => {
    if (isOpen && videoRef.current) {
      handleCapture();

      const mouseDownEvent = (e) => {
        if (e.target.id === "video") {
          mouseDown.x = e.offsetX;
          mouseDown.y = e.offsetY;
          mouse.mouseDown = true;
        }
      };
      const mouseUpEvent = (e) => {
        mouse.mouseDown = false;
        handleScreenShot();
      };
      const mouseMoveEvent = (e) => {
        if (mouse.mouseDown) {
          mouse.x = e.offsetX;
          mouse.y = e.offsetY;
          let ctx = canvasRef.current.getContext("2d");
          ctx.clearRect(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height,
          );
          ctx.strokeStyle = "red";
          ctx.beginPath();
          ctx.rect(
            mouseDown.x,
            mouseDown.y,
            Math.abs(mouseDown.x - mouse.x),
            Math.abs(mouseDown.y - mouse.y),
          );
          ctx.stroke();
        }
      };

      videoRef.current.addEventListener("mousedown", mouseDownEvent);

      videoRef.current.addEventListener("mousemove", mouseMoveEvent);

      videoRef.current.addEventListener("mouseup", mouseUpEvent);

      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener("mousedown", mouseDownEvent);
          videoRef.current.removeEventListener("mouseup", mouseUpEvent);
          videoRef.current.removeEventListener("mousemove", mouseMoveEvent);
        }
      };
    }
  }, [isOpen]);

  const handleScreenShot = () => {
    const canvas = document.createElement("canvas");
    canvas.width = Math.abs(mouseDown.x - mouse.x);
    canvas.height = Math.abs(mouseDown.y - mouse.y);
    canvas
      .getContext("2d")
      .drawImage(
        videoRef.current,
        mouseDown.x,
        mouseDown.y,
        Math.abs(mouseDown.x - mouse.x),
        Math.abs(mouseDown.y - mouse.y),
        0,
        0,
        Math.abs(mouseDown.x - mouse.x),
        Math.abs(mouseDown.y - mouse.y),
      );
    const dataUrl = canvas.toDataURL();

    onImageCapture({ imageDataUrl: dataUrl });
    close();
    captureStream.getTracks().forEach((track) => {
      track.stop();
    });
  };
  const handleCapture = async () => {
    try {
      captureStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false,
      });

      setCaptureStream(captureStream);
      videoRef.current.srcObject = captureStream;

      setTimeout(() => {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
      }, 500);
    } catch (err) {
      return err
    }
  };
  return isOpen ? (
    <div className="snipping-tool-modal">
      <button onClick={handleCapture} className="snipping-tool-btn">
        Capture
      </button>
      <button onClick={close} className="snipping-tool-btn">
        Close
      </button>
      <br />
      <canvas
        ref={canvasRef}
        height={0}
        width={0}
        style={{
          position: "absolute",
          border: "2px solid red",
        }}
      ></canvas>
      <video id="video" autoPlay={true} ref={videoRef} />
    </div>
  ) : null;
}

export default SnippingTool;
