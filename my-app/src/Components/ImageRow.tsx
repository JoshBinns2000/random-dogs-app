import React from "react";

const ImageRow = ({ imageUrl }: { imageUrl: string }) => {
    const numberOfImages = 10;

    return (
        <img src={imageUrl} alt="Dog"></img>
    );
}

export default ImageRow;