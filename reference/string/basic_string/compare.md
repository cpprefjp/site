# compare
* string[meta header]
* std[meta namespace]
* basic_string[meta class]
* function[meta id-type]

```cpp
int compare(const basic_string& str) const;          // (1) C++03
int compare(const basic_string& str) const noexcept; // (1) C++11
constexpr int
  compare(const basic_string& str) const noexcept;   // (1) C++20

int
  compare(size_type pos1,
          size_type n1,
          const basic_string& str) const; // (2) C++03
constexpr int
  compare(size_type pos1,
          size_type n1,
          const basic_string& str) const; // (2) C++20

int
  compare(size_type pos1,
          size_type n1,
          const basic_string& str,
          size_type pos2,
          size_type n2) const;        // (3) C++03
int
  compare(size_type pos1,
          size_type n1,
          const basic_string& str,
          size_type pos2,
          size_type n2 = npos) const; // (3) C++14
constexpr int
  compare(size_type pos1,
          size_type n1,
          const basic_string& str,
          size_type pos2,
          size_type n2 = npos) const; // (3) C++20

int compare(const charT* s) const;           // (4) C++03
constexpr int compare(const charT* s) const; // (4) C++20

int
  compare(size_type pos1,
          size_type n1,
          const charT* s) const; // (5) C++03
constexpr int
  compare(size_type pos1,
          size_type n1,
          const charT* s) const; // (5) C++20

int
  compare(size_type pos1,
          size_type n1,
          const charT* s,
          size_type n2) const; // (6) C++03
constexpr int
  compare(size_type pos1,
          size_type n1,
          const charT* s,
          size_type n2) const; // (6) C++20

// string_viewを引数に取るオーバーロード
template<class T>
int
  compare(const T& t) const noexcept(下記参照); // (7) C++17
template<class T>
constexpr int
  compare(const T& t) const noexcept(下記参照); // (7) C++20

template<class T>
int
  compare(size_type pos1,
          size_type n1,
          const T& t) const; // (8) C++17
template<class T>
constexpr int
  compare(size_type pos1,
          size_type n1,
          const T& t) const; // (8) C++20

template<class T>
int
  compare(size_type pos1,
          size_type n1,
          const T& t,
          size_type pos2,
          size_type n2 = npos) const; // (9) C++17
template<class T>
constexpr int
  compare(size_type pos1,
          size_type n1,
          const T& t,
          size_type pos2,
          size_type n2 = npos) const; // (9) C++20
```

## 概要
他の文字列との比較を行う。

## テンプレートパラメータ制約

- (7)(8)(9) : 以下の両方を満たしていること
    - [`is_convertible_v`](/reference/type_traits/is_convertible.md)`<const T&, `[`basic_string_view`](/reference/string_view/basic_string_view.md)`<charT, traits>> == true`
    - [`is_convertible_v`](/reference/type_traits/is_convertible.md)`<const T&, const charT*> == false`

## 効果
- (1) 自身の文字列長とパラメータ`str`の文字列長のうち、小さい長さを`rlen`とし、[`traits::compare`](/reference/string/char_traits/compare.md)`(`[`data()`](data.md)`, str.`[`data()`](data.md)`, rlen)`を呼び出す。
- (7) 自身の文字列長とパラメータ`sv`の文字列長のうち、小さい長さを`rlen`とし、[`traits::compare`](/reference/string/char_traits/compare.md)`(`[`data()`](data.md)`, sv.`[`data()`](/reference/string_view/basic_string_view/data.md)`, rlen)`を呼び出す。


## 戻り値
- (1) 比較結果が非`0`を返した場合は、比較結果をそのまま返す。そうでなければ、以下の条件に従って戻り値を返す：

	| 条件                                                   | 戻り値                |
	|--------------------------------------------------------|-----------------------|
	| [`size()`](size.md) `<` `str.`[`size()`](size.md)  | `0`未満の値を返す     |
	| [`size()`](size.md) `==` `str.`[`size()`](size.md) | `0`を返す             |
	| [`size()`](size.md) `>` `str.`[`size()`](size.md)  | `0`より大きい値を返す |

- (2) `basic_string(*this, pos1, n1).compare(str)` と等価
- (3) `basic_string(*this, pos1, n1).compare(basic_string(str, pos2, n2))` と等価
- (4) `compare(basic_string(s))` と等価
- (5) `basic_string(*this, pos, n1).compare(basic_string(s))` と等価
- (6) `basic_string(*this, pos, n1).compare(basic_string(s, n2))` と等価
- (7) (1)と同様の結果を返す。`return basic_string_view<charT, traits>(*this).`[`compare`](/reference/string_view/basic_string_view/compare.md)`(t);`と等価。
- (8) `basic_string_view<charT, traits>(*this).`[`substr`](/reference/string_view/basic_string_view/substr.md)`(pos1, n1).`[`compare`](/reference/string_view/basic_string_view/compare.md)`(t)` と等価
- (9) 以下と等価。
  ```cpp
  basic_string_view<charT, traits> s = *this, sv = t;
  return s.substr(pos1, n1).compare(sv.substr(pos2, n2));
  ```
  * basic_string_view[link /reference/string_view/basic_string_view.md]
  * substr[link /reference/string_view/basic_string_view/substr.md]
  * compare[link /reference/string_view/basic_string_view/compare.md]

## 例外

- (7) : `noexcept(is_nothrow_convertible_v<const T&, basic_string_view<charT, traits>>)`が指定される

## 例
```cpp example
#include <iostream>
#include <string>

int main()
{
  std::string a = "abc";
  std::string b = "abc";
  std::string c = "ab";

  std::cout << a.compare(b) << std::endl;
  std::cout << a.compare(c) << std::endl;
}
```
* compare[color ff0000]

### 出力例
```
0
1
```

## 参照
- [LWG ISsue 2268. Setting a default argument in the declaration of a member function `assign` of `std::basic_string`](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2268)
    - C++14から(2)のオーバーロードに、`n = npos`のデフォルト引数を追加。
- [P0254R2 Integrating `std::string_view` and `std::string`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0254r2.pdf)
- [LWG Issue 2758. `std::string{}.assign("ABCDE", 0, 1)` is ambiguous](https://wg21.cmeerw.net/lwg/issue2758)
- [LWG Issue 2946. LWG 2758's resolution missed further corrections](https://wg21.cmeerw.net/lwg/issue2946)
    - 意図しない暗黙変換防止のために`string_view`を受けるオーバーロード(7)(8)(9)の引数型を`const T&`に変更
- [P0980R1 Making `std::string` constexpr](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0980r1.pdf)
