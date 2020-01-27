# invoke
* functional[meta header]
* function template[meta id-type]
* std[meta namespace]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class F, class... Args>
  invoke_result_t<F, Args...> invoke(F&& f, Args&&... args)
    noexcept(is_nothrow_invocable_v<F, Args...>);           //C++17

  template <class F, class... Args>
  constexpr invoke_result_t<F, Args...> invoke(F&& f, Args&&... args)
    noexcept(is_nothrow_invocable_v<F, Args...>);           //C++20
}
```
* invoke_result_t[link /reference/type_traits/invoke_result.md]
* is_nothrow_invocable_v[link /reference/type_traits/is_nothrow_invocable.md]

## 概要
関数呼び出し可能なオブジェクト`f`とその引数`args...`の組み合わせで[*INVOKE*](/reference/concepts/Invoke.md)コンセプトに従った関数呼び出しを行う。

[*INVOKE*](/reference/concepts/Invoke.md)コンセプトとはC++における関数呼び出しという性質を抽象化しまとめた概念（コンセプト）であり、この関数はその実体化、すなわち関数呼び出しという操作を統一したものである。

## 要件
型`F`および`Args`の組み合わせで[*INVOKE*](/reference/concepts/Invoke.md)コンセプトに従った関数呼び出しが可能であり、オーバー�ード解決の結果が曖昧にならないこと。そうでない場合はコンパイルエラーとなる。

## 引数
- `f` -- [*Callable*](/reference/concepts/Callable.md) オブジェクト（関数ポインタ/参照・関数オブジェクト・メンバポインタ）
- `args...` -- `f`に与える引数列。`f`がメンバポインタである場合は対応するクラスのオブジェクト（もしくはその[reference_wrapper](reference_wrapper.md)）が`args...`の先�になければならない

## 戻り値
`f`と`args...`により[*INVOKE*](/reference/concepts/Invoke.md)コンセプトに従った関数呼び出しを行い、その結果を戻り値として返す。

## 例外
`f`の`args...`による関数呼び出しに際して例外を投げない（[`is_nothrow_invocable_v<F, Args...>`](/reference/type_traits/is_nothrow_invocable.md) ` == true`）ならば、この関数も例外を投げない。

## 例

```cpp example
#include <iostream>
#include <complex>

struct functor {
  auto operator()() -> int {
    return 10;
  }

  auto operator()(int n) -> int {
    return n;
  }
};

struct has_member {
  auto member_function(int n) -> int {
    return n;
  }

  int member_object;
};

auto f(int) -> double {
  return 3.14159265359;
}

auto g(int) -> double {
  return 2.71828182846;
}

auto g(int,int) -> double {
  return 3.14159265359;
}


int main()
{
  functor fobj{};

  //関数オブジェクト呼び出し
  std::cout << std::invoke(fobj) << std::endl;
  std::cout << std::invoke(fobj, 100) << std::endl;

  has_member obj{25};
  //メンバ関数呼び出し
  std::cout << std::invoke(&has_member::member_function, obj, 50) << std::endl;
  //メンバ変数呼び出し
  std::cout << std::invoke(&has_member::member_object, obj) << std::endl;

  auto ref = std::ref(obj);
  //reference_wrapperからのメンバ関数呼び出し
  std::cout << std::invoke(&has_member::member_function, ref, 50) << std::endl;
  //reference_wrapperからのメンバ変数呼び出し
  std::cout << std::invoke(&has_member::member_object, ref) << std::endl;

  //関数呼び出し
  std::cout << std::invoke(f, 10) << std::endl;

  //フリー関数は一度関数ポインタにしないとオーバー�ード解決できない
  std::cout << std::invoke((double(*)(int))g, 10) << std::endl;
  std::cout << std::invoke((double(*)(int, int))g, 10, 10) << std::endl;

  //コンパイルエラー
  //std::cout << std::invoke(g, 10) << std::endl;
}
```
* std::invoke[color ff0000]

### 出力
```
10
100
50
25
50
25
3.14159
2.71828
3.14159
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): 2015, 2017


## 関連項目
- [invoke_result](/reference/type_traits/invoke_result.md)
- [is_invocable](/reference/type_traits/is_invocable.md)
- [is_invocable_r](/reference/type_traits/is_invocable_r.md)
- [is_nothrow_invocable](/reference/type_traits/is_nothrow_invocable.md)
- [is_nothrow_invocable_r](/reference/type_traits/is_nothrow_invocable_r.md)

## 参照
- [C++1z INVOKEコンセプトに従った関数呼び出しをするinvoke()関数 - Faith and Brave - C++で遊ぼう](https://faithandbrave.hateblo.jp/entry/2016/09/07/173344)
- [N4169 A proposal to add invoke function template (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4169.html)
- [P1065R2 constexpr INVOKE](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1065r2.html)