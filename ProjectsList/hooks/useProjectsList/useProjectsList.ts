import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { thunkToAction } from 'typescript-fsa-redux-thunk';

import {
	projectsFetch,
	projectsRemove,
	projectsSelector,
	projectsNetworkStatusSelector,
} from '@redux';

export const useProjectsList = () => {
	const dispatch = useDispatch();
	const projects = useSelector(projectsSelector);
	const projectsNetworkStatus = useSelector(projectsNetworkStatusSelector);

	const fetchProjects = async () => {
		await dispatch(thunkToAction(projectsFetch.action)());
	};

	const onRemove = async (id: number) => {
		await dispatch(thunkToAction(projectsRemove.action)({ id }));
	};

	useEffect(
		() => {
			void fetchProjects();
		},
		[],
	);

	return {
		// STORE
		projects,
		projectsNetworkStatus,

		// CALLBACKS
		onRemove,
	};
};
