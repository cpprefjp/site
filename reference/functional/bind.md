#bind (C++11)
* functional[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class F, class... BoundArgs>
  unspecified bind(F&& f, BoundArgs&&... bound_args);

  template <class R, class F, class... BoundArgs>
  unspecified bind(F&& f, BoundArgs&&... bound_args);
}
```
* unspecified[italic]

###概要
[<i>Callable</i>](./callable.md) オブジェクトに対し、引数を部分的に束縛(bind)する。

###引数
- `f` -- 束縛先となる [<i>Callable</i>](./callable.md) オブジェクト
- `bound_args` -- 束縛対象の値やプレースホルダ(`_1`, `_2`, ...)、別の `bind()` 呼び出し

###戻り値
引数を部分束縛された [<i>Callable</i>](./callable.md) オブジェクト。このオブジェクトは、次のような関数オブジェクトとして扱うことができる：
```cpp
struct bound_function_type {
  typedef unspecified result_type;
  template <class... UnBoundArgs>
  unspecified operator ()(UnBoundArgs&&... unbound_args) const;
};
```
* bound_function_type [italic]
* unspecified[italic]

型名 `result_type` は、`bind()` 呼び出し時のテンプレートパラメータ `R` そのもの(明示的に指定した場合)か、`F` の戻り値型(`F` が関数へのポインタまたはメンバ関数へのポインタである場合)か、`F::result_type` (`F` が型名 `result_type` の定義を持つ場合)である。いずれの条件も満たさない場合、`result_type` は定義されない。
<i>`bound_function_type`</i>`::operator ()()`を呼び出すと、`bound_args` と `unbound_args` が次のように使われ、最終的に `f` の呼出しに到達する。(説明用に、 `BoundArgs` のそれぞれの `decay` された型を `TiD` 、値を `ti` 、`UnBoundArgs` のそれぞれの値を `uj` とおく)。

1. 型`Ti` が `std::`[`reference_wrapper`](./reference_wrapper.md)`<X>` である場合、`ti.`[`get()`](./reference_wrapper/get.md) が `ti` の代わりに使用される。
2. `std::`[`is_bind_expression`](./is_bind_expression.md)`<TiD>::value`が `true` に評価される場合、`ti(unbound_args...)` の結果が `ti` の代わりに使用される(これは、ネストされた `bind()` が一度の呼び出しで再帰的に全て評価されることを示す)。
3. `std::`[`is_placeholder`](./is_placeholder.md)`<TiD>::value`が非ゼロに評価される場合、`uj` (ただし `j = std::`[`is_placeholder`](./is_placeholder.md)`<Ti>::value+1`) が `ti` の代わりに使用される。
4. その他の場合、`ti` がそのまま使用される。
上記の置換を行った後、 `f(ti...)` を呼び出した結果が <i>`bound_function_type`</i>`::operator ()()` の呼出し結果として返される。

注意： `bound_args` は明示的に [`std::ref()`](./reference_wrapper/ref.md) または [`std::cref()`](./reference_wrapper/cref.md) で包まない限り、内部でコピーして保持される。他方、`unbound_args` は通常の [perfect forwarding](/reference/utility/forward.md) が行われるため、`move` で渡したあるいは一時オブジェクトを直接渡した `unbound_args` を複数回プレースホルダ経由で使用すると予期しない結果になることがある。


##例
```cpp
#include <iostream>
#include <functional>

int add(int a, int b, int c)
{
  return a + b + c;
}

int main()
{
  // 第1引数のみを先に渡す
  using namespace std::placeholders;
  std::function<int(int, int)> f = std::bind(add, 2, _1, _2);

  // 残りの引数を渡して関数を呼び出す
  const int result = f(3, 4);

  std::cout << result << std::endl;
}
```
* iostream[link ../iostream.md]
* functional[link ../functional.md]
* bind[color ff0000]
* function[link function.md]
* placeholders[link placeholders.md]

###出力
```
9
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


##参照



