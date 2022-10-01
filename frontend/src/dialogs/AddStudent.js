import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
// @mui
import { LoadingButton } from '@mui/lab';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import Snackbar from '@mui/material/Snackbar';

import { FormProvider, RHFTextField, RHFTags } from '../components/hook-form';
import SUBJECTS from '../data/subjects';
//
import { urls } from '../config';
import axios from '../utils/axios';

// -------------------------

const FormSchema = Yup.object().shape({
  id: Yup.string().required('ID is required'),
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Email must be a valid email address')
    .required('Email is required'),
  subjects: Yup.array()
    .of(Yup.string())
    .min(1, 'Select atleast subject')
    .required('Subject is requried'),
});

const DEFAULT_STUDENT = {
  id: '',
  name: '',
  email: '',
  subjects: [],
};

// -------------------------

const AddStudentDialog = ({ options, onClose }) => {
  const [toast, setToast] = useState(null);
  const [defaultValues, setDefaultValues] = useState({ ...DEFAULT_STUDENT });

  useEffect(() => {
    console.log('running');
    setDefaultValues({ ...DEFAULT_STUDENT });
  }, [options]);

  const methods = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      // await onAdd(data);
      await axios.post(urls.students, data);
      setDefaultValues({ ...DEFAULT_STUDENT });
      onClose();
    } catch (error) {
      console.error(error);
      if (error.message) {
        setToast(error.message);
      }

      // reset();
    }
  };

  if (!options) {
    return null;
  }

  return (
    <Dialog
      open={!!options}
      onClose={onClose}
      maxWidth="xs"
      aria-labelledby="delete-confirmation-alert"
      aria-describedby="delete-confirmation-alert-description"
      PaperProps={{ sx: { width: '100%' } }}
    >
      <DialogTitle>Add student</DialogTitle>

      <DialogContent>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3} sx={{ my: 2 }}>
            <RHFTextField name="id" label="Student ID" type="number" />
            <RHFTextField name="name" label="Name" />
            <RHFTextField name="email" label="Email address" />
            <RHFTags name="subjects" label="Subjects" options={SUBJECTS} />
          </Stack>

          <DialogActions>
            <Button
              fullWidth
              onClick={onClose}
              size="large"
              variant="text"
              color="error"
            >
              Cancel
            </Button>
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Add
            </LoadingButton>
          </DialogActions>
        </FormProvider>
      </DialogContent>

      <Snackbar
        open={!!toast}
        autoHideDuration={5000}
        message={toast}
        onClose={() => setToast(false)}
      />
    </Dialog>
  );
};

export default AddStudentDialog;

AddStudentDialog.propTypes = {
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  onClose: PropTypes.func,
};
