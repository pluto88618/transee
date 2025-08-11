/**
 * 多语言问题修复脚本
 * 用于检查和修复多语言网站的问题
 */

(function() {
    'use strict';
    
    console.log('🔧 多语言问题修复脚本已启动');
    
    // 检查当前页面状态
    function checkPageStatus() {
        const currentPath = window.location.pathname;
        const currentLang = getCurrentPageLanguage();
        const htmlLang = document.documentElement.lang;
        
        console.log('📊 页面状态检查:');
        console.log(`   当前路径: ${currentPath}`);
        console.log(`   检测语言: ${currentLang}`);
        console.log(`   HTML lang: ${htmlLang}`);
        
        // 检查i18n对象
        if (window.i18n) {
            console.log('✅ i18n对象存在');
            if (window.i18n.getCurrentLanguage) {
                console.log(`   i18n当前语言: ${window.i18n.getCurrentLanguage()}`);
            }
        } else {
            console.log('❌ i18n对象不存在');
        }
        
        // 检查语言切换器
        const switcher = document.getElementById('language-switcher');
        if (switcher) {
            console.log('✅ 语言切换器存在');
            console.log(`   当前选中: ${switcher.value}`);
        } else {
            console.log('❌ 语言切换器不存在');
        }
        
        return { currentPath, currentLang, htmlLang, hasI18n: !!window.i18n, hasSwitcher: !!switcher };
    }
    
    // 获取当前页面语言
    function getCurrentPageLanguage() {
        const path = window.location.pathname;
        const match = path.match(/^\/([a-z]{2}-[A-Z]{2})\//);
        return match ? match[1] : 'en';
    }
    
    // 修复i18n初始化问题
    function fixI18nInitialization() {
        const currentLang = getCurrentPageLanguage();
        
        if (currentLang !== 'en' && window.i18n) {
            try {
                // 设置语言
                if (window.i18n.setLanguage) {
                    window.i18n.setLanguage(currentLang);
                    console.log(`✅ 已设置i18n语言为: ${currentLang}`);
                }
                
                // 更新页面内容
                if (window.i18n.updatePageContent) {
                    window.i18n.updatePageContent();
                    console.log('✅ 已更新页面内容');
                }
                
                // 更新页面方向
                if (window.i18n.updatePageDirection) {
                    window.i18n.updatePageDirection();
                    console.log('✅ 已更新页面方向');
                }
            } catch (error) {
                console.error('❌ i18n初始化失败:', error);
            }
        }
    }
    
    // 修复语言切换器
    function fixLanguageSwitcher() {
        const switcher = document.getElementById('language-switcher');
        if (switcher) {
            const currentLang = getCurrentPageLanguage();
            
            // 设置正确的选中值
            if (currentLang !== 'en') {
                switcher.value = currentLang;
                console.log(`✅ 已修复语言切换器选中值: ${currentLang}`);
            }
            
            // 确保事件监听器正常工作
            if (!switcher.hasAttribute('data-fixed')) {
                switcher.setAttribute('data-fixed', 'true');
                
                // 移除可能重复的事件监听器
                const newSwitcher = switcher.cloneNode(true);
                switcher.parentNode.replaceChild(newSwitcher, switcher);
                
                // 重新添加事件监听器
                newSwitcher.addEventListener('change', function(event) {
                    const selectedLanguage = event.target.value;
                    console.log(`🌍 语言切换请求: ${selectedLanguage}`);
                    
                    // 调用全局的changeLanguage函数
                    if (window.changeLanguage) {
                        window.changeLanguage(selectedLanguage);
                    } else {
                        // 如果没有全局函数，直接跳转
                        const currentPath = window.location.pathname;
                        const currentSearch = window.location.search;
                        const currentHash = window.location.hash;
                        
                        if (selectedLanguage === 'en') {
                            window.location.href = '/' + currentSearch + currentHash;
                        } else {
                            const targetPath = `/${selectedLanguage}/`;
                            if (!currentPath.startsWith(targetPath)) {
                                window.location.href = targetPath + currentSearch + currentHash;
                            }
                        }
                    }
                });
                
                console.log('✅ 已修复语言切换器事件监听器');
            }
        }
    }
    
    // 检查脚本加载顺序
    function checkScriptLoading() {
        const scripts = document.querySelectorAll('script[src]');
        let i18nScript = null;
        let mainScript = null;
        
        scripts.forEach(script => {
            const src = script.src;
            if (src.includes('i18n.js')) {
                i18nScript = script;
            } else if (src.includes('script.js')) {
                mainScript = script;
            }
        });
        
        if (i18nScript && mainScript) {
            const i18nIndex = Array.from(scripts).indexOf(i18nScript);
            const mainIndex = Array.from(scripts).indexOf(mainScript);
            
            console.log('📜 脚本加载顺序检查:');
            console.log(`   i18n.js 位置: ${i18nIndex}`);
            console.log(`   script.js 位置: ${mainIndex}`);
            
            if (i18nIndex < mainIndex) {
                console.log('✅ 脚本加载顺序正确');
            } else {
                console.log('❌ 脚本加载顺序错误，i18n.js应该在script.js之前');
            }
        }
    }
    
    // 自动修复常见问题
    function autoFix() {
        console.log('🔧 开始自动修复...');
        
        // 修复i18n初始化
        fixI18nInitialization();
        
        // 修复语言切换器
        fixLanguageSwitcher();
        
        // 检查脚本加载顺序
        checkScriptLoading();
        
        console.log('✅ 自动修复完成');
    }
    
    // 创建修复控制面板
    function createFixPanel() {
        const panel = document.createElement('div');
        panel.id = 'fix-panel';
        panel.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #1f2937;
            color: white;
            padding: 15px;
            border-radius: 10px;
            font-family: monospace;
            font-size: 12px;
            z-index: 10000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            max-width: 300px;
        `;
        
        panel.innerHTML = `
            <div style="margin-bottom: 10px; font-weight: bold; color: #60a5fa;">🔧 多语言修复工具</div>
            <button onclick="window.fixMultilang.checkPageStatus()" style="width: 100%; margin: 5px 0; padding: 5px; background: #374151; border: none; color: white; border-radius: 3px; cursor: pointer;">检查状态</button>
            <button onclick="window.fixMultilang.autoFix()" style="width: 100%; margin: 5px 0; padding: 5px; background: #059669; border: none; color: white; border-radius: 3px; cursor: pointer;">自动修复</button>
            <button onclick="document.getElementById('fix-panel').remove()" style="width: 100%; margin: 5px 0; padding: 5px; background: #dc2626; border: none; color: white; border-radius: 3px; cursor: pointer;">关闭</button>
        `;
        
        document.body.appendChild(panel);
        console.log('✅ 修复控制面板已创建');
    }
    
    // 等待页面加载完成后执行
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }
        
        // 延迟执行，确保所有脚本都加载完成
        setTimeout(() => {
            console.log('🚀 页面加载完成，开始检查多语言状态...');
            
            // 检查页面状态
            checkPageStatus();
            
            // 自动修复
            autoFix();
            
            // 创建修复控制面板
            createFixPanel();
            
        }, 1000);
    }
    
    // 暴露函数到全局作用域
    window.fixMultilang = {
        checkPageStatus,
        fixI18nInitialization,
        fixLanguageSwitcher,
        checkScriptLoading,
        autoFix,
        getCurrentPageLanguage
    };
    
    // 启动修复脚本
    init();
    
})();
