import React, { useEffect, useState, useCallback } from 'react';
import './imageUpload.css';
import { useDropzone } from 'react-dropzone';
import { apiPOST, uploadPost } from '../../utils/apiHelper';
// import uploadToCloudIMG from '../../images/dataroom/upload-to-cloud.svg';
import { RxCrossCircled } from "react-icons/rx";
import { IoDocument } from "react-icons/io5";
import { toast } from 'react-toastify';

const DocumentUploadDrop = ({
  folderId,
  refreshFiles,
  onUploadDone = () => { },
  onRemove = () => { },
  fileKey: propsFileKey,
  imageUrl: propsImageUrl,
  isApproved,
  disabled = false,
  uploadType: propsUploadType,
}) => {
  const [imageUrl, setImageUrl] = useState(propsImageUrl);
  const [uploadType, setUploadType] = useState(propsUploadType);
  const [loading, setLoading] = useState(false);
  const [fileKey, setFileKey] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileContent, setFileContent] = useState({});
  const [error, setError] = useState('');
  const [documentUploadedUrl, setDocumentUploadedUrl] = useState(null);

  const uploadFile = async (documentName,documentSize) => {
    
    const [name, type] = documentName.split('.');
    try {
      const response = await apiPOST('/v1/document/add', {
        "name": name,
        "url": documentUploadedUrl,
        "type": type,
        "size": documentSize,
        "folderId": folderId,
        "shared": "public"
      });
      console.log(response);
      if (response.status === 201) {
        toast.success("File uploaded successfully");
        removeImage()
        refreshFiles()
      } else {
        toast.error("Failed to upload file")
      }
    } catch (error) {
      console.log(error);
    }
  }

  const onDrop = useCallback((acceptedFiles) => {
    try {
      let file = acceptedFiles[0];
      if (!file) return;

      if (file) {
          const { name, type,size } = file;
          // const fileSizeInMB = (size / (1024 * 1024)).toFixed(2);

          setFileContent({ name, type,size });
          const reader = new FileReader();
          reader.onload = () => {
            // setImageUrl(reader.result);
          };
          reader.readAsDataURL(file);
          uploadToCloud(file);
      } else {
        toast.error("Please select file")
      }
    } catch (error) {
      console.log('error', error);
      // toast.error(error)
    }
  }, []);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: '.pdf',
    maxFiles: 1,
    onDrop,
  });

  const removeImage = () => {
    setImageUrl('');
    onRemove('');
    onUploadDone('');
  };

  const getUploadKeyWithBaseFolderLocation = (filename) => {
    return 'uploads/' + new Date().getTime() + '/' + filename;
  };

  const uploadToCloud = async (file, haveToUpload = true) => {
    if (loading) return;

    if (!haveToUpload) {
      setImageUrl('');
      return;
    }

    try {
      const key = getUploadKeyWithBaseFolderLocation(file.name);
      const extension = file.name.split('.')[file.name.split('.').length - 1];
      setLoading(true);
      const payload = {
        key: key,
        content: file.type,
      };
      const response = await uploadPost(payload);

      setDocumentUploadedUrl(response)

      if (!response) return;
      var url = response;

      const handleProgress = (evt) => {
        let p = `${evt.type}: ${evt.loaded} bytes transferred\n`;
        var progress = Math.ceil((evt.loaded / evt.total) * 100);
        setUploadProgress(progress);
      };

      setLoading(true);

      setUploadProgress(0);

      var xhr = new XMLHttpRequest();
      xhr.open('PUT', url, true);
      xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
      xhr.setRequestHeader('x-amz-acl', 'public-read');
      xhr.setRequestHeader('Caches', false);
      xhr.setRequestHeader('Content-Type', file.type);
      xhr.upload.addEventListener('progress', handleProgress, false);
      xhr.onload = function () {
        setLoading(false);
        if (xhr.readyState == 4 && xhr.status == '200') {
          let fileUrl = url.split('?')[0];
          setImageUrl(fileUrl);
          onUploadDone(fileUrl);
        } else {
          console.log(
            'Could not upload image please try again---',
            'asset image',
          );
        }
      };
      xhr.onerror = function (error) {
        console.log('error', error);
        setLoading(false);
        console.log('Could not upload image please try again', 'asset image');
      };
      xhr.send(file);
    } catch (error) {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  useEffect(() => {
    setImageUrl(propsImageUrl);
    setFileKey(propsFileKey);
    setUploadType(propsUploadType);
  }, [propsImageUrl, propsFileKey, propsUploadType]);

  return (
    <>
      <div style={{ marginTop: '5px' }}>
        <div
          style={{
            border: '2px dashed #d3d3d3',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            // alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: '5px',
            // padding: '30px',
            minHeight: '27vh',
            cursor: 'pointer',
          }}
        >
          {imageUrl && !loading ? (
            <div
              className='py-6'
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div
                className="box text-center"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: '150px',
                  maxHeight: '150px',
                  position: 'relative',
                }}
              >
                <button
                  disabled={isApproved || loading || disabled}
                  className="absolute top-0 right-0 rounded-full flex items-center justify-center"
                  onClick={() => {
                    removeImage();
                  }}
                >
                  <RxCrossCircled />
                </button>
                <div className='flex flex-col items-center justify-between'>
                  <IoDocument className="h-16 w-40" />
                  <span className=''>{fileContent.name || ''}</span>
                </div>


              </div>
              <div className='flex gap-4'>
                <button
                  className='bg-primary py-2 px-4 rounded-full'
                  onClick={() => removeImage()}
                >
                  Cancel
                </button>
                <button
                  onClick={() => uploadFile(fileContent.name,fileContent.size)}
                  className='bg-secondary text-textsecondary py-2 px-4 rounded-full'>Upload this File</button>
              </div>
            </div>
          ) : (
            <div>
              <div className="fallback">
                <input
                  disabled={isApproved || loading || disabled}
                  {...getInputProps()}
                />
              </div>
              <div
                {...getRootProps({
                  className: 'dropzone',
                  onClick: () => setError(''),
                  onChange: () => setError(''),
                })}
                className="dz-message needsclick"
                style={{ cursor: 'pointer' }}
              >
                {loading ? (
                  <div className='text-center' style={{ color: '#9D9D9D' }}>
                    Uploading {uploadProgress} %
                  </div>
                ) : (
                  <div className='flex flex-col gap-4 items-center py-6'>
                    <div>
                      <div className='flex flex-col gap-4 items-center '>
                        <img src={uploadToCloudIMG} alt="img" className='mt-2 mb-4' />
                      </div>
                      <span className="text-secondary font-medium">
                        Click Here{' '}
                      </span>
                      <span className="font-medium">
                        {' '}
                        to upload your files or drag{' '}
                      </span>
                    </div>
                    <div>
                      <span>Supported format : PDF,SVG,JPG,PNG (25 MB each)</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      {error ? <div className="text-center mt-3 -mb-3 text-red-500">{error}</div> : null}
    </>
  );
};

export default DocumentUploadDrop;
