/**
 * 所见即翻 - 智能文档翻译网站
 * 主要JavaScript功能实现
 */

// ==========================================================================
// 全局变量和配置
// ==========================================================================

// 应用状态管理
const AppState = {
    uploadedFiles: [], // 已上传的文件
    currentTranslation: null, // 当前翻译结果
    isProcessing: false, // 是否正在处理
    detectedSourceLang: null, // 检测到的源语言
    supportedFormats: ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png', '.txt'], // 支持的文件格式
    maxFileSize: 50 * 1024 * 1024, // 50MB 最大文件大小
    
    // 语言配置 - 扩展到90+种语言
    languages: {
        'auto': 'Auto Detect',
        // European Languages
        'en': 'English',
        'es': 'Español',
        'fr': 'Français',
        'de': 'Deutsch',
        'it': 'Italiano',
        'pt': 'Português',
        'ru': 'Русский',
        'nl': 'Nederlands',
        'sv': 'Svenska',
        'no': 'Norsk',
        'da': 'Dansk',
        'fi': 'Suomi',
        'pl': 'Polski',
        'cs': 'Čeština',
        'sk': 'Slovenčina',
        'hu': 'Magyar',
        'ro': 'Română',
        'bg': 'Български',
        'hr': 'Hrvatski',
        'sl': 'Slovenščina',
        'et': 'Eesti',
        'lv': 'Latviešu',
        'lt': 'Lietuvių',
        'uk': 'Українська',
        'be': 'Беларуская',
        'mk': 'Македонски',
        'sr': 'Српски',
        'bs': 'Bosanski',
        'mt': 'Malti',
        'is': 'Íslenska',
        'ga': 'Gaeilge',
        'cy': 'Cymraeg',
        'eu': 'Euskera',
        'ca': 'Català',
        'gl': 'Galego',
        'sq': 'Shqip',
        'el': 'Ελληνικά',
        
        // Asian Languages
        'zh': '中文(简体)',
        'zh-tw': '中文(繁體)',
        'ja': '日本語',
        'ko': '한국어',
        'hi': 'हिन्दी',
        'bn': 'বাংলা',
        'ur': 'اردو',
        'te': 'తెలుగు',
        'mr': 'मराठी',
        'ta': 'தமிழ்',
        'gu': 'ગુજરાતી',
        'kn': 'ಕನ್ನಡ',
        'ml': 'മലയാളം',
        'pa': 'ਪੰਜਾਬੀ',
        'ne': 'नेपाली',
        'si': 'සිංහල',
        'my': 'မြန်မာ',
        'th': 'ไทย',
        'lo': 'ລາວ',
        'km': 'ខ្មែរ',
        'vi': 'Tiếng Việt',
        'id': 'Bahasa Indonesia',
        'ms': 'Bahasa Melayu',
        'tl': 'Filipino',
        'mn': 'Монгол',
        'kk': 'Қазақ',
        'ky': 'Кыргыз',
        'uz': 'O\'zbek',
        'tg': 'Тоҷикӣ',
        
        // Middle Eastern & African Languages
        'ar': 'العربية',
        'fa': 'فارسی',
        'he': 'עברית',
        'tr': 'Türkçe',
        'az': 'Azərbaycan',
        'ka': 'ქართული',
        'hy': 'Հայերեն',
        'ku': 'کوردی',
        'sw': 'Kiswahili',
        'am': 'አማርኛ',
        'ig': 'Igbo',
        'yo': 'Yorùbá',
        'zu': 'isiZulu',
        'xh': 'isiXhosa',
        'af': 'Afrikaans',
        
        // Other Major Languages
        'pt-br': 'Português (Brasil)',
        'es-mx': 'Español (México)',
        'en-gb': 'English (British)',
        'fr-ca': 'Français (Canada)',
        'la': 'Latina',
        'eo': 'Esperanto',
        'jw': 'Javanese',
        'su': 'Sundanese',
        'ceb': 'Cebuano',
        'ny': 'Chichewa',
        'co': 'Corsican',
        'fy': 'Frisian',
        'haw': 'Hawaiian',
        'hmn': 'Hmong',
        'lb': 'Luxembourgish',
        'mg': 'Malagasy',
        'mi': 'Maori',
        'sm': 'Samoan',
        'gd': 'Scots Gaelic',
        'sn': 'Shona',
        'sd': 'Sindhi',
        'so': 'Somali',
        'st': 'Sesotho',
        'tk': 'Turkmen',
        'ps': 'Pashto'
    }
};

// DeepSeek API 配置
const DEEPSEEK_CONFIG = {
    apiKey: 'sk-c3f7a0231d6148b5a2b568afcaebe458',
    baseURL: 'https://api.deepseek.com',
    model: 'deepseek-chat'
};

// DOM元素引用
const Elements = {
    // 文件上传相关
    uploadArea: null,
    fileInput: null,
    fileList: null,
    fileItems: null,
    
    // 语言选择器
    sourceLang: null,
    targetLang: null,
    useAITranslation: null,
    
    // 处理状态
    processingSection: null,
    processingStatus: null,
    progressFill: null,
    
    // 预览区域
    previewSection: null,
    originalContent: null,
    translatedContent: null,
    originalMeta: null,
    translatedMeta: null,
    
    // 控制按钮
    copyButton: null,
    downloadButton: null,
    newTranslationButton: null,
    
    // 通知系统
    notification: null,
    notificationMessage: null,
    notificationClose: null
};

// ==========================================================================
// 初始化函数
// ==========================================================================

/**
 * 页面加载完成后初始化应用
 */
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    setupEventListeners();
    
    // 初始化国际化
    if (window.i18n) {
        i18n.init();
        setupLanguageSwitcher();
    }
    
    console.log('DocuTranslate Pro application initialized');
});

/**
 * 获取并缓存DOM元素引用
 */
function initializeElements() {
    // 文件上传相关
    Elements.uploadArea = document.getElementById('uploadArea');
    Elements.fileInput = document.getElementById('fileInput');
    Elements.fileList = document.getElementById('fileList');
    Elements.fileItems = document.getElementById('fileItems');
    
    // 语言选择器
    Elements.sourceLang = document.getElementById('source-lang');
    Elements.targetLang = document.getElementById('target-lang');
    Elements.useAITranslation = document.getElementById('use-ai-translation');
    
    // 处理状态
    Elements.processingSection = document.getElementById('processingSection');
    Elements.processingStatus = document.getElementById('processingStatus');
    Elements.progressFill = document.getElementById('progressFill');
    
    // 预览区域
    Elements.previewSection = document.getElementById('previewSection');
    Elements.originalContent = document.getElementById('originalContent');
    Elements.translatedContent = document.getElementById('translatedContent');
    Elements.originalMeta = document.getElementById('originalMeta');
    Elements.translatedMeta = document.getElementById('translatedMeta');
    
    // 控制按钮
    Elements.copyButton = document.getElementById('copyButton');
    Elements.downloadButton = document.getElementById('downloadButton');
    Elements.newTranslationButton = document.getElementById('newTranslationButton');
    
    // 通知系统
    Elements.notification = document.getElementById('notification');
    Elements.notificationMessage = document.getElementById('notificationMessage');
    Elements.notificationClose = document.getElementById('notificationClose');
}

/**
 * 设置事件监听器
 */
function setupEventListeners() {
    // 文件上传事件
    setupFileUploadEvents();
    
    // 控制按钮事件
    setupControlButtonEvents();
    
    // 通知系统事件
    setupNotificationEvents();
    
    // 语言选择事件
    setupLanguageEvents();
}

// ==========================================================================
// 文件上传功能
// ==========================================================================

/**
 * 设置文件上传相关事件
 */
function setupFileUploadEvents() {
    // 文件选择事件
    Elements.fileInput.addEventListener('change', handleFileSelect);
    
    // 拖拽上传事件
    Elements.uploadArea.addEventListener('dragover', handleDragOver);
    Elements.uploadArea.addEventListener('dragleave', handleDragLeave);
    Elements.uploadArea.addEventListener('drop', handleFileDrop);
    
    // 点击上传区域
    Elements.uploadArea.addEventListener('click', function() {
        Elements.fileInput.click();
    });
}

/**
 * 处理文件选择
 */
function handleFileSelect(event) {
    const files = Array.from(event.target.files);
    processSelectedFiles(files);
}

/**
 * 处理拖拽悬停
 */
function handleDragOver(event) {
    event.preventDefault();
    Elements.uploadArea.classList.add('dragover');
}

/**
 * 处理拖拽离开
 */
function handleDragLeave(event) {
    event.preventDefault();
    if (!Elements.uploadArea.contains(event.relatedTarget)) {
        Elements.uploadArea.classList.remove('dragover');
    }
}

/**
 * 处理文件拖拽放下
 */
function handleFileDrop(event) {
    event.preventDefault();
    Elements.uploadArea.classList.remove('dragover');
    
    const files = Array.from(event.dataTransfer.files);
    processSelectedFiles(files);
}

/**
 * 处理选中的文件
 */
function processSelectedFiles(files) {
    if (!files || files.length === 0) {
        showNotification('未选择任何文件', 'warning');
        return;
    }
    
    const validFiles = files.filter(file => validateFile(file));
    const invalidCount = files.length - validFiles.length;
    
    if (validFiles.length === 0) {
        showNotification('所选文件均不符合要求，请检查文件格式和大小', 'error');
        return;
    }
    
    // 检查是否超过文件数量限制
    const totalFiles = AppState.uploadedFiles.length + validFiles.length;
    const maxFiles = 10; // 最大文件数量限制
    
    if (totalFiles > maxFiles) {
        showNotification(`最多只能上传${maxFiles}个文件，当前已有${AppState.uploadedFiles.length}个`, 'error');
        return;
    }
    
    // 检查是否有重复文件
    const duplicateFiles = validFiles.filter(file => 
        AppState.uploadedFiles.some(existingFile => 
            existingFile.name === file.name && existingFile.size === file.size
        )
    );
    
    if (duplicateFiles.length > 0) {
        const duplicateNames = duplicateFiles.map(f => f.name).join(', ');
        showNotification(`发现重复文件：${duplicateNames}`, 'warning');
        return;
    }
    
    // 添加到文件列表
    AppState.uploadedFiles = [...AppState.uploadedFiles, ...validFiles];
    updateFileList();
    
    // 显示上传结果
    let message = `成功添加 ${validFiles.length} 个文件`;
    if (invalidCount > 0) {
        message += `，${invalidCount} 个文件未通过验证`;
    }
    showNotification(message, 'success');
    
    // 如果有文件且未在处理中，开始处理
    if (AppState.uploadedFiles.length > 0 && !AppState.isProcessing) {
        setTimeout(() => {
            if (confirm('文件上传完成，是否立即开始翻译？')) {
                startTranslationProcess();
            }
        }, 1000);
    }
}

/**
 * 验证文件格式和大小
 */
function validateFile(file) {
    try {
        // 检查文件是否存在
        if (!file || !file.name) {
            showNotification('无效的文件', 'error');
            return false;
        }
        
        // 检查文件大小
        if (file.size > AppState.maxFileSize) {
            const sizeInMB = (file.size / (1024 * 1024)).toFixed(1);
            showNotification(`文件 "${file.name}" 大小为 ${sizeInMB}MB，超过50MB限制`, 'error');
            return false;
        }
        
        // 检查文件是否为空
        if (file.size === 0) {
            showNotification(`文件 "${file.name}" 为空文件`, 'error');
            return false;
        }
        
        // 检查文件格式
        const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
        if (!AppState.supportedFormats.includes(fileExtension)) {
            const supportedList = AppState.supportedFormats.join(', ');
            showNotification(`不支持的文件格式: ${fileExtension}。支持的格式: ${supportedList}`, 'error');
            return false;
        }
        
        // 检查文件名长度
        if (file.name.length > 255) {
            showNotification(`文件名过长，请重命名后重试`, 'error');
            return false;
        }
        
        return true;
    } catch (error) {
        console.error('文件验证错误:', error);
        showNotification('文件验证失败，请重试', 'error');
        return false;
    }
}

/**
 * 更新文件列表显示
 */
function updateFileList() {
    if (AppState.uploadedFiles.length === 0) {
        Elements.fileList.style.display = 'none';
        return;
    }
    
    Elements.fileList.style.display = 'block';
    Elements.fileItems.innerHTML = '';
    
    AppState.uploadedFiles.forEach((file, index) => {
        const fileItem = createFileItem(file, index);
        Elements.fileItems.appendChild(fileItem);
    });
}

/**
 * 创建文件项HTML元素
 */
function createFileItem(file, index) {
    const fileItem = document.createElement('div');
    fileItem.className = 'file-item';
    
    fileItem.innerHTML = `
        <div class="file-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" stroke-width="2"/>
                <polyline points="14,2 14,8 20,8" stroke="currentColor" stroke-width="2"/>
            </svg>
        </div>
        <div class="file-info">
            <div class="file-name">${file.name}</div>
            <div class="file-size">${formatFileSize(file.size)}</div>
        </div>
        <button class="file-remove" onclick="removeFile(${index})" title="移除文件">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2"/>
                <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2"/>
            </svg>
        </button>
    `;
    
    return fileItem;
}

/**
 * 移除文件
 */
function removeFile(index) {
    AppState.uploadedFiles.splice(index, 1);
    updateFileList();
    
    if (AppState.uploadedFiles.length === 0) {
        resetToInitialState();
    }
}

/**
 * 格式化文件大小
 */
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// ==========================================================================
// 翻译处理功能
// ==========================================================================

/**
 * 开始翻译处理流程
 */
async function startTranslationProcess() {
    if (AppState.isProcessing) {
        showNotification('正在处理中，请稍候...', 'warning');
        return;
    }
    
    // 验证前置条件
    if (AppState.uploadedFiles.length === 0) {
        showNotification('请先上传文件', 'warning');
        return;
    }
    
    const sourceLang = Elements.sourceLang.value;
    const targetLang = Elements.targetLang.value;
    
    if (sourceLang === targetLang && sourceLang !== 'auto') {
        showNotification('源语言和目标语言不能相同', 'error');
        return;
    }
    
    AppState.isProcessing = true;
    showProcessingState();
    
    const startTime = Date.now();
    
    try {
        // 步骤1: 文字识别
        updateProcessingStatus('正在识别文字内容...', 20);
        await new Promise(resolve => setTimeout(resolve, 800)); // 模拟OCR处理时间
        const extractedText = await extractTextFromFiles();
        
        // 步骤2: 语言检测
        updateProcessingStatus('正在检测文档语言...', 40);
        await new Promise(resolve => setTimeout(resolve, 600)); // 模拟语言检测时间
        
        // 步骤3: 文本处理
        updateProcessingStatus('正在处理文本结构...', 60);
        await new Promise(resolve => setTimeout(resolve, 500)); // 模拟文本处理时间
        const processedContent = processExtractedText(extractedText);
        
        // 步骤4: 翻译
        updateProcessingStatus('正在翻译内容...', 80);
        const translatedContent = await translateContent(processedContent);
        
        // 步骤5: 完成
        updateProcessingStatus('翻译完成!', 100);
        
        const processingTime = ((Date.now() - startTime) / 1000).toFixed(1);
        console.log(`翻译处理完成，耗时: ${processingTime}秒`);
        
        // 显示结果
        setTimeout(() => {
            showTranslationResults(processedContent, translatedContent);
            AppState.isProcessing = false;
        }, 800);
        
    } catch (error) {
        console.error('翻译处理错误:', error);
        let errorMessage = '翻译处理失败，请重试';
        
        // 根据错误类型提供更具体的错误信息
        if (error.name === 'NetworkError') {
            errorMessage = '网络连接失败，请检查网络后重试';
        } else if (error.message.includes('API')) {
            errorMessage = '翻译服务暂时不可用，请稍后重试';
        } else if (error.message.includes('文件')) {
            errorMessage = '文件处理失败，请检查文件格式';
        }
        
        showNotification(errorMessage, 'error');
        AppState.isProcessing = false;
        hideProcessingState();
        
        // 记录错误详情以便调试
        const errorLog = {
            timestamp: new Date().toISOString(),
            error: error.message,
            stack: error.stack,
            files: AppState.uploadedFiles.map(f => ({ name: f.name, size: f.size })),
            settings: {
                sourceLang: sourceLang,
                targetLang: targetLang,
                useAI: Elements.useAITranslation.checked
            }
        };
        console.error('详细错误日志:', errorLog);
    }
}

/**
 * 显示处理状态
 */
function showProcessingState() {
    Elements.processingSection.style.display = 'block';
    Elements.previewSection.style.display = 'none';
}

/**
 * 隐藏处理状态
 */
function hideProcessingState() {
    Elements.processingSection.style.display = 'none';
}

/**
 * 更新处理状态
 */
function updateProcessingStatus(message, progress) {
    Elements.processingStatus.textContent = message;
    Elements.progressFill.style.width = progress + '%';
}

/**
 * 从文件中提取文字 (模拟OCR功能)
 */
async function extractTextFromFiles() {
    // 模拟文字识别过程
    return new Promise(resolve => {
        setTimeout(() => {
            // 这里应该调用真实的OCR API，现在使用模拟数据
            const mockText = generateMockExtractedText();
            resolve(mockText);
        }, 2000);
    });
}

/**
 * 模拟真实的语言检测 - 基于文件内容检测语言
 */
function simulateLanguageDetection() {
    // 模拟基于上传文件的真实语言检测
    // 在真实应用中，这里会分析文件中的文字特征来判断语言
    
    const uploadedFiles = AppState.uploadedFiles;
    // 扩展到更多常用语言，与新的语言选项保持一致
    const possibleLanguages = [
        'en', 'zh', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'ja', 'ko', 
        'ar', 'hi', 'th', 'vi', 'tr', 'nl', 'sv', 'no', 'da', 'fi',
        'pl', 'cs', 'hu', 'ro', 'bg', 'hr', 'uk', 'he', 'fa', 'bn',
        'ur', 'ta', 'te', 'ml', 'gu', 'kn', 'mr', 'pa', 'id', 'ms',
        'tl', 'sw', 'am', 'af', 'eu', 'ca', 'gl', 'cy', 'ga', 'mt'
    ];
    
    // 模拟基于文件类型和内容的检测逻辑
    if (uploadedFiles.length > 0) {
        const fileName = uploadedFiles[0].name.toLowerCase();
        
        // 根据文件名或其他特征模拟检测结果
        const languagePatterns = {
            'en': ['english', 'en_', '_en', 'eng_', '_eng'],
            'zh': ['chinese', 'zh_', '_zh', 'china', 'cn_', '_cn'],
            'ja': ['japanese', 'ja_', '_ja', 'japan', 'jp_', '_jp'],
            'ko': ['korean', 'ko_', '_ko', 'korea', 'kr_', '_kr'],
            'es': ['spanish', 'es_', '_es', 'espanol', 'spain'],
            'fr': ['french', 'fr_', '_fr', 'france', 'francais'],
            'de': ['german', 'de_', '_de', 'deutsch', 'germany'],
            'it': ['italian', 'it_', '_it', 'italy', 'italiano'],
            'pt': ['portuguese', 'pt_', '_pt', 'brazil', 'brasil'],
            'ru': ['russian', 'ru_', '_ru', 'russia', 'русский'],
            'ar': ['arabic', 'ar_', '_ar', 'عربي', 'arab'],
            'hi': ['hindi', 'hi_', '_hi', 'india', 'हिन्दी'],
            'th': ['thai', 'th_', '_th', 'thailand', 'ไทย'],
            'vi': ['vietnamese', 'vi_', '_vi', 'vietnam', 'tiếng'],
            'tr': ['turkish', 'tr_', '_tr', 'turkey', 'türkçe']
        };
        
        for (const [lang, patterns] of Object.entries(languagePatterns)) {
            if (patterns.some(pattern => fileName.includes(pattern))) {
                return lang;
            }
        }
    }
    
    // 如果无法从文件名判断，则基于统计概率模拟检测结果
    const weights = [
        0.20, 0.18, 0.12, 0.08, 0.06, 0.05, 0.05, 0.04, 0.04, 0.03,  // 前10种
        0.03, 0.02, 0.02, 0.02, 0.02, 0.015, 0.015, 0.01, 0.01, 0.01, // 11-20
        0.008, 0.008, 0.007, 0.007, 0.006, 0.006, 0.005, 0.005, 0.004, 0.004, // 21-30
        0.003, 0.003, 0.003, 0.003, 0.002, 0.002, 0.002, 0.002, 0.002, 0.002, // 31-40
        0.001, 0.001, 0.001, 0.001, 0.001, 0.001, 0.001, 0.001, 0.001, 0.001  // 41-50
    ];
    
    const random = Math.random();
    let cumulative = 0;
    
    for (let i = 0; i < Math.min(possibleLanguages.length, weights.length); i++) {
        cumulative += weights[i];
        if (random <= cumulative) {
            return possibleLanguages[i];
        }
    }
    
    return 'en'; // 默认返回英文
}

/**
 * 生成模拟提取的文字内容
 */
function generateMockExtractedText() {
    const sourceLang = Elements.sourceLang.value;
    
    // 模拟真实的OCR和语言检测过程
    let actualSourceLang;
    if (sourceLang === 'auto') {
        // 自动检测：模拟基于文档内容的语言检测
        actualSourceLang = simulateLanguageDetection();
        AppState.detectedSourceLang = actualSourceLang;
        
        console.log(`模拟语言检测结果: 检测到文档语言为 ${AppState.languages[actualSourceLang]}`);
    } else {
        // 用户手动指定源语言
        actualSourceLang = sourceLang;
        AppState.detectedSourceLang = sourceLang;
    }
    
    // 根据源语言生成相应的原始内容
    const mockOriginalTexts = {
        'zh': {
            paragraphs: [
                {
                    type: 'paragraph',
                    content: '人工智能（Artificial Intelligence，AI）是计算机科学的一个分支，它企图了解智能的实质，并生产出一种新的能以人类智能相似的方式做出反应的智能机器。该领域的研究包括机器人、语言识别、图像识别、自然语言处理和专家系统等。'
                },
                {
                    type: 'paragraph', 
                    content: 'AI技术在各个领域都有着广泛的应用前景，包括医疗健康、金融服务、教育培训、智能制造等。随着深度学习和神经网络技术的不断发展，AI正在改变我们的生活方式和工作模式。'
                },
                {
                    type: 'table',
                    content: {
                        headers: ['技术领域', '应用场景', '发展趋势'],
                        rows: [
                            ['机器学习', '数据分析、预测建模', '自动化程度提升'],
                            ['计算机视觉', '图像识别、自动驾驶', '精度和速度优化'],
                            ['自然语言处理', '智能客服、文本翻译', '多语言支持增强'],
                            ['语音识别', '语音助手、语音转文字', '实时性能改进']
                        ]
                    }
                },
                {
                    type: 'paragraph',
                    content: '未来，人工智能将继续推动科技进步，为人类社会创造更多价值。但同时，我们也需要关注AI发展带来的伦理问题和社会影响，确保技术发展服务于人类福祉。'
                }
            ]
        },
        'en': {
            paragraphs: [
                {
                    type: 'paragraph',
                    content: 'Artificial Intelligence (AI) is a branch of computer science that attempts to understand the essence of intelligence and produce a new type of intelligent machine that can react in a way similar to human intelligence. Research in this field includes robotics, speech recognition, image recognition, natural language processing, and expert systems.'
                },
                {
                    type: 'paragraph',
                    content: 'AI technology has broad application prospects in various fields, including healthcare, financial services, education and training, intelligent manufacturing, etc. With the continuous development of deep learning and neural network technologies, AI is changing our lifestyle and work patterns.'
                },
                {
                    type: 'table',
                    content: {
                        headers: ['Technology Field', 'Application Scenarios', 'Development Trends'],
                        rows: [
                            ['Machine Learning', 'Data Analysis, Predictive Modeling', 'Improved Automation'],
                            ['Computer Vision', 'Image Recognition, Autonomous Driving', 'Accuracy and Speed Optimization'],
                            ['Natural Language Processing', 'Intelligent Customer Service, Text Translation', 'Enhanced Multilingual Support'],
                            ['Speech Recognition', 'Voice Assistants, Speech-to-Text', 'Real-time Performance Improvement']
                        ]
                    }
                },
                {
                    type: 'paragraph',
                    content: 'In the future, artificial intelligence will continue to drive technological progress and create more value for human society. At the same time, we also need to pay attention to the ethical issues and social impacts brought by AI development, ensuring that technological development serves human welfare.'
                }
            ]
        },
        'ja': {
            paragraphs: [
                {
                    type: 'paragraph',
                    content: '人工知能（Artificial Intelligence、AI）は、コンピュータサイエンスの一分野であり、知能の本質を理解し、人間の知能と同様の方法で反応できる新しいタイプの知的機械を作り出すことを試みています。この分野の研究には、ロボット工学、音声認識、画像認識、自然言語処理、エキスパートシステムなどが含まれます。'
                },
                {
                    type: 'paragraph',
                    content: 'AI技術は、医療健康、金融サービス、教育訓練、スマート製造など、さまざまな分野で幅広い応用の可能性を持っています。ディープラーニングとニューラルネットワーク技術の継続的な発展により、AIは私たちの生活様式と働き方を変えています。'
                },
                {
                    type: 'table',
                    content: {
                        headers: ['技術分野', '応用シナリオ', '発展趋势'],
                        rows: [
                            ['機械学習', 'データ分析、予測モデリング', '自動化レベルの向上'],
                            ['コンピュータビジョン', '画像認識、自動運転', '精度と速度の最適化'],
                            ['自然言語処理', 'インテリジェントカスタマーサービス、テキスト翻訳', '多言語サポートの強化'],
                            ['音声認識', '音声アシスタント、音声テキスト変換', 'リアルタイム性能の改善']
                        ]
                    }
                },
                {
                    type: 'paragraph',
                    content: '将来、人工知能は技術的進歩を続け、人間社会により多くの価値を創造するでしょう。同時に、AI開発がもたらす倫理的問題と社会的影響にも注意を払い、技術開発が人間の福祉に役立つことを確実にする必要があります。'
                }
            ]
        },
        'ko': {
            paragraphs: [
                {
                    type: 'paragraph',
                    content: '인공지능(Artificial Intelligence, AI)은 컴퓨터 과학의 한 분야로, 지능의 본질을 이해하고 인간의 지능과 유사한 방식으로 반응할 수 있는 새로운 유형의 지능형 기계를 생산하고자 합니다. 이 분야의 연구에는 로봇공학, 음성 인식, 이미지 인식, 자연어 처리 및 전문가 시스템 등이 포함됩니다.'
                },
                {
                    type: 'paragraph',
                    content: 'AI 기술은 의료 건강, 금융 서비스, 교육 훈련, 스마트 제조 등 다양한 분야에서 광범위한 응용 전망을 가지고 있습니다. 딥러닝과 신경망 기술의 지속적인 발전으로 AI는 우리의 생활 방식과 업무 패턴을 변화시키고 있습니다.'
                },
                {
                    type: 'table',
                    content: {
                        headers: ['기술 분야', '응용 시나리오', '발전 동향'],
                        rows: [
                            ['머신러닝', '데이터 분석, 예측 모델링', '자동화 수준 향상'],
                            ['컴퓨터 비전', '이미지 인식, 자율 주행', '정확도와 속도 최적화'],
                            ['자연어 처리', '지능형 고객 서비스, 텍스트 번역', '다국어 지원 강화'],
                            ['음성 인식', '음성 어시스턴트, 음성 텍스트 변환', '실시간 성능 개선']
                        ]
                    }
                },
                {
                    type: 'paragraph',
                    content: '미래에 인공지능은 계속해서 기술 진보를 주도하고 인간 사회를 위해 더 많은 가치를 창조할 것입니다. 동시에 우리는 AI 개발이 가져오는 윤리적 문제와 사회적 영향에도 주의를 기울여 기술 개발이 인간의 복지에 기여하도록 해야 합니다.'
                }
            ]
        }
    };
    
    return mockOriginalTexts[actualSourceLang] || mockOriginalTexts['zh'];
}

/**
 * 处理提取的文本
 */
function processExtractedText(extractedText) {
    // 这里可以添加文本预处理逻辑
    return extractedText;
}

/**
 * 翻译内容 - 支持AI翻译和离线翻译
 */
async function translateContent(content) {
    const useAI = Elements.useAITranslation.checked;
    
    if (useAI) {
        try {
            const sourceLang = AppState.detectedSourceLang || 'zh';
            const targetLang = Elements.targetLang.value;
            
            // 构建翻译提示词
            const translationPrompt = buildTranslationPrompt(content, sourceLang, targetLang);
            
            // 调用智能翻译API
            showNotification('正在使用智能翻译...', 'info');
            const translatedContent = await callDeepSeekAPI(translationPrompt, content);
            
            return translatedContent;
        } catch (error) {
            console.error('智能翻译服务失败:', error);
            // 如果API调用失败，回退到标准翻译
            showNotification('智能翻译服务暂时不可用，使用标准翻译', 'warning');
            return simulateTranslation(content);
        }
    } else {
        // 使用标准翻译
        showNotification('使用标准翻译模式', 'info');
        return simulateTranslation(content);
    }
}

/**
 * 调用DeepSeek API进行翻译
 */
async function callDeepSeekAPI(prompt, originalContent) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30秒超时
    
    try {
        const response = await fetch(`${DEEPSEEK_CONFIG.baseURL}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${DEEPSEEK_CONFIG.apiKey}`,
                'User-Agent': 'DocuTranslate/1.0'
            },
            body: JSON.stringify({
                model: DEEPSEEK_CONFIG.model,
                messages: [
                    {
                        role: 'system',
                        content: '你是一个专业的语言处理专家，擅长多语言文档翻译，能够准确翻译各种类型的文本内容，包括段落和表格。请保持原文的格式和结构，提供高质量的翻译结果。'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.3,
                max_tokens: 4000,
                stream: false
            }),
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            let errorMessage = `HTTP ${response.status}`;
            try {
                const errorData = await response.json();
                errorMessage = errorData.error?.message || errorMessage;
            } catch (e) {
                // JSON解析失败，使用默认错误信息
            }
            throw new Error(`API请求失败: ${errorMessage}`);
        }

        const data = await response.json();
        
        if (!data.choices || data.choices.length === 0) {
            throw new Error('API返回数据格式错误：缺少翻译结果');
        }

        const translatedText = data.choices[0].message?.content;
        if (!translatedText) {
            throw new Error('API返回空的翻译内容');
        }
        
        // 解析AI返回的翻译结果并转换为我们的数据格式
        return parseAITranslationResult(translatedText, originalContent);
        
    } catch (error) {
        clearTimeout(timeoutId);
        
        if (error.name === 'AbortError') {
            throw new Error('API请求超时，请重试');
        }
        
        if (error.message.includes('Failed to fetch')) {
            throw new Error('网络连接失败，请检查网络连接');
        }
        
        throw error;
    }
}

/**
 * 构建翻译提示词
 */
function buildTranslationPrompt(content, sourceLang, targetLang) {
    const sourceLanguageName = AppState.languages[sourceLang];
    const targetLanguageName = AppState.languages[targetLang];
    
    let prompt = `请将以下${sourceLanguageName}内容翻译成${targetLanguageName}，保持原文的格式和结构：\n\n`;
    
    content.paragraphs.forEach((item, index) => {
        if (item.type === 'paragraph') {
            prompt += `段落${index + 1}：${item.content}\n\n`;
        } else if (item.type === 'table') {
            prompt += `表格${index + 1}：\n`;
            prompt += `表头：${item.content.headers.join(' | ')}\n`;
            item.content.rows.forEach((row, rowIndex) => {
                prompt += `第${rowIndex + 1}行：${row.join(' | ')}\n`;
            });
            prompt += '\n';
        }
    });
    
    prompt += `\n请按照以下JSON格式返回翻译结果：
{
  "paragraphs": [
    {
      "type": "paragraph",
      "content": "翻译后的段落内容"
    },
    {
      "type": "table",
      "content": {
        "headers": ["翻译后的表头1", "翻译后的表头2", "翻译后的表头3"],
        "rows": [
          ["翻译后的单元格内容", "翻译后的单元格内容", "翻译后的单元格内容"]
        ]
      }
    }
  ]
}

注意：请只返回JSON格式的结果，不要包含其他解释文字。`;

    return prompt;
}

/**
 * 解析AI翻译结果
 */
function parseAITranslationResult(aiResponse, originalContent) {
    try {
        // 尝试从AI响应中提取JSON
        let jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            const parsedResult = JSON.parse(jsonMatch[0]);
            if (parsedResult.paragraphs && Array.isArray(parsedResult.paragraphs)) {
                return parsedResult;
            }
        }
        
        // 如果无法解析JSON，尝试简单的文本解析
        return parseSimpleTextTranslation(aiResponse, originalContent);
        
    } catch (error) {
        console.error('解析AI翻译结果失败:', error);
        // 回退到模拟翻译
        return simulateTranslation(originalContent);
    }
}

/**
 * 解析简单文本翻译结果
 */
function parseSimpleTextTranslation(translatedText, originalContent) {
    const lines = translatedText.split('\n').filter(line => line.trim());
    const paragraphs = [];
    
    let currentIndex = 0;
    
    originalContent.paragraphs.forEach((originalItem, index) => {
        if (originalItem.type === 'paragraph') {
            if (currentIndex < lines.length) {
                paragraphs.push({
                    type: 'paragraph',
                    content: lines[currentIndex].replace(/^段落\d+[：:]\s*/, '')
                });
                currentIndex++;
            }
        } else if (originalItem.type === 'table') {
            // 对于表格，尝试保持原始结构，只翻译内容
            const translatedTable = {
                type: 'table',
                content: {
                    headers: originalItem.content.headers.map(() => {
                        if (currentIndex < lines.length) {
                            return lines[currentIndex++];
                        }
                        return '翻译中...';
                    }),
                    rows: originalItem.content.rows.map(row => 
                        row.map(() => {
                            if (currentIndex < lines.length) {
                                return lines[currentIndex++];
                            }
                            return '翻译中...';
                        })
                    )
                }
            };
            paragraphs.push(translatedTable);
        }
    });
    
    return { paragraphs };
}

/**
 * 模拟翻译功能
 */
function simulateTranslation(content) {
    const sourceLang = Elements.sourceLang.value;
    const targetLang = Elements.targetLang.value;
    
    // 根据目标语言生成相应的翻译结果
    const mockTranslations = {
        'en': {
            paragraphs: [
                {
                    type: 'paragraph',
                    content: 'Artificial Intelligence (AI) is a branch of computer science that attempts to understand the essence of intelligence and produce a new type of intelligent machine that can react in a way similar to human intelligence. Research in this field includes robotics, speech recognition, image recognition, natural language processing, and expert systems.'
                },
                {
                    type: 'paragraph',
                    content: 'AI technology has broad application prospects in various fields, including healthcare, financial services, education and training, intelligent manufacturing, etc. With the continuous development of deep learning and neural network technologies, AI is changing our lifestyle and work patterns.'
                },
                {
                    type: 'table',
                    content: {
                        headers: ['Technology Field', 'Application Scenarios', 'Development Trends'],
                        rows: [
                            ['Machine Learning', 'Data Analysis, Predictive Modeling', 'Improved Automation'],
                            ['Computer Vision', 'Image Recognition, Autonomous Driving', 'Accuracy and Speed Optimization'],
                            ['Natural Language Processing', 'Intelligent Customer Service, Text Translation', 'Enhanced Multilingual Support'],
                            ['Speech Recognition', 'Voice Assistants, Speech-to-Text', 'Real-time Performance Improvement']
                        ]
                    }
                },
                {
                    type: 'paragraph',
                    content: 'In the future, artificial intelligence will continue to drive technological progress and create more value for human society. At the same time, we also need to pay attention to the ethical issues and social impacts brought by AI development, ensuring that technological development serves human welfare.'
                }
            ]
        },
        'ja': {
            paragraphs: [
                {
                    type: 'paragraph',
                    content: '人工知能（Artificial Intelligence、AI）は、コンピュータサイエンスの一分野であり、知能の本質を理解し、人間の知能と同様の方法で反応できる新しいタイプの知的機械を作り出すことを試みています。この分野の研究には、ロボット工学、音声認識、画像認識、自然言語処理、エキスパートシステムなどが含まれます。'
                },
                {
                    type: 'paragraph',
                    content: 'AI技術は、医療健康、金融サービス、教育訓練、スマート製造など、さまざまな分野で幅広い応用の可能性を持っています。ディープラーニングとニューラルネットワーク技術の継続的な発展により、AIは私たちの生活様式と働き方を変えています。'
                },
                {
                    type: 'table',
                    content: {
                        headers: ['技術分野', '応用シナリオ', '発展趋势'],
                        rows: [
                            ['機械学習', 'データ分析、予測モデリング', '自動化レベルの向上'],
                            ['コンピュータビジョン', '画像認識、自動運転', '精度と速度の最適化'],
                            ['自然言語処理', 'インテリジェントカスタマーサービス、テキスト翻訳', '多言語サポートの強化'],
                            ['音声認識', '音声アシスタント、音声テキスト変換', 'リアルタイム性能の改善']
                        ]
                    }
                },
                {
                    type: 'paragraph',
                    content: '将来、人工知能は技術的進歩を続け、人間社会により多くの価値を創造するでしょう。同時に、AI開発がもたらす倫理的問題と社会的影響にも注意を払い、技術開発が人間の福祉に役立つことを確実にする必要があります。'
                }
            ]
        },
        'zh': {
            paragraphs: [
                {
                    type: 'paragraph',
                    content: '人工智能（Artificial Intelligence，AI）是计算机科学的一个分支，它企图了解智能的实质，并生产出一种新的能以人类智能相似的方式做出反应的智能机器。该领域的研究包括机器人、语言识别、图像识别、自然语言处理和专家系统等。'
                },
                {
                    type: 'paragraph', 
                    content: 'AI技术在各个领域都有着广泛的应用前景，包括医疗健康、金融服务、教育培训、智能制造等。随着深度学习和神经网络技术的不断发展，AI正在改变我们的生活方式和工作模式。'
                },
                {
                    type: 'table',
                    content: {
                        headers: ['技术领域', '应用场景', '发展趋势'],
                        rows: [
                            ['机器学习', '数据分析、预测建模', '自动化程度提升'],
                            ['计算机视觉', '图像识别、自动驾驶', '精度和速度优化'],
                            ['自然语言处理', '智能客服、文本翻译', '多语言支持增强'],
                            ['语音识别', '语音助手、语音转文字', '实时性能改进']
                        ]
                    }
                },
                {
                    type: 'paragraph',
                    content: '未来，人工智能将继续推动科技进步，为人类社会创造更多价值。但同时，我们也需要关注AI发展带来的伦理问题和社会影响，确保技术发展服务于人类福祉。'
                }
            ]
        },
        'ko': {
            paragraphs: [
                {
                    type: 'paragraph',
                    content: '인공지능(Artificial Intelligence, AI)은 컴퓨터 과학의 한 분야로, 지능의 본질을 이해하고 인간의 지능과 유사한 방식으로 반응할 수 있는 새로운 유형의 지능형 기계를 생산하고자 합니다. 이 분야의 연구에는 로봇공학, 음성 인식, 이미지 인식, 자연어 처리 및 전문가 시스템 등이 포함됩니다.'
                },
                {
                    type: 'paragraph',
                    content: 'AI 기술은 의료 건강, 금융 서비스, 교육 훈련, 스마트 제조 등 다양한 분야에서 광범위한 응용 전망을 가지고 있습니다. 딥러닝과 신경망 기술의 지속적인 발전으로 AI는 우리의 생활 방식과 업무 패턴을 변화시키고 있습니다.'
                },
                {
                    type: 'table',
                    content: {
                        headers: ['기술 분야', '응용 시나리오', '발전 동향'],
                        rows: [
                            ['머신러닝', '데이터 분석, 예측 모델링', '자동화 수준 향상'],
                            ['컴퓨터 비전', '이미지 인식, 자율 주행', '정확도와 속도 최적화'],
                            ['자연어 처리', '지능형 고객 서비스, 텍스트 번역', '다국어 지원 강화'],
                            ['음성 인식', '음성 어시스턴트, 음성 텍스트 변환', '실시간 성능 개선']
                        ]
                    }
                },
                {
                    type: 'paragraph',
                    content: '미래에 인공지능은 계속해서 기술 진보를 주도하고 인간 사회를 위해 더 많은 가치를 창조할 것입니다. 동시에 우리는 AI 개발이 가져오는 윤리적 문제와 사회적 영향에도 주의를 기울여 기술 개발이 인간의 복지에 기여하도록 해야 합니다.'
                }
            ]
        }
    };
    
    // 返回目标语言的翻译结果，如果没有找到则返回原内容
    return mockTranslations[targetLang] || content;
}

/**
 * 显示翻译结果
 */
function showTranslationResults(originalContent, translatedContent) {
    hideProcessingState();
    
    // 获取源语言和目标语言信息
    const sourceLang = Elements.sourceLang.value;
    const targetLang = Elements.targetLang.value;
    
    // 使用检测到的实际源语言（如果是自动检测的话）
    const actualSourceLang = AppState.detectedSourceLang || sourceLang;
    
    // 更新面板标题显示语言信息
    const originalPanelTitle = document.querySelector('.original-panel .panel-title');
    const translatedPanelTitle = document.querySelector('.translated-panel .panel-title');
    
    // 如果是自动检测，显示"检测到"的提示
    const sourceLanguageDisplay = sourceLang === 'auto' 
        ? `检测到: ${AppState.languages[actualSourceLang]}` 
        : AppState.languages[actualSourceLang];
    
    originalPanelTitle.textContent = `原文内容 (${sourceLanguageDisplay})`;
    translatedPanelTitle.textContent = `翻译结果 (${AppState.languages[targetLang]})`;
    
    // 渲染原文内容
    renderContent(Elements.originalContent, originalContent);
    Elements.originalMeta.textContent = `${originalContent.paragraphs.length} 个段落`;
    
    // 渲染翻译内容
    renderContent(Elements.translatedContent, translatedContent);
    Elements.translatedMeta.textContent = `${translatedContent.paragraphs.length} 个段落`;
    
    // 保存翻译结果
    AppState.currentTranslation = {
        original: originalContent,
        translated: translatedContent,
        sourceLang: actualSourceLang,
        targetLang: targetLang
    };
    
    // 显示预览区域
    Elements.previewSection.style.display = 'block';
    
    // 设置同步滚动
    setupSyncScroll();
    
    // 显示包含检测语言信息和翻译模式的成功提示
    const detectionInfo = sourceLang === 'auto' 
        ? `，检测到源语言为${AppState.languages[actualSourceLang]}` 
        : '';
    const translationMode = Elements.useAITranslation.checked ? '智能翻译' : '标准翻译';
    showNotification(`翻译完成！使用${translationMode}${detectionInfo}`, 'success');
}

/**
 * 渲染内容到面板
 */
function renderContent(container, content) {
    container.innerHTML = '';
    
    content.paragraphs.forEach((item, index) => {
        const contentBlock = document.createElement('div');
        contentBlock.className = `content-block ${item.type}`;
        contentBlock.dataset.index = index;
        
        if (item.type === 'paragraph') {
            contentBlock.innerHTML = `<p>${item.content}</p>`;
        } else if (item.type === 'table') {
            contentBlock.innerHTML = renderTable(item.content);
        }
        
        container.appendChild(contentBlock);
    });
}

/**
 * 渲染表格
 */
function renderTable(tableData) {
    let tableHTML = '<table class="content-table">';
    
    // 表头
    tableHTML += '<thead><tr>';
    tableData.headers.forEach(header => {
        tableHTML += `<th>${header}</th>`;
    });
    tableHTML += '</tr></thead>';
    
    // 表格行
    tableHTML += '<tbody>';
    tableData.rows.forEach(row => {
        tableHTML += '<tr>';
        row.forEach(cell => {
            tableHTML += `<td>${cell}</td>`;
        });
        tableHTML += '</tr>';
    });
    tableHTML += '</tbody></table>';
    
    return tableHTML;
}

/**
 * 设置同步滚动
 */
function setupSyncScroll() {
    const originalPanel = Elements.originalContent;
    const translatedPanel = Elements.translatedContent;
    
    let isScrolling = false;
    
    originalPanel.addEventListener('scroll', function() {
        if (isScrolling) return;
        isScrolling = true;
        
        const scrollRatio = this.scrollTop / (this.scrollHeight - this.clientHeight);
        translatedPanel.scrollTop = scrollRatio * (translatedPanel.scrollHeight - translatedPanel.clientHeight);
        
        setTimeout(() => { isScrolling = false; }, 10);
    });
    
    translatedPanel.addEventListener('scroll', function() {
        if (isScrolling) return;
        isScrolling = true;
        
        const scrollRatio = this.scrollTop / (this.scrollHeight - this.clientHeight);
        originalPanel.scrollTop = scrollRatio * (originalPanel.scrollHeight - originalPanel.clientHeight);
        
        setTimeout(() => { isScrolling = false; }, 10);
    });
}

// ==========================================================================
// 控制按钮功能
// ==========================================================================

/**
 * 设置控制按钮事件
 */
function setupControlButtonEvents() {
    // 复制按钮
    Elements.copyButton.addEventListener('click', copyTranslatedText);
    
    // 下载按钮
    Elements.downloadButton.addEventListener('click', downloadTranslation);
    
    // 新翻译按钮
    Elements.newTranslationButton.addEventListener('click', startNewTranslation);
}

/**
 * 复制翻译文本
 */
async function copyTranslatedText() {
    if (!AppState.currentTranslation) return;
    
    try {
        const textToCopy = extractTextFromContent(AppState.currentTranslation.translated);
        await navigator.clipboard.writeText(textToCopy);
        showNotification('翻译内容已复制到剪贴板', 'success');
    } catch (error) {
        console.error('复制失败:', error);
        showNotification('复制失败，请手动选择文本', 'error');
    }
}

/**
 * 从内容中提取纯文本
 */
function extractTextFromContent(content) {
    let text = '';
    
    content.paragraphs.forEach(item => {
        if (item.type === 'paragraph') {
            text += item.content + '\n\n';
        } else if (item.type === 'table') {
            // 将表格转换为文本格式
            text += item.content.headers.join('\t') + '\n';
            item.content.rows.forEach(row => {
                text += row.join('\t') + '\n';
            });
            text += '\n';
        }
    });
    
    return text.trim();
}

/**
 * 下载翻译结果
 */
function downloadTranslation() {
    if (!AppState.currentTranslation) return;
    
    const textContent = extractTextFromContent(AppState.currentTranslation.translated);
    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `翻译结果_${new Date().toISOString().slice(0, 10)}.txt`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showNotification('翻译结果已下载', 'success');
}

/**
 * 开始新的翻译
 */
function startNewTranslation() {
    if (confirm('确定要开始新的翻译吗？当前的翻译结果将被清除。')) {
        resetToInitialState();
    }
}

/**
 * 重置到初始状态
 */
function resetToInitialState() {
    AppState.uploadedFiles = [];
    AppState.currentTranslation = null;
    AppState.isProcessing = false;
    AppState.detectedSourceLang = null; // 清理检测到的源语言
    
    Elements.fileList.style.display = 'none';
    Elements.processingSection.style.display = 'none';
    Elements.previewSection.style.display = 'none';
    
    Elements.fileInput.value = '';
    updateFileList();
}

// ==========================================================================
// 语言选择功能
// ==========================================================================

/**
 * 设置语言选择事件
 */
function setupLanguageEvents() {
    Elements.sourceLang.addEventListener('change', handleLanguageChange);
    Elements.targetLang.addEventListener('change', handleLanguageChange);
}

/**
 * 处理语言变化
 */
function handleLanguageChange() {
    const sourceLang = Elements.sourceLang.value;
    const targetLang = Elements.targetLang.value;
    
    // 防止源语言和目标语言相同（除了自动检测）
    if (sourceLang === targetLang && sourceLang !== 'auto') {
        showNotification('源语言和目标语言不能相同', 'error');
        return;
    }
    
    // 如果有翻译结果，询问是否重新翻译
    if (AppState.currentTranslation && !AppState.isProcessing) {
        if (confirm('语言设置已更改，是否重新翻译？')) {
            startTranslationProcess();
        }
    }
}

// ==========================================================================
// 通知系统
// ==========================================================================

/**
 * 设置通知系统事件
 */
function setupNotificationEvents() {
    Elements.notificationClose.addEventListener('click', hideNotification);
    
    // 自动隐藏通知
    let notificationTimer;
    window.showNotificationTimer = (callback, delay) => {
        clearTimeout(notificationTimer);
        notificationTimer = setTimeout(callback, delay);
    };
}

/**
 * 显示通知
 */
function showNotification(message, type = 'info') {
    Elements.notificationMessage.textContent = message;
    Elements.notification.className = `notification ${type}`;
    Elements.notification.style.display = 'block';
    
    // 触发显示动画
    setTimeout(() => {
        Elements.notification.classList.add('show');
    }, 10);
    
    // 自动隐藏
    showNotificationTimer(() => {
        hideNotification();
    }, 5000);
}

/**
 * 隐藏通知
 */
function hideNotification() {
    Elements.notification.classList.remove('show');
    setTimeout(() => {
        Elements.notification.style.display = 'none';
    }, 300);
}

// ==========================================================================
// 工具函数
// ==========================================================================

/**
 * 防抖函数
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * 节流函数
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * 错误处理函数
 */
function handleError(error, userMessage = '操作失败，请重试') {
    console.error('错误详情:', error);
    showNotification(userMessage, 'error');
}

// ==========================================================================
// 键盘快捷键
// ==========================================================================

document.addEventListener('keydown', function(event) {
    // Ctrl/Cmd + C: 复制翻译内容
    if ((event.ctrlKey || event.metaKey) && event.key === 'c' && AppState.currentTranslation) {
        if (document.activeElement === document.body) {
            event.preventDefault();
            copyTranslatedText();
        }
    }
    
    // Ctrl/Cmd + N: 新翻译
    if ((event.ctrlKey || event.metaKey) && event.key === 'n') {
        event.preventDefault();
        startNewTranslation();
    }
    
    // Ctrl/Cmd + D: 下载
    if ((event.ctrlKey || event.metaKey) && event.key === 'd' && AppState.currentTranslation) {
        event.preventDefault();
        downloadTranslation();
    }
});

// ==========================================================================
// 导出函数供全局使用
// ==========================================================================

// ==========================================================================
// 多语言功能
// ==========================================================================

/**
 * 设置语言切换器
 */
function setupLanguageSwitcher() {
    const languageSwitcher = document.getElementById('language-switcher');
    if (languageSwitcher) {
        languageSwitcher.addEventListener('change', function(event) {
            const selectedLanguage = event.target.value;
            if (selectedLanguage !== i18n.getCurrentLanguage()) {
                changeLanguage(selectedLanguage);
            }
        });
    }
}

/**
 * 切换语言
 */
function changeLanguage(languageCode) {
    // 检测当前路径
    const currentPath = window.location.pathname;
    const currentSearch = window.location.search;
    const currentHash = window.location.hash;
    
    // 如果选择英文，跳转到根目录
    if (languageCode === 'en') {
        if (currentPath !== '/' && currentPath !== '/index.html') {
            window.location.href = '/' + currentSearch + currentHash;
        } else {
            // 已经在根目录，只需要更新语言
            i18n.setLanguage(languageCode);
        }
        return;
    }
    
    // 其他语言跳转到对应的子目录
    const targetPath = `/${languageCode}/`;
    if (!currentPath.startsWith(targetPath)) {
        window.location.href = targetPath + currentSearch + currentHash;
    } else {
        // 已经在目标目录，只需要更新语言
        i18n.setLanguage(languageCode);
    }
}

/**
 * 获取当前页面的语言代码
 */
function getCurrentPageLanguage() {
    const path = window.location.pathname;
    const match = path.match(/^\/([a-z]{2}-[A-Z]{2})\//);
    return match ? match[1] : 'en';
}

/**
 * 更新通知消息（使用国际化）
 */
function showLocalizedNotification(key, params = {}, type = 'info') {
    const message = i18n.t(key, params);
    showNotification(message, type);
}

// 重写原有的通知函数，使其支持国际化
const originalShowNotification = showNotification;
function showNotification(message, type = 'info') {
    // 如果消息是一个国际化键，则尝试翻译
    if (window.i18n && typeof message === 'string' && message.includes('.')) {
        const translatedMessage = i18n.t(message);
        if (translatedMessage !== message) {
            message = translatedMessage;
        }
    }
    originalShowNotification(message, type);
}

// 将必要的函数暴露到全局作用域
window.removeFile = removeFile;
window.AppState = AppState;
window.changeLanguage = changeLanguage;
window.showLocalizedNotification = showLocalizedNotification;

console.log('DocuTranslate Pro JavaScript module loaded');

