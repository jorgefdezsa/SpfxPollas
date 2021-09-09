import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'PollasWebPartStrings';
import Pollas from './components/Pollas';
import { sp } from "@pnp/sp/presets/all";
import { IPollasProps } from './components/IPollasProps';


export interface IPollasWebPartProps {
  description: string;
}

export default class PollasWebPart extends BaseClientSideWebPart<IPollasWebPartProps> {

  public async onInit(): Promise<void> {
    const _ = await super.onInit();
    // other init code may be present
    sp.setup({
      spfxContext: this.context
    });
  }

  public render(): void {
    const element: React.ReactElement<IPollasProps> = React.createElement(
      Pollas,
      {
        description: this.properties.description,
        spContext: this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
