# random_shuffle
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp14deprecated[meta cpp]
* cpp17removed[meta cpp]

```cpp
namespace std {
  template <class RandomAccessIterator>
  void random_shuffle(RandomAccessIterator first,
                      RandomAccessIterator last);    // (1)

  template <class RandomAccessIterator, class RandomNumberGenerator>
  void random_shuffle(RandomAccessIterator first,
                      RandomAccessIterator last,
                      RandomNumberGenerator& rand);  // (2) C++03

  template <class RandomAccessIterator, class RandomNumberGenerator>
  void random_shuffle(RandomAccessIterator first,
                      RandomAccessIterator last,
                      RandomNumberGenerator&& rand); // (2) C++11
}
```

この関数は、C++14から非推奨となり、C++17で削除された。代わりに[`shuffle()`](shuffle.md)関数を使用すること。


## 概要
`[first,last)` のそれぞれの要素を同じ確率で並び替える。


## 要件
- `RandomAccessIterator` は `ValueSwappable` の要件を満たしている必要がある。
- 乱数生成関数オブジェクトである `rand` の戻り値は [`iterator_traits`](/reference/iterator/iterator_traits.md)`<RandomAccessIterator>::difference_type` へ変換可能でなければならない。
- 0 より大きい [`iterator_traits`](/reference/iterator/iterator_traits.md)`<RandomAccessIterator>::difference_type` 型の `n` について、`rand(n)` という呼び出しは `[0,n)` の範囲から無作為に選ばれた値を返す必要がある。


## 計算量
�確に `(last - first) - 1` 回 swap する。


## 備考
最初の形式がC互換ライブラリの `std::rand()`関数を使うかどうかは実装依�である。


## 非推奨・削除の詳細(C++14)
C++14では、C互換ライブラリの乱数生成関数である`std::rand()`と`std::srand()`が非推奨となった。

これらの関数には、以下のような問題があった：

- 値の範囲が小さい。`RAND_MAX`の値が非常に小さく、範囲`[0, 32767]`の値しか生成できなかった。
- 任意の範囲を取得するために、剰余演算が使われていた。これはMudulo biasという問題によって、生成確率が一様にならない。
- これらの関数は`static`な唯一の状態を持つため、複数の状態が必要な状況に対処できなかった。

こういった問題により、多くのプ�ジェクトがこれらの関数を使用することを、明確に禁�していた。そのため、これらの関数が非推奨となった。

`std::random_shuffle()`関数は`std::rand()`に依�したアルゴリズムであるため、共に非推奨となった。

`std::rand()`と`std::srand()`の代わりに、[`<random>`](/reference/random.md)ヘッダで定義される乱数生成器と分布を使用すること。`std::random_shuffle()`関数の代わりに、[`std::shuffle()`](shuffle.md)関数を使用すること。


## 例
```cpp example
#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>
#include <iterator>

int main() {
  std::vector<int> v(10);
  std::iota(v.begin(), v.end(), 0); // 0～9 までの値を生成

  std::cout << "before: ";
  std::copy(v.begin(), v.end(), std::ostream_iterator<int>(std::cout));
  std::cout << std::endl;

  // シャッフル
  std::random_shuffle(v.begin(), v.end());

  std::cout << " after: ";
  std::copy(v.begin(), v.end(), std::ostream_iterator<int>(std::cout));
  std::cout << std::endl;
}
```
* std::random_shuffle[color ff0000]

### 出力
```
before: 0123456789
 after: 4378052169
```


## 実装例
```cpp
// [0,n) のどれかの値を返す内部関数
T get_random_number(T n);

template <class RandomAccessIterator>
void random_shuffle(RandomAccessIterator first, RandomAccessIterator last) {
  if (first == last) return;
  for (auto it = first + 1; it != last; ++it)
    iter_swap(it, first + get_random_number(it - first + 1));
}

template <class RandomAccessIterator>
void random_shuffle(RandomAccessIterator first, RandomAccessIterator last, RandomNumberGenerator&& rand) {
  if (first == last) return;
  for (auto it = first + 1; it != last; ++it)
    iter_swap(it, first + rand(it - first + 1));
}
```
* iter_swap[link iter_swap.md]


## 参照
- [rand() Considered Harmful - Going Native 2013](https://channel9.msdn.com/Events/GoingNative/2013/rand-Considered-Harmful)
- [N3924 Discouraging rand() in C++14, v2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n3924.pdf)
- [N4190 Removing `auto_ptr`, `random_shuffle()`, And Old `<functional>` Stuff](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4190.htm)
