import Link from "next/link";

export default function Home() {
  return (
    <>
      <p>Welcome to my first project back from a year break.</p>
      <p>The goal of this project is to help me get back into coding.</p>
      <p>
        With create react app deprecated, I will take this opportunity to learn
        nextjs, typescript, and tailwind.
      </p>
      <p>My vision for this project:</p>
      <p>
        *First start off with creating a grocery list connecting it to firebase
        as a database
      </p>
      <p>
        *Second, compare grocery items that are on sale and display the cheapest
        price along with the location
      </p>
      <p>
        *Other features will be added as I go along, some ideas as of right now
        is to limit which store we are comparing our grocery items. Since some
        locations have restrictions. User Auth.
      </p>
      <p>Currently using axios to fetch API, will comeback and try new fetch from nextjs</p>
      <br></br>
      <Link href="/dashboard">Go to Dashboard</Link>
    </>
  );
}
