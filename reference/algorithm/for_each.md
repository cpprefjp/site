# for_each
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class InputIterator, class Function>
  Function for_each(InputIterator first,
                    InputIterator last,
                    Function f);                   // (1) C++03

  template <class InputIterator, class Function>
  constexpr Function for_each(InputIterator first,
                              InputIterator last,
                              Function f);         // (1) C++20

  template <class ExecutionPolicy, class ForwardIterator, class Function>
  void for_each(ExecutionPolicy&& exec,
                ForwardIterator first,
                ForwardIterator last,
                Function f);                       // (2) C++17
}
```

## 概要
範囲の全ての要素に、指定された関数を適用する。


## 要件
`Function` は `MoveConstructible` の要件を満たす必要があるが、`CopyConstructible` の要件を満たす必要はない。（C++11のみ）


## 効果
`[first,last)` 内の全てのイテレータ `i` に `f(*i)` という操作を行う。`first` から順番に処理し、`last - 1` まで行う。

このアルゴリズムはその他のアルゴリズムと違い、関数 `f` の内部で `*i` の値を書き換えても構わない（もちろんイテレータの型が `mutable iterator` の要件を満たしている場合に限る）。


## 戻り値
* C++03 の場合 : `f`
* C++11 の場合 : `std::move(f)`


## 計算量
�確に `f` を `last - first` 回適用する


## 備考
- `f` に戻り値がある場合、それは単に無視される
- (1)は、戻り値の型が`Function`となっている。シングルスレッドでの順次実行では関数オブジェクト`f`の状態を次々に変更していき、最終的な関数オブジェクトの状態を戻り値として取得できる
- (2)の並列アルゴリズム版は、戻り値の型が`Function`ではなく`void`となっている。並列数だけ関数オブジェクトをコピーするため、関数オブジェクトの状態を順次変更していくような�計は、並列アルゴリズム版ではできないようになっている


## 例
### C++03での例
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

  // 要素の内容を書き換えても構わないし、呼び出し順序に依�した処理を書いても構わない
  std::for_each(v.begin(), v.end(), mutate());
  std::for_each(v.begin(), v.end(), disp);
}
```
* std::for_each[color ff0000]
* v.push_back[link /reference/vector/vector/push_back.md]

#### 出力
```
3
1
4
----
3
2
6
```


## 例
### C++11での例
```cpp example
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
  std::vector<int> v = { 3, 1, 4 };

  // vの全ての要素にラムダ式を適用する
  std::for_each(v.begin(), v.end(), [](int x) { std::cout << x << std::endl; });

  std::cout << "----" << std::endl;

  // 要素の内容を書き換えても構わないし、呼び出し順序に依�した処理を書いても構わない
  int n = 0;
  std::for_each(v.begin(), v.end(), [n](int& x) mutable { x += n++; });
  std::for_each(v.begin(), v.end(), [](int x) { std::cout << x << std::endl; });
}
```
* std::for_each[color ff0000]

#### 出力
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


## 参照
- [P0202R3 Add Constexpr Modifiers to Functions in `<algorithm>` and `<utility>` Headers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0202r3.html)
- [P0467R2 Iterator Concerns for Parallel Algorithms](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0467r2.html)
