# crend
* iterator[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp14[meta cpp]

```cpp
namespace std {
  template <class C>
  auto
    crend(const C& c)
      -> decltype(std::rend(c));         // (1) C++14
  template <class C>
  constexpr auto
    crend(const C& c)
      noexcept(noexcept(std::rend(c)))
      -> decltype(std::rend(c));         // (1) C++26
}
```
* std::rend[link rend.md]

## 概要
範囲の先頭の前を指す、読み取り専用逆イテレータを取得する。


## 戻り値
```cpp
std::rend(c);
```
* std::rend[link rend.md]


## 備考
- `<iterator>`ヘッダを読み込む以外では、以下のヘッダが読み込まれている場合に、この関数を使用できる：
    - [`<array>`](/reference/array.md)
    - [`<deque>`](/reference/deque.md)
    - [`<flat_map>`](/reference/flat_map.md) (C++26)
    - [`<flat_set>`](/reference/flat_set.md) (C++26)
    - [`<forward_list>`](/reference/forward_list.md)
    - [`<hive>`](/reference/hive.md) (C++26)
    - [`<inplace_vector>`](/reference/inplace_vector.md) (C++26)
    - [`<list>`](/reference/list.md)
    - [`<map>`](/reference/map.md)
    - [`<regex>`](/reference/regex.md)
    - [`<set>`](/reference/set.md)
    - [`<simd>`](/reference/simd.md) (C++29)
    - [`<span>`](/reference/span.md) (C++20)
    - [`<string>`](/reference/string.md)
    - [`<string_view>`](/reference/string_view.md) (C++20)
    - [`<unordered_map>`](/reference/unordered_map.md)
    - [`<unordered_set>`](/reference/unordered_set.md)
    - [`<vector>`](/reference/vector.md)


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

    decltype(v)::const_reverse_iterator first = std::crbegin(v);
    decltype(v)::const_reverse_iterator last = std::crend(v);

    std::for_each(first, last, print);
  }
  std::cout << std::endl;

  // 組み込み配列
  {
    int ar[] = {4, 5, 6};

    std::reverse_iterator<const int*> first = std::crbegin(ar);
    std::reverse_iterator<const int*> last = std::crend(ar);

    std::for_each(first, last, print);
  }
  std::cout << std::endl;

  // 初期化子リスト
  {
    std::initializer_list<int> init = {7, 8, 9};

    std::reverse_iterator<const int*> first = std::crbegin(init);
    std::reverse_iterator<const int*> last = std::crend(init);

    std::for_each(first, last, print);
  }
}
```
* std::crend[color ff0000]
* std::crbegin[link crbegin.md]
* std::reverse_iterator[link reverse_iterator.md]

### 出力
```
3 2 1 
6 5 4 
9 8 7 
```

## バージョン
### 言語
- C++14

### 処理系
- [Clang](/implementation.md#clang): 3.4 [mark verified]
- [GCC](/implementation.md#gcc): 5.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [LWG Issue 2128. Absence of global functions `cbegin`/`cend`](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2128)
- [P3016R6 Resolve inconsistencies in `begin`/`end` for `valarray` and `braced-initializer-list`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3016r6.html)
- [LWG Issue 4385. Including `<simd>` doesn't provide `std::begin/end`](https://cplusplus.github.io/LWG/issue4385)
    - この関数テンプレートが利用可能になるヘッダの一覧に[`<simd>`](/reference/simd.md)が追加された。規格としてはC++29のワーキングドラフトへ適用されたが、[`<simd>`](/reference/simd.md)が追加されたC++26で記載が漏れていたものであるため、C++26へ遡及して適用される
