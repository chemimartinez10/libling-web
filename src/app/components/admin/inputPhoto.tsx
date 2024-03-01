import React, { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import styles from './input.module.css'
import Image from 'next/image';
import { FiCamera, FiX } from 'react-icons/fi';
import { IInputPhoto } from '@/app/interfaces';
import { poppinsMedium } from '@/app/fonts';

const InputPhoto: React.FC<IInputPhoto> = ({ description, facename }) => {
    const [files, setFiles] = useState([]);
    const deleteFile = (index: number) => {
        if (face > index) {
            setFace(state => state - 1)
        }
        setFiles(state => state.filter((el, indexEl) => index !== indexEl))

    }
    const [face, setFace] = useState<number>(0)
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

    const thumbs = files.map((file: any, index) => (
        <div className={styles.thumb} key={file?.name}>
            <div className={styles.thumbInner}>
                <div className={styles.thumbDelete} onClick={() => { deleteFile(index) }}>
                    <FiX />
                </div>
                <Image src={file.preview} alt={'image'} onClick={() => { setFace(index) }} className={styles.img} width={100} height={100} />
                {
                    face === index && <div className={styles.thumbFace}>{facename}</div>
                }
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
        <section className={styles.photoContainer}>
            <div {...getRootProps({ className: styles.photoDropzone })}>
                <input {...getInputProps()} />
                <FiCamera className={styles.photoIcon} />
                <p className={styles.photoDescription} style={poppinsMedium.style}>{description}</p>
            </div>
            {
                files?.length > 0
                &&
                <aside className={styles.thumbsContainer}>{thumbs}</aside>
            }
        </section>
    );
}

export default InputPhoto