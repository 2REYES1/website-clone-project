import Book from "@/components/features/Book";
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
      
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: '2rem',
        marginTop: '6rem',
        marginBottom: '6rem' }}>
        <Book 
          spineImg="/assets/book-spine.png"
          coverImg="/assets/book-spine.png"
          descriptionTxt="Hello World"
        />
        <Book 
          spineImg="/assets/book-spine.png"
          coverImg="/assets/book-spine.png"
          descriptionTxt="Hello World"
        />
        <Book 
          spineImg="/assets/book-spine.png"
          coverImg="/assets/book-spine.png"
          descriptionTxt="Hello World"
        />
      </div>
    </div>
  );
}
