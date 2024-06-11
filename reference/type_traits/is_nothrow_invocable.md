# is_nothrow_invocable
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class F, class... ArgsTypes>
  struct is_nothrow_invocable;

  template <class F, class... ArgsTypes>
  inline constexpr bool is_nothrow_invocable_v 
    = std::is_nothrow_invocable<F, ArgsTypes...>::value;
}
```

## 概要
型`F`が、与えられた型の引数`ArgsTypes...`で関数呼び出し可能であり、その呼び出しに際して例外を投げないかどうかを調べる。


## 要件
型`F`および`ArgsTypes...`パラメータパックの全ての型が、完全型であること。もしくは`const`/`volatile`修飾された(あるいはされていない)`void`か、要素数不明の配列型であること。


## 効果
型`F`に対して引数`ArgsTypes...`による[*INVOKE*](/reference/concepts/Invoke.md)要件に従った呼び出しが可能であり、いかなる例外も投げない場合[`true_type`](true_type.md)から派生し、そうでなければ[`false_type`](false_type.md)から派生する。


## 例

```cpp example
#include <type_traits>
#include <iostream>

auto f(int) noexcept -> double {
  return 0.0;
}

auto g(double) -> double {
  return 0.0;
}


int main()
{
  std::cout << std::boolalpha;

  //f(int) noexcept -> double
  std::cout << std::is_nothrow_invocable<decltype(f), int>::value << std::endl;

  //f(int*) （定義なし）
  std::cout << std::is_nothrow_invocable<decltype(f), int*>::value << std::endl;

  //g(double) -> double
  std::cout << std::is_nothrow_invocable<decltype(g), double>::value << std::endl;
}
```
* std::is_nothrow_invocable[color ff0000]

### 出力
```
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
