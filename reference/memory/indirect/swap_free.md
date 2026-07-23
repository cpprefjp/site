# swap (非メンバ関数)
* memory[meta header]
* std[meta namespace]
* indirect[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
friend constexpr void swap(indirect& lhs, indirect& rhs) noexcept(see below);
```

## 概要
2つの`indirect`オブジェクトを交換する。*Hidden friends*として定義される。


## 効果
`lhs.swap(rhs)`と等価。


## 例外
以下と等価な`noexcept`指定を持つ：

```cpp
noexcept(noexcept(lhs.swap(rhs)))
```


## 例
```cpp example
#include <cassert>
#include <memory>

int main()
{
  std::indirect<int> a{1};
  std::indirect<int> b{2};
  swap(a, b);   // ADLにより非メンバswapが呼ばれる
  assert(*a == 2 && *b == 1);
}
```
* std::indirect[link ../indirect.md]
* swap[color ff0000]

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
