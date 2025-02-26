import { Button } from '@/components/ui/button';
import Image from "next/image";
import logo from "@/app/assets/book-spine.png";
export default function Home() {
  return (
    <div
      style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '2rem',
        textAlign: 'center',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <Image src={logo} alt="Intern Project" width={500} height={200}/>
        <Image src={logo} alt="Intern Project" width={500} height={200}/>
        <Image src={logo} alt="Intern Project" width={500} height={200}/>
      </div>
    </div>
  );
}
