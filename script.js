const recommendations = [
    { id: 1, title: '星际穿越', category: 'movie', type: '电影', score: 9.4, genre: '科幻史诗', description: '诺兰导演，关于爱与时空的震撼之旅', reason: '震撼的视觉特效与深刻的情感内核', imagePrompt: 'Interstellar movie poster sci-fi epic space' },
    { id: 2, title: '进击的巨人', category: 'anime', type: '动漫', score: 9.8, genre: '暗黑奇幻', description: '人类与巨人的生存之战', reason: '史诗级的叙事与震撼的战斗场面', imagePrompt: 'Attack on Titan anime poster dark fantasy' },
    { id: 3, title: '肖申克的救赎', category: 'movie', type: '电影', score: 9.7, genre: '剧情经典', description: '希望与自由的赞歌', reason: '深刻的人性刻画与对自由的追求', imagePrompt: 'Shawshank Redemption movie poster classic drama' },
    { id: 4, title: '鬼灭之刃', category: 'anime', type: '动漫', score: 9.5, genre: '热血战斗', description: '兄妹情深，华丽的视觉特效', reason: '惊艳的战斗画面与感人的兄妹羁绊', imagePrompt: 'Demon Slayer anime poster hot blood battle' },
    { id: 5, title: '千与千寻', category: 'anime', type: '动漫', score: 9.4, genre: '宫崎骏经典', description: '奇幻冒险，成长与治愈的童话', reason: '吉卜力的巅峰之作', imagePrompt: 'Spirited Away anime poster Studio Ghibli' },
    { id: 6, title: '盗梦空间', category: 'movie', type: '电影', score: 9.3, genre: '烧脑科幻', description: '层层梦境，诺兰的时空迷宫', reason: '精妙的叙事结构与视觉奇观', imagePrompt: 'Inception movie poster sci-fi dreams' },
    { id: 7, title: '你的名字。', category: 'anime', type: '动漫', score: 9.4, genre: '新海诚', description: '奇幻爱情，穿越时空的羁绊', reason: '绝美的画面与动人的爱情故事', imagePrompt: 'Your Name anime poster Makoto Shinkai' },
    { id: 8, title: '阿甘正传', category: 'movie', type: '电影', score: 9.5, genre: '励志经典', description: '人生就像一盒巧克力', reason: '一个普通人的非凡人生', imagePrompt: 'Forrest Gump movie poster inspirational' }
];
let currentCategory = 'all';
function generateImageUrl(prompt) {
    return 'https://trae-api-cn.mchost.guru/api/ide/v1/text-to-image?prompt=' + encodeURIComponent(prompt) + '&image_size=square';
}
function createCard(item) {
    return '<article class="card" data-id="' + item.id + '" data-category="' + item.category + '">' +
        '<img class="card-image" src="' + generateImageUrl(item.imagePrompt) + '" alt="' + item.title + '">' +
        '<div class="card-content">' +
        '<h3 class="card-title">' + item.title + '</h3>' +
        '<div class="card-tags">' +
        '<span class="tag ' + (item.category === 'movie' ? 'tag-movie' : 'tag-anime') + '">' + item.type + '</span>' +
        '<span class="tag">' + item.genre + '</span>' +
        '</div>' +
        '<div class="card-rating">' + item.score + '分</div>' +
        '<p class="card-description">' + item.description + '</p>' +
        '<div class="card-reason"><strong>推荐理由：</strong>' + item.reason + '</div>' +
        '</div>' +
        '</article>';
}
function renderCards(data) {
    document.getElementById('cardsGrid').innerHTML = data.map(createCard).join('');
}
function filterData(category) {
    if (category === 'all') return recommendations;
    if (category === 'highscore') return recommendations.filter(function(item) { return item.score >= 9.5; });
    return recommendations.filter(function(item) { return item.category === category; });
}
function updateNavActive(category) {
    document.querySelectorAll('.nav-link').forEach(function(link) {
        link.classList.toggle('active', link.dataset.category === category);
    });
}
function handleNavClick(e) {
    if (e.target.classList.contains('nav-link')) {
        e.preventDefault();
        currentCategory = e.target.dataset.category;
        updateNavActive(currentCategory);
        renderCards(filterData(currentCategory));
        document.getElementById('navLinks').classList.remove('active');
    }
}
function handleMenuToggle() {
    document.getElementById('navLinks').classList.toggle('active');
}
document.addEventListener('DOMContentLoaded', function() {
    renderCards(recommendations);
    document.querySelector('.nav-links').addEventListener('click', handleNavClick);
    document.getElementById('menuToggle').addEventListener('click', handleMenuToggle);
});