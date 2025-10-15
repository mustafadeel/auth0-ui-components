import { useTranslation } from 'react-i18next';

import { OrgDetailsEdit } from '@/auth0-ui-components/blocks/my-org/org-management/org-details-edit';

import Header from '../components/Header';

const ManageOrg = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-semibold text-gray-900 mb-6">{t('manage-org.title')}</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <div style={{ all: 'initial', fontFamily: 'inherit' }}>
            <OrgDetailsEdit />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageOrg;
