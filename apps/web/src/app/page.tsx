
import { t } from "i18n";
export default function Home() {
  return (
    <div className="flex flex-col items-center object-center h-full">

      <div className="bg-card py-10 px-20 rotate-356 w-[120%] z-10">
        <h1 className="text-6xl font-serif font-bold items-center justify-center text-center grid max-w-max mx-auto">
          Build Better {" "}
          <span className="bg-gradient-to-r from-habit-1 via-habit-3 to-habit-6 bg-clip-text text-transparent">
            Habits Together
          </span>
        </h1>
      </div>

      <div className="flex gap-1 bg-background items-center justify-center mt-10">
        <div className="bg-habit-1 w-5 h-5" />
        <div className="bg-habit-2 w-5 h-5" />
        <div className="bg-habit-3 w-5 h-5" />
        <div className="bg-habit-4 w-5 h-5" />
        <div className="bg-habit-5 w-5 h-5" />
        <div className="bg-habit-6 w-5 h-5" />
      </div>

      <div>
        <div>
          Download For IOS
        </div>
        <div>
          Download For Android
        </div>
      </div>

    </div>
  )
}