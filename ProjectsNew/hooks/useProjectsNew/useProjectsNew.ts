import { useDispatch } from 'react-redux';

import { thunkToAction } from 'typescript-fsa-redux-thunk';

import { projectsCreate } from '@redux';

import { IProjectsEditFormFields } from '../../../components/ProjectsEditForm';

export const useProjectsNew = () => {
	const dispatch = useDispatch();

	const onSubmit = async (values: IProjectsEditFormFields) => {
		const { project } = await dispatch(thunkToAction(projectsCreate.action)({ project: values }));

		return project;
	};

	return {
		// CALLBACKS
		onSubmit,
	};
};
