# operator== (非メンバ関数)
* regex[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class BiIter>
    bool operator==(const sub_match<BiIter>& lhs, const sub_match<BiIter>& rhs);        // (1)

  template <class BiIter, class ST, class SA>
    bool operator==(
      const basic_string<typename iterator_traits<BiIter>::value_type, ST, SA>& lhs,
      const sub_match<BiIter>& rhs);                                                    // (2)

  template <class BiIter, class ST, class SA>
    bool operator==(
      const sub_match<BiIter>& lhs,
      const basic_string<typename iterator_traits<BiIter>::value_type, ST, SA>& rhs)    // (3)

  template <class BiIter>
    bool operator==(
      const typename iterator_traits<BiIter>::value_type* lhs,
      const sub_match<BiIter>& rhs);                                                    // (4)

  template <class BiIter>
    bool operator==(
      const sub_match<BiIter>& lhs,
      const typename iterator_traits<BiIter>::value_type* rhs);                         // (5)

  template <class BiIter>
    bool operator==(
      const typename iterator_traits<BiIter>::value_type& lhs,
      const sub_match<BiIter>& rhs);                                                    // (6)

  template <class BiIter>
    bool operator==(
      const sub_match<BiIter>& lhs,
      const typename iterator_traits<BiIter>::value_type& rhs);                         // (7)
}
```

## 概要
マッチした文�列を�値比較する。


## 戻り値
- (1) `lhs.`[`compare`](compare.md)`(rhs) == 0`
- (2) `rhs.`[`compare`](compare.md)`(typename` [`sub_match`](../sub_match.md)`<BiIter>::string_type(lhs.`[`data`](../../string/basic_string/data.md)`(), lhs.`[`size`](../../string/basic_string/size.md)`())) == 0`  
	なお、C++11 の規格書では `rhs.`[`compare`](compare.md)`(lhs.`[`c_str`](../../string/basic_string/c_str.md)`()) == 0` となっているが、この式では `lhs` に `'\0'` が含まれていた場合に�しく比較することができないため、規格上の誤りとして上記の式に修�された。
- (3) `lhs.`[`compare`](compare.md)`(typename` [`sub_match`](../sub_match.md)`<BiIter>::string_type(rhs.`[`data`](../../string/basic_string/data.md)`(), rhs.`[`size`](../../string/basic_string/size.md)`())) == 0`  
	なお、C++11 の規格書では `lhs.`[`compare`](compare.md)`(rhs.`[`c_str`](../../string/basic_string/c_str.md)`()) == 0` となっているが、この式では `rhs` に `'\0'` が含まれていた場合に�しく比較することができないため、規格上の誤りとして上記の式に修�された。
- (4) `rhs.`[`compare`](compare.md)`(lhs) == 0`
- (5) `lhs.`[`compare`](compare.md)`(rhs) == 0`
- (6) `rhs.`[`compare`](compare.md)`(typename` [`sub_match`](../sub_match.md)`<BiIter>::string_type(1, lhs)) == 0`
- (7) `lhs.`[`compare`](compare.md)`(typename` [`sub_match`](../sub_match.md)`<BiIter>::string_type(1, rhs)) == 0`

## 備考
- (1) の形式でもマッチした文�列のみが比較され、マッチした位置は考慮されない。（例を参照）
- (2)、および、(3) の形式でも比較に使用する文�特性クラスは標準の [`char_traits`](../../string/char_traits.md)`<value_type>` が使用され、テンプレート引数に指定された文�特性クラス `ST` は考慮されない。


## 例
```cpp example
#include <iostream>
#include <regex>
#include <string>

int main()
{
  const char ca[] = "abc abc";
  const std::regex re(R"((\w+) (\w+))");

  std::cmatch m;
  if (std::regex_search(ca, m, re)) {
    std::csub_match sub1 = m[1];
    std::csub_match sub2 = m[2];
    const std::string s1 = "abc";
    const std::string s2 = "ABC";
    std::cout << std::boolalpha
              << (sub1  == sub2 ) << std::endl  // (1) の形式
              << (s1    == sub2 ) << std::endl  // (2) の形式
              << (sub1  == s2   ) << std::endl  // (3) の形式
              << ("ABC" == sub2 ) << std::endl  // (4) の形式
              << (sub1  == "abc") << std::endl  // (5) の形式
              << ('A'   == sub2 ) << std::endl  // (6) の形式
              << (sub1  == 'a'  ) << std::endl; // (7) の形式
  } else {
    std::cout << "not match" << std::endl;
  }
}
```
* ==[color ff0000]
* std::regex[link ../basic_regex.md]
* std::cmatch[link ../match_results.md]
* std::regex_search[link ../regex_search.md]
* std::csub_match[link ../sub_match.md]

### 出力
```
true
true
false
false
true
false
false
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): -
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6
- [GCC](/implementation.md#gcc): 4.9.0, 4.9.1, 5.0.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
