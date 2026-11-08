import AddressAutocomplete from "./AddressAutoComplete";

export default function Checkout() {
  const handleAddressSelected = (data: {
    address: string;
    lat: number;
    lng: number;
  }) => {
    console.log("Address:", data.address);
    console.log("Latitude:", data.lat);
    console.log("Longitude:", data.lng);
  };

  return (
    <div>
      <h2>Địa chỉ giao hàng</h2>

      <AddressAutocomplete
        onAddressSelected={handleAddressSelected}
      />
    </div>
  );
}