# get
* utility[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <std::size_t I, class T1, class T2>
  typename tuple_element<I, pair<T1, T2>>::type&
    get(pair<T1, T2>& x) noexcept;                     // (1) C++11

  template <std::size_t I, class T1, class T2>
  constexpr tuple_element_t<I, pair<T1, T2>>&
    get(pair<T1, T2>&) noexcept;                       // (1) C++14

  template <std::size_t I, class T1, class T2>
  typename tuple_element<I, pair<T1, T2>>::type&&
    get(pair<T1, T2>&& x) noexcept;                    // (2) C++11

  template <std::size_t I, class T1, class T2>
  constexpr tuple_element_t<I, pair<T1, T2>>&&
    get(pair<T1, T2>&&) noexcept;                      // (2) C++14

  template <std::size_t I, class T1, class T2>
  const typename tuple_element<I, pair<T1, T2>>::type&
    get(const pair<T1, T2>& x) noexcept;               // (3) C++11

  template <std::size_t I, class T1, class T2>
  constexpr const tuple_element_t<I, pair<T1, T2>>&
    get(const pair<T1, T2>&) noexcept;                 // (3) C++14

  template <std::size_t I, class T1, class T2>
  constexpr const tuple_element_t<I, pair<T1, T2>>&&
    get(const pair<T1, T2>&& p) noexcept;              // (4) C++17

  template <class T, class U>
  constexpr T&
    get(pair<T, U>& p) noexcept;                       // (5) C++14

  template <class T, class U>
  constexpr const T&
    get(const pair<T, U>& p) noexcept;                 // (6) C++14

  template <class T, class U>
  constexpr T&&
    get(pair<T, U>&& p) noexcept;                      // (7) C++14

  template <class T, class U>
  constexpr const T&&
    get(const pair<T, U>&& p) noexcept;                // (8) C++17

  template <class T, class U>
  constexpr T&
    get(pair<U, T>& p) noexcept;                       // (9) C++14

  template <class T, class U>
  constexpr const T&
    get(const pair<U, T>& p) noexcept;                 // (10) C++14

  template <class T, class U>
  constexpr T&&
    get(pair<U, T>&& p) noexcept;                      // (11) C++14

  template <class T, class U>
  constexpr const T&&
    get(const pair<U, T>&& p) noexcept;                // (12) C++17
}
```
* tuple_element[link tuple_element.md]
* tuple_element_t[link tuple_element.md]
* pair[link /reference/utility/pair.md]

## 概要
タプルと見なせる型から指定した位置の要素を取得する。

`<utility>`ヘッダでは、[`pair`](/reference/utility/pair.md)に関するオーバー�ードを提供する。


## 要件
- (1) ～ (4) : テンプレートパラメータ`I`が、0か1であること。この要件を満たさない場合は、コンパイルエラーとなる。
- (5) ～ (12) : 型Tと型Uが異なる型であること。この要件を満たさない場合は、コンパイルエラーとなる。


## 戻り値

- (1) ～ (4) : [`pair`](/reference/utility/pair.md)の`I`番目の要素
- (5) ～ (8) : p.firstへの参照
- (9) ～ (12) : p.secondへの参照


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <utility>

int main()
{
  std::pair<int, char> p(1, 'a');

  //位置を指定して取得する方法。(1)〜(4)
  {
    int& i = std::get<0>(p);
    char& c = std::get<1>(p);

    std::cout << i << std::endl;
    std::cout << c << std::endl;
  }
  std::cout << std::endl;

  //型を指定して取得する方法。(5)〜(12)
  {
    int& i = std::get<int>(p);
    char& c = std::get<char>(p);

    std::cout << i << std::endl;
    std::cout << c << std::endl;
  }
}
```
* std::get[color ff0000]

### 出力
```
1
a

1
a
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.6.1
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2008 (std::tr1), 2010, 2012, 2013, 2015


## 関連項目
- [`get - std::tuple`](/reference/tuple/tuple/get.md)
- [`get - std::array`](/reference/array/array/get.md)


## 参照
- [N3471 Constexpr Library Additions: utilities, v3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3471.html)
- [N3584 Wording for Addressing Tuples by Type: Revision 2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3670.html)
- [N3887 Consistent Metafunction Aliases](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n3887.pdf)
- [LWG Issue 2485. `get()` should be overloaded for `const tuple&&`](https://wg21.cmeerw.net/lwg/issue2485)
