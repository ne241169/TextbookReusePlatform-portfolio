async function saveReceipt(receiptElement, statusElement) {
  try {
    const canvas = await window.html2canvas(receiptElement, {
      backgroundColor: "#ffffff",
      scale: Math.min(window.devicePixelRatio || 1, 2),
      useCORS: true,
      logging: false
    });

    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
    if (!blob) throw new Error("画像を作成できませんでした。");

    const file = new File([blob], "受け取り控え.png", { type: "image/png" });

    // iOSなど、ファイル共有に対応する端末では共有シートを表示する。
    if (navigator.share && navigator.canShare?.({ files: [file] })) {
      await navigator.share({ files: [file], title: "受け取り控え" });
      statusElement.textContent = "共有画面から画像の保存先を選択してください。";
      return;
    }

    // Web Share APIが使えないPCブラウザなどではダウンロードする。
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = file.name;
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    statusElement.textContent = "受け取り控えを保存しました。";
  } catch (error) {
    if (error?.name === "AbortError") return;
    statusElement.textContent = "保存できない場合はスクリーンショットをご利用ください。";
  }
}
