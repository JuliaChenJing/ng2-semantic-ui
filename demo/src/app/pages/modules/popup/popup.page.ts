import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { ApiDefinition } from "../../../components/api/api.component";
import { SuiPopupConfig } from "ng2-semantic-ui";

const exampleStandardTemplate = `
<button class="ui green icon button" suiPopup popupHeader="Example" popupText="This is an example popup">
    <i class="add icon"></i>
</button>
`;

const exampleTemplateTemplate = `
<ng-template let-popup #popupTemplate>
    <div class="header">Rating</div>
    <div class="content">
        <sui-rating class="star" (click)="popup.close()"></sui-rating>
    </div>
</ng-template>
<button class="ui icon button" suiPopup [popupTemplate]="popupTemplate" popupTrigger="outsideClick">
    <i class="star icon"></i> Rate
</button>
`;

const examplePlacementTemplate = `
<div class="ui card" suiPopup popupText="You can customise my placement!" popupInverted [popupPlacement]="position">
    <div class="content">
        <div class="header">Positioning</div>
        <div class="description">
            Popup placement can be anywhere around the content.
        </div>
    </div>
</div>
`;

@Component({
    selector: "demo-page-popup",
    templateUrl: "./popup.page.html"
})
export class PopupPage {
    public api:ApiDefinition = [
        {
            selector: "[suiPopup]",
            properties: [
                {
                    name: "popupText",
                    type: "string",
                    description: "Sets the text within the popup."
                },
                {
                    name: "popupHeader",
                    type: "string",
                    description: "Sets the title of the popup."
                },
                {
                    name: "popupTemplate",
                    type: "TemplateRef",
                    description: "Sets the template to use when rendering the popup."
                },
                {
                    name: "popupPlacement",
                    type: "PopupPlacement",
                    description: "Sets the placement of the popup relative to the anchor.",
                    defaultValue: "top left"
                },
                {
                    name: "popupInverted",
                    type: "boolean",
                    description: "When <code>true</code> the popup has a black background with white text.",
                    defaultValue: "false"
                },
                {
                    name: "popupTrigger",
                    type: "PopupTrigger",
                    description: "Specifies the trigger for the popup. Options are: <code>hover</code>, " +
                                 "<code>click</code>, <code>outsideClick</code>, <code>focus</code> & <code>manual</code>.",
                    defaultValue: "hover"
                },
                {
                    name: "popupDelay",
                    type: "number",
                    description: "Sets the time delay in milliseconds before the popup opens after triggered.",
                    defaultValue: "0"
                },
                {
                    name: "popupBasic",
                    type: "boolean",
                    description: "When <code>true</code> the popup's arrow is hidden.",
                    defaultValue: "false"
                },
                {
                    name: "popupTransition",
                    type: "string",
                    description: "Sets the transition to use when displaying the popup.",
                    defaultValue: "scale"
                },
                {
                    name: "popupTransitionDuration",
                    type: "number",
                    description: "Sets the duration of the transition used when displaying the popup.",
                    defaultValue: "200"
                },
                {
                    name: "popupConfig",
                    type: "IPopupConfig",
                    description: "Takes an <code>IPopupConfig</code> object that provides " +
                                 "values for various configuration options simultaneously."
                }
            ]
        }
    ];

    public exampleStandardTemplate:string = exampleStandardTemplate;
    public exampleTemplateTemplate:string = exampleTemplateTemplate;
    public examplePlacementTemplate:string = examplePlacementTemplate;

    public placements:string[] = [
        "top left",
        "top",
        "top right",
        "bottom left",
        "bottom",
        "bottom right",
        "left top",
        "left",
        "left bottom",
        "right top",
        "right",
        "right bottom"
    ];

    public position:string = "bottom right";

    public manualPopupMarkup:string = `
<div class="ui segment" suiPopup popupText="Manual" popupTrigger="manual" #popup="suiPopup">
    <button class="ui button" (click)="popup.open()">Open!</button>
    <button class="ui button" (click)="openPopup(popup)">Conditionally Open!</button>
    <button class="ui button" (click)="popup.toggle()">Toggle!</button>
    <button class="ui button" (click)="popup.close()">Close!</button>
</div>
`;

    public manualPopupCode:string = `
import {IPopup} from "ng2-semantic-ui";

@Component({})
export class MyComponent {
    private _condition:boolean;

    public openPopup(popup:IPopup) {
        if (this._condition) {
            popup.open();
        }
    }
}
`;

    public globalConfigCode:string = `
import {SuiPopupConfig} from "ng2-semantic-ui";

@Component({})
export class MyComponent {
    constructor(globalConfig:SuiPopupConfig) {
        globalConfig.isInverted = true;
        globalConfig.delay = 300;
    }
}
`;
}

@Component({
    selector: "example-popup-standard",
    template: exampleStandardTemplate
})
export class PopupExampleStandard implements OnInit {
    // We only need to do this once.
    private _config:SuiPopupConfig;

    constructor(public popupConfig:SuiPopupConfig) {
        this._config = new SuiPopupConfig();

        Object.assign(this._config, popupConfig);
        Object.assign(this.popupConfig, new SuiPopupConfig());
    }

    public ngOnInit():void {
        Object.assign(this.popupConfig, this._config);
    }
}

@Component({
    selector: "example-popup-template",
    template: exampleTemplateTemplate
})
export class PopupExampleTemplate {}

@Component({
    selector: "example-popup-placement",
    template: examplePlacementTemplate
})
export class PopupExamplePlacement {
    @Input()
    public position:string = "top right";
}

export const PopupPageComponents = [PopupPage, PopupExampleStandard, PopupExampleTemplate, PopupExamplePlacement];
