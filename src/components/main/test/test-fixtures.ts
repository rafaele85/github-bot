import {AppConfig} from "../config";
import {NewMessageInput} from "../../chat/schema/generated/graphql";

const inputPush1: [NewMessageInput] = [
    { text_message: {message: "08.04.2021 21:05:44: johnsmith выполнил push в репозиторий github-bot коммиты: [ John Smith: \"исправление форматирования сообщения\" ]"} }
];

export const testFixturePush1 = (config: AppConfig) =>  ({
        githubData: {
            ref: 'refs/heads/master',
            before: '3fd4274f372dc1c05a8b7e020d2fe90da17dd807',
            after: '0a8953c3d55c527028233c63392052e6aa0f2c44',
            repository:
                { id: 355514042,
                    node_id: 'MDEwOlJlcG9zaXRvcnkzNTU1MTQwNDI=',
                    name: 'github-bot',
                    full_name: 'johnsmith/github-bot',
                    private: false,
                    owner: {
                        name: 'johnsmith',
                        email: 'johnsmith@users.noreply.service.com',
                        login: 'johnsmith',
                        id: 59977873,
                        node_id: 'MDQ6VXNlcjU5OTc3ODcz',
                        avatar_url: 'https://avatars.githubusercontent.com/u/59977873?v=4',
                        gravatar_id: '',
                        url: 'https://api.github.com/users/johnsmith',
                        html_url: 'https://github.com/johnsmith',
                        followers_url: 'https://api.github.com/users/johnsmith/followers',
                        following_url:
                            'https://api.github.com/users/johnsmith/following{/other_user}',
                        gists_url: 'https://api.github.com/users/johnsmith/gists{/gist_id}',
                        starred_url:
                            'https://api.github.com/users/johnsmith/starred{/owner}{/repo}',
                        subscriptions_url: 'https://api.github.com/users/johnsmith/subscriptions',
                        organizations_url: 'https://api.github.com/users/johnsmith/orgs',
                        repos_url: 'https://api.github.com/users/johnsmith/repos',
                        events_url: 'https://api.github.com/users/johnsmith/events{/privacy}',
                        received_events_url: 'https://api.github.com/users/johnsmith/received_events',
                        type: 'User',
                        site_admin: false
                    },
                    html_url: 'https://github.com/johnsmith/github-bot',
                    description: null,
                    fork: false,
                    url: 'https://github.com/johnsmith/github-bot',
                    forks_url: 'https://api.github.com/repos/johnsmith/github-bot/forks',
                    keys_url:  'https://api.github.com/repos/johnsmith/github-bot/keys{/key_id}',
                    collaborators_url:  'https://api.github.com/repos/johnsmith/github-bot/collaborators{/collaborator}',
                    teams_url: 'https://api.github.com/repos/johnsmith/github-bot/teams',
                    hooks_url: 'https://api.github.com/repos/johnsmith/github-bot/hooks',
                    issue_events_url:  'https://api.github.com/repos/johnsmith/github-bot/issues/events{/number}',
                    events_url: 'https://api.github.com/repos/johnsmith/github-bot/events',
                    assignees_url:  'https://api.github.com/repos/johnsmith/github-bot/assignees{/user}',
                    branches_url:  'https://api.github.com/repos/johnsmith/github-bot/branches{/branch}',
                    tags_url: 'https://api.github.com/repos/johnsmith/github-bot/tags',
                    blobs_url:  'https://api.github.com/repos/johnsmith/github-bot/git/blobs{/sha}',
                    git_tags_url:  'https://api.github.com/repos/johnsmith/github-bot/git/tags{/sha}',
                    git_refs_url:  'https://api.github.com/repos/johnsmith/github-bot/git/refs{/sha}',
                    trees_url: 'https://api.github.com/repos/johnsmith/github-bot/git/trees{/sha}',
                    statuses_url:  'https://api.github.com/repos/johnsmith/github-bot/statuses/{sha}',
                    languages_url:  'https://api.github.com/repos/johnsmith/github-bot/languages',
                    stargazers_url:  'https://api.github.com/repos/johnsmith/github-bot/stargazers',
                    contributors_url:  'https://api.github.com/repos/johnsmith/github-bot/contributors',
                    subscribers_url:  'https://api.github.com/repos/johnsmith/github-bot/subscribers',
                    subscription_url:
                        'https://api.github.com/repos/johnsmith/github-bot/subscription',
                    commits_url:
                        'https://api.github.com/repos/johnsmith/github-bot/commits{/sha}',
                    git_commits_url:
                        'https://api.github.com/repos/johnsmith/github-bot/git/commits{/sha}',
                    comments_url:
                        'https://api.github.com/repos/johnsmith/github-bot/comments{/number}',
                    issue_comment_url:
                        'https://api.github.com/repos/johnsmith/github-bot/issues/comments{/number}',
                    contents_url:
                        'https://api.github.com/repos/johnsmith/github-bot/contents/{+path}',
                    compare_url:
                        'https://api.github.com/repos/johnsmith/github-bot/compare/{base}...{head}',
                    merges_url: 'https://api.github.com/repos/johnsmith/github-bot/merges',
                    archive_url:
                        'https://api.github.com/repos/johnsmith/github-bot/{archive_format}{/ref}',
                    downloads_url:
                        'https://api.github.com/repos/johnsmith/github-bot/downloads',
                    issues_url:
                        'https://api.github.com/repos/johnsmith/github-bot/issues{/number}',
                    pulls_url:
                        'https://api.github.com/repos/johnsmith/github-bot/pulls{/number}',
                    milestones_url:
                        'https://api.github.com/repos/johnsmith/github-bot/milestones{/number}',
                    notifications_url:
                        'https://api.github.com/repos/johnsmith/github-bot/notifications{?since,all,participating}',
                    labels_url:
                        'https://api.github.com/repos/johnsmith/github-bot/labels{/name}',
                    releases_url:
                        'https://api.github.com/repos/johnsmith/github-bot/releases{/id}',
                    deployments_url:
                        'https://api.github.com/repos/johnsmith/github-bot/deployments',
                    created_at: 1617793745,
                    updated_at: '2021-04-08T17:59:01Z',
                    pushed_at: 1617905144,
                    git_url: 'git://service.com/johnsmith/github-bot.git',
                    ssh_url: 'git@service.com:johnsmith/github-bot.git',
                    clone_url: 'https://github.com/johnsmith/github-bot.git',
                    svn_url: 'https://github.com/johnsmith/github-bot',
                    homepage: null,
                    size: 554,
                    stargazers_count: 0,
                    watchers_count: 0,
                    language: 'TypeScript',
                    has_issues: true,
                    has_projects: true,
                    has_downloads: true,
                    has_wiki: true,
                    has_pages: false,
                    forks_count: 0,
                    mirror_url: null,
                    archived: false,
                    disabled: false,
                    open_issues_count: 1,
                    license: null,
                    forks: 0,
                    open_issues: 1,
                    watchers: 0,
                    default_branch: 'master',
                    stargazers: 0,
                    master_branch: 'master' },
            pusher:
                { name: 'johnsmith',
                    email: '59977873+johnsmith@users.noreply.service.com' },
            sender:
                { login: 'johnsmith',
                    id: 59977873,
                    node_id: 'MDQ6VXNlcjU5OTc3ODcz',
                    avatar_url: 'https://avatars.githubusercontent.com/u/59977873?v=4',
                    gravatar_id: '',
                    url: 'https://api.github.com/users/johnsmith',
                    html_url: 'https://github.com/johnsmith',
                    followers_url: 'https://api.github.com/users/johnsmith/followers',
                    following_url:
                        'https://api.github.com/users/johnsmith/following{/other_user}',
                    gists_url: 'https://api.github.com/users/johnsmith/gists{/gist_id}',
                    starred_url:
                        'https://api.github.com/users/johnsmith/starred{/owner}{/repo}',
                    subscriptions_url: 'https://api.github.com/users/johnsmith/subscriptions',
                    organizations_url: 'https://api.github.com/users/johnsmith/orgs',
                    repos_url: 'https://api.github.com/users/johnsmith/repos',
                    events_url: 'https://api.github.com/users/johnsmith/events{/privacy}',
                    received_events_url: 'https://api.github.com/users/johnsmith/received_events',
                    type: 'User',
                    site_admin: false },
            created: false,
            deleted: false,
            forced: false,
            base_ref: null,
            compare:
                'https://github.com/johnsmith/github-bot/compare/3fd4274f372d...0a8953c3d55c',
            commits:
                [ { id: '0a8953c3d55c527028233c63392052e6aa0f2c44',
                    tree_id: '6929afda019ea69da9d16bdb286abb34e6df4b1d',
                    distinct: true,
                    message: 'исправление форматирования сообщения',
                    timestamp: '2021-04-08T21:05:38+03:00',
                    url:
                        'https://github.com/johnsmith/github-bot/commit/0a8953c3d55c527028233c63392052e6aa0f2c44',
                    author:
                        { name: 'John Smith',
                            email: 'js@gmail.com',
                            username: 'johnsmith'
                        },
                    committer:
                        { name: 'John Smith',
                            email: 'js@gmail.com',
                            username: 'johnsmith'
                        },
                    added: [],
                    removed: [],
                    modified: [] } ],
            head_commit:
                { id: '0a8953c3d55c527028233c63392052e6aa0f2c44',
                    tree_id: '6929afda019ea69da9d16bdb286abb34e6df4b1d',
                    distinct: true,
                    message: 'исправление форматирования сообшщения',
                    timestamp: '2021-04-08T21:05:38+03:00',
                    url:
                        'https://github.com/johnsmith/github-bot/commit/0a8953c3d55c527028233c63392052e6aa0f2c44',
                    author:
                        { name: 'John Smith',
                            email: 'js@gmail.com',
                            username: 'johnsmith'
                        },
                    committer:
                        { name: 'John Smith',
                            email: 'js@gmail.com',
                            username: 'johnsmith'
                        },
                    added: [],
                    removed: [],
                    modified: [ 'src/services/service/event-parser.ts' ]
                }
        },
        result: {
            query:`
            mutation NEW_MESSAGE($chat_id: ID!, $input: [NewMessageInput!]!) {
                newMessages2( chat_id: $chat_id, input: $input) {
                    edges {
                        node {
                            id
                        }
                    }
                }
            }
            `,
            vars: {chat_id: config.chatId(),
                   input: inputPush1
            },
            headers: {Authorization: "Bearer "+config.chatApiToken()}
        },
    }
);





