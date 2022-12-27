# includes
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class InputIterator1, class InputIterator2>
  bool includes(InputIterator1 first1,
                InputIterator1 last1,
                InputIterator2 first2,
                InputIterator2 last2);           // (1) C++03

  template <class InputIterator1, class InputIterator2>
  constexpr bool includes(InputIterator1 first1,
                          InputIterator1 last1,
                          InputIterator2 first2,
                          InputIterator2 last2); // (1) C++20

  template <class InputIterator1, class InputIterator2, class Compare>
  bool includes(InputIterator1 first1,
                InputIterator1 last1,
                InputIterator2 first2,
                InputIterator2 last2,
                Compare comp);                   // (2) C++03

  template <class InputIterator1, class InputIterator2, class Compare>
  constexpr bool includes(InputIterator1 first1,
                          InputIterator1 last1,
                          InputIterator2 first2,
                          InputIterator2 last2,
                          Compare comp);         // (2) C++20

  template <class ExecutionPolicy, class ForwardIterator1, class ForwardIterator2>
  bool includes(ExecutionPolicy&& exec,
                ForwardIterator1 first1,
                ForwardIterator1 last1,
                ForwardIterator2 first2,
                ForwardIterator2 last2);         // (3) C++17

  template <class ExecutionPolicy, class ForwardIterator1, class ForwardIterator2,
            class Compare>
  bool includes(ExecutionPolicy&& exec,
                ForwardIterator1 first1,
                ForwardIterator1 last1,
                ForwardIterator2 first2,
                ForwardIterator2 last2,
                Compare comp);                   // (4) C++17
}
```

## 概要
2つのソート済みイテレータ範囲`[first1, last1)`と`[first2, last2)`において、一方の範囲の要素がもう一方の範囲に全て含まれているかを判定する。

この関数は、イテレータ範囲`[first1, last1)`にイテレータ範囲`[first2, last2)`が含まれていれば`true`を返す。


## 戻り値
`[first2,last2)` が `empty` であるか、`[first2,last2)` の全ての要素が `[first1,last1)` に含まれている場合は `true`、そうでない場合は `false` を返す。


## 計算量
最大で `2 * ((last1 - first1) + (last2 - first2)) - 1` 回比較する


## 例
```cpp example
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


## 参照
- [P0202R3 Add Constexpr Modifiers to Functions in `<algorithm>` and `<utility>` Headers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0202r3.html)
- [P0467R2 Iterator Concerns for Parallel Algorithms](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0467r2.html)
