import Header from "@/components/Header";
import ShimmerButton from "@/components/magicui/Shimmer-button";
import Image from "next/image";
import { IconCloud, MagicCard } from "@/components/magicui/index";
import OrbitingCircles from "@/components/magicui/Orbiting-circles";
import {
  UserOutlined,
  LinkedinOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import { Avatar, Space } from "antd";
import { SocialIcon } from "react-social-icons";
const slugs = [
  "devpost",
  "sublimetext",
  "apachenetbeanside",
  "rstudioide",
  "ethers",
  "json",
  "laravel",
  "obsidian",
  "googleauthenticator",
  "googlecloud",
  "opencv",
  "solana",
  "google",
  "googledrive",
  "googlecalendar",
  "googleappsscript",
  "mongodb",
  "amazonaws",
  "ethereum",
  "npm",
  "cplusplus",
  "apache",
  "phpmyadmin",
  "typescript",
  "javascript",
  "java",
  "react",
  "flutter",
  "html5",
  "css3",
  "nodedotjs",
  "postgresql",
  "firebase",
  "vercel",
  "git",
  "jira",
  "github",
  "gitlab",
  "visualstudiocode",
  "androidstudio",
  "figma",
  "nextdotjs",
  "php",
  "python",
  "mysql",
  "tailwindcss",
  "r",
  "labview",
  "adobepremierepro",
  "rstudio",
  "canva",
  "notion",
];

export default function Home() {
  return (
    <div>
      <Header />

      <section className="min-h-screen flex items-center justify-center">
        <div className="container flex flex-col ">
          <div className="flex items-center space-x-5">
            <div className="relative">
              <Image
                src={"/Me.png"}
                alt={"My Photo"}
                width={200}
                height={200}
                className="rounded-full"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#763CAC] via-transparent to-[#320F85] opacity-80 rounded-full"></div>
            </div>

            <div className="flex flex-col space-y-3 justify-center text-white font-primary">
              <div className="text-3xl mb-5 ">
                Hello! I Am
                <span className="text-tertiary">Ian Gan Jian Hao</span>
              </div>
              <div>A Designer who</div>
              <div className="text-5xl">
                Judges a book by its{" "}
                <span className="text-tertiary">cover...</span>
              </div>
              <div className="text-sm">
                Because if the cover does not impress you, what else can?
              </div>
            </div>
          </div>

          <div className="flex flex-col text-white font-primary  space-y-5 mt-8">
            <div className="text-7xl">I'm a Full-stack Developer</div>
            <div className="text-xl">
              with a passion for coding and creating impactful projects.
              Currently, I'm pursuing a degree in Computer Science at Asia
              Pacific University, Malaysia.
            </div>
            <div className="pt-5 text-xl">
              With 5 years of software development experience that began in high
              school, I've honed my skills across various technologies. I
              believe in the importance of both functionality and design,
              striving to create solutions that are as visually appealing as
              they are effective.
            </div>
          </div>
          <div className="flex justify-between mx-auto w-72 mt-10">
            <Avatar
              shape="square"
              size={64}
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
              size={64}
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
              size={64}
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
              size={64}
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
              size={64}
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
        </div>
      </section>

      <section className="min-h-screen flex items-center justify-center">
        <div className="container flex flex-col items-center text-center text-white">
          <div className="max-w-lg mx-auto mb-5">
            I'm currently looking to join a
            <span className="text-tertiary">cross-functional</span> team that
            values improving people's lives through accessible design
          </div>
          <IconCloud iconSlugs={slugs} />
        </div>
      </section>
      {/* <section>
        <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
          <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300 bg-clip-text text-center text-8xl  font-semibold leading-none text-transparent dark:from-white dark:to-black">
            Circles
          </span>

          <OrbitingCircles
            className="size-[30px] border-none bg-transparent"
            duration={20}
            delay={20}
            radius={80}
            iconSlugs={slugs.filter((slug) => slug === "vercel")}
          />
          <OrbitingCircles
            className="size-[30px] border-none bg-transparent"
            duration={20}
            delay={10}
            radius={80}
            iconSlugs={slugs.filter((slug) => slug === "notion")}
          />

          <OrbitingCircles
            className="size-[50px] border-none bg-transparent"
            radius={190}
            duration={20}
            reverse
            iconSlugs={slugs.filter(
              (slug) => slug === "google-drive" || slug === "github"
            )}
          />
        </div>
      </section> */}
      <section className="min-h-screen flex flex-col items-center justify-center text-white container mx-auto space-y-8">
        {/* Row 1 */}
        <div className="w-full md:w-3/4 flex flex-col md:flex-row items-stretch space-y-6 md:space-y-0">
          <div className="w-full md:w-1/2 flex flex-col space-y-3 px-4 md:px-8 flex-1">
            <div className="text-lg font-semibold text-tertiary">
              Featured project 1
            </div>
            <div className="text-2xl font-bold">
              Weather Forecast Application
            </div>
            <div className="bg-secondary opacity-80 p-4 rounded-xl flex-1">
              Our Weather Forecast Application provides users with comprehensive
              weather information, customizable appearance settings, and
              forecasts extending up to 3 days.
              <div className="flex flex-col md:flex-row justify-start space-x-0 md:space-x-5 space-y-2 md:space-y-0 my-3">
                <div className="underline cursor-pointer">Live Preview</div>
                <a
                  href="https://github.com/Aiyern30/Weather-Forecast"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline cursor-pointer"
                >
                  View Code
                </a>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex items-center justify-center flex-1">
            <MagicCard className="w-full h-full flex items-center justify-center bg-transparent border-0">
              <Image
                src="/Weather-Dashboard.png"
                alt="Weather Dashboard"
                width={400} // Fixed width
                height={300} // Fixed height
              />
            </MagicCard>
          </div>
        </div>

        {/* Row 2 */}
        <div className="w-full md:w-3/4 flex flex-col md:flex-row items-stretch space-y-6 md:space-y-0">
          <div className="w-full md:w-1/2 flex flex-col space-y-3 px-4 md:px-8 flex-1">
            <div className="text-lg font-semibold text-tertiary">
              Featured project 2
            </div>
            <div className="text-2xl font-bold">Another Project</div>
            <div className="bg-secondary opacity-80 p-4 rounded-xl flex-1">
              Description of another project with its features and highlights.
              <div className="flex flex-col md:flex-row justify-start space-x-0 md:space-x-5 space-y-2 md:space-y-0 my-3">
                <div className="underline cursor-pointer">Live Preview</div>
                <div className="underline cursor-pointer">View Code</div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex items-center justify-center flex-1">
            <MagicCard className="w-full h-full flex items-center justify-center bg-transparent border-0">
              <Image
                src="/Weather-Dashboard.png"
                alt="Weather Dashboard"
                width={400} // Fixed width
                height={300} // Fixed height
              />
            </MagicCard>
          </div>
        </div>

        {/* Row 3 */}
        <div className="w-full md:w-3/4 flex flex-col md:flex-row items-stretch space-y-6 md:space-y-0">
          <div className="w-full md:w-1/2 flex flex-col space-y-3 px-4 md:px-8 flex-1">
            <div className="text-lg font-semibold text-tertiary">
              Featured project 3
            </div>
            <div className="text-2xl font-bold">Yet Another Project</div>
            <div className="bg-secondary opacity-80 p-4 rounded-xl flex-1">
              Description of yet another project with its features and
              highlights.
              <div className="flex flex-col md:flex-row justify-start space-x-0 md:space-x-5 space-y-2 md:space-y-0 my-3">
                <div className="underline cursor-pointer">Live Preview</div>
                <div className="underline cursor-pointer">View Code</div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex items-center justify-center flex-1">
            <MagicCard className="w-full h-full flex items-center justify-center bg-transparent border-0">
              <Image
                src="/Weather-Dashboard.png"
                alt="Weather Dashboard"
                width={400} // Fixed width
                height={300} // Fixed height
              />
            </MagicCard>
          </div>
        </div>
      </section>
    </div>
  );
}
