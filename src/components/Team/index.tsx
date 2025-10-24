import { TeamType } from "@/types/team";
import SectionTitle from "../Common/SectionTitle";
import SingleTeam from "./SingleTeam";

const teamData: TeamType[] = [
  {
    id: 1,
    name: "Thomas",
    designation: "Leader",
    image: "/images/team/avatar_01.jpg",
    facebookLink: "/#",
    twitterLink: "/#",
    instagramLink: "/#",
  },
  {
    id: 2,
    name: "Zhong",
    designation: "Product Designer",
    image: "/images/team/avatar_02.jpg",
    facebookLink: "/#",
    twitterLink: "/#",
    instagramLink: "/#",
  },
  {
    id: 3,
    name: "Du",
    designation: "Content Writer",
    image: "/images/team/avatar_03.jpg",
    facebookLink: "/#",
    twitterLink: "/#",
    instagramLink: "/#",
  },
  {
    id: 4,
    name: "Yan",
    designation: "Front-End Programmer",
    image: "/images/team/avatar_04.jpg",
    facebookLink: "/#",
    twitterLink: "/#",
    instagramLink: "/#",
  },
];

const Team = () => {
  return (
    <section
      id="team"
      className="overflow-hidden bg-gray-1 pb-12 pt-20 dark:bg-dark lg:pb-[90px] lg:pt-[120px]"
    >
      <div className="container">
        <div className="mb-[60px]">
          <SectionTitle
            subtitle="Our Team"
            title="Meet Our Team"
            paragraph="There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form."
            width="640px"
            center
          />
        </div>

        <div className="-mx-4 flex flex-wrap justify-center">
          {teamData.map((team, i) => (
            <SingleTeam key={i} team={team} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
