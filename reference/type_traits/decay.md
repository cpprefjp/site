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
  // 配列をコンストラクタの初期化�で初期化できない
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
- [Clang](/implementation.md#clang): 3.0
- [GCC](/implementation.md#gcc): 4.4.7
- [Visual C++](/implementation.md#visual_cpp): 2010, 2012, 2013, 2015
	- `decay_t`は、2013から。


## 参照
- [What is std::decay and when it should be used? - StackOverflow](http://stackoverflow.com/questions/25732386/what-is-stddecay-and-when-it-should-be-used)
- [N3546 TransformationTraits Redux](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3546.pdf)
- [N3655 TransformationTraits Redux, v2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3655.pdf)

