# is_applicable
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  template <class F, class Tuple>
  struct is_applicable;

  template <class F, class Tuple>
  inline constexpr bool is_applicable_v = std::is_applicable<F, Tuple>::value;
}
```

## 概要
関数呼び出し可能な型`F`に対して、[`tuple-like`](/reference/tuple/tuple-like.md)な型`Tuple`の要素を展開して[`apply`](/reference/tuple/apply.md)による呼び出しが可能かどうかを調べる。

[`is_invocable`](is_invocable.md)の[`apply`](/reference/tuple/apply.md)版である。


## 要件
型`F`および`Tuple`が、完全型であること。もしくは`const`/`volatile`修飾された(あるいはされていない)`void`か、要素数不明の配列型であること。


## 効果
`ELEMS-OF(T)`を、`make_index_sequence<tuple_size_v<remove_reference_t<T>>>`が示す`index_sequence`の特殊化のテンプレート引数である`size_t`のパラメータパック`N`に対する、パラメータパック`get<N>(declval<T>())`とする。

[`tuple-like`](/reference/tuple/tuple-like.md)`<Tuple>`が`true`であり、かつ式[*INVOKE*](/reference/concepts/Invoke.md)`(declval<F>(), ELEMS-OF(Tuple)...)`が未評価オペランドとして扱われたときに適格であるならば[`true_type`](true_type.md)から派生し、そうでなければ[`false_type`](false_type.md)から派生する。


## 例
```cpp example
#include <tuple>
#include <type_traits>
#include <string>
#include <iostream>

int add(int a, int b) { return a + b; }
void no_args() {}

int main()
{
  std::cout << std::boolalpha;

  // add(int, int) に tuple<int, int> を展開して呼び出し可能
  std::cout << std::is_applicable_v<decltype(&add), std::tuple<int, int>> << std::endl;

  // add(int, int) に tuple<int> では引数が足りない
  std::cout << std::is_applicable_v<decltype(&add), std::tuple<int>> << std::endl;

  // no_args() に空のタプルで呼び出し可能
  std::cout << std::is_applicable_v<decltype(&no_args), std::tuple<>> << std::endl;

  // no_args() に tuple<int> は引数が多すぎる
  std::cout << std::is_applicable_v<decltype(&no_args), std::tuple<int>> << std::endl;
}
```
* std::is_applicable_v[color ff0000]

### 出力
```
true
false
true
false
```

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 15 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`is_invocable`](is_invocable.md)
- [`is_nothrow_applicable`](is_nothrow_applicable.md)
- [`apply_result`](apply_result.md)
- [`apply`](/reference/tuple/apply.md)


## 参照
- [P1317R2 Remove return type deduction in `std::apply`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p1317r2.pdf)
