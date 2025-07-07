# shift_left
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class ForwardIterator>
  constexpr ForwardIterator
    shift_left(ForwardIterator first,
               ForwardIterator last,
               typename iterator_traits<ForwardIterator>::difference_type n); // (1)

  template <class ExecutionPolicy, class ForwardIterator>
  ForwardIterator
    shift_left(ExecutionPolicy&& exec,
               ForwardIterator first,
               ForwardIterator last,
               typename iterator_traits<ForwardIterator>::difference_type n); // (2)
}
```

## 概要
イテレータ範囲`[first, last)`の要素をn個だけ左にシフトさせる。

この関数に符号付き整数型のシフト数として、0および負数を指定した場合はなにもしない。

この関数によって要素をn個だけ左にシフトすると、`[first + n, last)`の範囲は、ムーブされたあとの「使用してはいけないオブジェクト」となる。その範囲には、循環バッファ (circular buffer) のように新たな要素を代入するか、コンテナの`erase()`メンバ関数を使用して使わなくなった範囲を削除するなどの対応が必要になる。


## テンプレートパラメータ制約
- `*first`の型が[ムーブ代入可能](/reference/type_traits/is_move_assignable.md)であること


## 事前条件
`n >= 0`


## 効果
- `n == 0`である場合、なにもしない
- `n >= last - first`である場合、なにもしない
- `i < (last - first) - n`である非負の各`i`について、`first + n + i`位置の要素を`first + i`位置にムーブする
    - (1)では、`i = 0`から`i = (last - first) - n - 1`の順に処理する


## 戻り値
- `n < last - first`である場合、`first + (last - first - n)`を返す
- そうでなければ、`first`を返す


## 計算量
最大で`(last - first) - n`回の代入を行う


## 備考
- シフト数として負数を指定することはできないが、この関数には符号付き整数型を指定することとなっている。これは、Bidirectional Iterator向けの最適化した実装をする場合に[`std::prev()`](/reference/iterator/prev.md)関数を使用するため、そちらのパラメータ型と合わせたことによる
- `shift_left()`と[`shift_right()`](shift_right.md)で関数が分かれているのは、コンパイルしたコードサイズを小さくするためと、左シフトと右シフトでは最大パフォーマンスのための実装が異なるためである


## 例
```cpp example
#include <iostream>
#include <vector>
#include <algorithm>

int main()
{
  std::vector<int> v = {1, 2, 3, 4, 5};

  std::shift_left(v.begin(), v.end(), 2);

  for (int x : v) {
    std::cout << x << ',';
  }
  std::cout << std::endl;
}
```
* std::shift_left[color ff0000]

### 出力
```
3,4,5,4,5,
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc):
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`shift_right`](shift_right.md)
- [`rotate`](rotate.md)

## 参照
- [P1243R4 Rangify New Algorithms](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p1243r4.pdf)
- [P0769R2 | Add shift to `<algorithm>`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0769r2.pdf)
- [[idea for proposal] Adding `std::shift` to `<algorithm>` - std-proposals](https://groups.google.com/a/isocpp.org/forum/#!msg/std-proposals/I76om68B3t0/iA348-iFBAAJ)
