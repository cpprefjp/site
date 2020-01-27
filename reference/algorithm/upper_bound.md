# upper_bound
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template<class ForwardIterator, class T>
  ForwardIterator
    upper_bound(ForwardIterator first,
                ForwardIterator last,
                const T& value);       // (1) C++03

  template<class ForwardIterator, class T>
  constexpr ForwardIterator
    upper_bound(ForwardIterator first,
                ForwardIterator last,
                const T& value);       // (1) C++20

  template<class ForwardIterator, class T, class Compare>
  ForwardIterator
    upper_bound(ForwardIterator first,
                ForwardIterator last,
                const T& value,
                Compare comp);         // (2) C++03

  template<class ForwardIterator, class T, class Compare>
  constexpr ForwardIterator
    upper_bound(ForwardIterator first,
                ForwardIterator last,
                const T& value,
                Compare comp);         // (2) C++20
}
```

## 概要
指定された要素より大きい値が現れる最初の位置のイテレータを取得する


## 要件
- C++03 まで
	- `first`、`last` は前方向イテレータの要件を満たすこと。
	- `comp` は 2 引数の関数オブジェクトで、結果の型は `bool` 型に変換可能であること。また、引数に非 `const` の関数を適用しないこと。
	- `T` は `LessThanComparable` であること。
	- `operator<` または `comp` は「[�義の弱順序](../algorithm.md#strict-weak-ordering)」であること。
	- 範囲 `[first, last)` は `operator<` または `comp` を基準として昇順に並んでいること。
- C++11 から
	- `first`、`last` は前方向イテレータの要件を満たすこと。
	- `comp` は 2 引数の関数オブジェクトで、結果の型は `bool` 型に変換可能であること。また、引数に非 `const` の関数を適用しないこと。
	- `[first,last)` の要素 `e` は `!(value < e)` または `!comp(value, e)` によって[区分化](/reference/algorithm.md#sequence-is-partitioned)されていること。  
		つまり、`!(value < e)` または `!comp(value, e)` が `true` となる全ての要素 `e` は、`false` となる全ての要素よりも左側（`first` に近い方）になければならない。


## 戻り値
`[first, last]` 内のイテレータ `i` のうち、以下の条件を満たす、最も右側（`first` から遠い方）のもの。

- `[first, i)` 内の全てのイテレータ `j` が `!(value < *j)` または `comp(value, *j) == false` である。

（つまり、`value` より大きい要素のうち最初のものを指すイテレータ。`value` より大きい要素が無ければ `last`）


## 計算量
最大で log2(`last - first`) + 1 回の比較を行う


## 備考
- 本関数は、本質的に C++11 で追加された [`partition_point`](partition_point.md) と�価である。  
	具体的には、[`partition_point`](partition_point.md)`(first, last, [value](const T& e) { return !bool(value < e); })`、あるいは、[`partition_point`](partition_point.md)`(first, last, [value, comp](const T& e) { return !bool(comp(value, e)); })` とすることで�価の結果が得られる。
- 本関数の要件は、上記の通り C++03 までの方が C++11 よりも厳しい。  
	しかし、本アルゴリズムの特性上、処理系が C++03 までにしか準拠していない場合でも、昇順に並んでいなくても�常に動作する可能性は高いものと思われる。


## 例
```cpp example
#include <iostream>
#include <vector>
#include <algorithm>

struct X {
  int key;    // プライマリ�ー
  int value;  // 補助的な値

  bool operator<(const X& rhs) const {
    // 型Xはプライマリ�ーでのみ順序付けされる。
    return key < rhs.key;
  }
};

void push_stable(std::vector<X>& queue, X elem)
{
  // 挿入対象の値 elem よりも大きい要素の位置、すなわち
  // elem と同値な要素グループの次の位置を検索する。
  auto it = std::upper_bound(queue.begin(), queue.end(), elem);
  queue.insert(it, elem);
}


int main()
{
  // この関数単体としての使い方
  {
    // upper_bound で 3 より大きい要素の位置を検索する場合、
    // 3 以下の物と 3 より大きい物がその順に並んでいれば、
    // 必ずしもソートされている必要はない。
    std::vector<int> v = {3, 1, 4, 6, 5};

    // 3より大きい要素を二分探索で検索
    decltype(v)::iterator it = std::upper_bound(v.begin(), v.end(), 3);
    std::cout << *it << std::endl;
  }

  // 応用例：安定順序・優先順位付き�ューの実装
  {
    std::vector<X> queue;
    push_stable(queue, {100, 1});
    push_stable(queue, {200, 1});
    push_stable(queue, {300, 1});
    push_stable(queue, {300, 2});
    push_stable(queue, {200, 2});
    push_stable(queue, {100, 2});

    // プライマリ�ー key は同値だが異なる値 value を持つ要素間では
    // �ュー queue への要素挿入順序が�持されている。
    // （std::priority_queue クラスでは挿入順序は保持されない。）
    for (const auto& e: queue) {
      std::cout << e.key << ':' << e.value << ' ';
    }
    std::cout << std::endl;
  }
}
```
* std::upper_bound[color ff0000]


### 出力
```
4
100:1 100:2 200:1 200:2 300:1 300:2
```


## 実装例
```cpp
template<class ForwardIterator, class T, class Compare>
ForwardIterator
upper_bound(ForwardIterator first, ForwardIterator last, const T& value, Compare comp)
{
  using diff = typename std::iterator_traits<ForwardIterator>::difference_type;
  for (diff len = std::distance(first, last); len != 0; ) {
    diff half = len / 2;
    ForwardIterator mid = first;
    std::advance(mid, half);
    if (!bool(comp(value, *mid))) {
      len -= half + 1;
      first = ++mid;
    } else {
      len = half;
    }
  }
  return first;
}

// operator< 用の関数オブジェクト
struct less_inner {
  template <class T, class U>
  bool operator()(const T& lhs, const U& rhs) { return bool(lhs < rhs); }
};

template<class ForwardIterator, class T>
ForwardIterator
upper_bound(ForwardIterator first, ForwardIterator last, const T& value)
{
  return std::upper_bound(first, last, value, less_inner());
}
```
* std::advance[link /reference/iterator/advance.md]
* std::iterator_traits[link /reference/iterator/iterator_traits.md]

## 参照
- [LWG Issue 384. `equal_range` has unimplementable runtime complexity](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#384)
- [LWG Issue 2150. Unclear specification of `find_end`](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2150)
- [P0202R3 Add Constexpr Modifiers to Functions in `<algorithm>` and `<utility>` Headers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0202r3.html)
