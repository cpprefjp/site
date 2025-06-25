# operator<=>
* regex[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class BiIter>
  auto operator<=>(
    const sub_match<BiIter>& lhs,
    const sub_match<BiIter>& rhs);                            // (1) C++20

  template <class BiIter, class ST, class SA>
  auto operator<=>(
    const sub_match<BiIter>& lhs,
    const basic_string<
      typename iterator_traits<BiIter>::value_type,
      ST,
      SA
    >& rhs);                                                  // (2) C++20

  template <class BiIter>
  auto operator<=>(
    const sub_match<BiIter>& lhs,
    const typename iterator_traits<BiIter>::value_type& rhs); // (3) C++20

  template <class BiIter>
  auto operator<=>(
    const sub_match<BiIter>& lhs,
    const typename iterator_traits<BiIter>::value_type* rhs); // (4) C++20
}
```

## 概要
マッチした文字列を等値比較する。


## 戻り値
以下の定義があるとして、

```cpp
SM_CAT(I) = compare_three_way_result_t<basic_string<typename iterator_traits<I>::value_type>>
```

- (1) :
    ```cpp
    return static_cast<SM_CAT(BiIter)>(lhs.compare(rhs) <=> 0);
    ```
    * compare[link compare.md]

- (2) :
    ```cpp
    return static_cast<SM_CAT(BiIter)>(lhs.compare(
      typename sub_match<BiIter>::string_type(rhs.data(), rhs.size())
    ) <=> 0)
    ```
    * compare[link compare.md]
    * data()[link /reference/string/basic_string/data.md]
    * size()[link /reference/string/basic_string/size.md]

- (3) :
    ```cpp
    static_cast<SM_CAT(BiIter)>(lhs.compare(
      typename sub_match<BiIter>::string_type(1, rhs)
    ) <=> 0)
    ```
    * compare[link compare.md]

- (4) :
    ```cpp
    return static_cast<SM_CAT(BiIter)>(lhs.compare(rhs) <=> 0);
    ```
    * compare[link compare.md]


## 備考
- (1) の形式でもマッチした文字列のみが比較され、マッチした位置は考慮されない。（例を参照）
- (2) の形式でも比較に使用する文字特性クラスは標準の [`char_traits`](../../string/char_traits.md)`<value_type>` が使用され、テンプレート引数に指定された文字特性クラス `ST` は考慮されない。
- この演算子により、以下の演算子が使用可能になる：
    - `operator<`
    - `operator<=`
    - `operator>`
    - `operator>=`


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
              << ((sub1  <=> sub2 ) == 0) << std::endl  // (1) の形式
              << ((sub1  <=> s2   ) == 0) << std::endl  // (2) の形式
              << ((sub1  <=> "abc") == 0) << std::endl  // (3) の形式
              << ((sub1  <=> 'a'  ) == 0) << std::endl; // (4) の形式
  } else {
    std::cout << "not match" << std::endl;
  }
}
```
* <=>[color ff0000]
* std::regex[link ../basic_regex.md]
* std::cmatch[link ../match_results.md]
* std::regex_search[link ../regex_search.md]
* std::csub_match[link ../sub_match.md]

### 出力
```
true
false
true
false
```


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 10 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照
- [P1614R2 The Mothership has Landed](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1614r2.html)
    - C++20での三方比較演算子の追加と、関連する演算子の自動導出
