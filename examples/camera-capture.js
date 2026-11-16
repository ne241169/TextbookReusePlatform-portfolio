let cameraStream = null;

async function openCamera(videoElement, messageElement) {
  if (!navigator.mediaDevices?.getUserMedia) {
    messageElement.textContent = "カメラ非対応のため、写真選択を使用してください。";
    return;
  }

  try {
    // スマートフォンでは教材を撮りやすい外向きカメラを優先する。
    cameraStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: { ideal: "environment" } },
      audio: false
    });
    videoElement.srcObject = cameraStream;
    await videoElement.play();
  } catch (error) {
    messageElement.textContent = "カメラを起動できません。権限を確認してください。";
  }
}

function captureAndCompress(videoElement, canvasElement) {
  const maxSide = 1024;
  const scale = Math.min(
    1,
    maxSide / Math.max(videoElement.videoWidth, videoElement.videoHeight)
  );

  canvasElement.width = Math.round(videoElement.videoWidth * scale);
  canvasElement.height = Math.round(videoElement.videoHeight * scale);
  canvasElement.getContext("2d").drawImage(
    videoElement,
    0,
    0,
    canvasElement.width,
    canvasElement.height
  );

  // サイズと画質を調整し、通信量と保存容量を抑える。
  return canvasElement.toDataURL("image/jpeg", 0.8);
}

function stopCamera(videoElement) {
  cameraStream?.getTracks().forEach((track) => track.stop());
  cameraStream = null;
  videoElement.srcObject = null;
}
