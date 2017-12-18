# for_each
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class InputIterator, class Function>
  Function for_each(InputIterator first,
                    InputIterator last,
                    Function f);
}
```

## 概要
範囲の全ての要素に、指定された関数を適用する。


## 要件
`Function` は `MoveConstructible` の要件を満たす必要があるが、`CopyConstructible` の要件を満たす必要はない。（C++11のみ）


## 効果
`[first,last)` 内の全てのイテレータ `i` に `f(*i)` という操作を行う。`first` から順番に処理し、`last - 1` まで行う。

このアルゴリズムはその他のアルゴリズムと違い、`Function` の内部で `*i` の値を書き換えても構わない（もちろんイテレータの型が `mutable iterator` の要件を満たしている場合に限る）。


## 戻り値
* C++03 の場合 : `f`
* C++11 の場合 : `std::move(f)`


## 計算量
正確に `f` を `last - first` 回適用する


## 備考
`f` に戻り値がある場合、それは単に無視される。


## 例(C++03バージョン)
```cpp example
#include <iostream>
#include <vector>
#include <algorithm>

void disp(int x) {
  std::cout << x << std::endl;
}

struct mutate {
  int n;
  mutate() : n(0) { }
  void operator()(int& v) {
    v += n++;
  }
};

int main() {
  std::vector<int> v;

  v.push_back(3);
  v.push_back(1);
  v.push_back(4);

  // vの全ての要素にdisp()関数を適用する
  std::for_each(v.begin(), v.end(), disp);

  std::cout << "----" << std::endl;

  // 要素の内容を書き換えても構わないし、呼び出し順序に依存した処理を書いても構わない
  std::for_each(v.begin(), v.end(), mutate());
  std::for_each(v.begin(), v.end(), disp);
}
```
* std::for_each[color ff0000]
* v.push_back[link /reference/vector/push_back.md]

### 出力
```
3
1
4
----
3
2
6
```


## 例(C++11バージョン)
```cpp example
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
  std::vector<int> v = { 3, 1, 4 };

  // vの全ての要素にラムダ式を適用する
  std::for_each(v.begin(), v.end(), [](int x) { std::cout << x << std::endl; });

  std::cout << "----" << std::endl;

  // 要素の内容を書き換えても構わないし、呼び出し順序に依存した処理を書いても構わない
  int n = 0;
  std::for_each(v.begin(), v.end(), [n](int& x) mutable { x += n++; });
  std::for_each(v.begin(), v.end(), [](int x) { std::cout << x << std::endl; });
}
```
* std::for_each[color ff0000]
* std::vector[link /reference/vector.md]
* v.begin()[link /reference/vector/begin.md]
* v.end()[link /reference/vector/end.md]
* std::cout[link /reference/iostream/cout.md]
* std::endl[link /reference/ostream/endl.md]

### 出力
```
3
1
4
----
3
2
6
```


### 処理系
- [Clang](/implementation.md#clang): 
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc):
- [ICC](/implementation.md#icc): 
- [Visual C++](/implementation.md#visual_cpp): 2005, 2008, 2010, 2012, 2013, 2015
    - C++11への対応（戻り値のムーブ）は2012から。


## 実装例
```cpp
template <class InputIterator, class Function>
Function for_each(InputIterator first, InputIterator last, Function f) {
  for ( ; first != last; ++first)
    f(*first);
  return move(f);
}
```

