/**
 * 날짜 선택 필드 (웹 전용).
 * 웹에서는 @react-native-community/datetimepicker 가 동작하지 않으므로
 * 브라우저 네이티브 <input type="date"> 를 투명하게 덮어 사용한다.
 */
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Field } from './Field';
import { formatSpaced, parseISODate } from '../lib/dateUtils';

interface DateFieldProps {
  label: string;
  /** ISO yyyy-mm-dd */
  value: string;
  onChange: (iso: string) => void;
  focus?: boolean;
}

// <input type="date"> 는 value/onChange 모두 'yyyy-mm-dd' 포맷을 사용하므로
// 별도 변환 없이 그대로 연결한다.
const inputStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  margin: 0,
  padding: 0,
  border: 'none',
  background: 'transparent',
  opacity: 0,
  cursor: 'pointer',
};

export function DateField({ label, value, onChange, focus }: DateFieldProps) {
  const date = parseISODate(value);

  return (
    <View style={styles.wrap}>
      <Field label={label} value={formatSpaced(date)} focus={focus} numericValue />
      <input
        type="date"
        value={value}
        onChange={(e) => {
          if (e.target.value) onChange(e.target.value);
        }}
        style={inputStyle}
        aria-label={label}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: 'relative' },
});
