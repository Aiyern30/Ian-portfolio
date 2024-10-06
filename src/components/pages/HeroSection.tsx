import Image from "next/image";
import { BoxReveal } from "@/components/magicui/index";
import { Avatar } from "antd";
import { SocialIcon } from "react-social-icons";
import { useMediaQuery } from "react-responsive";

export default function HeroSection() {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <div className="container flex flex-col items-center md:items-start ">
      <div className="flex flex-col md:flex-row items-center md:space-x-5 w-full">
        <BoxReveal boxColor={"#763CAC"} duration={0.5}>
          <div className="relative mb-6 md:mb-0">
            <Image
              src={"/Me.png"}
              alt={"My Photo"}
              width={200}
              height={200}
              className="rounded-full"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#763CAC] via-transparent to-[#320F85] opacity-80 rounded-full"></div>
          </div>
        </BoxReveal>

        <BoxReveal boxColor={"#763CAC"} duration={0.5}>
          <div className="flex flex-col space-y-3 justify-center text-white font-primary text-center md:text-left">
            <div className="text-xl md:text-3xl mb-5">
              Hello! I Am{" "}
              <span className="text-tertiary">Ian Gan Jian Hao</span>
            </div>
            <div className="text-sm md:text-base">A Designer who</div>
            <div className="text-2xl md:text-5xl">
              judges a book by its{" "}
              <span className="text-tertiary">cover...</span>
            </div>
            <div className="text-sm">
              Because if the cover doesn't impress you, what will?
            </div>
          </div>
        </BoxReveal>
      </div>

    <BoxReveal boxColor={"#763CAC"} duration={0.5}>
  <div className="flex flex-col text-white font-primary space-y-4 mt-8 text-justify md:text-left">
    <div className="text-3xl md:text-7xl text-center">
      I'm a Full-stack Developer
    </div>
    <div className="text-base md:text-lg">
      with a passion for coding and creating impactful projects.
      Currently, I'm pursuing a degree in Computer Science at Asia Pacific
      University, Malaysia.
    </div>
    <div className="pt-4 text-base md:text-lg">
      With 5 years of software development experience that began in high
      school, I've honed my skills in various technologies. I believe in
      the importance of both functionality and design. I strive to create
      solutions that are as visually appealing as they are effective.
    </div>
    <div className="pt-4 text-base md:text-lg">
      I am also keen to learn about Web3 and actively participate in
      numerous hackathons and workshops to enhance my skills and knowledge
      in this exciting field.
    </div>
  </div>
</BoxReveal>

      {isMobile && (
        <BoxReveal boxColor={"#763CAC"} duration={0.5}>
          <div className="flex flex-wrap justify-center md:justify-center mx-auto w-full md:w-72 mt-10 space-x-2">
            <Avatar
              shape="square"
              size={48}
              icon={
                <SocialIcon
                  network="linkedin"
                  url="https://www.linkedin.com/in/ian-gan-346547279/"
                  target="_blank"
                />
              }
              className="cursor-pointer"
            />
            <Avatar
              shape="square"
              size={48}
              icon={
                <SocialIcon
                  network="github"
                  url="https://github.com/Aiyern30"
                  target="_blank"
                />
              }
              className="cursor-pointer"
            />
            <Avatar
              shape="square"
              size={48}
              icon={
                <SocialIcon
                  url="https://discord.gg/tAuqPG83"
                  network="discord"
                  target="_blank"
                />
              }
              className="cursor-pointer"
            />
            <Avatar
              shape="square"
              size={48}
              icon={
                <SocialIcon
                  url="https://www.instagram.com/_aiyern_/"
                  network="instagram"
                  target="_blank"
                />
              }
              className="cursor-pointer"
            />
            <Avatar
              shape="square"
              size={48}
              icon={
                <SocialIcon
                  url="https://wa.me/+60182133211?text='Type%20your%20message%20here%20%3A'"
                  network="whatsapp"
                  target="_blank"
                />
              }
              className="cursor-pointer"
            />
          </div>
        </BoxReveal>
      )}
    </div>
  );
}
