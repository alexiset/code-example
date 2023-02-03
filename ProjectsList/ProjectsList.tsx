import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import { getTranslation } from '@my/locales';

import { URLS } from '@constants';

import { getParametrizedUrl } from '@utils';

import {
	Table,
	ITableRowData,
	TTableAlign,
	Fab,
	Tooltip,
	CircularProgress,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
	Dialog,
} from '@ui';

import { MaterialEditIcon, MaterialAddIcon, MaterialDeleteIcon } from '@icons';

import { useProjectsList } from './hooks';

import { ICIProject } from '@interfaces';

import { locales } from './locales';

import s from './ProjectsList.scss';

const t = getTranslation<typeof locales>(__dirname);

export const ProjectsList = () => {
	const {
		projects,
		projectsNetworkStatus,
		onRemove,
	} = useProjectsList();
	const navigate = useNavigate();
	const [removedId, setRemovedId] = useState<number>(null);
	const [isConfirmDialogOpened, setIsConfirmDialogOpened] = useState(false);

	const getTitles = () => {
		return [
			t.id,
			t.name,
			t.jiraProject,
			t.gitLabProject,
			'',
		];
	};

	const getRow = (project: ICIProject, align?: TTableAlign): ITableRowData => {
		return {
			align,
			data: [
				{ value: project.id },
				{ value: project.name },
				{ value: project.jiraProjectKey },
				{ value: project.gitLabProjectId },
				{
					value: (
						<>
							<MaterialEditIcon onClick={(event) => handleEditClick(event, project.id)}/>

							<Tooltip title={t.remove}>
								<MaterialDeleteIcon
									className={s.actionIcon}
									onClick={(event) => handleRemoveClick(event, project.id)}
								/>
							</Tooltip>
						</>
					),
					align: 'right',
				},
			],
		};
	};

	const getData = () => {
		return projects.map((project) => getRow(project));
	};

	const openRemoveConfirmDialog = () => setIsConfirmDialogOpened(true);

	const closeRemoveConfirmDialog = () => setIsConfirmDialogOpened(false);

	const handleRowClick = (row: ITableRowData) => {
		const id = row.data[0].value as string;

		navigate(getParametrizedUrl(URLS.PROJECTS_VIEW, { id }));
	};

	const handleAddClick = () => {
		navigate(URLS.PROJECTS_NEW);
	};

	const handleEditClick = (event: React.MouseEvent, id: number) => {
		event.stopPropagation();

		navigate(getParametrizedUrl(URLS.PROJECTS_EDIT, { id }));
	};

	const handleRemoveClick = (event: React.MouseEvent, id: number) => {
		event.stopPropagation();

		setRemovedId(id);
		openRemoveConfirmDialog();
	};

	const handleRemoveDialogClose = () => {
		closeRemoveConfirmDialog();
	};

	const handleRemoveDialogCloseAccept = async () => {
		await onRemove(removedId);

		closeRemoveConfirmDialog();
	};

	const handleRemoveDialogCancel = () => {
		closeRemoveConfirmDialog();
	};

	return projectsNetworkStatus.isFetching
		? <CircularProgress/>
		: (
			<>
				<Tooltip title={t.new}>
					<Fab
						color="primary"
						aria-label="add"
						className={s.add}
						onClick={handleAddClick}
					>
						<MaterialAddIcon/>
					</Fab>
				</Tooltip>

				<Table
					titles={getTitles()}
					data={getData()}
					onRowClick={handleRowClick}
				/>

				<Dialog
					open={isConfirmDialogOpened}
					onClose={handleRemoveDialogClose}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">{t.confirmRemove.title}</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							{t.confirmRemove.text}
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleRemoveDialogCancel} color="primary">
							{t.confirmRemove.no}
						</Button>
						<Button onClick={handleRemoveDialogCloseAccept} color="primary" autoFocus>
							{t.confirmRemove.yes}
						</Button>
					</DialogActions>
				</Dialog>
			</>
		);
};
