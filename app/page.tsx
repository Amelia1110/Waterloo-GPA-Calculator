import CourseCompacted from "./components/CourseCompacted";

export default function Home() {
  return (
    <div className="m-16">
      <p className="text-xl text-gray-600">Welcome back, User</p>
      <h1 className="py-5 font-extrabold text-8xl">X.XX</h1>
      <div>
        <hr className="p-2"/>
        <CourseCompacted/>
      </div>
    </div>
  );
}
