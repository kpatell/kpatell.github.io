import { Github, Linkedin } from 'lucide-react';

export function ContactSection() {
  const myEmail = 'krishanpatel00@gmail.com';

  return (
    <section id="contact" className="py-24 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-6">
          contact
        </h2>
        
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8">
          feel free to contact me at{' '}
          <a 
            href={`mailto:${myEmail}`}
            className="text-black dark:text-white font-medium hover:underline underline-offset-4"
          >
            {myEmail}
          </a>
        </p>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-6">
          <a
            href="https://github.com/kpatell"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="github"
            className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
          >
            <Github className="h-6 w-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/krishanpatell/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="linkedin"
            className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
          >
            <Linkedin className="h-6 w-6" />
          </a>
        </div>
      </div>
    </section>
  );
}
