'use client';

import { useEffect, useState } from "react";
import CourseCompacted from "./components/CourseCompacted";

type Course = {
  course_name: string;
  final_grade: number;
};

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([]);;
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Updated courses state:", courses);
  }, [courses]);

  useEffect(() => {
    fetchCourses();
    if (error) {
      console.error('Error fetching courses:', error);
    }
  }, [error]);

  const fetchCourses = async () => {
    try {
      const response = await fetch(`/api/handle-courses`);
      const data = await response.json();
      console.log("API response data:", data); // Log to see the structure
      if (response.ok) {
        setCourses(data.courses.rows);
      } else {
        setError(data.error);
      }
    } catch {
      setError('Failed to fetch courses.');
    }
  };


  return (
    <div className="m-16">
      <p className="text-xl text-gray-600">Welcome back, Amelia!</p>
      <h1 className="py-5 font-extrabold text-8xl">X.XX</h1>
      <div>
        <hr className="p-2"/>
        <p className="text-lg text-gray-500 p-2">Current Term:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          {courses.map((course, index) => (
            <div key={index}>
              <CourseCompacted course_name={course.course_name}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
