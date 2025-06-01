# get_allocator
* execution[meta header]
* cpo[meta id-type]
* std[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std {
  struct get_allocator_t { unspecified };
  inline constexpr get_allocator_t get_allocator{};
}
```
* unspecified[italic]

## 概要
`get_allocator`は、[クエリ可能オブジェクト](queryable.md)からアロケータを取得する[クエリオブジェクト](queryable.md)である。

コア定数式[`forwarding_query`](forwarding_query.md)`(get_allocator)`は`true`値を返す。


## 効果
呼び出し式`get_allocator(env)`は下記と等価であり、適格であれば説明専用コンセプト`simple-allocator`を満たす型の値となる。

- 引数`env`がconst修飾された`cenv`を用いて、式`cenv.query(get_allocator)`

```cpp
template<class Alloc>
concept simple-allocator =
  requires(Alloc alloc, size_t n) {
    { *alloc.allocate(n) } -> same_as<typename Alloc::value_type&>;
    { alloc.deallocate(alloc.allocate(n), n) };
  } &&
  copy_constructible<Alloc> &&
  equality_comparable<Alloc>;
```


## 例外
投げない


## カスタマイゼーションポイント
const修飾[クエリ可能オブジェクト](queryable.md)`cenv`に対して式`cenv.query(get_allocator)`が呼び出される。
このとき、`noexcept(cenv.query(get_allocator)) == true`であること。


## 例
```cpp
#include <concepts>
#include <memory>
#include <execution>
namespace ex = std::execution;

int main()
{
  auto env = ex::prop(std::get_allocator, std::allocator<int>{});

  auto alloc = std::get_allocator(env);
  static_assert(std::same_as<decltype(alloc), std::allocator<int>>);
}
```
* std::get_allocator[color ff0000]
* ex::prop[link execution/prop.md]

### 出力
```
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
