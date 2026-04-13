# lexicographical_compare
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class InputIterator1, class InputIterator2>
  bool lexicographical_compare(
         InputIterator1 first1,
         InputIterator1 last1,
         InputIterator2 first2,
         InputIterator2 last2);   // (1) C++03

  template <class InputIterator1, class InputIterator2>
  constexpr bool lexicographical_compare(
         InputIterator1 first1,
         InputIterator1 last1,
         InputIterator2 first2,
         InputIterator2 last2);   // (1) C++20

  template <class InputIterator1, class InputIterator2, class Compare>
  bool lexicographical_compare(
         InputIterator1 first1,
         InputIterator1 last1,
         InputIterator2 first2,
         InputIterator2 last2,
         Compare comp);           // (2) C++03

  template <class InputIterator1, class InputIterator2, class Compare>
  constexpr bool lexicographical_compare(
         InputIterator1 first1,
         InputIterator1 last1,
         InputIterator2 first2,
         InputIterator2 last2,
         Compare comp);           // (2) C++20

  template <class ExecutionPolicy, class ForwardIterator1, class ForwardIterator2>
  bool lexicographical_compare(
         ExecutionPolicy&& exec,
         ForwardIterator1 first1,
         ForwardIterator1 last1,
         ForwardIterator2 first2,
         ForwardIterator2 last2); // (3) C++17

  template <class ExecutionPolicy, class ForwardIterator1, class ForwardIterator2,
            class Compare>
  bool lexicographical_compare(
         ExecutionPolicy&& exec,
         ForwardIterator1 first1,
         ForwardIterator1 last1,
         ForwardIterator2 first2,
         ForwardIterator2 last2,
         Compare comp);           // (4) C++17
}
```

## 概要
2つのイテレータ範囲`[first1, last1)`と`[first2, last2)`を辞書式順序で比較する。

このアルゴリズムは、コンテナの`operator<()`の実装で使用される。


## 効果
```cpp
for ( ; first1 != last1 && first2 != last2 ; ++first1, ++first2) {
  if (*first1 < *first2) return true;
  if (*first2 < *first1) return false;
}
return first1 == last1 && first2 != last2;
```


## 戻り値
イテレータ範囲`[first1, last1)`が、辞書式比較でイテレータ範囲`[first2, last2)`より小さい場合`true`を返し、そうでなければ`false`を返す。


## 計算量
高々`2*min((last1 - first1), (last2 - first2))`回の比較が行われる。


## 備考
空のシーケンスは、空でないシーケンスより小さいと判断されるが、空のシーケンスに対しては小さくないと判断される。

どちらかのシーケンスの横断が先に終わる場合(つまり、イテレータ範囲の長さが合わない場合)、先に終わった方が小さいと判断される。


## 例
```cpp example
#include <iostream>
#include <string>
#include <algorithm>

template <class X, class Y>
void compare_test(const X& x, const Y& y)
{
  if (std::lexicographical_compare(x.begin(), x.end(), y.begin(), y.end())) {
    std::cout << "x less than y" << std::endl;
  }
  else {
    std::cout << "x not less than y" << std::endl;
  }

  // 比較演算のカスタマイズバージョン
  if (std::lexicographical_compare(x.begin(), x.end(),
                                   y.begin(), y.end(), std::greater<char>())) {
    std::cout << "x less than y" << std::endl;
  }
  else {
    std::cout << "x not less than y" << std::endl;
  }
}

int main()
{
  // 同じ長さの文字列比較
  {
    std::string x = "heilo";
    std::string y = "hello";

    std::cout << "same length string compare:" << std::endl;
    compare_test(x, y);
  }
  std::cout << std::endl;

  // 異なる長さの文字列比較
  {
    std::string x = "hell";
    std::string y = "hello";

    std::cout << "not same length string compare:" << std::endl;
    compare_test(x, y);
  }
}
```
* std::lexicographical_compare[color ff0000]
* begin()[link /reference/string/basic_string/begin.md]
* end()[link /reference/string/basic_string/end.md]
* std::greater[link /reference/functional/greater.md]

### 出力
```
same length string compare:
x less than y
x not less than y

not same length string compare:
x less than y
x less than y
```


## 実装例
```cpp
template <class InputIterator1, class InputIterator2>
bool lexicographical_compare(InputIterator1 first1, InputIterator1 last1,
                             InputIterator2 first2, InputIterator2 last2)
{
  for (; first1 != last1 && first2 != last2; ++first1, ++first2) {
    if (*first1 < *first2)
      return true;
    if (*first2 < *first1)
      return false;
  }
  return first1 == last1 && first2 != last2;
}

template <class InputIterator1, class InputIterator2, class Compare>
bool lexicographical_compare(InputIterator1 first1, InputIterator1 last1,
                             InputIterator2 first2, InputIterator2 last2,
                             Compare comp)
{
  for (; first1 != last1 && first2 != last2; ++first1, ++first2) {
    if (comp(*first1, *first2))
      return true;
    if (comp(*first2, *first1))
      return false;
  }
  return first1 == last1 && first2 != last2;
}
```


## 関連項目
- [`ranges::lexicographical_compare`](/reference/algorithm/ranges_lexicographical_compare.md)


## 参照
- [P0202R3 Add Constexpr Modifiers to Functions in `<algorithm>` and `<utility>` Headers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0202r3.html)
- [P0467R2 Iterator Concerns for Parallel Algorithms](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0467r2.html)
