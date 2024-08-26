export function getPageForPrint(lessonPlanId, onChangeLoading, signal) {
    return () => {
        onChangeLoading(true);
        fetch(`/api/lessonPlan/download/${lessonPlanId}?isDownload=false`, {
            signal: signal,
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(async (data) => {
                let blobURL = URL.createObjectURL(await data.blob());
                let iframe = document.createElement("iframe"); //load content in an iframe to print later
                document.body.appendChild(iframe);
                iframe.style.display = "none";
                iframe.src = blobURL;
                iframe.onload = function () {
                    setTimeout(function () {
                        iframe.focus();
                        iframe.contentWindow.print();
                    }, 1);
                };
                onChangeLoading(false);
            })
            .catch((e) => {
                onChangeLoading(false);
                return e;
            });
    };
}
