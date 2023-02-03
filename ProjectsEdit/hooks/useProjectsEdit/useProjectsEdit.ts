import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { thunkToAction } from 'typescript-fsa-redux-thunk';

import {
	projectsFetchItem,
	projectsUpdate,
	projectNetworkStatusSelector,
	projectSelector,
} from '@redux';

import { IProjectsEditFormFields } from '../../../components/ProjectsEditForm';

import { IUseProjectsEditParams } from './types';

export const useProjectsEdit = (params: IUseProjectsEditParams) => {
	const { id } = params;
	const dispatch = useDispatch();
	const project = useSelector(projectSelector);
	const projectNetworkStatus = useSelector(projectNetworkStatusSelector);
	const isLoading = !project || projectNetworkStatus.isFetching;

	const fetchProject = async () => {
		await dispatch(thunkToAction(projectsFetchItem.action)({ id }));
	};

	const onSubmit = async (values: IProjectsEditFormFields) => {
		await dispatch(thunkToAction(projectsUpdate.action)({
			id,
			project: values,
		}));
	};

	useEffect(
		() => {
			void fetchProject();
		},
		[],
	);

	return {
		// STORE
		project,
		projectNetworkStatus,

		// COMPUTED
		isLoading,

		// CALLBACKS
		onSubmit,
	};
};
