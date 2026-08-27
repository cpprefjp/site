# decay
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  struct decay {
    using type = …;
  };

  template <class T>
  using decay_t = typename decay<T>::type; // C++14
}
```

## 概要
配列と関数ポインタに関して、関数テンプレートと同様に推論された型を取得する。

このクラステンプレートは、関数テンプレートにおける以下の推論ルールを適用する：

- 左辺値から右辺値への変換
- 配列からポインタへの変換
- 関数の左辺値から関数ポインタへの変換


## 効果
- [`remove_reference`](remove_reference.md)`<T>::type`した型を`U`とする。
- 型`U`が配列型`U[N]`であれば、`U*`型をメンバ型`type`として定義する。
- 型`U`が関数型`R(Args...)`であれば、`R(*)(Args...)`型をメンバ型`type`として定義する。
- それ以外の場合は、[`remove_cv`](remove_cv.md)`<U>::type`した型を、メンバ型`type`として定義する。


## 備考
- この変換は、左辺値式を右辺値として使用する際に適用される、左辺値から右辺値への変換・配列からポインタへの変換・関数からポインタへの変換に相当する。それに加えて、値渡しの引数の型をより正確に模倣するために、クラス型からもCV修飾を取り除く。


## 例
```cpp example
#include <type_traits>

template <class T1, class T2>
struct my_pair {
  T1 first;
  T2 second;

  template <class U1, class U2>
  my_pair(const U1& a, const U2& b)
    : first(a), second(b) {}
};

template <class T1, class T2>
my_pair<T1, T2> my_bad_make_pair(const T1& a, const T2& b)
{
  return my_pair<T1, T2>(a, b);
}

template <class T1, class T2>
my_pair<
  typename std::decay<const T1>::type,
  typename std::decay<const T2>::type
>
  my_make_pair(const T1& a, const T2& b)
{
  return my_pair<
           typename std::decay<const T1>::type,
           typename std::decay<const T2>::type
          >(a, b);
}

int main()
{
  // コンパイルエラー！
  // 配列をコンストラクタの初期化子で初期化できない
//auto p = my_bad_make_pair("hello", "world");

  // OK
  // decltype(q) == my_pair<const char*, const char*>
  auto q = my_make_pair("hello", "world");

  // OK
  // decltype(a) == mu_pair<int, int>
  auto a = my_make_pair(3, 1);
  a.first = 2;
}
```
* std::decay[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [GCC](/implementation.md#gcc): 4.4.7 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2010 [mark verified], 2012 [mark verified], 2013 [mark verified], 2015 [mark verified]
	- `decay_t`は、2013から。


## 参照
- [What is std::decay and when it should be used? - StackOverflow](http://stackoverflow.com/questions/25732386/what-is-stddecay-and-when-it-should-be-used)
- [N3546 TransformationTraits Redux](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3546.pdf)
- [N3655 TransformationTraits Redux, v2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3655.pdf)
- [LWG Issue 1187. `std::decay`](https://cplusplus.github.io/LWG/issue1187)
    - C++11で、この変換が値渡しの引数型を模倣するものであり、クラス型からもCV修飾を取り除く点で通常の変換とは異なる旨の注記が追加された
