import { FileUp } from "lucide-react";
import React from "react";
export default function UploadFile() {
  return (
    <div className="bg-white shadow w-[96%] h-full sm:m-8 m-2 flex justify-center items-center">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <FileUp className="bg-green-300 h-14 w-14 rounded-full p-4 flex items-center justify-center" />
        </div>
        <h1 className="text-xl  mt-4">
          <span className="text-blue-500 text-2xl font-bold  ">
            Click to Upload{" "}
          </span>
          or drag and drop
        </h1>
        <p className="sm:mt-4 mt-2 text-lg sm:text-2xl text-gray-700  ">
          Upload any office document or PDF file (not larger than 30 MB).
          Depending on the size of the file, it may require additional time to
          upload before it can be used.
        </p>
      </div>
    </div>
  );
}
