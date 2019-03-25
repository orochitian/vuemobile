import Home from './views/Home';

//  小说开始
import NovelIndex from './views/novel/Index';
import NovelClassify from './views/novel/Classify';
import NovelClassifyIndex from './views/novel/ClassifyIndex';
import NovelClassifyList from './views/novel/ClassifyList';
import NovelSearchResult from './views/novel/SearchResult';
import NovelMenu from './views/novel/NovelMenu';
import NovelDetail from './views/novel/Detail';
import NovelHistory from './views/novel/NovelHistory';
//  小说结束

//  登录
import Login from './views/Login';

export default [
    { path: '/', component: Home },
    {
        path: '/novel',
        component: NovelIndex,
        children: [
            {
                path: '',
                component: NovelClassify,
                children: [
                    { path: '', component: NovelClassifyIndex },
                    { path: 'classifylist', component: NovelClassifyList }
                ],
            },
            { path: 'searchresult', component: NovelSearchResult }
        ]
    },
    { path: '/novel/menu', component: NovelMenu },
    { path: '/novel/detail', component: NovelDetail },
    { path: '/novel/history', component: NovelHistory },
    { path: '/login', component: Login },

]
