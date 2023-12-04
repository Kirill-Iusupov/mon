export interface TextAreaProps {
  allowClear?: boolean;
  autoSize?: boolean | object;
  bordered?: boolean;
  className?: any;
  defaultValue?: string;
  maxLength?: number;
  showCount?:
    | boolean
    | { formatter: (info: { value: string; count: number; maxLength?: number }) => string };
  styles?: any;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  onPressEnter?: React.KeyboardEventHandler<HTMLTextAreaElement> | undefined;
  //   onResize?: React.KeyboardEventHandler<HTMLTextAreaElement> | undefined;
}
