'use client';

import { useEffect, useState } from "react";
import CourseCompacted from "./components/CourseCompacted";

type Course = {
  course_name: string;
  final_grade: number;
  term_id: number;
};

type Term = {
  term_name: string;
  term_id: number;
}

export default function Home() {
  // Courses
  const [courses, setCourses] = useState<Course[]>([]);
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

  // Terms
  const [terms, setTerms] = useState<Term[]>([]);
  const [errorTerms, setErrorTerms] = useState<string | null>(null);

  useEffect(() => {
    console.log("Updated terms state:", terms);
  }, [terms]);

  useEffect(() => {
    fetchTerms();
    if (errorTerms) {
      console.error('Error fetching terms:', errorTerms);
    }
  }, [errorTerms]);

  const fetchTerms = async () => {
    try {
      const response = await fetch(`/api/handle-terms`);
      const data = await response.json();
      console.log("API response data:", data); // Log to see the structure
      if (response.ok) {
        setTerms(data.terms.rows);
      } else {
        setErrorTerms(data.errorTerms);
      }
    } catch {
      setErrorTerms('Failed to fetch courses.');
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
              <CourseCompacted course_name={course.course_name} terms_term_name={"1A"}/>
            </div>
          ))}
        </div>
      </div>
      <div>
        <hr className="p-2 mt-8"/>
        {terms.map((terms, index) => (
            <div key={index}>
              <p className="text-lg text-gray-500 p-2">{terms.term_name}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                {courses.map((course, index) => (
                  <div key={index}>
                    <CourseCompacted course_name={course.course_name} terms_term_name={terms.term_name}/>
                  </div>
                ))}
              </div>
            </div>
        ))}
      </div>
    </div>
  );
}
