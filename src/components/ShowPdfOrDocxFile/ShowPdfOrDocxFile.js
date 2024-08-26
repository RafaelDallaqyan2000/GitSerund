export function ShowPdfOrDocxFile({
    fileName,
    index,
    format,
    href
}) {

    if(!fileName || !href) {
        return null;
    }

    let randomNumber = Math.floor(Math.random());

    return (
        <div key={`${ fileName } ${ index + randomNumber }`}>
            <img
                className="file-icon"
                src={
                    require(( format?.toUpperCase() === "pdf" )
                        ? "../../img/pdf--v1.png"
                        : "../../img/icon_docx.png")
                        .default
                }
                alt="pdf"
            />
            <a
                target="_blank"
                href={href}
            >
                { fileName }
            </a>
        </div>
    )
}
