import { AngularEditorConfig } from "@kolkov/angular-editor";

export class Util {
    public trackById(index: number, item: any) {
        return item ? item.id : null;
    }
    public trackByTableName(index: number, item: any) {
        return item ? item.tableName : null;
    }
    public static editorConfig: AngularEditorConfig = {
        editable: true,
        spellcheck: true,
        height: '500px',
        width: 'auto',
        minWidth: '0',
        translate: 'yes',
        enableToolbar: true,
        showToolbar: true,
        placeholder: 'Enter text here...',
        defaultParagraphSeparator: '',
        defaultFontName: '',
        defaultFontSize: '',
        customClasses: [
            {
                name: 'quote',
                class: 'quote',
            },
            {
                name: 'redText',
                class: 'redText'
            },
            {
                name: 'titleText',
                class: 'titleText',
                tag: 'h1',
            },
        ],
        uploadUrl: 'v1/image',
        uploadWithCredentials: false,
        sanitize: true,
        toolbarPosition: 'top',
        toolbarHiddenButtons: [
            ['bold', 'italic'],
            ['fontSize']
        ]
    };
}