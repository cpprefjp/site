# apply_result
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  template <class F, class Tuple>
  struct apply_result;

  template <class F, class Tuple>
  using apply_result_t = typename apply_result<F, Tuple>::type;
}
```

## 概要
関数呼び出し可能な型`F`に対して、[`tuple-like`](/reference/tuple/tuple-like.md)な型`Tuple`の要素を展開して[`apply`](/reference/tuple/apply.md)した場合の戻り値型を取得する。

[`invoke_result`](invoke_result.md)の[`apply`](/reference/tuple/apply.md)版であり、タプルの要素を引数として関数を呼び出した結果の型を求める。


## 要件
型`F`および`Tuple`が、完全型であること。もしくは`const`/`volatile`修飾された(あるいはされていない)`void`か、要素数不明の配列型であること。


## 効果
`ELEMS-OF(T)`を、`make_index_sequence<tuple_size_v<remove_reference_t<T>>>`が示す`index_sequence`の特殊化のテンプレート引数である`size_t`のパラメータパック`N`に対する、パラメータパック`get<N>(declval<T>())`とする。

式[*INVOKE*](/reference/concepts/Invoke.md)`(declval<F>(), ELEMS-OF(Tuple)...)`が未評価オペランドとして扱われたときに適格であるならば、メンバ型`type`は`decltype(`[*INVOKE*](/reference/concepts/Invoke.md)`(declval<F>(), ELEMS-OF(Tuple)...))`を示す。そうでなければ、メンバ型`type`は定義されない。

アクセスチェックは`F`および`Tuple`と無関係なコンテキストで行われる。式の直接のコンテキストの妥当性のみが考慮される。


## 備考
このメタ関数はC++26で追加された。C++23まで[`apply`](/reference/tuple/apply.md)の戻り値型は`decltype(auto)`による型推論が使われていたが、これはSFINAEフレンドリーではなかった。`apply_result`を使うことで、[`apply`](/reference/tuple/apply.md)の呼び出し可能性をコンセプトやSFINAEで判定できるようになった。


## 例
```cpp example
#include <tuple>
#include <type_traits>
#include <string>

int add(int a, int b) { return a + b; }

int main()
{
  using args_t = std::tuple<int, int>;

  // apply(add, tuple<int, int>) の戻り値型は int
  static_assert(std::is_same_v<
    std::apply_result_t<decltype(&add), args_t>,
    int
  >);

  // 呼び出し不可能な場合、apply_result にはメンバ型 type がない
  // （SFINAEフレンドリー）
  static_assert(!requires {
    typename std::apply_result_t<decltype(&add), std::tuple<std::string>>;
  });
}
```
* std::apply_result_t[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 15 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`invoke_result`](invoke_result.md)
- [`is_applicable`](is_applicable.md)
- [`is_nothrow_applicable`](is_nothrow_applicable.md)
- [`apply`](/reference/tuple/apply.md)


## 参照
- [P1317R2 Remove return type deduction in `std::apply`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p1317r2.pdf)
