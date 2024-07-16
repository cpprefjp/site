# コンストラクタ
* stacktrace[meta header]
* std[meta namespace]
* stacktrace_entry[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
constexpr stacktrace_entry() noexcept;                    // (1) C++23

constexpr
stacktrace_entry(const stacktrace_entry& other) noexcept; // (2) C++23
```

## 概要
`stacktrace_entry`オブジェクトを構築する。

- (1) : デフォルト構築
- (2) : コピー構築


## 事後条件
- (1) : `*this`が空になること


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 12 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??
