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


## 例外
投げない

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照
- [Contracts for C++](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2900r14.pdf)
- 
