# is_invocable
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class F, class... ArgsTypes>
  struct is_invocable;

  template <class F, class... ArgsTypes>
  inline constexpr bool is_invocable_v = std::is_invocable<F, ArgsTypes...>::value;
}
```

## 概要
型`F`が、与えられた型の引数`ArgsTypes...`で関数呼び出し可能かどうかを調べる。


## 要件
型`F`および`ArgsTypes...`パラメータパックの全ての型が、完全型であること。もしくは`const`/`volatile`修飾された(あるいはされていない)`void`か、要素数不明の配列型であること。


## 効果
型`F`に対して引数`ArgsTypes...`による[*INVOKE*](/reference/concepts/Invoke.md)要件に従った呼び出しが可能であれば[`true_type`](true_type.md)から派生し、そうでなければ[`false_type`](false_type.md)から派生する。

結果が`true`となる場合、以下のような呼び出しが可能であるということと等価である：

```cpp
std::invoke(std::declval<F>(), std::declval<ArgsTypes>()...)
```
* std::declval[link /reference/utility/declval.md]


## 例

```cpp example
#include <type_traits>
#include <vector>
#include <string>
#include <iostream>


struct functor {
  auto operator()() -> int {
    return 0;
  }

  auto operator()(int, double) -> std::string {
    return "string";
  }
};

struct has_member {
  auto member_function(std::vector<char>) -> short {
    return 0;
  }

  int member_object;
};

auto f(int) -> double {
  return 0.0;
}


int main()
{
  std::cout << std::boolalpha;

  //trueとなる呼び出し

  //has_member.*(has_member::*member_function, std::vector<char>)
  std::cout << std::is_invocable<decltype(&has_member::member_function), has_member, std::vector<char>>::value << std::endl;

  //(*(has_member*)).*(has_member::*member_function, std::vector<char>)
  std::cout << std::is_invocable<decltype(&has_member::member_function), has_member*, std::vector<char>>::value << std::endl;

  //has_member.*(has_member::*member_object)
  std::cout << std::is_invocable<decltype(&has_member::member_object), has_member>::value << std::endl;

  //(*(has_member*)).*(has_member::*member_object)
  std::cout << std::is_invocable<decltype(&has_member::member_object), has_member*>::value << std::endl;

  //functor::operator()()
  std::cout << std::is_invocable<functor>::value << std::endl;

  //functor::operator()(int, double)
  std::cout << std::is_invocable<functor, int, double>::value << std::endl;

  //f(int)
  std::cout << std::is_invocable<decltype(f), int>::value << std::endl;


  //falseとなる呼び出し（いずれも定義されていない）

  //has_member.*(has_member::*member_function, int)
  std::cout << std::is_invocable<decltype(&has_member::member_function), has_member, int>::value << std::endl;

  //functor::operator()(std::string)
  std::cout << std::is_invocable<functor, std::string>::value << std::endl;

  //f(const char*)
  std::cout << std::is_invocable<decltype(f), const char*>::value << std::endl;
}
```
* std::is_invocable[color ff0000]

### 出力
```
true
true
true
true
true
true
true
false
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
