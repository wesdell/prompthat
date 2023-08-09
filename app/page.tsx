import { Feed } from '@/components';

export default function HomePage () {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Find & Share
        <br/>
        <span className="orange_gradient text-center">
          AI Powered Prompts
        </span>
      </h1>
      <p className="desc text-center">
        Prompthat is an open-source AI prompts tool for
        modern world to find, create and share creative prompts
      </p>
      <Feed />
    </section>
  );
}
