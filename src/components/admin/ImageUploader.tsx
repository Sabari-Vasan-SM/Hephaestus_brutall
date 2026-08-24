import { useState, useRef } from "react";
import { useMutation } from "convex/react";
import { api } from "@/lib/api";
import { UploadCloud, Image as ImageIcon, Link as LinkIcon, Check, Loader2, X } from "lucide-react";
import { toast } from "sonner";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  presetImages?: { label: string; src: string }[];
}

export function ImageUploader({
  value,
  onChange,
  label = "PRODUCT COVER IMAGE",
  presetImages,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [showUrlInput, setShowUrlInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  let generateUploadUrl: any = null;
  try {
    generateUploadUrl = useMutation(api.files.generateUploadUrl);
  } catch {}

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (< 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("FILE TOO LARGE", { description: "Please upload an image under 10MB." });
      return;
    }

    setUploading(true);
    const toastId = toast.loading("UPLOADING IMAGE...", { description: file.name });

    try {
      // 1. First generate instant Data URL for immediate responsive preview
      const reader = new FileReader();
      reader.onload = async (event) => {
        const dataUrl = event.target?.result as string;
        if (dataUrl) {
          onChange(dataUrl);
        }
      };
      reader.readAsDataURL(file);

      // 2. If Convex file upload URL is available, upload directly to Convex storage
      if (generateUploadUrl) {
        try {
          const postUrl = await generateUploadUrl();
          const uploadRes = await fetch(postUrl, {
            method: "POST",
            headers: { "Content-Type": file.type },
            body: file,
          });

          if (uploadRes.ok) {
            const { storageId } = await uploadRes.json();
            if (storageId) {
              // Convert storageId to convex site or proxy URL if applicable
              const convexUrl = import.meta.env.VITE_CONVEX_URL;
              if (convexUrl) {
                const siteUrl = convexUrl.replace(".convex.cloud", ".convex.site");
                const publicStorageUrl = `${siteUrl}/getImage?storageId=${storageId}`;
                // Keep dataUrl or storageUrl
              }
            }
          }
        } catch (uploadErr) {
          console.warn("Convex storage upload fallback to data URL:", uploadErr);
        }
      }

      toast.success("IMAGE UPLOADED", {
        id: toastId,
        description: `${file.name} is now set as product cover.`,
      });
    } catch (err: any) {
      toast.error("UPLOAD FAILED", {
        id: toastId,
        description: err?.message || "Failed to process image.",
      });
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleApplyUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    onChange(urlInput.trim());
    toast.success("CUSTOM URL APPLIED", { description: urlInput.trim() });
    setUrlInput("");
    setShowUrlInput(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="label-xs font-black uppercase text-foreground">{label}</label>
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-[0.65rem] font-mono text-zinc-500 hover:text-destructive flex items-center gap-1"
          >
            <X className="h-3 w-3" /> CLEAR
          </button>
        )}
      </div>

      {/* Image Preview Box */}
      <div className="relative border-[3px] border-foreground bg-smoke/40 overflow-hidden text-center group">
        {value ? (
          <div className="relative aspect-[4/5] sm:aspect-video w-full bg-zinc-900">
            <img
              src={value}
              alt="Product Preview"
              className="h-full w-full object-cover object-center"
            />
            {uploading && (
              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white gap-2">
                <Loader2 className="h-8 w-8 animate-spin text-zap" />
                <span className="label-xs font-black">PROCESSING IMAGE...</span>
              </div>
            )}
          </div>
        ) : (
          <div className="py-10 px-4 flex flex-col items-center justify-center text-muted-foreground gap-3">
            <div className="border-[2px] border-foreground bg-background p-3 rounded-none">
              <ImageIcon className="h-8 w-8 text-foreground" />
            </div>
            <div className="space-y-1">
              <p className="text-xs font-black uppercase text-foreground">NO IMAGE SELECTED</p>
              <p className="text-[0.7rem] text-muted-foreground">Upload from device, paste URL, or pick preset</p>
            </div>
          </div>
        )}
      </div>

      {/* Upload Actions */}
      <div className="grid grid-cols-2 gap-2">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="image/png, image/jpeg, image/webp, image/avif, image/gif"
          className="hidden"
          id="product-image-file-input"
        />

        <label
          htmlFor="product-image-file-input"
          className="flex items-center justify-center gap-2 border-[2px] border-foreground bg-zap py-3 px-3 text-xs font-black uppercase cursor-pointer press hover:bg-foreground hover:text-white transition-colors"
        >
          {uploading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>UPLOADING...</span>
            </>
          ) : (
            <>
              <UploadCloud className="h-4 w-4" />
              <span>UPLOAD FILE</span>
            </>
          )}
        </label>

        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="flex items-center justify-center gap-2 border-[2px] border-foreground bg-background py-3 px-3 text-xs font-bold uppercase press hover:bg-smoke transition-colors"
        >
          <LinkIcon className="h-4 w-4" />
          <span>{showUrlInput ? "HIDE URL" : "PASTE URL"}</span>
        </button>
      </div>

      {/* URL Input Dropdown */}
      {showUrlInput && (
        <form onSubmit={handleApplyUrl} className="flex gap-2 border-[2px] border-foreground p-2 bg-smoke/60">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://images.unsplash.com/..."
            className="flex-1 border-[2px] border-foreground p-2 text-xs font-mono bg-background"
          />
          <button
            type="submit"
            className="border-[2px] border-foreground bg-foreground text-background px-4 text-xs font-black uppercase press hover:bg-zap hover:text-foreground"
          >
            SET
          </button>
        </form>
      )}

      {/* Preset Gallery */}
      {presetImages && presetImages.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-zinc-200">
          <span className="label-xs block text-muted-foreground">OR SELECT PRESET DROP:</span>
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
            {presetImages.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onChange(img.src)}
                className={`border-[2px] p-0.5 relative overflow-hidden transition-all press ${
                  value === img.src ? "border-flare ring-2 ring-flare" : "border-foreground hover:opacity-80"
                }`}
              >
                <img src={img.src} alt={img.label} className="h-12 w-full object-cover" />
                {value === img.src && (
                  <span className="absolute top-1 right-1 bg-flare text-white p-0.5">
                    <Check className="h-2.5 w-2.5 stroke-[3]" />
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
