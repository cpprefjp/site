#result_of (C++11)
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class> class result_of; // 宣言のみ

  template <class F, class... ArgTypes>
  class result_of<F(ArgTypes...)> {
    typedef … type;
  };

  template <class T>
  using result_of_t = typename result_of<T>::type;
}
```

##概要
関数の戻り値の型を取得する。


##要件
型`F`は、関数または関数オブジェクトであること。もしくは、型`F`は、関数または関数オブジェクトへの参照であること。


##効果
`result_of`は、関数または関数オブジェクトの型`F`に対して、`ArgTypes...`を引数として渡した場合の戻り値の型を、メンバ型`type`として定義する。

メンバ型`type`は、以下と同じ型になる：

```cpp
decltype(INVOKE(declval<Fn>(), declval<ArgTypes>()...))
```
* declval[link /reference/utility/declval.md]
* INVOKE[link /reference/functional/invoke.md]


##例
```cpp
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

  // オーバーロードしている
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

  // オーバーロード
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

###出力
```
3
3
Hello World
3
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): 3.0
- [GCC, C++0x mode](/implementation.md#gcc): 4.6.4
- [Visual C++](/implementation.md#visual_cpp): ??


##参照
- [N1437 A uniform method for computing function object return types](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2003/n1437.html)
- [N1454 A uniform method for computing function object return types (revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2003/n1454.html)
- [Bringing result_of near to INVOKE](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2010/n3123.html)
- [N3546 TransformationTraits Redux](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3546.pdf)
- [N3655 TransformationTraits Redux, v2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3655.pdf)

