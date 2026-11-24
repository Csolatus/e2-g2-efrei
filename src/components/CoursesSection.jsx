import CatalogSection from './CatalogSection.jsx';
import CourseCard from './CourseCard.jsx';
import CourseDetails from './CourseDetails.jsx';
import { COURSES_CATALOG } from '../config/catalog.js';

function CoursesSection() {
  return (
    <CatalogSection
      catalog={COURSES_CATALOG}
      renderCard={(course, onSelect) => <CourseCard course={course} onSelect={onSelect} />}
      renderDetails={(course) => <CourseDetails course={course} />}
    />
  );
}

export default CoursesSection;
