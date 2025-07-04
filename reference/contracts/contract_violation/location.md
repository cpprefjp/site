# location
* contracts[meta header]
* std::contracts[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]
* contract_violation[meta class]

```cpp
source_location location() const noexcept;
```

## 概要
契約違反が発生したソースコードの場所を返す。

厳密にはどの場所を返すかは規定されていない。

`precondition`違反の場合は関数の宣言の場所、それ以外では契約が記述された場所を返すことが推奨されている。

## 戻り値
契約違反が発生したソースコードの場所を返す（ただし厳密には定義されていない）。

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
