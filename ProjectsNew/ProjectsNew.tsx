import * as React from 'react';
import { useNavigate } from 'react-router';

import { URLS } from '@constants';

import { getParametrizedUrl } from '@utils';

import { Paper } from '@ui';

import { ProjectsEditForm, IProjectsEditFormFields } from '../components/ProjectsEditForm';
import { useProjectsNew } from './hooks';

import s from './ProjectsNew.scss';

export const ProjectsNew = () => {
	const navigate = useNavigate();
	const { onSubmit } = useProjectsNew();

	const handleSubmit = async (values: IProjectsEditFormFields) => {
		const project = await onSubmit(values);

		navigate(getParametrizedUrl(URLS.PROJECTS_VIEW, { id: project.id }));
	};

	return (
		<div className={s.root}>
			<Paper className={s.wrapper}>
				<ProjectsEditForm isCreate={true} onSubmit={handleSubmit} />
			</Paper>
		</div>
	);
};
