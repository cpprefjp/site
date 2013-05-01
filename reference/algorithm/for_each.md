#for_each

```cpp
namespace std {
  template<class InputIterator, class Function>

  Function for_each(InputIterator first, InputIterator last, Function f);
}
```

###概要

範囲の全ての要素に、指定された関数を適用する。
<h3>要件
</h3>
Function は MoveConstructible の要件を満たす必要があるが、CopyConstructible の要件を満たす必要はない。（C++11のみ）

###効果

[first,last) 内の全てのイテレータ i に f(*i) という操作を行う。first から順番に処理し、last - 1 まで行う。
このアルゴリズムはその他のアルゴリズムと違い、Function の内部で *i の値を書き換えても構わない（もちろんイテレータの型が mutable iterator の要件を満たしている場合に限る）。

###戻り値

// C++03 の場合

f
// C++11 の場合
std::move(f)


###計算量

正確に f を last - first 回適用する

###備考

f に戻り値がある場合、それは単に無視される。

###実装例

```cpp
<code style='color:rgb(0,0,0)'>template<class InputIterator, class Function><br style='color:rgb(0,0,0)'/>
<code style='color:rgb(0,0,0)'>Function for_each(InputIterator first, InputIterator last, Function f) {<br style='color:rgb(0,0,0)'/>
<code style='color:rgb(0,0,0)'>  for ( ; first != last; ++first)<br style='color:rgb(0,0,0)'/>
<code style='color:rgb(0,0,0)'>    f(*first);<br style='color:rgb(0,0,0)'/>
<code style='color:rgb(0,0,0)'>  return move(f);<br style='color:rgb(0,0,0)'/>
<code style='color:rgb(0,0,0)'>}
```

###使用例(C++03バージョン)

<code style='color:rgb(0,0,0)'>#include <iostream></code><br style='color:rgb(0,0,0)'/>
<code style='color:rgb(0,0,0)'>#include <vector></code><br style='color:rgb(0,0,0)'/>
<code style='color:rgb(0,0,0)'>#include <algorithm></code><br style='color:rgb(0,0,0)'/>
<br style='color:rgb(0,0,0)'/>
<code style='color:rgb(0,0,0)'>void disp(int x) {</code><br style='color:rgb(0,0,0)'/>
<code style='color:rgb(0,0,0)'>  std::cout << x << std::endl;</code><br style='color:rgb(0,0,0)'/>
<code style='color:rgb(0,0,0)'>}</code><br style='color:rgb(0,0,0)'/>
<br style='color:rgb(0,0,0)'/>
<code style='color:rgb(0,0,0)'>struct mutate {</code><br style='color:rgb(0,0,0)'/>
<code style='color:rgb(0,0,0)'>  int n;</code><br style='color:rgb(0,0,0)'/>
<code style='color:rgb(0,0,0)'>  mutate() : n(0) { }</code><br style='color:rgb(0,0,0)'/>
<code style='color:rgb(0,0,0)'>  void operator()(int& v) {</code><br style='color:rgb(0,0,0)'/>
<code style='color:rgb(0,0,0)'>    v += n++;</code><br style='color:rgb(0,0,0)'/>
<code style='color:rgb(0,0,0)'>  }</code><br style='color:rgb(0,0,0)'/>
<code style='color:rgb(0,0,0)'>};</code><br style='color:rgb(0,0,0)'/>
<br style='color:rgb(0,0,0)'/>
<code style='color:rgb(0,0,0)'>int main() {</code><br style='color:rgb(0,0,0)'/>
<code style='color:rgb(0,0,0)'>  std::vector<int> v;</code><br style='color:rgb(0,0,0)'/>
<br style='color:rgb(0,0,0)'/>
<code style='color:rgb(0,0,0)'>  v.push_back(3);</code><br style='color:rgb(0,0,0)'/>
<code style='color:rgb(0,0,0)'>  v.push_back(1);</code><br style='color:rgb(0,0,0)'/>
<code style='color:rgb(0,0,0)'>  v.push_back(4);</code><br style='color:rgb(0,0,0)'/>
<br style='color:rgb(0,0,0)'/>
<code style='color:rgb(0,0,0)'>  // vの全ての要素にdisp()関数を適用する</code><br style='color:rgb(0,0,0)'/>
<code style='color:rgb(0,0,0)'>  std::for_each(v.begin(), v.end(), disp);</code><br style='color:rgb(0,0,0)'/>
<br style='color:rgb(0,0,0)'/>
<code style='color:rgb(0,0,0)'>  </code><code style='color:rgb(0,0,0)'>std::cout << "----" << std::endl;</code>

<code style='color:rgb(0,0,0)'>  // 要素の内容を書き換えても構わないし、呼び出し順序に依存した処理を書いても構わない</code><br style='color:rgb(0,0,0)'/>
<code style='color:rgb(0,0,0)'>  std::for_each(v.begin(), v.end(), mutate());</code><br style='color:rgb(0,0,0)'/>
<code style='color:rgb(0,0,0)'>  std::for_each(v.begin(), v.end(), disp);</code><br style='color:rgb(0,0,0)'/>
<code style='color:rgb(0,0,0)'>}</code>




###使用例(C++11バージョン)

<code style='color:rgb(0,0,0)'>#include <iostream></code><br style='color:rgb(0,0,0)'/>
<code style='color:rgb(0,0,0)'>#include <vector></code><br style='color:rgb(0,0,0)'/>
<code style='color:rgb(0,0,0)'>#include <algorithm></code><br style='color:rgb(0,0,0)'/>
<br style='color:rgb(0,0,0)'/>
<code style='color:rgb(0,0,0)'>int main() {</code><br style='color:rgb(0,0,0)'/>
<code style='color:rgb(0,0,0)'>  std::vector<int> v = { 3, 1, 4 };</code><br style='color:rgb(0,0,0)'/>
<br style='color:rgb(0,0,0)'/>
<code style='color:rgb(0,0,0)'>  // vの全ての要素にラムダ式を適用する</code><br style='color:rgb(0,0,0)'/>
<code style='color:rgb(0,0,0)'>  std::for_each(v.begin(), v.end(), [](int x) { std::cout << x << std::endl; });</code>
<br style='color:rgb(0,0,0)'/>
<code style='color:rgb(0,0,0)'>  </code><code style='color:rgb(0,0,0)'>std::cout << "----" << std::endl;</code>
<br style='color:rgb(0,0,0)'/>
<code style='color:rgb(0,0,0)'>  // 要素の内容を書き換えても構わないし、</code>呼び出し順序に依存した処理を書いても<code style='color:rgb(0,0,0)'>構わない</code><br style='color:rgb(0,0,0)'/>
<code style='color:rgb(0,0,0)'>  int n = 0;</code><br style='color:rgb(0,0,0)'/>
<code style='color:rgb(0,0,0)'>  std::for_each(v.begin(), v.end(), [n](int& x) mutable { x += n++; });</code><br style='color:rgb(0,0,0)'/>
<code style='color:rgb(0,0,0)'>  std::for_each(v.begin(), v.end(), [](int x) { std::cout << x << std::endl; });</code><br style='color:rgb(0,0,0)'/>
<code style='color:rgb(0,0,0)'>}</code>


###出力

```cpp
3

1

4
----
3
2
6

```
