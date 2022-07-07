import { Component, Input } from '@angular/core';
import { Commit } from '../commits-dashboard/commits-dashboard-models';

export const maxCommitMessageLength = 100;

@Component({
  selector: 'ana-commit-info[repositoryUrl][commit]',
  templateUrl: './commit-info.component.html',
  styleUrls: ['./commit-info.component.scss'],
})
export class CommitInfoComponent {
  @Input() commit?: Commit;
  @Input() repositoryUrl?: string;

  private static highlightTicketNumber(commitMessage: string) {
    const match = /MD-[0-9]{4}/.exec(commitMessage);
    return match
      ? commitMessage.replace(
          match[0],
          `<span class="u-text-bold u-nowrap">${match[0]}</span>`
        )
      : commitMessage;
  }

  private static allowLineBreaksAfterSlash(commitMessage: string) {
    return commitMessage.replace(/\//g, '/<wbr>');
  }

  getCommitMessage(commitMessage: string) {
    return CommitInfoComponent.highlightTicketNumber(
      CommitInfoComponent.allowLineBreaksAfterSlash(commitMessage)
    );
  }

  getAbbreviatedCommitMessage(commitMessage: string) {
    return this.getCommitMessage(
      commitMessage.length > maxCommitMessageLength
        ? `${commitMessage.slice(0, maxCommitMessageLength)}...`
        : commitMessage
    ).split('\n')[0];
  }

  getCommitMessageTooltip(commitMessage: string) {
    return commitMessage.includes('\n') ||
      commitMessage.length > maxCommitMessageLength
      ? this.getCommitMessage(commitMessage)
      : undefined;
  }
}