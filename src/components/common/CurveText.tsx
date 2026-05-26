interface Props {
  text: string;
}
const CurveText = ({ text }: Props) => {
  return (
    <div className="relative w-8 h-8">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <path id="curve" d="M20,100 A80,80 0 1,1 180,100" fill="transparent" />

        <text className="text-2xl font-[Patrick_Hand] tracking-wider fill-black">
          <textPath href="#curve" startOffset="50%" textAnchor="middle">
            {text}
          </textPath>
        </text>
      </svg>
    </div>
  );
};

export default CurveText;
