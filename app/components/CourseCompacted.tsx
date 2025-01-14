interface Props {
    course_name: string;
    terms_term_name: string;
}

export default function CourseCompacted({course_name, terms_term_name}: Props) {
    return (
        <div className="flex justify-between items-center w-full p-6 bg-white shadow-md rounded-lg">
            <div>
                <p className="font-bold text-xl text-gray-700">{course_name}</p>
                <p className="font-bold text-lg text-gray-400">{terms_term_name}</p>
            </div>
            <p className="font-semibold text-5xl">X.XX</p>
        </div>
    )
}