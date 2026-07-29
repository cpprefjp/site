# sort
* hive[meta header]
* std[meta namespace]
* hive[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
template <class Compare = less<T>>
void sort(Compare comp = Compare()); // (1) C++26
```
* less[link /reference/functional/less.md]

## 概要
要素を並べ替える。


## 事前条件
型`T`が`hive`に対して`MoveInsertable`であり、かつ`MoveAssignable`かつ`Swappable`であること。


## 効果
関数オブジェクト`comp`に基いて`*this`の要素を並べ替える。例外が送出された場合、`*this`の要素の順序は未規定である。


## 戻り値
なし


## 計算量
`N`を[`size()`](size.md)として、$O(N \log N)$回の比較


## 備考
- メモリを確保する可能性がある。
- `*this`の要素を指す参照・ポインタ・イテレータ、および終端イテレータは無効化される可能性がある。
- この操作は安定であることを要求されない。


## 例
```cpp example
#include <hive>
#include <print>

int main()
{
  std::hive<int> h = {3, 1, 4, 1, 5, 2};

  // 昇順に並べ替える
  h.sort();

  for (int x : h) {
    std::print("{} ", x);
  }
  std::println("");
}
```
* sort[color ff0000]

### 出力
```
1 1 2 3 4 5 
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`hive::unique`](unique.md)
- [`std::sort`](/reference/algorithm/sort.md)


## 参照
- [P0447R28 Introduction of `std::hive` to the standard library](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p0447r28.html)
    - C++26で`hive`が追加された
