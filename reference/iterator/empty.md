# empty
* iterator[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class C>
  constexpr auto empty(const C& c) -> decltype(c.empty());                   // (1) C++17

  template <class C>
  [[nodiscard]] constexpr auto empty(const C& c) -> decltype(c.empty());     // (1) C++20

  template <class T, size_t N>
  constexpr std::size_t empty(const T (&array)[N]) noexcept;                 // (2) C++17

  template <class T, size_t N>
  [[nodiscard]] constexpr std::size_t empty(const T (&array)[N]) noexcept;   // (2) C++20

  template <class E>
  constexpr bool empty(initializer_list<E> il) noexcept;                     // (3) C++17

  template <class E>
  [[nodiscard]] constexpr bool empty(initializer_list<E> il) noexcept;       // (3) C++20
}
```
* initializer_list[link /reference/initializer_list.md]

## 概要
コンテナが空かを返す


## 戻り値
- (1) : `return c.empty();`
- (2) : `return false;`
- (3) : `return il.size() == 0;`


## 備考
[機能テストマクロ](../../lang/cpp17/feature_test_macros.md)は`__cpp_lib_nonmember_container_access`で値は`201411`

`<iterator>`ヘッダを読み込む以外では、[`<array>`](../array.md), [`<deque>`](../deque.md), [`<forward_list>`](../forward_list.md), [`<list>`](../list.md), [`<map>`](../map.md), [`<regex>`](../regex.md), [`<set>`](../set.md), [`<string>`](../string.md), [`<unordered_map>`](../unordered_map.md), [`<unordered_set>`](../unordered_set.md), [`<vector>`](../vector.md)のヘッダが読み込まれている時、`std::empty`は有効であることが保証されている


## 例
```cpp example
#include <vector>
#include <iostream>
#include <iterator>

int main()
{
  int arr[4] = {};
  std::cout << std::boolalpha << std::empty(arr) << std::endl;

  std::cout << std::boolalpha << std::empty(u8"arikitari") << std::endl;

  std::vector<int> v;
  std::cout << std::boolalpha << std::empty(v) << std::endl;
  v.push_back(13);
  std::cout << std::boolalpha << std::empty(v) << std::endl;
  //変数vの型はstd名前空間にあるクラス型なので
  //ADLの影響で `std::`がなくとも発見できてしまう
  std::cout << std::boolalpha << empty(v) << std::endl;
}
```
* std::empty[color ff0000]
* empty[color ff0000]

### 出力
```
false
false
true
false
false
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 3.6
- [GCC](/implementation.md#gcc): 6.1
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 14.0


## 参照
- [`boost::empty()` - Boost Range Library](http://www.boost.org/doc/libs/release/libs/range/doc/html/range/reference/concept_implementation/semantics/functions.html)
- [N4280: Non-member `empty()` and more (Revision 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4280.pdf)
- [P0600R1: `[[nodiscard]]` in the library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0600r1.pdf)
