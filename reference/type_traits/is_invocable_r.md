# is_invocable_r
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class R, class F, class... ArgsTypes>
  struct is_invocable_r;

  template <class R, class F, class... ArgsTypes>
  inline constexpr bool is_invocable_r_v = std::is_invocable_r<R, F, ArgsTypes...>::value;
}
```

## 概要
型`F`が、与えられた型の引数`ArgsTypes...`で関数呼び出し可能であり、その戻り値型が`R`に変換可能かどうかを調べる。


## 要件
型`R, F`および`ArgsTypes...`パラメータパックの全ての型が、完全型であること。もしくは`const`/`volatile`修飾された(あるいはされていない)`void`か、要素数不明の配列型であること。


## 効果
型`F`に対して引数`ArgsTypes...`による[*INVOKE*](/reference/concepts/Invoke.md)要件に従った呼び出しが可能であり、その結果となる戻り値の型が`R`に変換可能であれば[`true_type`](true_type.md)から派生し、そうでなければ[`false_type`](false_type.md)から派生する。（C++20まで。）

C++23 では、型`F`に対して引数`ArgsTypes...`による[*INVOKE*](/reference/concepts/Invoke.md)要件に従った呼び出しが可能であり、その結果となる戻り値の型を`S`とすると、`S`は`R`に変換可能かつ、`S`は`R`に束縛されて寿命が延長されないのであれば[`true_type`](true_type.md)から派生し、そうでなければ[`false_type`](false_type.md)から派生する。

結果は以下と等価である：

```cpp
// C++17
std::is_convertible_v<std::invoke_result_t<F, ArgsTypes...>, R>

// C++23
std::is_convertible_v<std::invoke_result_t<F, ArgsTypes...>, R> && 
std::reference_converts_from_temporary_v<R, std::invoke_result_t<F, ArgsTypes...>> == false
```
* std::is_convertible_v[link is_convertible.md]
* std::invoke_result_t[link invoke_result.md]
* std::reference_converts_from_temporary_v[link /reference/type_traits/reference_converts_from_temporary.md]


## 寿命の延長とダングリング参照
前項での`S`を継続して使用する。以下では`S`/`R`を`S`の値/`R`の値の意味で用いる場合がある。

`S`が`R`に束縛されて寿命が延長されるとは、`R`が参照、特に`const T&`や`T&&`である場合に発生する`S`の値に対する寿命の延長のことである。本メタ関数は実際に[*INVOKE*](/reference/concepts/Invoke.md)と`R`への変換を行う訳では無いが、本メタ関数に渡された型の値を使用して[*INVOKE*](/reference/concepts/Invoke.md)と`S`から`R`への変換が行われる場合（つまり[`invoke_r`](/reference/functional/invoke_r.md)の中）について考えてみよう。

`R`が`const T&`または`T&&`で、かつ`S`が`rvalue`であれば、`S`を`R`へ暗黙変換する際に`S`の寿命は`R`の寿命に合わせて延長されることがある。しかしこの場合、`R`は[*INVOKE*](/reference/concepts/Invoke.md)が行われる文を寿命とするので、`S`も同様に[*INVOKE*](/reference/concepts/Invoke.md)が行われる文が終了すると同時に寿命が終了する。参照による寿命の延長は2度適用されることはないため、このような場合には常にダングリング参照が生じてしまう。

これを検出し、不適格とするために[`reference_converts_from_temporary_v`](/reference/type_traits/reference_converts_from_temporary.md)を使用しているというわけなのである。

```cpp example
#include <iostream>
#include <functional>

struct S {
  S() { std::cout << "S construct" << std::endl; }
  ~S() { std::cout << "S destruct" << std::endl; }
};

int main()
{
  using R = const S&;

  std::cout << "1" << std::endl;

  // INVOKE、つまり std::invoke の戻り値である S が
  // R に束縛されて R の寿命と同じ寿命に延長された上で std::invoke_r の戻り値となる
  // しかし R の寿命はこの1文の間だけなので、S もこの1文が終了する際に破棄される
  const S& a = std::invoke_r<R>([]() { return S{}; });

  std::cout << "2" << std::endl;
}
```


## 例

```cpp example
#include <type_traits>
#include <iostream>

auto f(int) -> double {
  return 0.0;
}


int main()
{
  std::cout << std::boolalpha;

  //f(int) -> double
  std::cout << std::is_invocable_r<double, decltype(f), int>::value << std::endl;

  //f(int) -> double -> int
  std::cout << std::is_invocable_r<int, decltype(f), int>::value << std::endl;

  //f(int*) （定義なし）
  std::cout << std::is_invocable_r<double, decltype(f), int*>::value << std::endl;

  //f(int) -> double -> char* （戻り値型変換不可）
  std::cout << std::is_invocable_r<char*, decltype(f), int>::value << std::endl;
}
```
* std::is_invocable_r[color ff0000]

### 出力
```
true
true
false
false
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): 2017 Update 3 [mark verified]

## 参照
- [C++1z 関数が呼び出し可能かを判定する型特性 - Faith and Brave - C++で遊ぼう](https://faithandbrave.hateblo.jp/entry/2016/05/13/183857)
- [Resolving GB 55, US 84, US 85, US 86](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0604r0.html)
- [P2255R2 A type trait to detect reference binding to temporary](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2255r2.html)
