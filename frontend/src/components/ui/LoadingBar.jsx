import { motion } from "framer-motion";

const LoadingBar = () => {
  return (
    <div className="w-full py-6 flex flex-col items-center justify-center">
      <motion.div
        className="h-1 w-1/2 bg-indigo-500 rounded-full"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{
          duration: 1.2,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{ originX: 0 }}
      />
      <p className="mt-4 text-white text-sm">Carregando campanhas...</p>
    </div>
  );
};

export default LoadingBar;
