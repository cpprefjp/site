# operator==
* memory[meta header]
* std[meta namespace]
* indirect[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
template <class U, class AA>
friend constexpr bool operator==(
  const indirect& lhs, const indirect<U, AA>& rhs) noexcept(see below); // (1)

template <class U>
friend constexpr bool operator==(
  const indirect& lhs, const U& rhs) noexcept(see below);               // (2)
```

## 概要
- (1) : 2つの`indirect`オブジェクトが所有する値を等値比較する。
- (2) : `indirect`オブジェクトが所有する値と、別の値`rhs`を等値比較する。

いずれも*Hidden friends*として定義される。


## 適格要件
- (1) : 式`*lhs == *rhs`が適格であり、その結果が`bool`に変換可能であること。
- (2) : 式`*lhs == rhs`が適格であり、その結果が`bool`に変換可能であること。


## 戻り値
- (1) : `lhs`と`rhs`のいずれかが無効値状態であれば`lhs.valueless_after_move() == rhs.valueless_after_move()`、そうでなければ`*lhs == *rhs`。
- (2) : `lhs`が無効値状態であれば`false`、そうでなければ`*lhs == rhs`。


## 備考
この演算子により、`operator!=`が使用可能になる。


## 例
```cpp example
#include <cassert>
#include <memory>

int main()
{
  std::indirect<int> a{42};
  std::indirect<int> b{42};
  assert(a == b);    // (1) indirect同士の比較
  assert(a == 42);   // (2) 値との比較
  assert(a != 0);
}
```
* std::indirect[color ff0000]

### 出力
```
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::indirect`](../indirect.md)


## 参照
- [P3019R14 `indirect` and `polymorphic`: Vocabulary Types for Composite Class Design](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3019r14.pdf)
