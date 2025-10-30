import { useTranslation } from 'react-i18next';

import { DomainTable } from '@/auth0-ui-components/blocks/my-org/domain-management/domain-table';

const DomainManagement = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">
        {t('domain-management.title')}
      </h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <DomainTable />
      </div>
    </div>
  );
};

export default DomainManagement;
