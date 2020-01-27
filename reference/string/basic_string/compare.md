# compare
* string[meta header]
* std[meta namespace]
* basic_string[meta class]
* function[meta id-type]

```cpp
int compare(const basic_string& str) const noexcept;                  // (1)
int compare(size_type pos1, size_type n1,
            const basic_string& str) const;                           // (2)

int compare(size_type pos1, size_type n1,
            const basic_string& str,
            size_type pos2, size_type n2) const;                      // (3) C++11まで
int compare(size_type pos1, size_type n1,
            const basic_string& str,
            size_type pos2, size_type n2 = npos) const;               // (3) C++14から

int compare(const charT* s) const;                                    // (4)
int compare(size_type pos1, size_type n1,
            const charT* s) const;                                    // (5)
int compare(size_type pos1, size_type n1,
            const charT* s, size_type n2) const;                      // (6)

int compare(std::basic_string_view<charT, traits> sv) const noexcept; // (7) C++17

int compare(size_type pos1,
            size_type n1,
            std::basic_string_view<charT, traits> sv) const;          // (8) C++17

int compare(size_type pos1,
            size_type n1,
            std::basic_string_view<charT, traits> sv,
            size_type pos2,
            size_type n2 = npos) const;                               // (9) C++17
```

## 概要
他の文�列との比較を行う。


## 効果
- (1) 自身の文�列長とパラメータ`str`の文�列長のうち、小さい長さを`rlen`とし、[`traits::compare`](/reference/string/char_traits/compare.md)`(`[`data()`](data.md)`, str.`[`data()`](data.md)`, rlen)`を呼び出す。
- (7) 自身の文�列長とパラメータ`sv`の文�列長のうち、小さい長さを`rlen`とし、[`traits::compare`](/reference/string/char_traits/compare.md)`(`[`data()`](data.md)`, sv.`[`data()`](/reference/string_view/basic_string_view/data.md)`, rlen)`を呼び出す。


## 戻り値
- (1) 比較結果が非`0`を返した場合は、比較結果をそのまま返す。そうでなければ、以下の条件に従って戻り値を返す：

	| 条件                                                   | 戻り値                |
	|--------------------------------------------------------|-----------------------|
	| [`size()`](size.md) `<` `str.`[`size()`](size.md)  | `0`未満の値を返す     |
	| [`size()`](size.md) `==` `str.`[`size()`](size.md) | `0`を返す             |
	| [`size()`](size.md) `>` `str.`[`size()`](size.md)  | `0`より大きい値を返す |

- (2) `basic_string(*this, pos1, n1).compare(str)` と�価
- (3) `basic_string(*this, pos1, n1).compare(basic_string(str, pos2, n2))` と�価
- (4) `compare(basic_string(s))` と�価
- (5) `basic_string(*this, pos, n1).compare(basic_string(s))` と�価
- (6) `basic_string(*this, pos, n1).compare(basic_string(s, n2))` と�価
- (7) (1)と同様の結果を返す。
- (8) `basic_string_view<charT, traits>(`[`this.data()`](data.md)`, pos1, n1).`[`compare`](/reference/string_view/basic_string_view/compare.md)`(sv)` と�価
- (9) `basic_string_view<charT, traits>(`[`this.data()`](data.md)`, pos1, n1).`[`compare`](/reference/string_view/basic_string_view/compare.md)`(sv, pos1, n2)` と�価


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
* compare[link compare.md]

### 出力例
```
0
1
```

## 参照
- [LWG ISsue 2268. Setting a default argument in the declaration of a member function `assign` of `std::basic_string`](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2268)
    - C++14から(2)のオーバー�ードに、`n = npos`のデフォルト引数を追加。
- [P0254R2 Integrating `std::string_view` and `std::string`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0254r2.pdf)
