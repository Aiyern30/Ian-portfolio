import { Card } from "primereact/card";
import { Image } from 'primereact/image';
import { ConfettiButton } from "../magicui/Confetti";
import Marquee from "../ui/Marquee";

const ProjectCard = ({
    id,
  imageUrl,
  title,
  description,
  livePreviewUrl,
  githubRepo,
}: {
    id:string;
  imageUrl: string;
  title: string;
  description: string;
  livePreviewUrl: string;
  githubRepo: string;
}) => {
  return (
    <Card
      title={id + `) ` + title}
      className="flex flex-col justify-between h-full max-w-xs rounded-3xl cursor-pointer"
    >
      <div className="flex justify-center">
        <Image
          src={imageUrl}
          alt="Project Image"
          width="250"
          height="200"
          preview
          className="object-cover"
          style={{ maxHeight: "200px", objectFit: "cover" }}
        />
      </div>

      <p className="flex-grow m-0 text-justify p-5 pb-0 text-sm">
        {description}
      </p>

      <div className="mt-auto flex flex-row justify-center space-x-5 pt-4 text-white">
        <ConfettiButton
          className="hover:underline"
          onClick={() =>
            window.open(livePreviewUrl, "_blank", "noopener noreferrer")
          }
        >
          Live Preview
        </ConfettiButton>

        <ConfettiButton
          className="hover:underline"
          onClick={() =>
            window.open(githubRepo, "_blank", "noopener noreferrer")
          }
        >
          View Code
        </ConfettiButton>
      </div>
    </Card>
  );
};

export function MarqueCard({ data }: { data: any[] }) {
  // Dynamically create first and second rows based on passed data

  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg border md:shadow-xl ">
      <Marquee pauseOnHover className="[--duration:20s]">
        {data.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </Marquee>
    </div>
  );
}
