import './DrowSubjectName.css';

export function DrowSubjectName ({ 
    element = {},
    drowIsRequiredIcon,
    isActive,
}) {

    let image = isActive === 'heart' ? 'white-heart.svg' : 'filter-white.svg'
    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <div
                className='drowSubjectNameInResponsiveContainer'
                style={{
                    background: element?.gradientColor 
                    ? `linear-gradient(${element?.gradientColor})`
                    : element?.backgroundColor,
                }}
            >
                {
                    drowIsRequiredIcon ? (
                            <img
                                style={{opacity: element?.opacity}}
                                width={24}
                                height={24}
                                src={require(`../../../../img/responsiveDesign/${image}`).default}
                            />
                         ) : (
                        element.icon ? (
                            <img
                            width={24}
                            height={24}
                            src={element?.icon}
                        />
                        ) : null
                    )
                }
                <p className='drowSubjectNameInResponsive'>
                    {element?.name}
                </p>
            </div>
        </div>
    )
}