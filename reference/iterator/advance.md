#advance
* iterator[meta header]
* std[meta namespace]

```cpp
namespace std {
  template <class InputIterator, class Distance>
  void advance(InputIterator& i, Distance n);
}
```

##概要
イテレータを`n`回進める。


##要件
双方向イテレータもしくはランダムアクセスイテレータの場合のみ、`n`が負数であることを許可する。


##効果
イテレータへの参照`i`を`n`回進める(`n`が負数の場合は逆方向に進める)。


##戻り値
なし


##計算量

- 入力イテレータ、前方向イテレータ ： `n`回のインクリメント
- 双方向イテレータ： `n`回のインクリメント、もしくはデクリメント
- ランダムアクセスイテレータ： O(1)

##例
```cpp
#include <iostream>
#include <iterator>
#include <vector>

int main()
{
  std::vector<int> v = {3, 1, 4, 2, 5};

  decltype(v)::iterator i = v.begin();
  std::advance(i, 3); // イテレータiを3回進める

  std::cout << *i << std::endl;
}
```
* advance[color ff0000]

###出力
```
2
```

##実装例
```cpp
// 入力イテレータ(or 前方向イテレータ)
template <class InputIterator, class Distance>
void advance_impl(InputIterator& i, Distance n, std::input_iterator_tag)
{
  assert(n >= 0);

  for (; 0 < n; --n) { ++i; }
}

// 双方向イテレータ
template <class BidirectionalIterator, class Distance>
void advance_impl(BidirectionalIterator& i, Distance n, std::bidirectional_iterator_tag)
{
  if (n > 0) {
    for (; 0 < n; --n) { ++i; }
  }
  else {
    for (; n < 0; ++n) { --i; }
  }
}

// ランダムアクセスイテレータ
template <class RandomAccessIterator, class Distance>
void advance_impl(RandomAccessIterator& i, Distance n, std::random_access_iterator_tag)
{
  i += n;
}

template <class Iterator, class Distance>
void advance(Iterator& i, Distance n)
{
  advance_impl(i, n,
          typename std::iterator_traits<Iterator>::iterator_category());
          // イテレータのカテゴリごとに最適な実装を選択させる
}
```

##参照


