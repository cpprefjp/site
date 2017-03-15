# includes
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class InputIterator1, class InputIterator2>
  bool includes(InputIterator1 first1, InputIterator1 last1,
                InputIterator2 first2, InputIterator2 last2);

  template <class InputIterator1, class InputIterator2, class Compare>
  bool includes(InputIterator1 first1, InputIterator1 last1,
                InputIterator2 first2, InputIterator2 last2,
                Compare comp);
}
```

## 概要
2つのソート済み範囲において、一方の範囲の要素がもう一方の範囲に全て含まれているかを判定する。


## 戻り値
`[first2,last2)` が `empty` であるか、`[first2,last2)` の全ての要素が `[first1,last1)` に含まれている場合は `true`、そうでない場合は `false` を返す。


## 計算量
最大で `2 * ((last1 - first1) + (last2 - first2)) - 1` 回比較する


## 例
```cpp
#include <iostream>
#include <set>
#include <algorithm>

int main()
{
  std::set<int> a = {1, 2, 3, 4, 5, 6};
  std::set<int> b = {2, 4, 6};
  std::set<int> c = {2, 4, 7};

  std::cout << std::boolalpha;

  std::cout << std::includes(a.begin(), a.end(), b.begin(), b.end()) << std::endl;
  std::cout << std::includes(a.begin(), a.end(), c.begin(), c.end()) << std::endl;
}
```
* std::includes[color ff0000]
* begin()[link /reference/set/set/begin.md]
* end()[link /reference/set/set/end.md]

### 出力
```
true
false
```


## 実装例
```cpp
template <class InputIterator1, class InputIterator2>
bool includes(InputIterator1 first1, InputIterator1 last1,
              InputIterator2 first2, InputIterator2 last2)
{
  for (; first2 != last2; ++first1)
    if (bool(first1 == last1) || bool(*first2 < *first1))
      return false;
    else if (!bool(*first1 < *first2))
      ++first2;
  return true;
}

template <class InputIterator1, class InputIterator2, class Compare>
bool includes(InputIterator1 first1, InputIterator1 last1,
              InputIterator2 first2, InputIterator2 last2,
              Compare comp)
{
  for (; first2 != last2; ++first1)
    if (bool(first1 == last1) || bool(comp(*first2, *first1)))
      return false;
    else if (!bool(comp(*first1, *first2)))
      ++first2;
  return true;
}
```
