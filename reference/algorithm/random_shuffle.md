#random_shuffle

```cpp
namespace std {

  template <class RandomAccessIterator>

  void random_shuffle(RandomAccessIterator first, RandomAccessIterator last);


  // C++03 の場合

  template <class RandomAccessIterator, class RandomNumberGenerator>

  void random_shuffle(RandomAccessIterator first, RandomAccessIterator last, RandomNumberGenerator& rand);


  // C++11 の場合

  template <class RandomAccessIterator, class RandomNumberGenerator>

  void random_shuffle(RandomAccessIterator first, RandomAccessIterator last, RandomNumberGenerator&& rand);

}
```

###概要

[first,last) のそれぞれの要素を同じ確率で並び替える。

###要件

RandomAccessIterator は ValueSwappable の要件を満たしている必要がある。
乱数生成関数オブジェクトである rand の戻り値は iterator_traits<RandomAccessIterator>::difference_type へ変換可能でなければならない。
0 より大きい iterator_traits<RandomAccessIterator>::difference_type 型の n について、rand(n) という呼び出しは [0,n) の範囲から無作為に選ばれた値を返す必要がある。

###計算量

正確に (last - first) - 1 回 swap する。

###注意

最初の形式が標準 C ライブラリの rand 関数を使うかどうかは実装依存である。

###実装例


```cpp
// [0,n) のどれかの値を返す内部関数

T get_random_number(T n);
```

`template <class RandomAccessIterator>`

`void random_shuffle(RandomAccessIterator first, RandomAccessIterator last) {`

`  if (first == last) return;`

`  for (auto it = first + 1; it != last; ++it)`

`    iter_swap(it, first + get_random_number(it - first + 1));`

`}`



```cpp
template <class RandomAccessIterator>
void random_shuffle(RandomAccessIterator first, RandomAccessIterator last, RandomNumberGenerator&& rand) {
  if (first == last) return;
  for (auto it = first + 1; it != last; ++it)
    iter_swap(it, first + rand(it - first + 1));
}
```

###使用例



```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric> // for iota
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
* random_shuffle[color ff0000]

###出力


```cpp
before: 0123456789

 after: 4378052169
```
