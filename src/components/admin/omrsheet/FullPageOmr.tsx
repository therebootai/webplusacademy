"use client";
import React, { useActionState, useState } from "react";

const FullPageOmr = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

async function handleSubmit(prevState: unknown, formData: FormData) {
  if (!selectedImage) {
    alert("Please select an image before submitting.");
    return;
  }

  try {
    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("file", selectedImage);

    const res = await fetch("/api/omr-detect", {
      method: "POST",
      body: formDataToSend,
    });

    if (!res.ok) throw new Error("Upload failed");
    const result = await res.json();

    console.log("Detected responses:", result);
    alert(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error("Error while scanning OMR:", error);
    alert("Something went wrong while scanning OMR.");
  } finally {
    setLoading(false);
  }
}


  const [, formActions, isPending] = useActionState(handleSubmit, null);

  return (
    <div className="flex items-center justify-center p-6 ">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Upload Your OMR Sheet
        </h2>

        <form action={formActions} className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-4">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-64 h-64 object-cover rounded-xl border shadow-sm"
              />
            ) : (
              <div className="w-64 h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-xl bg-gray-100 text-gray-500">
                No image selected
              </div>
            )}

            <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition">
              Choose Image
              <input
                type="file"
                name="result_file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg text-lg font-medium shadow transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600 text-white"
            }`}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FullPageOmr;
