"use client";

import React, { useRef } from "react";
import {
  IKImage,
  IKVideo,
  ImageKitProvider,
  IKUpload,
  ImageKitContext,
} from "imagekitio-next";
import config from "@/lib/config";
import UploadIcon from "@/components/icons/UploadIcon";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndPoint}/api/auth/imagekit`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }
    const data = await response.json();
    const { signature, expire, token } = data;
    return { token, expire, signature };
  } catch (error: any) {
    throw new Error(`Failed to authenticate: ${error.message}`);
  }
};

interface Props {
  type: "image" | "video";
  accept: string;
  placeholder: string;
  folder: string;
  variant: "dark" | "light";
  onFileChange: (filePath: string) => void;
  value?: string;
}

const ImageUpload = ({
  onFileChange,
  type,
  accept,
  placeholder,
  folder,
  variant,
  value,
}: Props) => {
  const iKUploadRef = useRef(null);
  const [file, setFile] = React.useState<{ filePath: string | null }>({
    filePath: value || null,
  });
  const [progress, setProgress] = React.useState(0);

  const styles = {
    button:
      variant === "dark"
        ? "bg-dark-500"
        : "bg-light-500 border-gray-100 border",
    placeholder: variant === "dark" ? "text-light-100" : "text-slate-100",
    text: variant === "dark" ? "text-light-100" : "text-slate-500",
  };

  const onError = (error: any) => {
    console.error("Error uploading file", error);
    toast(`Error uploading ${type}`, {
      description: `Your ${type} could not be uploaded. Please try again.`,
    });
  };
  const onSuccess = (response: any) => {
    setFile(response);
    onFileChange(response.filePath);
    toast(`${type} uploaded successfully`, {
      description: `Your ${type} has been uploaded successfully.`,
    });
  };

  const onValidate = (file: File) => {
    const fileSizeMB = file.size / (1024 * 1024);
    if (type === "image") {
      if (fileSizeMB > 20) {
        toast(`File size too large`, {
          description: "Please upload an image smaller than 20MB.",
        });
        return false;
      }
    } else if (type === "video") {
      if (fileSizeMB > 50) {
        toast(`File size too large`, {
          description: "Please upload a video smaller than 50MB.",
        });
        return false;
      }
    }

    return true;
  };

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        ref={iKUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        useUniqueFileName={true}
        validateFile={onValidate}
        onUploadStart={() => setProgress(0)}
        onUploadProgress={({ loaded, total }) => {
          const percent = Math.round((loaded / total) * 100);
          setProgress(percent);
        }}
        folder={folder}
        accept={accept}
        className="hidden"
      />
      <button
        className={cn("upload-btn", styles.button)}
        onClick={(e) => {
          e.preventDefault();
          if (iKUploadRef.current) {
            // @ts-ignore
            iKUploadRef.current?.click();
          }
        }}
      >
        <UploadIcon />
        <p className={cn("text-base", styles.placeholder)}>Upload a File</p>
        {file && (
          <p className={cn("upload-filename", styles.text)}>{file.filePath}</p>
        )}
      </button>
      {progress > 0 && (
        <div className="w-full rounded-full bg-green-700">
          <div className="progress" style={{ width: `${progress}%` }}>
            {progress}%
          </div>
        </div>
      )}
      {file &&
        (type === "image" ? (
          <IKImage
            alt={file.filePath || "Uploaded Image"}
            path={file.filePath || ""}
            width={500}
            height={500}
          />
        ) : type === "video" ? (
          <IKVideo
            path={file.filePath || ""}
            controls={true}
            width={500}
            className="h-96 w-full rounded-xl"
          />
        ) : null)}
    </ImageKitProvider>
  );
};

export default ImageUpload;
