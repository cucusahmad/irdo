"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


import toast from "react-hot-toast";

import api from "@/lib/api";

export default function DocumentsPage() {

  const router = useRouter();

  const [documents, setDocuments] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [uploading, setUploading] =
    useState(false);

  const [documentType, setDocumentType] =
    useState("PAYMENT");

  const [documentTitle, setDocumentTitle] =
    useState("");

  const [file, setFile] =
    useState<File | null>(null);

    const [profile, setProfile] =
  useState<any>(null);

  useEffect(() => {
    loadDocuments();
  }, []);

async function loadDocuments() {
  try {
    setLoading(true);

    const [documentRes, profileRes] =
      await Promise.all([
        api.get("/participant/document"),
        api.get("/participant/profile"),
      ]);

    setDocuments(documentRes.data.data);

    setProfile(profileRes.data.data);

  } catch {
    toast.error(
      "Failed to load documents."
    );
  } finally {
    setLoading(false);
  }
}
  async function uploadDocument() {

    if (!file) {
      toast.error(
        "Please choose file."
      );

      return;
    }

    if (!documentTitle) {
      toast.error(
        "Document title required."
      );

      return;
    }

    try {

      setUploading(true);

      const formData =
        new FormData();

      formData.append(
        "document_type",
        documentType
      );

      formData.append(
        "document_title",
        documentTitle
      );

      formData.append(
        "file",
        file
      );

      await api.post(
        "/participant/document",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      toast.success(
        "Document uploaded."
      );

      setDocumentTitle("");

      setFile(null);

      loadDocuments();

    } catch (error: any) {

      toast.error(
        error.response?.data
          ?.message ??
          "Upload failed."
      );

    } finally {

      setUploading(false);

    }
  }

  async function deleteDocument(
  id: number
) {
  const ok = window.confirm(
    "Delete this document?"
  );

  if (!ok) return;

  try {

    await api.delete(
      `/participant/document/${id}`
    );

    toast.success(
      "Document deleted."
    );

    loadDocuments();

  } catch {

    toast.error(
      "Delete failed."
    );

  }
}

  return (

    <div className="mx-auto max-w-6xl">

      <div className="mb-10">

        <h1 className="text-4xl font-black text-white">
          Documents
        </h1>

        <p className="mt-2 text-slate-400">
          Upload payment proof or
          additional documents.
        </p>

      </div>

      <div className="rounded-3xl border border-cyan-500/20 bg-white/5 p-8">

        <div className="grid gap-6 md:grid-cols-2">

          <div>

            <label className="mb-2 block text-sm text-slate-300">
              Document Type
            </label>
<select
  value={documentType}
  onChange={(e) =>
    setDocumentType(e.target.value)
  }
  className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-white"
>

  {Number(
    profile?.competition
      ?.registration_fee ?? 0
  ) > 0 && (
    <option
      value="PAYMENT"
      className="bg-slate-900"
    >
      Payment Proof
    </option>
  )}

  <option
    value="ADDITIONAL"
    className="bg-slate-900"
  >
    Additional Document
  </option>

</select>

          </div>

          <div>

            <label className="mb-2 block text-sm text-slate-300">
              Document Title
            </label>

            <input
              value={documentTitle}
              onChange={(e) =>
                setDocumentTitle(
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-white"
              placeholder="Example: Payment Proof"
            />

          </div>

          <div className="md:col-span-2">

            <label className="mb-2 block text-sm text-slate-300">
              File
            </label>

            <input
              type="file"
              onChange={(e) =>
                setFile(
                  e.target.files?.[0] ??
                    null
                )
              }
              className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-white file:mr-4 file:rounded-lg file:border-0 file:bg-cyan-600 file:px-4 file:py-2 file:text-white"
            />

          </div>

        </div>

        <div className="mt-8 flex justify-end">

          <button
            disabled={uploading}
            onClick={
              uploadDocument
            }
            className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 font-semibold text-white"
          >
            {uploading
              ? "Uploading..."
              : "Upload Document"}
          </button>

        </div>

      </div>

      <div className="mt-10">

        <h2 className="mb-6 text-2xl font-bold text-white">
          Uploaded Documents
        </h2>

        {loading ? (

          <div className="text-slate-400">
            Loading...
          </div>

        ) : documents.length === 0 ? (

          <div className="rounded-2xl border border-dashed border-white/10 py-16 text-center text-slate-400">

            No document uploaded.

          </div>

        ) : (

          <div className="space-y-4">

            {documents.map(
              (doc) => (

                <div
                  key={
                    doc.document_id
                  }
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-5"
                >

                  <div>

                    <h3 className="font-semibold text-white">
                      {
                        doc.document_title
                      }
                    </h3>

                    <p className="text-sm text-slate-400">
                      {
                        doc.document_type
                      }
                    </p>

                  </div>

                 <div className="flex gap-3">

<a
  href={doc.file_path}
  target="_blank"
  className="rounded-xl bg-cyan-600 px-5 py-2 text-white"
>
View
</a>

<button
  onClick={() =>
    deleteDocument(
      Number(doc.document_id)
    )
  }
  className="rounded-xl bg-red-600 px-5 py-2 text-white"
>
Delete
</button>

</div>

                </div>

              )
            )}

          </div>

        )}

      </div>

      <div className="mt-10 flex justify-end">

        <button
          onClick={() =>
            router.push(
              "/dashboard/status"
            )
          }
          className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 font-semibold text-white"
        >
          Continue
        </button>

      </div>

    </div>
  );
}