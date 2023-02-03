import * as React from 'react';
import { useNavigate, useParams } from 'react-router';

import { URLS } from '@constants';

import { getParametrizedUrl } from '@utils';

import { Paper, CircularProgress } from '@ui';

import { ProjectsEditForm, IProjectsEditFormFields } from '../components/ProjectsEditForm';
import { useProjectsEdit } from './hooks';

import { IRouteParams } from './types';

import s from './ProjectsEdit.scss';

export const ProjectsEdit = () => {
	const { id } = useParams<IRouteParams>();
	const navigate = useNavigate();
	const {
		isLoading,
		project,
		onSubmit,
	} = useProjectsEdit({ id: Number(id) });

	const handleSubmit = async (values: IProjectsEditFormFields) => {
		await onSubmit(values);

		navigate(getParametrizedUrl(URLS.PROJECTS_VIEW, { id }));
	};

	return isLoading
		? <CircularProgress />
		: (
			<div className={s.root}>
				<Paper className={s.wrapper}>
					<ProjectsEditForm project={project} onSubmit={handleSubmit} />
				</Paper>
			</div>
		);
};
