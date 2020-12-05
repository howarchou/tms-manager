/**
 *  Created by pw on 2020/12/5 3:20 下午.
 */
import 'braft-editor/dist/index.css';
import 'braft-extensions/dist/color-picker.css';
import React, { useEffect, useState } from 'react';
import BraftEditor, { BraftEditorProps, EditorState } from 'braft-editor';
import ColorPicker from 'braft-extensions/dist/color-picker';
import './index.less';

BraftEditor.use(
  ColorPicker({
    includeEditors: ['editor-with-color-picker'],
    theme: 'light',
  }),
);

interface Props extends BraftEditorProps {
  label?: string;
}

export default function (props: Props) {
  const { label, value, onChange, ...others } = props;
  const [defaultValue, setDefaultValue] = useState<EditorState>();

  useEffect(() => {
    if (value) {
      setDefaultValue(BraftEditor.createEditorState(value));
    }
  }, []);

  const handleChange = (editorState: EditorState) => {
    if (onChange) {
      onChange(editorState.toHTML());
    }
  };

  return (
    <div className="editor-container">
      {label ? <span className="label">预定须知</span> : null}
      <BraftEditor
        id="editor-with-color-picker"
        {...others}
        defaultValue={defaultValue}
        controls={[
          'text-color',
          'list-ol',
          'list-ul',
          'bold',
          'font-size',
          'headings',
          'fullscreen',
          'line-height',
          'separator',
          'text-align',
          'undo',
          'clear',
        ]}
        onChange={handleChange}
      />
    </div>
  );
}
