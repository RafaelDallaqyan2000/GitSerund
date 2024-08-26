export function fileSizeConverter (size) {
    const megaBite = +(size / (1024**2)).toFixed(1);
    const kiloBite = +(size / 1024).toFixed(1);

    if(megaBite > 0){
        return `${megaBite}MB`;
    }else if(kiloBite > 0){
        return `${kiloBite}KB`;
    }else{
        return `${size}B`;
    }
};
