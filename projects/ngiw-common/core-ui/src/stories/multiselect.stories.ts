import { componentWrapperDecorator, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from '@storybook/test';
import { action } from '@storybook/addon-actions';
import { MultiSelectComponent } from '../../public-api';
import { NzCascaderModule } from 'ng-zorro-antd/cascader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<MultiSelectComponent> = {
  title: 'Example/Multi select',
  component: MultiSelectComponent,
  argTypes: {
    valueChanged: { action: 'valueChanged' }
  },
  decorators: [
    moduleMetadata({
      declarations: [MultiSelectComponent],
      imports: [
        NzCascaderModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserModule,
        BrowserAnimationsModule
      ],
    }),
    componentWrapperDecorator((story) => `<div style="margin: 3em">${story}</div>`),
  ],
  
}



export default meta;
type Story = StoryObj<MultiSelectComponent>;

const ngiwOptions = [
  { value: 1, label: 'Option 1' },
  { value: 2, label: 'Option 2' },
  { value: 3, label: 'Option 3' , children: [
    { value: 4, label: 'Option 4' },
    { value: 5, label: 'Option 5' },
    { value: 6, label: 'Option 6'},
    { value: 10, label: 'Option 10' },
    { value: 11, label: 'Option 11'},
  ]},      
];


const args = {
  ngiwValue: undefined,
  ngiwOptions: ngiwOptions,
  ngiwPlaceholder: 'Select an option',
  ngiwTransform: undefined,
  ngiwWidth: undefined,
  ngiwIsParentSelectable: undefined 
};


 


export const Basic: Story = {
  args: {
   ...args,
  },  
};

export const WithInitialValue: Story = {
  args: {
    ...args,
    ngiwValue: 6
  }
};
// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
