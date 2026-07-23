# swap (非メンバ関数)
* memory[meta header]
* std[meta namespace]
* polymorphic[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
friend constexpr void swap(polymorphic& lhs, polymorphic& rhs) noexcept(see below);
```

## 概要
2つの`polymorphic`オブジェクトを交換する。*Hidden friends*として定義される。


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

struct Base { virtual ~Base() = default; virtual int f() const = 0; };
struct D1 : Base { int f() const override { return 1; } };
struct D2 : Base { int f() const override { return 2; } };

int main()
{
  std::polymorphic<Base> a{std::in_place_type<D1>};
  std::polymorphic<Base> b{std::in_place_type<D2>};
  swap(a, b);   // ADLにより非メンバswapが呼ばれる
  assert(a->f() == 2 && b->f() == 1);
}
```
* std::polymorphic[link ../polymorphic.md]
* std::in_place_type[link /reference/utility/in_place_type_t.md]
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
- [`std::polymorphic`](../polymorphic.md)


## 参照
- [P3019R14 `indirect` and `polymorphic`: Vocabulary Types for Composite Class Design](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3019r14.pdf)
