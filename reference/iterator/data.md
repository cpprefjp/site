# data
* iterator[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class C>
  constexpr auto data(C& c) -> decltype(c.data());          // (1) C++17

  template <class C>
  constexpr auto data(const C& c) -> decltype(c.data());    // (2) C++17

  template <class T, std::size_t N>
  constexpr T* data(T (&array)[N]) noexcept;                // (3) C++17

  template <class E>
  constexpr const E* data(initializer_list<E> il) noexcept; // (4) C++17
}
```
* initializer_list[link /reference/initializer_list.md]

## 概要
コンテナの要素が格納されたメモリ領域へのポインタを返す


## 戻り値
- (1), (2) : `return c.data();`
- (3) : `return array;`
- (4) : `return il.begin();`


## 備考
- [機能テストマクロ](../../lang/cpp17/feature_test_macros.md)は`__cpp_lib_nonmember_container_access`で値は`201411`
- `<iterator>`ヘッダを読み込む以外では、以下のヘッダが読み込まれている場合に、この関数を使用できる：
     - [`<array>`](../array.md)
     - [`<deque>`](../deque.md)
     - [`<forward_list>`](../forward_list.md)
     - [`<list>`](../list.md)
     - [`<map>`](../map.md)
     - [`<regex>`](../regex.md)
     - [`<set>`](../set.md)
     - [`<string>`](../string.md)
     - [`<unordered_map>`](../unordered_map.md)
     - [`<unordered_set>`](../unordered_set.md)
     - [`<vector>`](../vector.md)


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
- [Visual C++](/implementation.md#visual_cpp): 2015


## 参照
- [N4280: Non-member `data()` and more (Revision 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4280.pdf)
