import { motion } from "motion/react";

const Loading = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center"
    >
      <div
        className="aspect-square w-7.5 rounded-full scale-90
         bg-no-repeat bg-size-[20%_100%]
         bg-position-[0_50%,50%_50%,100%_50%]
         bg-[linear-gradient(#eab308_0_0),linear-gradient(#eab308_0_0),linear-gradient(#eab308_0_0)]
         animate-l1 my-4"
      ></div>
    </motion.div>
  );
};

export default Loading;
