# shift_left
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std::ranges {
  template <permutable I,
            sentinel_for<I> S>
  constexpr subrange<I>
    shift_left(I first,
               S last,
               iter_difference_t<I> n);  // (1) C++23

  template <forward_range R>
    requires permutable<iterator_t<R>>
  constexpr borrowed_subrange_t<R>
    shift_left(R&& r,
               range_difference_t<R> n); // (2) C++23
}
```
* permutable[link /reference/iterator/permutable.md]

## 概要
範囲の要素をn個だけ左にシフトさせる。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する

この関数に符号付き整数型のシフト数として、0および負数を指定した場合はなにもしない。

この関数によって要素をn個だけ左にシフトすると、`[first + n, last)`の範囲は、ムーブされたあとの「使用してはいけないオブジェクト」となる。その範囲には、循環バッファ (circular buffer) のように新たな要素を代入するか、コンテナの`erase()`メンバ関数を使用して使わなくなった範囲を削除するなどの対応が必要になる。


## 事前条件
`n >= 0`


## 効果
- `n == 0`である場合、なにもしない
- `n >= last - first`である場合、なにもしない
- `i < (last - first) - n`である非負の各`i`について、`first + n + i`位置の要素を`first + i`位置にムーブする
    - (1)では、`i = 0`から`i = (last - first) - n - 1`の順に処理する


## 戻り値
`new_last`を次のように定義する。

- `n < last - first`である場合、`first + (last - first - n)`
- そうでなければ、`first`

このとき、 `{first, new_last}`

## 計算量
最大で`(last - first) - n`回の代入を行う


## 備考
- シフト数として負数を指定することはできないが、この関数には符号付き整数型を指定することとなっている。これは、Bidirectional Iterator向けの最適化した実装をする場合に[`std::prev()`](/reference/iterator/prev.md)関数を使用するため、そちらのパラメータ型と合わせたことによる
- `shift_left()`と[`shift_right()`](ranges_shift_right.md)で関数が分かれているのは、コンパイルしたコードサイズを小さくするためと、左シフトと右シフトでは最大パフォーマンスのための実装が異なるためである


## 例
```cpp example
#include <iostream>
#include <vector>
#include <algorithm>

int main()
{
  std::vector<int> v = {1, 2, 3, 4, 5};

  std::ranges::shift_left(v, 2);

  for (int x : v) {
    std::cout << x << ',';
  }
  std::cout << std::endl;
}
```
* std::ranges::shift_left[color ff0000]

### 出力
```
3,4,5,4,5,
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照
- [N4901 25 Algorithms library](https://timsong-cpp.github.io/cppwp/algorithms)
