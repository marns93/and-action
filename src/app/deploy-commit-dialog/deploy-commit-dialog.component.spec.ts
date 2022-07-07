import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  DeployCommitDialogComponent,
  DialogData,
} from './deploy-commit-dialog.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommitInfoComponent } from '../commit-info/commit-info.component';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  Commit,
  DeploymentState,
  RepositoryWithCommits,
} from '../commits-dashboard/commits-dashboard-models';
import { TooltipDirective } from '../tooltip.directive';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GraphQLModule } from '../graphql.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const getCommit = (): Commit => ({
  id: 'C_idOfCommit',
  oid: '7fcd3ab3bc3ca980957185cdbf813d127aaf5944',
  abbreviatedOid: '7fcd3ab',
  author: {
    name: 'MaxMustermann',
    login: 'mmm',
  },
  committedDate: new Date('2022-03-15T10:30:25Z'),
  committer: {
    name: 'GitHub',
    email: 'noreply@github.com',
  },
  commitUrl:
    'https://github.com/organisation/repository/commit/7fcd3ab3bc3ca980957185cdbf813d127aaf3c33',
  message: 'feat(scope): add new functionality\n\nCloses #123',
  isMergeCommit: true,
  parents: [
    'x32c00529a39452034893a33b641746044df5413',
    'fbabf6607c429fc3110ddfc81e506121ab7ecf12',
  ],
  deployments: [
    {
      id: 'DE_kwd0QZveWM4fVt24',
      creator: {
        login: 'mmm',
        name: 'Max Mustermann',
      },
      environment: 'dev',
      state: DeploymentState.ACTIVE,
      timestamp: new Date('2022-03-15T10:51:31.000Z'),
    },
  ],
});

const getCommits = () => [getCommit()];

const getRepository = (): RepositoryWithCommits => ({
  id: 'R_idOfRepository',
  name: 'and-action',
  owner: 'and-action',
  defaultBranchRef: { name: 'master' },
  url: 'https://github.com/and-action/and-action',
  commits: [],
});

const getDialogData = (): DialogData => ({
  repository: getRepository(),
  commitToDeploy: getCommit(),
  commits: getCommits(),
});

describe('DeployCommitDialogComponent', () => {
  let component: DeployCommitDialogComponent;
  let fixture: ComponentFixture<DeployCommitDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        GraphQLModule,
        HttpClientTestingModule,
        MatDialogModule,
        MatSnackBarModule,
      ],
      declarations: [
        CommitInfoComponent,
        DeployCommitDialogComponent,
        TooltipDirective,
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        {
          provide: MAT_DIALOG_DATA,
          useValue: getDialogData(),
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeployCommitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});