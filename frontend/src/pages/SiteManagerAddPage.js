import PageHeading from '../components/PageHeading';
import SiteManagerForm from '../components/SiteManagerForm';

const SiteManagerAddPage = () => {
  const headingText = 'Add a New Site Manager';
  return (
    <div>
      <div class="container border border-success p-2 mb-2 border-opacity-25 rounded-2 mt-2 mb-2 shadow-sm ">
        <PageHeading text={headingText}></PageHeading>
        <SiteManagerForm />
      </div>
    </div>
  );
};

export default SiteManagerAddPage;
