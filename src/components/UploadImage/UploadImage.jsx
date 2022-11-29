import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faRemove } from '@fortawesome/free-solid-svg-icons/faRemove';
import styles from './UploadImage.module.scss';

export const UploadImage = React.forwardRef(({ fileInputRef, onUploadImage }) => {
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const inputRef = fileInputRef;

  useEffect(() => {
    if (images.length < 1) return;
    const newImageUrls = [];
    images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    setImageUrls(newImageUrls);
  }, [images]);

  function onImageChange(e) {
    setImages([...e.target.files]);
    onUploadImage(true);
  }

  function removeImage(e) {
    setImageUrls([]);
    setImages([]);
    inputRef.current.value = null;
    e.preventDefault();
    onUploadImage(false);
  }

  return (
    <div className={styles.uploadImage}>
      <input
        type="file"
        multiple
        accept=".png, .jpg, .jpeg"
        onChange={onImageChange}
        className={styles.uploadImage__input}
        id="uploadUserImage"
        ref={fileInputRef}
      />
      <label
        htmlFor="uploadUserImage"
        className={styles.uploadImage__label}
      >
        {
          imageUrls.length > 0
          && (
            <button
              type="button"
              className={styles.uploadImage__remove}
              onClick={removeImage}
            >
              <FontAwesomeIcon icon={faRemove} />
            </button>
          )
        }
        <span className={styles.uploadImage__imageWrapper}>
          {imageUrls.length === 0 && <FontAwesomeIcon icon={faPlus} />}
          {imageUrls.map((imageSrc) => <img key={imageSrc} src={imageSrc} className={styles.uploadImage__image} alt="route" />)}
        </span>
        {imageUrls.length > 0 ? 'Remove Image' : 'Upload Image'}
      </label>
    </div>
  );
});
