import { useEffect, useRef } from 'react'
import { Button } from 'react-bootstrap'

const VideoFrame = () => {
  let constraints = {
    video: { width: 225, height: 300 }
  }
  let isFrontCamera = false
  const videoRef = useRef(null)
  const photoRef = useRef(null)
  const stripRef = useRef(null)

  useEffect(() => {
    getVideo()
  })

  const getVideo = async () => {
    setTimeout(async () => {
      await stopVideo()
    }, 1000)
    constraints.video.facingMode = isFrontCamera
      ? 'user'
      : { exact: 'environment' }
    await navigator.mediaDevices
      .getUserMedia(constraints)
      .then(stream => {
        let video = videoRef.current
        video.srcObject = stream
        video.play()
      })
      .catch(err => {
        console.log(err)
      })
  }

  const paintToCanvas = () => {
    let video = videoRef.current
    let photo = photoRef.current
    let ctx = photo.getContext('2d')

    const width = 225
    const height = 300
    photo.width = width
    photo.height = height

    return setInterval(() => {
      ctx.drawImage(video, 0, 0, width, height)
    }, 100)
  }

  const takePhoto = () => {
    let photo = photoRef.current
    let strip = stripRef.current

    const data = photo.toDataURL('image/jpeg')

    const link = document.createElement('a')
    link.href = data
    link.setAttribute('download', 'myWebcam')
    link.innerHTML = `<img src='${data}' alt='thumbnail'/>`
    strip.insertBefore(link, strip.firstChild)
  }

  const stopVideo = async () => {
    constraints.video.facingMode = isFrontCamera ? 'user' : 'environment'
    await navigator.mediaDevices
      .getUserMedia(constraints)
      .then(stream => {
        stream.getTracks().forEach(track => {
          track.stop()
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  const alterCamera = async () => {
    isFrontCamera = !isFrontCamera
    setTimeout(async () => {
      await getVideo()
    }, 1000)
  }

  return (
    <>
      <video
        onCanPlay={() => paintToCanvas()}
        ref={videoRef}
        className="player"
      />
      <br />
      <Button onClick={() => takePhoto()}>Photo</Button>
      <Button onClick={() => alterCamera()}>Alter Camera</Button>
      <canvas ref={photoRef} className="photo" />
      <div className="photo-booth">
        <div ref={stripRef} className="strip" />
      </div>
    </>
  )
}

export default VideoFrame
