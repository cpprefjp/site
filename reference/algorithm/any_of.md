#any_of
```cpp
<pre style='margin:0'><code style='color:black'>namespace std {
  template <class InputIterator, class Predicate>
  bool any_of(InputIterator first, InputIterator last, Predicate pred);
}</pre>
```

###概要

範囲のいずれかの要素が条件を満たすかを判定する。


###戻り値

<p>[first,last) 内のイテレータ i について pred(*i) が true になるような要素があればtrueを返し、そうでなければfalseを返す。
[first,last)の範囲が空の場合はfalseを返す。</p>

###計算量

最大で last - first 回 pred を実行する。


###言語のバージョン

C++11 以降


###実装例

```cpp
<pre style='margin:0'><code style='color:black'>template<class InputIterator, class Predicate>
bool any_of(InputIterator first, InputIterator last, Predicate pred) {
  for ( ; first != last; ++first)
    if (pred(*first)) return true;
  return false;
}</pre>
```

###使用例

```cpp
<pre style='margin:0'><code style='color:black'>#include <algorithm>
#include <iostream>
#include <vector>

int main() {
  std::vector<int> v = { 3, 1, 4 };

  std::cout << std::boolalpha;

  // 5 以上の要素が存在するかどうか
  bool result1 = std::any_of(v.begin(), v.end(), [](int x) { return x >= 5; });
  std::cout << result1 << std::endl;

  // 1 の要素が存在するかどうか
  bool result2 = std::any_of(v.begin(), v.end(), [](int x) { return x == 1; });
  std::cout << result2 << std::endl;
}</pre>
```
* any_of[color ff0000]
* any_of[color ff0000]

###出力

```cpp
false

true
```
