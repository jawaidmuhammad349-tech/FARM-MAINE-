import Image from "next/image";
import { images, type ImageKey, type ImageSlot } from "@/lib/images";

type Props = {
  name: ImageKey;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

// Fills its (positioned) parent. Shows a labelled placeholder until the
// image slot has a real file.
export function Photo({ name, className = "", priority, sizes = "100vw" }: Props) {
  const slot: ImageSlot = images[name];
  return (
    <div className={`photo ${className}`}>
      {slot.src ? (
        <Image src={slot.src} alt={slot.alt} fill priority={priority} sizes={sizes} style={{ objectFit: "cover" }} />
      ) : (
        <div className="photo-placeholder" role="img" aria-label={slot.alt}>
          <span>{slot.hint}</span>
        </div>
      )}
    </div>
  );
}
