import { useEffect, useRef } from "react";
import { loadPlaces } from "@/lib/googleMaps";

interface AddressAutocompleteProps {
  onAddressSelected?: (data: {
    address: string;
    lat: number;
    lng: number;
  }) => void;
}

export default function AddressAutocomplete({
  onAddressSelected,
}: AddressAutocompleteProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let autocompleteElement: google.maps.places.PlaceAutocompleteElement | null =
      null;

    const init = async () => {
      try {
        const { PlaceAutocompleteElement } = await loadPlaces();

        if (!containerRef.current) {
          return;
        }

        autocompleteElement = new PlaceAutocompleteElement();

        autocompleteElement.placeholder = "Nhập địa chỉ giao hàng";

        // Chỉ tìm địa điểm ở Việt Nam
        autocompleteElement.includedRegionCodes = ["vn"];

        containerRef.current.appendChild(autocompleteElement);

        autocompleteElement.addEventListener(
          "gmp-select",
          async (event: Event) => {
            const customEvent = event as CustomEvent<{
              placePrediction: google.maps.places.PlacePrediction;
            }>;

            const placePrediction = customEvent.detail.placePrediction;

            const place = placePrediction.toPlace();

            await place.fetchFields({
              fields: ["formattedAddress", "location"],
            });

            const lat = place.location?.lat();
            const lng = place.location?.lng();

            if (
              !place.formattedAddress ||
              lat === undefined ||
              lng === undefined
            ) {
              console.error("Không lấy được thông tin địa chỉ");
              return;
            }

            const data = {
              address: place.formattedAddress,
              lat,
              lng,
            };

            console.log("Selected address:", data);

            onAddressSelected?.(data);
          }
        );
      } catch (error) {
        console.error("Google Places initialization failed:", error);
      }
    };

    init();

    return () => {
      autocompleteElement?.remove();
    };
  }, [onAddressSelected]);

  return <div ref={containerRef} />;
}