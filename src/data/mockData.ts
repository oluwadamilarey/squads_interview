import { Squad } from "@/types";

export const players = [
  {
    id: "1",
    name: "LeBron James",
    team: "LAL",
    position: "SF",
    projection: 25.5,
    odds: "+110",
    image: "/images/player-1.jpg",
  },
  {
    id: "2",
    name: "Stephen Curry",
    team: "GSW",
    position: "PG",
    projection: 28.5,
    odds: "+105",
    image: "/images/player-2.jpg",
  },
  {
    id: "3",
    name: "Giannis Antetokounmpo",
    team: "MIL",
    position: "PF",
    projection: 31.2,
    odds: "+120",
    image: "/images/player-3.jpg",
  },
  {
    id: "4",
    name: "Luka Dončić",
    team: "DAL",
    position: "PG",
    projection: 29.8,
    odds: "+115",
    image: "/images/player-4.jpg",
  },
];

export const squads: Squad[] = [
  {
    id: "1",
    name: "The Shooters",
    description: "Elite 3-point specialists who dominate from beyond the arc",
    image: "/images/squad-1.jpg",
    value: "$1,000",
  },
  {
    id: "2",
    name: "Paint Dominators",
    description: "Big men who control the paint and rack up rebounds",
    image: "/images/squad-2.jpg",
    value: "$2,500",
  },
  {
    id: "3",
    name: "Floor Generals",
    description: "Point guards who create opportunities for everyone",
    image: "/images/squad-3.jpg",
    value: "$1,800",
  },
];
