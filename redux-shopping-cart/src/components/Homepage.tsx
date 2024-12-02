export default function HomePage() {
  return (
    <>
      <main className="w-[300px] md:w-[450px] bg-white px-5 shadow-md pt-3 h-fit">
        <h1 className="text-center text-2xl font-bold mb-5">
          Welcome to the Fake Store
        </h1>

        <section className="mb-2">
          <h2 className="text-xl font-bold">Reliable</h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum,
            quae ab provident asperiores assumenda dignissimos odio, alias ex,
            eaque ratione voluptate. Laborum, aliquid dolor doloribus delectus
            reprehenderit quo ex inventore.
          </p>
        </section>
        <section className="mb-2">
          <h2 className="text-xl font-bold">Fast</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem,
            repellat. Dolores quam, odio amet eum ea voluptas neque nam
            consequuntur, quo molestiae vero. Nulla dolorem quod labore ab rerum
            nostrum.
          </p>
        </section>
        <section className="mb-2">
          <h2 className="text-xl font-bold">Secure</h2>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id
            reiciendis assumenda explicabo quia, ea odio expedita perferendis
            voluptatem itaque, dolor quisquam similique omnis veniam eos
            adipisci eum eaque tenetur! Assumenda?
          </p>
        </section>
      </main>
      <footer className="w-full bg-slate-200 shadow-sm flex items-center md:items-start md:justify-center gap-20 pt-4 flex-col flex-wrap md:flex-row md:flex-nowrap mt-3">
        <section className="w-[200px] h-fit">
          <h3 className="font-bold mb-2">Contact details</h3>
          <p>
            <span className="font-semibold">Address: </span>Cool street
          </p>
          <p>
            <span className="font-semibold">City: </span>Fantasy
          </p>
          <p>
            <span className="font-semibold">Email: </span>dont@email.me
          </p>
          <p>
            <span className="font-semibold">Phone number: </span>+00 000 000 00{" "}
          </p>
        </section>
        <section className="w-[200px] h-fit">
          <h3 className="font-bold mb-2">Info</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
            fugit, est, accusantium quasi delectus ad officia soluta ex suscipit
            minima eveniet? Vero unde asperiores aliquam deserunt, cum soluta
            quasi suscipit?
          </p>
        </section>
      </footer>
    </>
  );
}
