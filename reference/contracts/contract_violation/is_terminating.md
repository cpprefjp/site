# is_terminating
* contracts[meta header]
* std::contracts[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]
* contract_violation[meta class]

```cpp
bool is_terminating() const noexcept;
```

## 概要
契約違反によってプログラムが終了するかどうかを返す。

## 戻り値
契約違反によってプログラムが終了する場合は`true`、そうでない場合は`false`を返す

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