# begin
* iterator[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class C>
  auto begin(C& c) -> decltype(c.begin());                 // (1) C++11

  template <class C>
  constexpr auto begin(C& c) -> decltype(c.begin());       // (1) C++17

  template <class C>
  auto begin(const C& c) -> decltype(c.begin());           // (2) C++11

  template <class C>
  constexpr auto begin(const C& c) -> decltype(c.begin()); // (2) C++17

  template <class T, size_t N>
  T* begin(T (&array)[N]);                                 // (3) C++11

  template <class T, size_t N>
  constexpr T* begin(T (&array)[N]) noexcept;              // (3) C++14
}
```

## 概要
範囲から先頭要素へのイテレータを取得する。

この関数は、メンバ関数版の`begin()`とちがい、組み込み配列に対しても使用できる。

- (1) : 非`const`のコンテナの、先頭要素へのイテレータを取得する
- (2) : `const`のコンテナの、先頭要素へのイテレータを取得する
- (3) : 組み込み配列の、先頭要素へのポインタを取得する


## 戻り値
- (1) : `return c.begin();`
- (2) : `return c.begin();`
- (3) : `return array;`


## 備考
この関数は、範囲`for`文の実装に使用される。


## 例
```cpp example
#include <iostream>
#include <vector>
#include <iterator>
#include <algorithm>

void print(int x)
{
  std::cout << x << " ";
}

int main()
{
  // コンテナ
  {
    std::vector<int> v = {1, 2, 3};

    decltype(v)::iterator first = std::begin(v);
    decltype(v)::iterator last = std::end(v);

    std::for_each(first, last, print);
  }
  std::cout << std::endl;

  // 組み込み配列
  {
    int ar[] = {4, 5, 6};

    int* first = std::begin(ar);
    int* last = std::end(ar);

    std::for_each(first, last, print);
  }
}
```
* std::begin[color ff0000]

### 出力
```
1 2 3 
4 5 6 
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [N2930 Range-Based For Loop Wording (Without Concepts)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2009/n2930.html)
- [boost::begin() - Boost Range Library](http://www.boost.org/doc/libs/release/libs/range/doc/html/range/reference/concept_implementation/semantics/functions.html)
- [LWG2280 - begin/end for arrays should be constexpr and noexcept](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-active.html#2280)
- [P0031R0 A Proposal to Add Constexpr Modifiers to `reverse_iterator`, `move_iterator`, `array` and Range Access](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0031r0.html)
