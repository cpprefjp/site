# is_nothrow_applicable
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  template <class F, class Tuple>
  struct is_nothrow_applicable;

  template <class F, class Tuple>
  inline constexpr bool is_nothrow_applicable_v
    = std::is_nothrow_applicable<F, Tuple>::value;
}
```

## 概要
関数呼び出し可能な型`F`に対して、[`tuple-like`](/reference/tuple/tuple-like.md)な型`Tuple`の要素を展開して[`apply`](/reference/tuple/apply.md)による呼び出しが可能であり、かつその呼び出しに際して例外を投げないかどうかを調べる。

[`is_nothrow_invocable`](is_nothrow_invocable.md)の[`apply`](/reference/tuple/apply.md)版である。


## 要件
型`F`および`Tuple`が、完全型であること。もしくは`const`/`volatile`修飾された(あるいはされていない)`void`か、要素数不明の配列型であること。


## 効果
`ELEMS-OF(T)`を、`make_index_sequence<tuple_size_v<remove_reference_t<T>>>`が示す`index_sequence`の特殊化のテンプレート引数である`size_t`のパラメータパック`N`に対する、パラメータパック`get<N>(declval<T>())`とする。

[`is_applicable_v`](is_applicable.md)`<F, Tuple>`が`true`であり、かつ式[*INVOKE*](/reference/concepts/Invoke.md)`(declval<F>(), ELEMS-OF(Tuple)...)`がいかなる例外も投げない場合[`true_type`](true_type.md)から派生し、そうでなければ[`false_type`](false_type.md)から派生する。


## 例
```cpp example
#include <tuple>
#include <type_traits>
#include <iostream>

int add(int a, int b) noexcept { return a + b; }
int may_throw(int a, int b) { return a + b; }

int main()
{
  std::cout << std::boolalpha;

  // add(int, int) noexcept
  std::cout << std::is_nothrow_applicable_v<decltype(&add), std::tuple<int, int>> << std::endl;

  // may_throw(int, int) は noexcept ではない
  std::cout << std::is_nothrow_applicable_v<decltype(&may_throw), std::tuple<int, int>> << std::endl;

  // 呼び出し不可能
  std::cout << std::is_nothrow_applicable_v<decltype(&add), std::tuple<int>> << std::endl;
}
```
* std::is_nothrow_applicable_v[color ff0000]

### 出力
```
true
false
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
- [`is_nothrow_invocable`](is_nothrow_invocable.md)
- [`is_applicable`](is_applicable.md)
- [`apply_result`](apply_result.md)
- [`apply`](/reference/tuple/apply.md)


## 参照
- [P1317R2 Remove return type deduction in `std::apply`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p1317r2.pdf)
