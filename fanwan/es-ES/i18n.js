/**
 * 多语言国际化配置文件
 * Multi-language Internationalization Configuration
 */

const i18n = {
    // 默认语言
    defaultLanguage: 'es-ES',
    
    // 当前语言
    currentLanguage: 'es-ES',
    
    // 语言配置
    languages: {
        'en': {
            name: 'English',
            nativeName: 'English',
            flag: '🇺🇸',
            dir: 'ltr'
        },
        'zh-CN': {
            name: 'Chinese (Simplified)',
            nativeName: '中文',
            flag: '🇨🇳',
            dir: 'ltr'
        },
        'ja-JP': {
            name: 'Japanese',
            nativeName: '日本語',
            flag: '🇯🇵',
            dir: 'ltr'
        },
        'ko-KR': {
            name: 'Korean',
            nativeName: '한국어',
            flag: '🇰🇷',
            dir: 'ltr'
        },
        'es-ES': {
            name: 'Spanish',
            nativeName: 'Español',
            flag: '🇪🇸',
            dir: 'ltr'
        },
        'fr-FR': {
            name: 'French',
            nativeName: 'Français',
            flag: '🇫🇷',
            dir: 'ltr'
        },
        'de-DE': {
            name: 'German',
            nativeName: 'Deutsch',
            flag: '🇩🇪',
            dir: 'ltr'
        }
    },
    
    // 翻译文本
    translations: {
        'en': {
            // Header
            'site.title': 'DocuTranslate Pro',
            'site.description': 'Advanced AI Document Translation Platform',
            
            // Hero Section
            'hero.title': 'Advanced AI Document Translation Made Simple',
            'hero.subtitle': 'Professional-grade translation for PDF, Word, images and more with intelligent text recognition and precision accuracy',
            
            // Language Selector
            'language.source': 'Source Language',
            'language.target': 'Target Language',
            'language.autoDetect': '🌐 Auto Detect',
            
            // Upload Section
            'upload.title': 'Drag files here or click to upload',
            'upload.subtitle': 'Supports PDF, Word, images and more, up to 50MB',
            'upload.button': 'Choose Files',
            'upload.selectedFiles': 'Selected Files',
            
            // Processing
            'processing.title': 'Processing document...',
            'processing.recognizing': 'Recognizing text content',
            'processing.detecting': 'Detecting document language...',
            'processing.structuring': 'Processing text structure...',
            'processing.translating': 'Translating content...',
            'processing.completed': 'Translation completed!',
            
            // Preview
            'preview.title': 'Translation Results',
            'preview.original': 'Original Content',
            'preview.translated': 'Translated Content',
            'preview.copy': 'Copy Translation',
            'preview.download': 'Download',
            'preview.newTranslation': 'New Translation',
            
            // Notifications
            'notification.noFiles': 'No files selected',
            'notification.fileValidationFailed': 'Selected files do not meet requirements, please check file format and size',
            'notification.fileAdded': 'Successfully added {count} files',
            'notification.fileLimit': 'Maximum {max} files allowed, currently have {current} files',
            'notification.duplicateFiles': 'Duplicate files found: {names}',
            'notification.fileSizeExceeded': 'File "{name}" size is {size}MB, exceeds 50MB limit',
            'notification.emptyFile': 'File "{name}" is empty',
            'notification.unsupportedFormat': 'Unsupported file format: {format}. Supported formats: {supported}',
            'notification.fileNameTooLong': 'File name too long, please rename and try again',
            'notification.translationCompleted': 'Translation completed! Using {mode}, detected source language as {lang}',
            'notification.copied': 'Translation content copied to clipboard',
            'notification.copyFailed': 'Copy failed, please select text manually',
            'notification.downloaded': 'Translation results downloaded',
            'notification.confirmNewTranslation': 'Start new translation? Current results will be cleared.',
            'notification.confirmStartTranslation': 'Files uploaded successfully, start translation now?',
            'notification.languageChanged': 'Language settings changed, retranslate?',
            'notification.sameLangError': 'Source and target languages cannot be the same',
            'notification.processing': 'Processing in progress, please wait...',
            'notification.uploadFirst': 'Please upload files first',
            'notification.networkError': 'Network connection failed, please check network connection',
            'notification.apiError': 'Translation service temporarily unavailable, please try again later',
            'notification.fileProcessError': 'File processing failed, please check file format',
            'notification.usingAI': 'Using AI translation...',
            'notification.usingStandard': 'Using standard translation mode',
            'notification.aiFallback': 'AI translation service temporarily unavailable, using standard translation',
            
            // Footer
            'footer.text': '© 2025 DocuTranslate Pro - Professional AI-powered document translation platform',
            'footer.privacy': 'Privacy Policy',
            'footer.terms': 'Terms of Service',
            'footer.contact': 'Contact Us',
            
            // Translation modes
            'translation.ai': 'AI Translation',
            'translation.standard': 'Standard Translation',
            
            // File info
            'file.paragraphs': '{count} paragraphs',
            'file.bytes': 'Bytes',
            'file.kb': 'KB',
            'file.mb': 'MB',
            'file.gb': 'GB'
        },
        
        'zh-CN': {
            // Header
            'site.title': 'DocuTranslate Pro',
            'site.description': '高级AI文档翻译平台',
            
            // Hero Section
            'hero.title': '先进的AI文档翻译，简单易用',
            'hero.subtitle': '支持PDF、Word、图片等多种格式的专业级翻译，智能文字识别，精准翻译',
            
            // Language Selector
            'language.source': '源语言',
            'language.target': '目标语言',
            'language.autoDetect': '🌐 自动检测',
            
            // Upload Section
            'upload.title': '拖拽文件到此处或点击上传',
            'upload.subtitle': '支持PDF、Word、图片等格式，最大50MB',
            'upload.button': '选择文件',
            'upload.selectedFiles': '已选择文件',
            
            // Processing
            'processing.title': '正在处理文档...',
            'processing.recognizing': '正在识别文字内容',
            'processing.detecting': '正在检测文档语言...',
            'processing.structuring': '正在处理文本结构...',
            'processing.translating': '正在翻译内容...',
            'processing.completed': '翻译完成！',
            
            // Preview
            'preview.title': '翻译结果',
            'preview.original': '原文内容',
            'preview.translated': '翻译结果',
            'preview.copy': '复制翻译',
            'preview.download': '下载',
            'preview.newTranslation': '新翻译',
            
            // Notifications
            'notification.noFiles': '未选择任何文件',
            'notification.fileValidationFailed': '所选文件均不符合要求，请检查文件格式和大小',
            'notification.fileAdded': '成功添加 {count} 个文件',
            'notification.fileLimit': '最多只能上传{max}个文件，当前已有{current}个',
            'notification.duplicateFiles': '发现重复文件：{names}',
            'notification.fileSizeExceeded': '文件 "{name}" 大小为 {size}MB，超过50MB限制',
            'notification.emptyFile': '文件 "{name}" 为空文件',
            'notification.unsupportedFormat': '不支持的文件格式: {format}。支持的格式: {supported}',
            'notification.fileNameTooLong': '文件名过长，请重命名后重试',
            'notification.translationCompleted': '翻译完成！使用{mode}，检测到源语言为{lang}',
            'notification.copied': '翻译内容已复制到剪贴板',
            'notification.copyFailed': '复制失败，请手动选择文本',
            'notification.downloaded': '翻译结果已下载',
            'notification.confirmNewTranslation': '确定要开始新的翻译吗？当前的翻译结果将被清除。',
            'notification.confirmStartTranslation': '文件上传完成，是否立即开始翻译？',
            'notification.languageChanged': '语言设置已更改，是否重新翻译？',
            'notification.sameLangError': '源语言和目标语言不能相同',
            'notification.processing': '正在处理中，请稍候...',
            'notification.uploadFirst': '请先上传文件',
            'notification.networkError': '网络连接失败，请检查网络后重试',
            'notification.apiError': '翻译服务暂时不可用，请稍后重试',
            'notification.fileProcessError': '文件处理失败，请检查文件格式',
            'notification.usingAI': '正在使用智能翻译...',
            'notification.usingStandard': '使用标准翻译模式',
            'notification.aiFallback': '智能翻译服务暂时不可用，使用标准翻译',
            
            // Footer
            'footer.text': '© 2025 DocuTranslate Pro - 专业的AI驱动文档翻译平台',
            'footer.privacy': '隐私政策',
            'footer.terms': '服务条款',
            'footer.contact': '联系我们',
            
            // Translation modes
            'translation.ai': '智能翻译',
            'translation.standard': '标准翻译',
            
            // File info
            'file.paragraphs': '{count} 个段落',
            'file.bytes': '字节',
            'file.kb': 'KB',
            'file.mb': 'MB',
            'file.gb': 'GB'
        },
        
        'ja-JP': {
            // Header
            'site.title': 'DocuTranslate Pro',
            'site.description': '高度なAI文書翻訳プラットフォーム',
            
            // Hero Section
            'hero.title': '高度なAI文書翻訳を簡単に',
            'hero.subtitle': 'PDF、Word、画像などのプロフェッショナルグレード翻訳、インテリジェントテキスト認識、高精度翻訳',
            
            // Language Selector
            'language.source': 'ソース言語',
            'language.target': 'ターゲット言語',
            'language.autoDetect': '🌐 自動検出',
            
            // Upload Section
            'upload.title': 'ファイルをここにドラッグするかクリックしてアップロード',
            'upload.subtitle': 'PDF、Word、画像など、最大50MBまでサポート',
            'upload.button': 'ファイルを選択',
            'upload.selectedFiles': '選択されたファイル',
            
            // Processing
            'processing.title': '文書を処理中...',
            'processing.recognizing': 'テキストコンテンツを認識中',
            'processing.detecting': '文書言語を検出中...',
            'processing.structuring': 'テキスト構造を処理中...',
            'processing.translating': 'コンテンツを翻訳中...',
            'processing.completed': '翻訳完了！',
            
            // Preview
            'preview.title': '翻訳結果',
            'preview.original': '原文コンテンツ',
            'preview.translated': '翻訳コンテンツ',
            'preview.copy': '翻訳をコピー',
            'preview.download': 'ダウンロード',
            'preview.newTranslation': '新しい翻訳',
            
            // Footer
            'footer.text': '© 2025 DocuTranslate Pro - プロフェッショナルAI駆動文書翻訳プラットフォーム',
            'footer.privacy': 'プライバシーポリシー',
            'footer.terms': '利用規約',
            'footer.contact': 'お問い合わせ',
            
            // Translation modes
            'translation.ai': 'AI翻訳',
            'translation.standard': '標準翻訳'
        },
        
        'ko-KR': {
            // Header
            'site.title': 'DocuTranslate Pro',
            'site.description': '고급 AI 문서 번역 플랫폼',
            
            // Hero Section
            'hero.title': '고급 AI 문서 번역을 간단하게',
            'hero.subtitle': 'PDF, Word, 이미지 등의 전문급 번역, 지능형 텍스트 인식, 정밀한 정확도',
            
            // Language Selector
            'language.source': '소스 언어',
            'language.target': '대상 언어',
            'language.autoDetect': '🌐 자동 감지',
            
            // Upload Section
            'upload.title': '파일을 여기에 드래그하거나 클릭하여 업로드',
            'upload.subtitle': 'PDF, Word, 이미지 등 지원, 최대 50MB',
            'upload.button': '파일 선택',
            'upload.selectedFiles': '선택된 파일',
            
            // Processing
            'processing.title': '문서 처리 중...',
            'processing.recognizing': '텍스트 내용 인식 중',
            'processing.detecting': '문서 언어 감지 중...',
            'processing.structuring': '텍스트 구조 처리 중...',
            'processing.translating': '내용 번역 중...',
            'processing.completed': '번역 완료!',
            
            // Preview
            'preview.title': '번역 결과',
            'preview.original': '원본 내용',
            'preview.translated': '번역 내용',
            'preview.copy': '번역 복사',
            'preview.download': '다운로드',
            'preview.newTranslation': '새 번역',
            
            // Footer
            'footer.text': '© 2025 DocuTranslate Pro - 전문 AI 기반 문서 번역 플랫폼',
            'footer.privacy': '개인정보 보호정책',
            'footer.terms': '서비스 약관',
            'footer.contact': '문의하기',
            
            // Translation modes
            'translation.ai': 'AI 번역',
            'translation.standard': '표준 번역'
        },
        
        'es-ES': {
            // Header
            'site.title': 'DocuTranslate Pro',
            'site.description': 'Plataforma Avanzada de Traducción de Documentos IA',
            
            // Hero Section
            'hero.title': 'Traducción Avanzada de Documentos IA Hecha Simple',
            'hero.subtitle': 'Traducción de nivel profesional para PDF, Word, imágenes y más con reconocimiento inteligente de texto y precisión exacta',
            
            // Language Selector
            'language.source': 'Idioma de Origen',
            'language.target': 'Idioma de Destino',
            'language.autoDetect': '🌐 Detección Automática',
            
            // Upload Section
            'upload.title': 'Arrastra archivos aquí o haz clic para subir',
            'upload.subtitle': 'Soporta PDF, Word, imágenes y más, hasta 50MB',
            'upload.button': 'Elegir Archivos',
            'upload.selectedFiles': 'Archivos Seleccionados',
            
            // Processing
            'processing.title': 'Procesando documento...',
            'processing.recognizing': 'Reconociendo contenido de texto',
            'processing.detecting': 'Detectando idioma del documento...',
            'processing.structuring': 'Procesando estructura del texto...',
            'processing.translating': 'Traduciendo contenido...',
            'processing.completed': '¡Traducción completada!',
            
            // Preview
            'preview.title': 'Resultados de Traducción',
            'preview.original': 'Contenido Original',
            'preview.translated': 'Contenido Traducido',
            'preview.copy': 'Copiar Traducción',
            'preview.download': 'Descargar',
            'preview.newTranslation': 'Nueva Traducción',
            
            // Footer
            'footer.text': '© 2025 DocuTranslate Pro - Plataforma profesional de traducción de documentos impulsada por IA',
            'footer.privacy': 'Política de Privacidad',
            'footer.terms': 'Términos de Servicio',
            'footer.contact': 'Contáctanos',
            
            // Translation modes
            'translation.ai': 'Traducción IA',
            'translation.standard': 'Traducción Estándar'
        },
        
        'fr-FR': {
            // Header
            'site.title': 'DocuTranslate Pro',
            'site.description': 'Plateforme Avancée de Traduction de Documents IA',
            
            // Hero Section
            'hero.title': 'Traduction Avancée de Documents IA Simplifiée',
            'hero.subtitle': 'Traduction de niveau professionnel pour PDF, Word, images et plus avec reconnaissance intelligente de texte et précision exacte',
            
            // Language Selector
            'language.source': 'Langue Source',
            'language.target': 'Langue Cible',
            'language.autoDetect': '🌐 Détection Automatique',
            
            // Upload Section
            'upload.title': 'Glissez les fichiers ici ou cliquez pour télécharger',
            'upload.subtitle': 'Supporte PDF, Word, images et plus, jusqu\'à 50MB',
            'upload.button': 'Choisir les Fichiers',
            'upload.selectedFiles': 'Fichiers Sélectionnés',
            
            // Processing
            'processing.title': 'Traitement du document...',
            'processing.recognizing': 'Reconnaissance du contenu textuel',
            'processing.detecting': 'Détection de la langue du document...',
            'processing.structuring': 'Traitement de la structure du texte...',
            'processing.translating': 'Traduction du contenu...',
            'processing.completed': 'Traduction terminée !',
            
            // Preview
            'preview.title': 'Résultats de Traduction',
            'preview.original': 'Contenu Original',
            'preview.translated': 'Contenu Traduit',
            'preview.copy': 'Copier la Traduction',
            'preview.download': 'Télécharger',
            'preview.newTranslation': 'Nouvelle Traduction',
            
            // Footer
            'footer.text': '© 2025 DocuTranslate Pro - Plateforme professionnelle de traduction de documents alimentée par IA',
            'footer.privacy': 'Politique de Confidentialité',
            'footer.terms': 'Conditions de Service',
            'footer.contact': 'Nous Contacter',
            
            // Translation modes
            'translation.ai': 'Traduction IA',
            'translation.standard': 'Traduction Standard'
        },
        
        'de-DE': {
            // Header
            'site.title': 'DocuTranslate Pro',
            'site.description': 'Erweiterte KI-Dokumentenübersetzungsplattform',
            
            // Hero Section
            'hero.title': 'Erweiterte KI-Dokumentenübersetzung Einfach Gemacht',
            'hero.subtitle': 'Professionelle Übersetzung für PDF, Word, Bilder und mehr mit intelligenter Texterkennung und präziser Genauigkeit',
            
            // Language Selector
            'language.source': 'Quellsprache',
            'language.target': 'Zielsprache',
            'language.autoDetect': '🌐 Automatische Erkennung',
            
            // Upload Section
            'upload.title': 'Dateien hier hinziehen oder klicken zum Hochladen',
            'upload.subtitle': 'Unterstützt PDF, Word, Bilder und mehr, bis zu 50MB',
            'upload.button': 'Dateien Auswählen',
            'upload.selectedFiles': 'Ausgewählte Dateien',
            
            // Processing
            'processing.title': 'Dokument wird verarbeitet...',
            'processing.recognizing': 'Textinhalt wird erkannt',
            'processing.detecting': 'Dokumentsprache wird erkannt...',
            'processing.structuring': 'Textstruktur wird verarbeitet...',
            'processing.translating': 'Inhalt wird übersetzt...',
            'processing.completed': 'Übersetzung abgeschlossen!',
            
            // Preview
            'preview.title': 'Übersetzungsergebnisse',
            'preview.original': 'Originalinhalt',
            'preview.translated': 'Übersetzter Inhalt',
            'preview.copy': 'Übersetzung Kopieren',
            'preview.download': 'Herunterladen',
            'preview.newTranslation': 'Neue Übersetzung',
            
            // Footer
            'footer.text': '© 2025 DocuTranslate Pro - Professionelle KI-gestützte Dokumentenübersetzungsplattform',
            'footer.privacy': 'Datenschutzrichtlinie',
            'footer.terms': 'Nutzungsbedingungen',
            'footer.contact': 'Kontakt',
            
            // Translation modes
            'translation.ai': 'KI-Übersetzung',
            'translation.standard': 'Standard-Übersetzung'
        }
    },
    
    // 获取翻译文本
    t(key, params = {}) {
        const translation = this.translations[this.currentLanguage]?.[key] || 
                          this.translations[this.defaultLanguage]?.[key] || 
                          key;
        
        // 替换参数
        return translation.replace(/\{(\w+)\}/g, (match, param) => {
            return params[param] !== undefined ? params[param] : match;
        });
    },
    
    // 设置语言
    setLanguage(lang) {
        if (this.languages[lang]) {
            this.currentLanguage = lang;
            localStorage.setItem('preferred-language', lang);
            this.updatePageContent();
            this.updatePageDirection();
        }
    },
    
    // 获取当前语言
    getCurrentLanguage() {
        return this.currentLanguage;
    },
    
    // 更新页面内容
    updatePageContent() {
        // 更新所有带有 data-i18n 属性的元素
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translatedText = this.t(key);
            
            if (element.tagName === 'INPUT' && element.type === 'text') {
                element.placeholder = translatedText;
            } else {
                element.textContent = translatedText;
            }
        });
        
        // 更新title
        document.title = this.t('site.title') + ' - ' + this.t('site.description');
        
        // 更新meta描述
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.content = this.t('site.description');
        }
    },
    
    // 更新页面方向
    updatePageDirection() {
        const dir = this.languages[this.currentLanguage]?.dir || 'ltr';
        document.documentElement.dir = dir;
        document.documentElement.lang = this.currentLanguage;
    },
    
    // 初始化
    init() {
        // 从localStorage获取保存的语言偏好
        const savedLanguage = localStorage.getItem('preferred-language');
        const browserLanguage = navigator.language || navigator.languages[0];
        
        // 确定初始语言
        let initialLanguage = this.defaultLanguage;
        
        if (savedLanguage && this.languages[savedLanguage]) {
            initialLanguage = savedLanguage;
        } else if (this.languages[browserLanguage]) {
            initialLanguage = browserLanguage;
        } else {
            // 尝试匹配语言代码的前缀 (例如 en-US -> en)
            const langPrefix = browserLanguage.split('-')[0];
            const matchedLang = Object.keys(this.languages).find(lang => lang.startsWith(langPrefix));
            if (matchedLang) {
                initialLanguage = matchedLang;
            }
        }
        
        this.setLanguage(initialLanguage);
        
        // 设置语言切换器的值
        const languageSwitcher = document.getElementById('language-switcher');
        if (languageSwitcher) {
            languageSwitcher.value = initialLanguage;
        }
    }
};

// 导出给全局使用
window.i18n = i18n;
