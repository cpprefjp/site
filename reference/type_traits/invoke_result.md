# invoke_result
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class F, class... ArgsTypes>
  struct invoke_result;

  template <class F, class... ArgsTypes>
  using invoke_result_t = typename invoke_result<F, ArgsTypes...>::type;
}
```

## 概要
与えられた型の引数（ArgsTypes...）で関数呼び出し可能な型（F）について、関数呼び出しの戻り値型を取得する。


## 要件
型`F`および`ArgsTypes...`パラメータパックの全ての型が、完全型であること。もしくは`const`/`volatile`修飾された(あるいはされていない)`void`か、要素数不明の配列型であること。


## 効果
[*INVOKE*](/reference/concepts/Invoke.md)要件に従った呼び出しの結果（戻り値）となる型をメンバ型`type`として定義する。そのような呼び出しが出来ない（ill-formedな）場合、メンバ型`type`は定義されない。

すなわち、関数呼び出し出来ない型と引数列の組み合わせが渡された場合、SFINAEが働く。

メンバ型`type`が定義される場合、以下と同じ型となる：

```cpp
decltype(std::invoke(std::declval<F>(), std::declval<ArgsTypes>()...))
```

## 備考
このメタ関数は`result_of`の代替として導入された。

`result_of`は、シグニチャであることをわかりやすくするために、関数型でユーザーにテンプレート引数を指定させていたが、これは混乱の元であった。  
例えば`result_of<F(Args...)>::type`と書くと、指定している関数呼び出し可能な型`F`が戻り値型に見える、`F`として関数型や配列型（その参照ならok）を指定できない、`F, Args`に抽象クラスを指定できない、`Args`は`std::decay`を通したように変換される等の問題があり、規格書内で`result_of`を参照している個所に混乱やバグを導入してしまっていた。

そのため、`result_of`のテンプレート引数型の変更が考えられていたが、[`std::invoke()`](/reference/functional/invoke.md)導入に当たって関連するメタ関数の命名規則が統一されたため、`result_of`は非推奨とされ`invoke_result`として本メタ関数が導入された。

## 例

```cpp example
#include <type_traits>
#include <vector>
#include <string>

struct functor {
  auto operator()() -> int {
    return 0;
  }

  auto operator()(int, double) -> std::string {
    return "string";
  }
};

struct has_member {
  short member_function(std::vector<char>) {
    return 0;
  }

  int member_object;
};

auto f(int) -> double {
  return 0.0;
}

template<typename Expected, typename F, typename... Args>
using check_r = std::is_same<Expected, typename std::invoke_result<F, Args...>::type>;

int main()
{
  //has_member.*(has_member::*member_function, std::vector<char>) -> short
  static_assert(check_r<short, decltype(&has_member::member_function), has_member, std::vector<char>>::value);

  //(*(has_member*)).*(has_member::*member_function, std::vector<char>) -> short
  static_assert(check_r<short, decltype(&has_member::member_function), has_member*, std::vector<char>>::value);

  //has_member.*(has_member::*member_object) -> int&&
  static_assert(check_r<int&&, decltype(&has_member::member_object), has_member>::value);

  //(*(has_member*)).*(has_member::*member_object) -> int&
  static_assert(check_r<int&, decltype(&has_member::member_object), has_member*>::value);

  //functor::operator()() -> int
  static_assert(check_r<int, functor>::value);

  //functor::operator()(int, double) -> std::string
  static_assert(check_r<std::string, functor, int, double>::value);

  //f(int) -> double;
  static_assert(check_r<double, decltype(f), int>::value);
}
```
* std::invoke_result[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 6.0 [mark verified]
- [GCC](/implementation.md#gcc): 7.3 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2017 Update 3 [mark verified]

## 参照
- [P0604R0 Resolving GB 55, US 84, US 85, US 86](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0604r0.html)
