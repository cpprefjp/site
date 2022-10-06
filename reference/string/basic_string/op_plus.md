# operator+
* string[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class charT, class traits, class Allocator>
  basic_string<charT, traits, Allocator>
    operator+(const basic_string<charT, traits, Allocator>& lhs,
              const basic_string<charT, traits, Allocator>& rhs); // (1) C++03
  template <class charT, class traits, class Allocator>
  constexpr basic_string<charT, traits, Allocator>
    operator+(const basic_string<charT, traits, Allocator>& lhs,
              const basic_string<charT, traits, Allocator>& rhs); // (1) C++20


  template <class charT, class traits, class Allocator>
  basic_string<charT, traits, Allocator>
    operator+(basic_string<charT, traits, Allocator>&& lhs,
              const basic_string<charT, traits, Allocator>& rhs); // (2) C++11
  template <class charT, class traits, class Allocator>
  constexpr basic_string<charT, traits, Allocator>
    operator+(basic_string<charT, traits, Allocator>&& lhs,
              const basic_string<charT, traits, Allocator>& rhs); // (2) C++20

  template <class charT, class traits, class Allocator>
  basic_string<charT, traits, Allocator>
    operator+(const basic_string<charT, traits, Allocator>& lhs,
              basic_string<charT, traits, Allocator>&& rhs);      // (3) C++11
  template <class charT, class traits, class Allocator>
  constexpr basic_string<charT, traits, Allocator>
    operator+(const basic_string<charT, traits, Allocator>& lhs,
              basic_string<charT, traits, Allocator>&& rhs);      // (3) C++20

  template <class charT, class traits, class Allocator>
  basic_string<charT, traits, Allocator>
    operator+(basic_string<charT, traits, Allocator>&& lhs,
              basic_string<charT, traits, Allocator>&& rhs);      // (4) C++11
  template <class charT, class traits, class Allocator>
  constexpr basic_string<charT, traits, Allocator>
    operator+(basic_string<charT, traits, Allocator>&& lhs,
              basic_string<charT, traits, Allocator>&& rhs);      // (4) C++20

  template <class charT, class traits, class Allocator>
  basic_string<charT, traits, Allocator>
    operator+(const charT* lhs,
              const basic_string<charT, traits, Allocator>& rhs); // (5) C++03
  template <class charT, class traits, class Allocator>
  constexpr basic_string<charT, traits, Allocator>
    operator+(const charT* lhs,
              const basic_string<charT, traits, Allocator>& rhs); // (5) C++20

  template <class charT, class traits, class Allocator>
  basic_string<charT, traits, Allocator>
    operator+(const charT* lhs,
              basic_string<charT, traits, Allocator>&& rhs);      // (6) C++11
  template <class charT, class traits, class Allocator>
  constexpr basic_string<charT, traits, Allocator>
    operator+(const charT* lhs,
              basic_string<charT, traits, Allocator>&& rhs);      // (6) C++20

  template <class charT, class traits, class Allocator>
  basic_string<charT, traits, Allocator>
    operator+(charT lhs,
              const basic_string<charT, traits, Allocator>& rhs); // (7) C++03
  template <class charT, class traits, class Allocator>
  constexpr basic_string<charT, traits, Allocator>
    operator+(charT lhs,
              const basic_string<charT, traits, Allocator>& rhs); // (7) C++20

  template <class charT, class traits, class Allocator>
  basic_string<charT, traits, Allocator>
    operator+(charT lhs,
              basic_string<charT, traits, Allocator>&& rhs);      // (8) C++11
  template <class charT, class traits, class Allocator>
  constexpr basic_string<charT, traits, Allocator>
    operator+(charT lhs,
              basic_string<charT, traits, Allocator>&& rhs);      // (8) C++20

  template <class charT, class traits, class Allocator>
  basic_string<charT, traits, Allocator>
    operator+(const basic_string<charT, traits, Allocator>& lhs,
              const charT* rhs);                                  // (9) C++03
  template <class charT, class traits, class Allocator>
  constexpr basic_string<charT, traits, Allocator>
    operator+(const basic_string<charT, traits, Allocator>& lhs,
              const charT* rhs);                                  // (9) C++20

  template <class charT, class traits, class Allocator>
  basic_string<charT, traits, Allocator>
    operator+(basic_string<charT, traits, Allocator>&& lhs,
              const charT* rhs);                                  // (10) C++11
  template <class charT, class traits, class Allocator>
  constexpr basic_string<charT, traits, Allocator>
    operator+(basic_string<charT, traits, Allocator>&& lhs,
              const charT* rhs);                                  // (10) C++20

  template <class charT, class traits, class Allocator>
  basic_string<charT, traits, Allocator>
    operator+(const basic_string<charT, traits, Allocator>& lhs,
              charT rhs);                                         // (11) C++03
  template <class charT, class traits, class Allocator>
  constexpr basic_string<charT, traits, Allocator>
    operator+(const basic_string<charT, traits, Allocator>& lhs,
              charT rhs);                                         // (11) C++20

  template <class charT, class traits, class Allocator>
  basic_string<charT, traits, Allocator>
    operator+(basic_string<charT, traits, Allocator>&& lhs,
              charT rhs);                                         // (12) C++11
  template <class charT, class traits, class Allocator>
  constexpr basic_string<charT, traits, Allocator>
    operator+(basic_string<charT, traits, Allocator>&& lhs,
              charT rhs);                                         // (12) C++20
}
```

## 概要
`basic_string` オブジェクトの連結を行う。


## 戻り値

### C++17まで

- (1) [`basic_string`](op_constructor.md)`<charT, traits, Allocator>(lhs).`[`append`](append.md)`(rhs)`

- (2) `std::`[`move`](/reference/utility/move.md)`(lhs.`[`append`](append.md)`(rhs))`

- (3) `std::`[`move`](/reference/utility/move.md)`(rhs.`[`insert`](insert.md)`(0, lhs))`

- (4) `std::`[`move`](/reference/utility/move.md)`(lhs.`[`append`](append.md)`(rhs))`  
	(`std::`[`move`](/reference/utility/move.md)`(rhs.`[`insert`](insert.md)`(0, lhs))` とも等価)

- (5) [`basic_string`](op_constructor.md)`<charT, traits, Allocator>(lhs) + rhs`  

- (6) `std::`[`move`](/reference/utility/move.md)`(rhs.`[`insert`](insert.md)`(0, lhs))`  

- (7) [`basic_string`](op_constructor.md)`<charT, traits, Allocator>(1, lhs) + rhs`

- (8) `std::`[`move`](/reference/utility/move.md)`(rhs.`[`insert`](insert.md)`(0, 1, lhs))`

- (9) `lhs +` [`basic_string`](op_constructor.md)`<charT, traits, Allocator>(rhs)`  

- (10) `std::`[`move`](/reference/utility/move.md)`(lhs.`[`append`](append.md)`(rhs))`  

- (11) `lhs +` [`basic_string`](op_constructor.md)`<charT, traits, Allocator>(1, rhs)`

- (12) `std::`[`move`](/reference/utility/move.md)`(lhs.`[`append`](append.md)`(1, rhs))`

### C++20から

- (1)(9) : 以下と等価
  ```cpp
  basic_string<charT, traits, Allocator> r = lhs;
  r.append(rhs);
  return r;
  ```
  * append[link append.md]

- (2)(10) : 以下と等価
  ```cpp
  lhs.append(rhs);
  return std::move(lhs);
  ```
  * append[link append.md]

- (3)(6) : 以下と等価
  ```cpp
  rhs.insert(0, lhs);
  return std::move(rhs);
  ```
  * insert[link insert.md]

- (4) : 呼び出しの後でも`lhs`と`rhs`は有効だが未規定な状態のままであることを除いて、以下と等価
  ```cpp
  lhs.append(rhs);
  return std::move(lhs);
  ```
  * append[link append.md]

- (5) : 以下と等価
  ```cpp
  basic_string<charT, traits, Allocator> r = rhs;
  r.insert(0, lhs);
  return r;
  ```
  * insert[link insert.md]

- (7) : 以下と等価
  ```cpp
  basic_string<charT, traits, Allocator> r = rhs;
  r.insert(r.begin(), lhs);
  return r;
  ```
  * insert[link insert.md]
  * begin[link begin.md]

- (8) : 以下と等価
  ```cpp
  rhs.insert(rhs.begin(), lhs);
  return std::move(rhs);
  ```
  * insert[link insert.md]
  * begin[link begin.md]

- (11) : 以下と等価
  ```cpp
  basic_string<charT, traits, Allocator> r = lhs;
  r.push_back(rhs);
  return r;
  ```
  * push_back[link push_back.md]

- (12) : 以下と等価
  ```cpp
  lhs.push_back(rhs);
  return std::move(lhs);
  ```
  * push_back[link push_back.md]


## 備考
(5)、(6) の形式の `lhs`、および、(9)、(10) の形式の `rhs` の文字列長算出のために `traits::length()` が使用される

## アロケータの伝播

C++20からこの演算子による文字列連結時にアロケータがどのように伝播するかが変更された。C++17までの仕様及び各実装とC++20からの各オーバーロード利用時の結果オブジェクトへのアロケータ供給元は次のようになる。なお、SOCCCは[`select_on_container_copy_construction`](/reference/memory/allocator_traits/select_on_container_copy_construction.md)の略。

|オーバーロード|C++17まで|GCC|clang|MSVC|C++20から|
|----|----|----|----|----|----|
|(1) : `lhs + rhs`|`lhs`からのSOCCC|`lhs`からのSOCCC|`lhs`|新規にデフォルト構築|`lhs`からのSOCCC|
|(2) : `std::move(lhs) + rhs`|`lhs`|`lhs`|`lhs`|`lhs`|`lhs`|
|(3) : `lhs + std::move(rhs)`|`rhs`|`rhs`|`rhs`|`rhs`|`rhs`|
|(4) : `std::move(lhs) + std::move(rhs)`|`lhs`または`rhs`|`lhs`|`lhs`|`lhs`|`lhs`|
|(5) : `"lhs" + rhs`|新規にデフォルト構築|新規にデフォルト構築|`rhs`|新規にデフォルト構築|`lhs`からのSOCCC|
|(6) : `"lhs" + std::move(rhs)`|`rhs`|`rhs`|`rhs`|`rhs`|`rhs`|
|(7) : `'l' + rhs`|新規にデフォルト構築|新規にデフォルト構築|`rhs`|新規にデフォルト構築|`lhs`からのSOCCC|
|(8) : `'l' + std::move(rhs)`|`rhs`|`rhs`|`rhs`|`rhs`|`rhs`|
|(9) : `lhs + "rhs"`|新規にデフォルト構築|`lhs`からのSOCCC|`lhs`|新規にデフォルト構築|`lhs`からのSOCCC|
|(10) : `std::move(lhs) + "rhs"`|`lhs`|`lhs`|`lhs`|`lhs`|`lhs`|
|(11) : `lhs + 'r'`|新規にデフォルト構築|`lhs`からのSOCCC|`lhs`|新規にデフォルト構築|`lhs`からのSOCCC|
|(12) : `std::move(lhs) + 'r'`|`lhs`|`lhs`|`lhs`|`lhs`|`lhs`|


表にあるように、C++17までの仕様に完全に準拠している実装は無かった上に各実装によって伝播仕様がバラバラだったため、この変更によって影響を受けるコードはほぼ無いと思われる。

## 例
```cpp example
#include <iostream>
#include <string>

int main()
{
  std::string s1("Hell");
  std::string s2("world");

  std::string s3 = s1 + 'o' + ", " + s2 + '!';

  std::cout << s3 << '\n';
}
```
* +[color ff0000]

### 出力
```
Hello, world!
```

## 関連項目

| 名前                          | 説明                   |
|-------------------------------|------------------------|
| [`append`](append.md)       | 文字／文字列を追加する |
| [`push_back`](push_back.md) | 文字を追加する         |
| [`insert`](insert.md)       | 文字／文字列を挿入する |

## 参照
- [P1165R1 Make stateful allocator propagation more consistent for operator+(basic_string)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p1165r1.html)
- [P0980R1 Making `std::string` constexpr](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0980r1.pdf)
