$(function() {
    // 音乐自动播放处理（部分浏览器需用户交互）
    const audio = $('audio')[0];
    document.addEventListener('click', () => audio.play(), { once: true });

    // 输入框动态效果
    $('input').on('focus', function() {
        $(this).animate({ width: '300px' }, 200)
               .css('border-color', '#ff4081');
    }).on('blur', function() {
        $(this).animate({ width: '250px' }, 200)
               .css('border-color', '#ddd');
    });

    // 表单提交验证
    $('.form').submit(function(e) {
        e.preventDefault();
        
        // 验证规则
        const validation = {
            userName: {
                value: $('#userName').val().trim(),
                rightValue: "宝宝",
                error: '用户名不正确'
            },
            pwd: {
                value: $('#pwd').val(),
                rightValue: "1025",
                error: '密码不正确'
            }
        };

        // 执行验证
        let isValid = true;
        Object.keys(validation).forEach(key => {
            const field = validation[key];
            const $input = $(`#${key}`);
            
            if (field.value!=field.rightValue) {
                showError($input, field.error);
                isValid = false;
            } else {
                clearError($input);
            }
        });

        // 验证通过处理
        if (isValid) {
            $('.container')
                .animate({ opacity: 0 }, 800)
                .slideUp(500, () => {
                    showBirthdayAnimation();
                    startHeartbeatEffect();
                });
        }
    });

    // 错误提示函数
    function showError($element, message) {
        const $error = $element.next('.error-msg');
        if ($error.length === 0) {
            $element.after(`<div class="error-msg">${message}</div>`)
                    .parent().css('position', 'relative');
        } else {
            $error.text(message).show();
        }
    }

    function clearError($element) {
        $element.next('.error-msg').hide();
    }

    // 生日动画效果
    function showBirthdayAnimation() {
        const messages = [
            "亲爱的{name}：",
            "在这个特别的日子里",
            "愿所有美好如期而至",
            "生日快乐！❤️"
        ];
        
        const $container = $('<div class="birthday-content">')
            .css({
                opacity: 0,
                transform: 'translateY(50px)'
            })
            .appendTo('body');
        
        messages.forEach((text, i) => {
            $('<div>')
                .text(text.replace('{name}', $('#userName').val()))
                .css({
                    fontSize: `${24 + i*4}px`,
                    animation: `float ${3 + i*0.5}s ease-in-out infinite alternate`
                })
                .appendTo($container)
                .delay(i*800).fadeIn(600);
        });

        // $container.animate({ opacity: 1 }, 1000);
        $container.animate({ opacity: 1 }, 5000, () => {
            // 动画播放完成后跳转到 index1.html
            setTimeout(() => {
                $container.fadeOut(5000, () => {
                    $container.remove();
                });
            }, 2000);
            window.location.href = 'index1.html';
        });
    }

    // 心跳特效
    function startHeartbeatEffect() {
        $('.bg-bubbles li').each(function(i) {
            $(this).css({
                animation: `heartbeat ${1 + i*0.2}s ease-in-out infinite`,
                background: `hsl(${i*36}, 70%, 60%)`
            });
        });
    }
});