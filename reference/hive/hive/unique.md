# unique
* hive[meta header]
* std[meta namespace]
* hive[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
template <class BinaryPredicate = equal_to<T>>
size_type unique(BinaryPredicate binary_pred = BinaryPredicate()); // (1) C++26
```
* equal_to[link /reference/functional/equal_to.md]

## 概要
連続した等価な要素群について、その先頭以外を削除する。


## 事前条件
`binary_pred`が同値関係であること。


## 効果
連続する等価な要素群のそれぞれについて、先頭以外の全ての要素を削除する。すなわち、空でない`hive`に対して、イテレータ範囲`[`[`begin()`](begin.md) `+ 1,` [`end()`](end.md)`)`に含まれるイテレータ`i`のうち、`binary_pred(*i, *(i - 1))`が`true`となる要素を全て削除する。


## 戻り値
削除された要素数を返す。


## 例外
`binary_pred`が例外を送出する場合を除き、例外を送出しない。


## 計算量
[`empty()`](empty.md)が`false`である場合、述語をちょうど[`size()`](size.md)` - 1`回適用する。そうでなければ、述語を適用しない。


## 備考
削除された要素を指す参照・ポインタ・イテレータを無効化する。`*this`の末尾の要素が削除された場合、終端イテレータも無効化する。


## 例
```cpp example
#include <hive>
#include <print>

int main()
{
  std::hive<int> h = {1, 1, 2, 2, 2, 3, 1};

  // 連続する等価な要素群の先頭以外を削除する
  std::hive<int>::size_type n = h.unique();

  std::println("erased = {}", n);
  for (int x : h) {
    std::print("{} ", x);
  }
  std::println("");
}
```
* unique[color ff0000]

### 出力
```
erased = 3
1 2 3 1 
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`hive::sort`](sort.md)
- [`hive::erase`](erase.md)


## 参照
- [P0447R28 Introduction of `std::hive` to the standard library](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p0447r28.html)
    - C++26で`hive`が追加された
