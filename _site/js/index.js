$(() => {
    // load topNav
    $.ajax({
        url: '/getNav',
        dataType: 'json',
        cache: false,
        success: res => {
            // console.log(res);
            if (!res.err) {
                $(res.data).each((i, t) => {
                    $(`
                        <li class="fl"><a href="${t.src}">${t.title}</a></li>
                    `).appendTo('.top-nav');
                });
            } else {
                console.log('failed to load database: ' + res.msg);
            }
        },
        error: res => {
            console.log('ajax failed');
        },
    });
    // load banner
    $.ajax({
        url: '/getBanner',
        dataType: 'json',
        success: res => {
            if (!res.err) {
                $(res.data).each((i, v) => {
                    $(`.banner .pics li:eq(${i})`).css('backgroundColor', v.bgc);
                    $(`.banner .pics a:eq(${i})`).css('backgroundImage', `url(${v.src})`)
                        .attr('href', v.href);
                    $(`.banner .banner-r-list a:eq(${i})`).html(v.des)
                        .attr('href', v.href);
                    $('.banner .banner-r-list a')[i].index = i;
                });
                $('.banner .banner-r-list').on('mouseover', 'a', (ev) => {
                    const target = ev.target;
                    const $A = $('.banner-r-list a');
                    $('.banner-r-list a').removeClass('active');
                    target.className = 'active';
                    $(`.banner .pics li:eq(${target.index})`).css({ zIndex: 999, opacity: 1 })
                        .siblings().css({ zIndex: -1, opacity: 0 });
                });
            } else {
                console.log('data error: ' + res.msg);
            }
        },
        error: res => {
            console.log('ajax failed');
        },
    });
    // load content
    $.ajax({
        url: '/getcontent',
        dataType: 'json',
        cache: false,
        success: res => {
            if (!res.err) {
                $(res.data).each((i, v) => {
                    $(`<a class="${v.hlt ? 'hlt' : ''}" href="${v.src}">${v.inner}</a>`).appendTo(`.con-list li:eq(${v.order})`);
                });
                $('.con-bot-s').attr('placeholder', res.data[0].plh);
                $('.content-r-r h3 b').html(res.data[0].count);
            } else {
                console.log('data falied: ' + res.msg);
            }
        },
        error: res => {
            console.log('ajax failed');
        }
    });
    // content radio
    $('.content-radio').on('click', 'label, input', (ev) => {
        $('.content-radio i').removeClass('on');
        $(ev.target).siblings('i').addClass('on');
    });
    // search
    $('.con-bot-s').keyup(() => {
        $.ajax({
            url: 'http://suggestion.baidu.com/su',
            dataType: 'jsonp',
            jsonp: 'cb',
            data: { wd: $('.con-bot-s').val() },
            cache: false,
            success: res => {
                $('.sug').html('');
                $(res.s).each((i, a) => {
                    $(`<li><a href="https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=0&rsv_idx=1&tn=baidu&wd=${a}">${a}</a></li>`).appendTo('.sug');
                });
                $('html, body').on('click', () => {
                    $('.sug').html('');
                });
            },
        });
    });
    // test
    $.ajax({
        url: '/getTest',
        dataType: 'json',
        cache: false,
        success: res => {
            if (!res.err) {
                $(res.data).each((i, q) => {
                    if (q.tit) { // 左边只有三组数据
                        $('.test-s-1:eq(' + i + ')').html(`
                            <h3>${q.tit}</h3>
                            <p>${q.subti}</p>
                        `).css('backgroundImage', 'url(' + q.lsrc + ')')
                          .parents()[0].href = q.lhr;
                    }
                    // ul list
                    $('.test-con-c li:eq(' + i + ') a')
                        .html(q.conli)
                        .attr('href', q.colhrf)
                        .siblings('i').html(q.usnm)
                        .siblings('em').css('backgroundImage', 'url(' + q.fav + ')');
                    // button bottom
                    $('.test-con-b li:eq(' + i + ') a')
                        .html(q.bbtn)
                        .attr('href', q.bbhrf);
                });
                // title and tag
                $('.test-con-t h3').html(res.data[0].cont);
                $('.test-con-t div').html(res.data[1].cont);
            } else {
                console.log('data falied: ' + res.msg);
            }
        },
        error: () => {
            console.log('ajax failed');
        }
    });
    // hover che-t
    $('.che-t').on('mouseover', 'li', ev => {
        const oChe = $('.che-t')[0];
        clearTimeout(oChe.timer);
        const oTar = ev.target;
        $(oTar).addClass('act').parents(0).siblings().children()
               .removeClass('act');
        const oL = $(oTar).position().left + 90 + 'px';
        oChe.timer = setTimeout(() => {
            $('.che-t i.act').css('left', oL);
        }, 100);
    });
});
