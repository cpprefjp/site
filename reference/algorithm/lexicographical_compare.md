# lexicographical_compare
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class InputIterator1, class InputIterator2>
  bool lexicographical_compare(InputIterator1 first1, InputIterator1 last1,
                               InputIterator2 first2, InputIterator2 last2);

  template <class InputIterator1, class InputIterator2, class Compare>
  bool lexicographical_compare(InputIterator1 first1, InputIterator1 last1,
                               InputIterator2 first2, InputIterator2 last2,
                               Compare comp);
}
```

## 概要
`[first1, last1)`および`[first2, last2)`の2つの範囲を辞書式順序で比較する。
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
範囲`[first1, last1)`が、辞書式比較で範囲`[first2, last2)`より小さい場合`true`を返し、そうでなければ`false`を返す。


## 計算量
高々`2*min((last1 - first1), (last2 - first2))`回の比較が行われる。


## 備考
空のシーケンスは、空じゃないシーケンスより小さいと判断されるが、空のシーケンスに対しては小さくないと判断される。

どちらかのシーケンスの横断が先に終わる場合(つまり、範囲の長さが合わない場合)、先に終わった方が小さいと判断される。


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


