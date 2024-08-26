import './MobileResponsiveLsnPlan.css';
import { ButtonComment } from "../ButtonComment";
import { useParams } from "react-router-dom";
import { useMemo } from "react";
import { ShowPdfOrDocxFile } from "../ShowPdfOrDocxFile/ShowPdfOrDocxFile";

const exceptTitles = [
    "Դասի նպատակ",
    "Lesson objectives",
    "Դասի ամբողջական պատկեր",
    "Lesson extended picture",
    "Վերջնարդյունքներ",
    "Learning outcomes",
];

export function MobileResponsiveLsnPlan({
    lsnPlanItem,
    typeId,
    commentCount,
}) {

    const { preview } = useParams();

    const isEditorText = useMemo(() => {
        if(( typeof lsnPlanItem?.desc === 'string') && ( lsnPlanItem?.desc?.split('<p').length > 1 ) ) {
            return {
                description: lsnPlanItem?.desc,
                name: lsnPlanItem?.name
            }
        } else if( Array.isArray( lsnPlanItem?.desc ) ) {
            return (
                lsnPlanItem?.desc?.map(el => {
                    if(el?.desc?.split('<p').length > 1) {
                         return {
                            description: `<p style="display: inline" ${el?.desc?.split('<p')[1]} </br>`,
                            name: el?.name,
                             ...el
                         }
                    } else {
                        return lsnPlanItem;
                    }
                })
            )
        }
    }, [ lsnPlanItem ]);


    const files = useMemo(() => {
        return lsnPlanItem?.files?.fileNames?.map(( fileName ) => {
            return {
                fileName,
                urlPath: lsnPlanItem?.files?.urlPath
            }
        })
    },[ lsnPlanItem?.files?.fileNames ])

    let format = "";
    let formatArr = [];

    return (
        <div className='lsn-plan-pdf-item-responsive-container'>
            <div className='lsn-plan-pdf-item-responsive-first-child'>
                <p className='lsn-plan-pdf-item-responsive-title'>
                    { lsnPlanItem?.name }
                </p>
                {
                    exceptTitles.includes( lsnPlanItem?.name ) &&
                    preview !== "preview" ? (
                        <ButtonComment
                          isGrayIcon={ true }
                          typeId={ typeId }
                          totalCommentCount={ commentCount }
                        />
                    ) : null
                }
            </div>
            {
                Array.isArray( lsnPlanItem?.desc ) ? (
                    lsnPlanItem?.desc?.map(( e, i ) => {
                        return (
                            <div style={{marginTop: '20px'}}>
                                <p
                                    className='lsn-plan-pdf-item-responsive-title'
                                    style={{fontWeight: '700'}}
                                >
                                    { e?.name }
                                    <span
                                        style={{ overflowWrap: 'anywhere', marginLeft: '5px'}}
                                        className='lsn-plan-pdf-item-responsive-text'
                                        dangerouslySetInnerHTML={{ __html: e?.desc }}
                                    />

                                </p>
                                <div className="descFilesDiv">
                                    {
                                        Array.isArray(lsnPlanItem?.files[i].fileNames) &&
                                        lsnPlanItem?.files[ i ].fileNames.length ? (
                                             lsnPlanItem?.files[ i ].fileNames.map(( fileName ) => {
                                                formatArr = fileName.split(".");
                                                format = formatArr[formatArr.length - 1];
                                                return (
                                                    <ShowPdfOrDocxFile
                                                        fileName={fileName}
                                                        href={`${ lsnPlanItem?.files[ i ].urlPath}${ fileName }`}
                                                        format={format}
                                                        index={ i }
                                                    />
                                                );
                                            })
                                        ): null

                                    }
                                </div>
                            </div>
                        )
                    })
                ) :
                    <p
                        className='lsn-plan-pdf-item-responsive-text'
                        dangerouslySetInnerHTML={{__html: lsnPlanItem?.desc} }
                            />
                // isEditorText?.name ? (
                //     <p
                //         className='lsn-plan-pdf-item-responsive-text'
                //         dangerouslySetInnerHTML={{
                //             __html: Array.isArray( isEditorText.description )
                //                 ? isEditorText?.description?.join('')
                //                 : isEditorText.description
                //         }}
                //     />
                // ) : (
                //     typeof lsnPlanItem.desc === 'string' ? (
                //         <p className='lsn-plan-pdf-item-responsive-text' >
                //             { lsnPlanItem?.desc }
                //         </p>
                //     ) : null
                // )
            }
            {
                files !== 'undefined' && files !== undefined &&
                files.length ? (
                    lsnPlanItem?.files?.fileNames.map(( fileName ) => {
                        formatArr = fileName.split(".");
                        format = formatArr[formatArr.length - 1];
                        let i = 1;
                        return (
                            <div style={{marginTop: '5px'}}>
                                <ShowPdfOrDocxFile
                                    fileName={fileName}
                                    href={`${ lsnPlanItem?.files?.urlPath}${ fileName }`}
                                    format={format}
                                    index={ i++ }
                                />
                            </div>
                        );
                    })
                ) : null
            }
        </div>
    )
}
