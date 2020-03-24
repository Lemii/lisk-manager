import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface IProps {
  setFileContent: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function MyDropzone({ setFileContent }: IProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles) {
        const file = acceptedFiles[0];

        const reader: FileReader = new FileReader();
        reader.readAsText(file, 'UTF-8');

        reader.onload = (e: any) => {
          setFileContent(e.target.result);
        };

        reader.onerror = () => {
          setFileContent(null);
        };
      }
    },
    [setFileContent]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="dropzone pointer">
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="pt-5">Drop the files here...</p>
      ) : (
        <p className="pt-5">Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
}
