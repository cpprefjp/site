# comment
* contracts[meta header]
* std::contracts[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]
* contract_violation[meta class]

```cpp
const char* comment() const noexcept;
```

## 概要
契約違反の詳細を記録したchar列を返す。

このchar列は`null-terminated multi-byte string`、すなわち`'\0'`で終端されたマルチバイト文字列であることが保証されている。

## 戻り値
契約違反の詳細を記録したchar列

