# shift_right
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class ForwardIterator>
  constexpr ForwardIterator
    shift_right(ForwardIterator first,
                ForwardIterator last,
                typename iterator_traits<ForwardIterator>::difference_type n); // (1)

  template <class ExecutionPolicy, class ForwardIterator>
  ForwardIterator
    shift_right(ExecutionPolicy&& exec,
                ForwardIterator first,
                ForwardIterator last,
                typename iterator_traits<ForwardIterator>::difference_type n); // (2)
}
```

## 概要
イテレータ範囲`[first, last)`の要素をn個だけ右にシフトさせる。

この関数に符号付き整数型のシフト数として、0および負数を指定した場合はなにもしない。

この関数によって要素をn個だけ右にシフトすると、`[first, first + n)`の範囲は、ムーブされたあとの「使用してはいけないオブジェクト」となる。その範囲には、循環バッファ (circular buffer) のように新たな要素を代入するか、コンテナの`erase()`メンバ関数を使用して使わなくなった範囲を削除するなどの対応が必要になる。


## テンプレートパラメータ制約
- `*first`の型が[ムーブ代入可能](/reference/type_traits/is_move_assignable.md)であること
- `ForwardIterator`型が、Bidirectional Iteratorの要件もしくは[ValueSwappable](/reference/concepts/ValueSwappable.md)の要件を満たすこと


## 事前条件
`n >= 0`


## 効果
- `n == 0`である場合、なにもしない
- `n >= last - first`である場合、なにもしない
- `i < (last - first) - n`である非負の各`i`について、`first + i`位置の要素を`first + n + i`位置にムーブする
    - (1)では、`ForwardIterator`型がBidirectional Iteratorの要件を満たす場合は、`i = (last - first) - n - 1`から`i = 0`の順に処理する


## 戻り値
- `n < last - first`である場合、`first + n`を返す
- そうでなければ、`last`を返す


## 計算量
最大で`(last - first) - n`回の代入もしくはswap操作を行う


## 備考
- シフト数として負数を指定することはできないが、この関数には符号付き整数型を指定することとなっている。これは、Bidirectional Iterator向けの最適化した実装をする場合に[`std::prev()`](/reference/iterator/prev.md)関数を使用するため、そちらのパラメータ型と合わせたことによる
- [`shift_left()`](shift_left.md)と`shift_right()`で関数が分かれているのは、コンパイルしたコードサイズを小さくするためと、左シフトと右シフトでは最大パフォーマンスのための実装が異なるためである


## 例
```cpp example
#include <iostream>
#include <vector>
#include <algorithm>

int main()
{
  std::vector<int> v = {1, 2, 3, 4, 5};

  std::shift_right(v.begin(), v.end(), 2);

  for (int x : v) {
    std::cout << x << ',';
  }
  std::cout << std::endl;
}
```
* std::shift_right[color ff0000]

### 出力
```
1,2,1,2,3,
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc):
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`shift_left`](shift_left.md)
- [`rotate`](rotate.md)

## 参照
- [P1243R4 Rangify New Algorithms](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p1243r4.pdf)
- [P0769R2 | Add shift to `<algorithm>`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0769r2.pdf)
- [[idea for proposal] Adding `std::shift` to `<algorithm>` - std-proposals](https://groups.google.com/a/isocpp.org/forum/#!msg/std-proposals/I76om68B3t0/iA348-iFBAAJ)
