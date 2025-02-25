"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { Rocket, Briefcase, Code, Globe } from "lucide-react";

export default function JourneyTimeline() {
  const [ref1, inView1] = useInView({ threshold: 0.3, triggerOnce: true });
  const [ref2, inView2] = useInView({ threshold: 0.3, triggerOnce: true });
  const [ref3, inView3] = useInView({ threshold: 0.3, triggerOnce: true });
  const [ref4, inView4] = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <div className="min-h-screen bg-black text-white p-6 relative max-w-4xl mx-auto">
      {/* 2019 - First Job as a Frontend Developer */}
      <motion.div ref={ref1} className="grid grid-cols-2 gap-8 mb-24">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={inView1 ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <h2 className="text-blue-400 text-4xl font-mono">First Job</h2>
          <div className="text-gray-400">2019 - 2021</div>
          <p className="text-gray-200">
            In 2019, I landed my first job as a frontend developer, working with
            React.js and modern UI frameworks.
          </p>
          <p className="text-gray-200">
            It was an exciting start, learning real-world development,
            collaborating with designers, and shipping my first products.
          </p>
          <Rocket className="text-blue-400 w-8 h-8" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={inView1 ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          <Image
            src="/Canva.jpg"
            alt="First job"
            width={400}
            height={300}
            className="rounded"
          />
          <div className="text-sm mt-2 font-mono">FIRST JOB - 2019</div>
        </motion.div>
      </motion.div>

      {/* 2021 - Becoming a Full-Stack Developer */}
      <motion.div ref={ref2} className="grid grid-cols-2 gap-8 mb-24">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={inView2 ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <Image
            src="/Canva.jpg"
            alt="Full-stack developer"
            width={400}
            height={300}
            className="rounded"
          />
          <div className="text-sm mt-2 font-mono">FULL-STACK - 2021</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={inView2 ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-4"
        >
          <h2 className="text-green-400 text-4xl font-mono">Full-Stack</h2>
          <div className="text-gray-400">2021 - 2023</div>
          <p className="text-gray-200">
            In 2021, I expanded my skills to backend development, learning
            Node.js, databases, and API design.
          </p>
          <p className="text-gray-200">
            This was a game-changer, as I could now build complete web
            applications from frontend to backend.
          </p>
          <Code className="text-green-400 w-8 h-8" />
        </motion.div>
      </motion.div>

      {/* 2023 - Working on Web3 and Blockchain */}
      <motion.div ref={ref3} className="grid grid-cols-2 gap-8 mb-24">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={inView3 ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <h2 className="text-yellow-400 text-4xl font-mono">
            Web3 & Blockchain
          </h2>
          <div className="text-gray-400">2023 - 2024</div>
          <p className="text-gray-200">
            My curiosity led me to Web3 development, working with smart
            contracts, decentralized apps, and blockchain technologies.
          </p>
          <p className="text-gray-200">
            I started integrating blockchain into real-world applications,
            making Web3 more accessible.
          </p>
          <Globe className="text-yellow-400 w-8 h-8" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={inView3 ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          <Image
            src="/Canva.jpg"
            alt="Web3 development"
            width={400}
            height={300}
            className="rounded"
          />
          <div className="text-sm mt-2 font-mono">WEB3 JOURNEY - 2023</div>
        </motion.div>
      </motion.div>

      {/* 2025 - Running My Own Projects */}
      <motion.div ref={ref4} className="grid grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={inView4 ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <Image
            src="/Canva.jpg"
            alt="Entrepreneurship"
            width={400}
            height={300}
            className="rounded"
          />
          <div className="text-sm mt-2 font-mono">STARTING MY OWN - 2025</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={inView4 ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-4"
        >
          <h2 className="text-red-400 text-4xl font-mono">Entrepreneurship</h2>
          <div className="text-gray-400">2025 - Now</div>
          <p className="text-gray-200">
            In 2025, I took the leap into entrepreneurship, building my own
            projects, mentoring others, and shaping the future of tech.
          </p>
          <Briefcase className="text-red-400 w-8 h-8" />
        </motion.div>
      </motion.div>
    </div>
  );
}
