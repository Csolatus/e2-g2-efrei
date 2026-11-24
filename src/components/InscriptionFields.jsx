import { useState, useCallback } from 'react';
import useForm from '../hooks/useForm.jsx';
import FormField from './FormField.jsx';
import Modal from './Modal.jsx';
import { validateForm } from '../utils/validation.js';
import { MOTIVATION_MIN_LENGTH } from '../config/formRules.js';
import { TEXT_FIELDS } from '../config/inscriptionFields.js';

const EMPTY_VALUES = {
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
  company: '',
  experience: '',
  course: '',
  level: '',
  motivation: '',
};

function InscriptionFields({ courses, levels, initialCourseId }) {
  const [confirmation, setConfirmation] = useState(null);
  const closeConfirmation = useCallback(() => setConfirmation(null), []);

  const preselectedCourse = courses.find(
    (course) => String(course.id) === initialCourseId && course.available
  );
  const initialValues = { ...EMPTY_VALUES, course: preselectedCourse ? String(preselectedCourse.id) : '' };
  const { values, errors, handleChange, handleBlur, handleSubmit, reset } = useForm(initialValues, validateForm);

  const fieldProps = (name) => ({
    id: `inscription-${name}`,
    name,
    value: values[name],
    error: errors[name],
    onChange: handleChange,
    onBlur: handleBlur,
  });

  const courseOptions = courses.map((course) => ({
    value: String(course.id),
    label: course.available ? course.title : `${course.title} (complet)`,
    disabled: !course.available,
  }));
  const levelOptions = levels.map((level) => ({ value: level, label: level }));

  const onValidSubmit = (submitted) => {
    const course = courses.find((item) => String(item.id) === submitted.course);
    setConfirmation({
      firstname: submitted.firstname.trim(),
      email: submitted.email.trim(),
      courseTitle: course.title,
    });
    reset();
  };

  return (
    <>
      <form noValidate onSubmit={handleSubmit(onValidSubmit)} className="d-flex flex-column gap-3">
        <p className="text-muted mb-0">Les champs marqués d'une étoile (*) sont obligatoires.</p>
        <div className="row g-3">
          {TEXT_FIELDS.map(({ name, ...fieldConfig }) => (
            <div className="col-md-6" key={name}>
              <FormField {...fieldProps(name)} {...fieldConfig} />
            </div>
          ))}
          <div className="col-md-6">
            <FormField
              {...fieldProps('course')}
              as="select"
              label="Formation"
              required
              options={courseOptions}
              placeholderOption="Choisissez une formation"
            />
          </div>
          <div className="col-md-6">
            <FormField
              {...fieldProps('level')}
              as="select"
              label="Votre niveau"
              required
              options={levelOptions}
              placeholderOption="Choisissez un niveau"
            />
          </div>
          <div className="col-12">
            <FormField
              {...fieldProps('motivation')}
              as="textarea"
              label="Motivation"
              required
              hint={`${values.motivation.trim().length} / ${MOTIVATION_MIN_LENGTH} caractères minimum`}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-dark align-self-start">Envoyer mon inscription</button>
      </form>

      <Modal isOpen={confirmation !== null} title="Inscription envoyée" onClose={closeConfirmation}>
        {confirmation && (
          <p>
            Merci {confirmation.firstname}, votre demande d'inscription à la formation
            « {confirmation.courseTitle} » a bien été enregistrée. Un conseiller vous
            contactera sous 48h à l'adresse {confirmation.email}.
          </p>
        )}
      </Modal>
    </>
  );
}

export default InscriptionFields;
