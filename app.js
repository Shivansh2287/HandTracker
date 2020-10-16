 const modelParams = {
  flipHorizontal: true,   // flip e.g for video 
  imageScaleFactor: 0.7,  // reduce input image size for gains in speed.
  maxNumBoxes: 20,        // maximum number of boxes to detect
  iouThreshold: 0.5,      // ioU threshold for non-max suppression
  scoreThreshold: 0.79,    // confidence threshold for predictions.
}
 




 const video = document.querySelector('#video')
 const audio = document.querySelector('#audio')
 const canvas = document.querySelector('#canvas')
 const context = canvas.getContext('2d')
 let model;

handTrack.startVideo(video)
.then(status=>{
    if(status){
       const option ={
        video:true
    }
    navigator.mediaDevices.getUserMedia(option)
    .then(function(stream){
        video.srcObject=stream
        setInterval(runDetection,1000)
    })
    .catch((error)=>{
        console.log(error)
    })
    }
})



function runDetection(){
handTrack.load(modelParams).then(model => {
     console.log(model)
      model.detect(video).then(predictions => { 
        console.log(predictions)
        if(predictions.length>0){
            audio.play()
        }
        requestAnimationFrame(runDetection)
        
    })
})}