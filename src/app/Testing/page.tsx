"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { Rocket, Briefcase, Code, Globe, School, Users } from "lucide-react";

export default function JourneyTimeline() {
  const [ref1, inView1] = useInView({ threshold: 0.3, triggerOnce: true });
  const [ref2, inView2] = useInView({ threshold: 0.3, triggerOnce: true });
  const [ref3, inView3] = useInView({ threshold: 0.3, triggerOnce: true });
  const [ref4, inView4] = useInView({ threshold: 0.3, triggerOnce: true });
  const [ref5, inView5] = useInView({ threshold: 0.3, triggerOnce: true });
  const [ref6, inView6] = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <div className="min-h-screen text-white p-6 mx-auto container">
      <motion.div
        ref={ref1}
        className="flex flex-col md:flex-row items-center mb-24"
      >
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={inView1 ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="md:ml-8 text-center md:text-left"
        >
          <h2 className="text-blue-400 text-3xl font-bold">
            My Educational Journey
          </h2>
          <p className="text-gray-400">2019 - 2023</p>
          <p className="text-gray-200">
            My journey began in secondary school (2019-2020), where I developed
            an interest in computer science. I learned HTML, CSS, JavaScript,
            MySQL, and PHP, and my first major project was a car selling system.
            This project taught me the basics of full-stack development and
            database management.
          </p>
          <p className="text-gray-200 mt-4">
            In 2021, I enrolled at Asia Pacific University (APU) to pursue a
            Diploma in Software Engineering. During my studies, I worked on
            multiple web applications, including a pet care system and a staff
            management system using PHP. I also developed another staff
            management system in Java, which strengthened my backend and
            object-oriented programming skills.
          </p>
          <p className="text-gray-200 mt-4">
            These experiences provided a strong foundation in software
            development, preparing me for my future work in modern frameworks
            and technologies.
          </p>
          <School className="text-blue-400 w-8 h-8 mt-2" />
        </motion.div>
      </motion.div>

      {/* 2023 - Quant Trading Internship */}
      <motion.div
        ref={ref3}
        className="flex flex-col md:flex-row items-center mb-24"
      >
        <Image
          src="/SpotWave.png"
          width={300}
          height={200}
          alt="Quant Trading Internship"
          className="rounded-lg shadow-lg"
        />
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={inView3 ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="md:ml-8 text-center md:text-left"
        >
          <h2 className="text-yellow-400 text-3xl font-bold">
            Quant Trading Internship
          </h2>
          <p className="text-gray-400">2023</p>
          <p className="text-gray-200">
            Helped build an auto-trading system using Next.js & TypeScript.
            Started exploring JavaScript frameworks.
          </p>
          <Globe className="text-yellow-400 w-8 h-8 mt-2" />
        </motion.div>
      </motion.div>

      {/* 2023-2024 - Projects */}
      <motion.div
        ref={ref4}
        className="flex flex-col md:flex-row-reverse items-center mb-24"
      >
        <Image
          src="/Reka-Konsult.png"
          width={300}
          height={200}
          alt="Projects"
          className="rounded-lg shadow-lg"
        />
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={inView4 ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="md:mr-8 text-center md:text-left"
        >
          <h2 className="text-purple-400 text-3xl font-bold">
            Building Projects
          </h2>
          <p className="text-gray-400">2023 - 2024</p>
          <p className="text-gray-200">
            Built Music App, Sports Platform, Expenses Tracker, and Reka Konsult
            Company Profile.
          </p>
          <Rocket className="text-purple-400 w-8 h-8 mt-2" />
        </motion.div>
      </motion.div>

      {/* 2024 - Hackathons & Web3 */}
      <motion.div
        ref={ref5}
        className="flex flex-col md:flex-row items-center mb-24"
      >
        <Image
          src="/ETHKL.png"
          width={300}
          height={200}
          alt="Hackathons"
          className="rounded-lg shadow-lg"
        />
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={inView5 ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="md:ml-8 text-center md:text-left"
        >
          <h2 className="text-orange-400 text-3xl font-bold">
            Hackathons & Web3
          </h2>
          <p className="text-gray-400">2024</p>
          <p className="text-gray-200">
            Participated in DevMatch, Google Cloud, Canva Hackathon, Ethereum KL
            2024. Explored Ethereum, Solana, and Web3.
          </p>
          <Users className="text-orange-400 w-8 h-8 mt-2" />
        </motion.div>
      </motion.div>

      {/* 2024 - YTL Cement Internship */}
      <motion.div
        ref={ref6}
        className="flex flex-col md:flex-row-reverse items-center mb-24"
      >
        <Image
          src="/SMHE.png"
          width={300}
          height={200}
          alt="YTL Cement Internship"
          className="rounded-lg shadow-lg"
        />
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={inView6 ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="md:mr-8 text-center md:text-left"
        >
          <h2 className="text-red-400 text-3xl font-bold">
            YTL Cement Internship
          </h2>
          <p className="text-gray-400">2024</p>
          <p className="text-gray-200">
            Built Sino Mobile & Heavy Equipment (SMHE) platform and YTL Cement
            LHDN e-invoice platform using Strapi & Next.js.
          </p>
          <Briefcase className="text-red-400 w-8 h-8 mt-2" />
        </motion.div>
      </motion.div>
    </div>
  );
}
