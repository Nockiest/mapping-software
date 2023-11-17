 
import { Link } from "@mui/material" ;

export default function Home() {
  return (
    <main className="flex min-h-screen color-black flex-col items-center justify-between p-24">
      <Link href="/canvasEditor" sx={{ backgroundColor: 'black'   }}>
        Go to Canvas Editor
      </Link>
    </main>
  );
}