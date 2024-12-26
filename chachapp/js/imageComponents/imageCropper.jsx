import React from 'react';
import PropTypes from 'prop-types';
import { Button } from "react-bootstrap";
import AvatarEditor from 'react-avatar-editor';

const ImageCropper = ({ imageSrc, onCrop, setEditorRef, scaleValue, onScaleChange }) => (
    <div>
        <div className="editorOverlayInner">
            <div className="editorModalContent clearfix">
                <div className="cropCnt">
                    <AvatarEditor image={imageSrc} border={25} scale={scaleValue} rotate={0} ref={setEditorRef} className="cropCanvas" />
                    <input className="zoomSlider" style={{ width: '100%' }} step=".1" type="range" value={scaleValue} name="points" min="0.5" max="10" onChange={onScaleChange} />
                    <Button onClick={onCrop} disabled={!imageSrc} className="editorOverlayCloseBtn crpBtn">
                        Upload
                    </Button>
                </div>
            </div>
        </div>
    </div>
);

ImageCropper.propTypes = {
    setEditorRef: PropTypes.func.isRequired,
    onCrop: PropTypes.func.isRequired,
    scaleValue: PropTypes.number.isRequired,
    onScaleChange: PropTypes.func.isRequired,
};

export default ImageCropper;
