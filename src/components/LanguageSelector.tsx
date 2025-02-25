import { useTranslation } from 'react-i18next';
import { FormControl, Select, MenuItem } from '@mui/material';
// import { useLanguagePreference } from '../hooks/useLanguagePrefernce'

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'sp', name: 'Español' },
    { code: 'ja', name: '日本語' }
  ];

  return (
    <FormControl size="small">
      <Select
        value={i18n.language}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
        sx={{
          backgroundColor: 'rgba(255,255,255,0.1)',
          color: 'black',
        }}
      >
        {languages.map((lang) => (
          <MenuItem key={lang.code} value={lang.code}>
            {lang.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default LanguageSelector;