# data
* iterator[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class C>
  constexpr
    auto data(C& c)
      -> decltype(c.data());       // (1) C++17
  template <class C>
  constexpr auto data(C& c)
    noexcept(noexcept(c.data()))
    -> decltype(c.data());         // (1) C++26

  template <class C>
  constexpr auto
    data(const C& c)
      -> decltype(c.data());       // (2) C++17
  template <class C>
  constexpr auto data(const C& c)
    noexcept(noexcept(c.data()))
    -> decltype(c.data());         // (2) C++26

  template <class T, std::size_t N>
  constexpr T*
    data(T (&array)[N]) noexcept;  // (3) C++17

  template <class E>
  constexpr const E*
    data(initializer_list<E> il) noexcept;  // (4) C++17、C++26で削除
}
```
* initializer_list[link /reference/initializer_list/initializer_list.md]

(4)はC++26で削除された。[`std::initializer_list`](/reference/initializer_list/initializer_list.md)に、メンバ関数版の[`data()`](/reference/initializer_list/initializer_list/data.md)が追加されたため、このオーバーフローは不要になった。使い方としてはこれまで通りに使用できる。

## 概要
コンテナの要素が格納されたメモリ領域へのポインタを取得する。


## 戻り値
- (1), (2) : `return c.data();`
- (3) : `return array;`
- (4) : `return il.begin();`


## 備考
- [機能テストマクロ](../../lang/cpp17/feature_test_macros.md)は`__cpp_lib_nonmember_container_access`で値は`201411`
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
#include <vector>
#include <iostream>

void some_c_like_api_function(const int* arr, std::size_t arr_size)
{
  std::cout << "array size:" << arr_size << " at " << static_cast<const void*>(arr) << std::endl;
}

int main()
{
  int arr[4] = {};
  some_c_like_api_function(std::data(arr), std::size(arr));
  std::vector<int> v { 12 };
  some_c_like_api_function(std::data(v), std::size(v));
}
```
* std::data[color ff0000]
* std::size[link size.md]

### 出力例
```
array size:4 at 0x7fff0833f980
array size:1 at 0x22e42b0
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 3.6 [mark verified]
- [GCC](/implementation.md#gcc): 6.1 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2015 [mark verified]


## 参照
- [N4280: Non-member `data()` and more (Revision 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4280.pdf)
- [LWG Issue 3009. Including `<string_view>` doesn't provide `std::size/empty/data`](https://wg21.cmeerw.net/lwg/issue3009)
- [P3016R6 Resolve inconsistencies in `begin`/`end` for `valarray` and `braced-initializer-list`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3016r6.html)
- [LWG Issue 4385. Including `<simd>` doesn't provide `std::begin/end`](https://cplusplus.github.io/LWG/issue4385)
    - この関数テンプレートが利用可能になるヘッダの一覧に[`<simd>`](/reference/simd.md)が追加された。規格としてはC++29のワーキングドラフトへ適用されたが、[`<simd>`](/reference/simd.md)が追加されたC++26で記載が漏れていたものであるため、C++26へ遡及して適用される
