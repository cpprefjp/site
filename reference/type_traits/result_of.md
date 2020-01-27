# result_of
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]
* cpp17deprecated[meta cpp]
* cpp20removed[meta cpp]

```cpp
namespace std {
  template <class> class result_of; // 宣言のみ

  template <class F, class... ArgTypes>
  class result_of<F(ArgTypes...)> {
    using type = …;
  };

  template <class T>
  using result_of_t = typename result_of<T>::type;
}
```

この機能はC++17から非推奨となり、C++20で削除された。代わりに[`std::invoke_result`](invoke_result.md)を使用すること。


## 概要
関数の戻り値の型を取得する。


## 要件
- C++11まで : 型`F`は、関数または関数オブジェクトであること。もしくは、型`F`は、関数または関数オブジェクトへの参照であること。[`INVOKE`](/reference/concepts/Invoke.md)`(declval<Fn>(), declval<ArgTypes>()...)`が有効な式であること。
- C++14から : 型`F`および`ArgsTypes...`パラメータパックの全ての型が、完全型であること。もしくは`const`/`volatile`修飾された(あるいはされていない)`void`か、要素数不明の配列型であること。
    - このバージョンでは要件が緩和され、関数呼び出しが可能であることが要件から外れた。これにより、有効でない関数オブジェクト、引数を指定した場合に、`static_assert`でコンパイルエラーにならず、テンプレートの置き換え失敗によりSFINAEが働くようになった。


## 効果
`result_of`は、関数または関数オブジェクトの型`F`に対して、`ArgTypes...`を引数として渡した場合の戻り値の型を、メンバ型`type`として定義する。

メンバ型`type`は、以下と同じ型になる：

```cpp
decltype(INVOKE(declval<Fn>(), declval<ArgTypes>()...))
```
* declval[link /reference/utility/declval.md]
* INVOKE[link /reference/concepts/Invoke.md]

C++14以降では、上記メンバ型`type`の型定義が有効な式でない場合、メンバ型`type`は定義されない。


## 非推奨・削除の詳細
C++17で特定のシグニチャで関数呼び出しが可能かを判定する`is_callable`を導入する予定だったが、[`std::invoke()`](/reference/functional/invoke.md)関数を導入する際に、`result_of`も含めて命名規則を統一することとなった。

`is_callable`は[`std::is_invocable`](is_invocable.md)という名前で導入された。

`result_of`は、シグニチャであることをわかりやすくするために、関数型でユーザーにテンプレート引数を指定させていたが、これは混乱の元であった。

そのため、[`std::invoke_result`](invoke_result.md)に名称変更することとなった。


## 例
```cpp example
#include <iostream>
#include <string>
#include <type_traits>
#include <functional>

// 関数
int func(int a, int b)
{ return a + b; }

// 関数オブジェクト
struct functor {
  int operator()(int a, int b) const
  {
    return a + b;
  }

  // オーバー�ードしている
  std::string operator()(std::string a, std::string b) const
  {
    return a + b;
  }
};

struct X {
  // メンバ関数
  int foo(int a, int b) const
  {
    return a + b;
  }
};

// 受け取った関数を呼び出し、その関数の戻り値を返す
template <class F, class... Args>
typename std::result_of<F(Args...)>::type
  invoke(F&& f, Args... args)
{
  return f(args...);
}

// Fがメンバ関数ポインタの場合
template <class F, class... Args>
typename std::result_of<F(Args...)>::type
  invoke_memfun(F&& f, Args... args)
{
  return std::bind(std::move(f), args...)();
}

int main()
{
  // 関数
  int result1 = invoke(func, 1, 2);

  // 関数オブジェクト
  int result2 = invoke(functor(), 1, 2);

  // オーバー�ード
  std::string result3 = invoke(functor(), "Hello ", "World");

  // メンバ関数
  X x;
  int result4 = invoke_memfun(&X::foo, x, 1, 2);

  std::cout << result1 << std::endl;
  std::cout << result2 << std::endl;
  std::cout << result3 << std::endl;
  std::cout << result4 << std::endl;
}
```
* std::result_of[color ff0000]
* std::bind[link /reference/functional/bind.md]
* std::move[link /reference/utility/move.md]

### 出力
```
3
3
Hello World
3
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0
- [GCC](/implementation.md#gcc): 4.6.4
- [Visual C++](/implementation.md#visual_cpp): 2008 (std::tr1), 2010, 2012, 2013, 2015
	- 2008～2010は、TR1に基づく実装である。`decltype`を使用せず、関数オブジェクトに定義された`result_type`が使用される。
	- 2012までは、可変引数テンプレートに対応していないため、不完全な実装である。
	- `result_of_t`は、2013から。


## 参照
- [N1437 A uniform method for computing function object return types](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2003/n1437.html)
- [N1454 A uniform method for computing function object return types (revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2003/n1454.html)
- [Bringing result_of near to INVOKE](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2010/n3123.html)
- [N3462 `std::result_of` and SFINAE](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3462.html)
    - C++11では、テンプレートパラメータが有効な関数の式にならない場合に`static_assert`でコンパイルエラーにしていたが、C++14ではその時点でコンパイルエラーにせず、SFINAEを働かせるようにした。
- [N3546 TransformationTraits Redux](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3546.pdf)
- [N3655 TransformationTraits Redux, v2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3655.pdf)
- [P0604R0 Resolving GB 55, US 84, US 85, US 86](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0604r0.html)
- [P0619R4 Reviewing deprecated facilities of C++17 for C++20](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0619r4.html)
