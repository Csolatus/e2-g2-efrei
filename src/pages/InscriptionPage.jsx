import { useSearchParams } from 'react-router-dom';
import InscriptionForm from '../components/InscriptionForm.jsx';

function InscriptionPage() {
  const [searchParams] = useSearchParams();

  return (
    <section className="container py-5">
      <h1 className="mb-4">Inscription à une formation</h1>
      <InscriptionForm initialCourseId={searchParams.get('formation')} />
    </section>
  );
}

export default InscriptionPage;
