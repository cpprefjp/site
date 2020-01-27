# size
* iterator[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class C>
  constexpr auto size(const C& c) -> decltype(c.size());    // (1)

  template <class T, std::size_t N>
  constexpr std::size_t size(const T (&array)[N]) noexcept; // (2)
}
```

## 概要
コンテナの要素数を取得する。


## 戻り値
- (1) : `return c.size();`
- (2) : `return N;`


## 備考
- [機能テストマク�](../../lang/cpp17/feature_test_macros.md)は`__cpp_lib_nonmember_container_access`で値は`201411`
- `<iterator>`ヘッダを�み込む以外では、以下のヘッダが�み込まれている場合に、この関数を使用できる：
     - [`<array>`](../array.md)
     - [`<deque>`](../deque.md)
     - [`<forward_list>`](../forward_list.md)
     - [`<list>`](../list.md)
     - [`<map>`](../map.md)
     - [`<regex>`](../regex.md)
     - [`<set>`](../set.md)
     - [`<string>`](../string.md)
     - [`<string_view>`](../string_view.md) (C++20)
     - [`<unordered_map>`](../unordered_map.md)
     - [`<unordered_set>`](../unordered_set.md)
     - [`<vector>`](../vector.md)


## 例
```cpp example
#include <vector>
#include <iostream>

int main()
{
  int arr[4] = {};
  std::cout << std::size(arr) << std::endl;

  std::cout << std::size(u8"arikitari") << std::endl;

  std::vector<int> v = { 1,1,2,3,5,8 };
  int hoge = 13;
  v.push_back(hoge);
  std::cout << std::size(v) << std::endl;

  //変数vの型はstd名前空間にあるクラス型なので
  //ADLによって `std::`がなくとも発見できる
  std::cout << size(v) << std::endl;
}
```
* std::size[color ff0000]
* size[color ff0000]

### 出力
```
4
10
7
7
```

## 詳細
これまで[`_countof`](https://docs.microsoft.com/en-us/cpp/c-runtime-library/reference/countof-macro)や`numof`, `arraySizeOf`, `ARRAY_SIZE`, `ARRAY_LENGTH`�の名前で配列の要素数を求めるために、概�次のようなマク�が利用されてきた。

```cpp
#define COUNTOF(array) (sizeof(array) / sizeof(array[0]))
```

`std::size()`はこれを置き換えるものである。


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 3.6
- [GCC](/implementation.md#gcc): 6.1
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2015


## 参照
- [`boost::size()` - Boost Range Library](http://www.boost.org/doc/libs/release/libs/range/doc/html/range/reference/concept_implementation/semantics/functions.html)
- [N4280: Non-member `size()` and more (Revision 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4280.pdf)
- [LWG Issue 3009. Including `<string_view>` doesn't provide `std::size/empty/data`](https://wg21.cmeerw.net/lwg/issue3009)
