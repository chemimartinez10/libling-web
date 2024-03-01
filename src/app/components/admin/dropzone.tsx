import React, { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import styles from './dropzone.module.css'
import Image from 'next/image';

const Dropzone = () => {
    const [files, setFiles] = useState([]);
    const { getRootProps, getInputProps } = useDropzone({
        accept: { "image/jpeg": [], "image/png": [] },
        onDrop: (acceptedFiles: any) => {
            setFiles(
                acceptedFiles.map((file: any) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file)
                    })
                )
            );
        }
    });

    const thumbs = files.map((file: any) => (
        <div className={styles.thumb} key={file?.name}>
            <div className={styles.thumbInner}>
                <Image src={file.preview} alt={'image'} className={styles.img} />
            </div>
        </div>
    ));

    useEffect(
        () => () => {
            // Make sure to revoke the data uris to avoid memory leaks
            files.forEach((file: any) => URL.revokeObjectURL(file.preview));
        },
        [files]
    );

    return (
        <section className="container">
            <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                <p>Drag n drop some files here, or click to select files</p>
            </div>
            <aside className={styles.thumbsContainer}>{thumbs}</aside>
        </section>
    );
}

export default Dropzone