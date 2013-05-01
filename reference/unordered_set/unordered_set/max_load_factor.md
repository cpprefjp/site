#max_load_factor
```cpp
float max_load_factor() const noexcept; // (1)
void max_load_factor(float z);          // (2)
```

##概要

(1)	負荷率（バケットあたりの要素数の平均）の最大値を取得する。
(2)	負荷率（バケットあたりの要素数の平均）の最大値を設定する。


##要件

<code style='color:black'>z</code> は正の数であること。


##効果

(1)	なし。
(2)	引数 `z` を「ヒント」として、負荷率（バケットあたりの要素数の平均）の最大値を変更する「かもしれない」。


##戻り値
(1)	負荷率（バケットあたりの要素数の平均）の最大値
(2)	なし

<table><tbody>
</tbody>
</table>

##例外

投げない。


##計算量

定数。


##備考

<li><code style='color:black'>max_load_factor</code> はその名前の通り、<code style='color:black'>[load_factor](/reference/unordered_set/unordered_set/load_factor.md)</code> の最大値（上限）を定義する。
従って、<code style='color:black'>[insert](/reference/unordered_set/unordered_set/insert.md)</code>、<code style='color:black'>[emplace](/reference/unordered_set/unordered_set/emplace.md)</code>、<code style='color:black'>[emplace_hint](/reference/unordered_set/unordered_set/emplace_hint.md)</code> で要素が追加された際、および、<code style='color:black'>[operator=](/reference/unordered_set/unordered_set/op_assign.md)</code> による <code style='color:black'>[initializer_list](/reference/initializer_list.md)</code> からの代入で要素数が増加した際には、<code style='color:black'>[load_factor](/reference/unordered_set/unordered_set/load_factor.md)</code> が <code style='color:red'>max_load_factor</code> 以下になるように、必要に応じてバケット数が調整される。
なお、<code style='color:black'>min_load_factor</code> のようなものはないので、<code style='color:black'>[erase](/reference/unordered_set/unordered_set/erase.md)</code> で要素が削除された際にも、バケット数の調整は行われない。
（標準では、<code style='color:black'>[erase](/reference/unordered_set/unordered_set/erase.md)</code> が呼び出された際に、削除された要素を指すイテレータ、および、参照以外は無効にならないと規定されているため、調整できないと思われる）</li>
<li>(2) の形式では、効果にもある通り引数 <code style='color:black'>z</code> は「ヒント」であり、設定も変更される「かもしれない」となっているため、確定的な事は何も無いが、少なくとも <code style='color:black'>[load_factor](/reference/unordered_set/unordered_set/load_factor.md)() <= z</code> が満たされていれば <code style='color:black'>z</code> に従って設定されると考えてよいと思われる。
一方、<code style='color:black'>[load_factor](/reference/unordered_set/unordered_set/load_factor.md)() > z</code> の場合、単純に無視するか <code style='color:black'>[load_factor](/reference/unordered_set/unordered_set/load_factor.md)()</code> に設定するのが適切と思われるが、<code style='color:black'>z</code> をそのまま設定する実装もある。
なお、計算量が定数であることからわかるように、いずれの場合でもリハッシュ（バケット数の調整）は行われない（はずだが、<code style='color:black'>[load_factor](/reference/unordered_set/unordered_set/load_factor.md)() > z</code> の場合に <code style='color:black'>[load_factor](/reference/unordered_set/unordered_set/load_factor.md)() <= z</code> を満たすようにリハッシュされる実装も多い）。</li>


##例

```cpp
<pre style='margin:0'><code style='color:black'>#include <iostream>
#include <unordered_set>

template<class C>
void print(const C& c)
{
  std::cout << "size is " << c.size() <<
    ", bucket_count is " << c.bucket_count() <<
    ", load_factor is " << c.load_factor() <<
    ", bucket_count * max_load_factor is " << static_cast<float>(c.bucket_count()) * c.<code style='color:red'>max_load_factor() << '\n' << std::endl;
}

int main()
{
  std::unordered_set<int> us(12);

  std::cout << "max_load_factor is " << us.max_load_factor() << "\n\n"; // (1) の形式。max_load_factor のデフォルトは 1.0f。
  print(us);

  us.max_load_factor(2.0f); // (2) の形式。max_load_factor を 2.0f に設定。

  float z = us.max_load_factor(); // (1) の形式。上記で設定した値。
  std::cout << "max_load_factor is " << z << "\n\n";
  print(us);

  decltype(us)::size_type b = us.bucket_count();
  float limit = static_cast<float>(b) * z;

  // max_load_factor を超えるちょっと前まで要素を追加。
  decltype(us)::size_type i = 1;
  for (; i < limit; ++i) {
    us.emplace(i);
  }

  // max_load_factor を超えて bucket_count が変わるまで、状態を出力しつつ要素を追加。
  for (; us.bucket_count() == b; ++i) {
    print(us);
    us.emplace(i);
  }

  // bucket_count が変わった直後の状態を出力。
  print(us);

  us.<code style='color:red'>max_load_factor(us.load_factor() / 2.0f); // (2) の形式。max_load_factor を現在の値の 1/2 を引数にして呼び出し。

  z = us.<code style='color:red'>max_load_factor(); // (1) の形式。上記で設定した値。
  std::cout << "max_load_factor is " << z << "\n\n";

  // 最終的な状態を出力。
  print(us);
}</pre>
```
* iostream[link /site/cpprefjp/reference/iostream]
* unordered_set[link /reference/unordered_set.md]
* size[link /reference/unordered_set/unordered_set/size.md]
* bucket_count[link /reference/unordered_set/unordered_set/bucket_count.md]
* load_factor[link /reference/unordered_set/unordered_set/load_factor.md]
* emplace[link /reference/unordered_set/unordered_set/emplace.md]

###出力

libstdc++ の出力例（4.7.2 現在）

<ol>

- <code style='color:black'>[load_factor](/reference/unordered_set/unordered_set/load_factor.md) > z</code> の場合に、<code style='color:red'>max_load_factor</code> を <code style='color:black'>z</code> に設定して <code style='color:black'>load_factor < max_load_factor</code> となるようにリハッシュされている。

- <code style='color:black'>[size](/reference/unordered_set/unordered_set/size.md) = 0</code> の場合にバケット数が減っている。

- <code style='color:black'>[emplace](/reference/unordered_set/unordered_set/emplace.md)</code> では、<code style='color:black'>[load_factor](/reference/unordered_set/unordered_set/load_factor.md)</code> が <code style='color:black'>max_load_factor</code> に達する前にバケット数が増加している。
</ol>
```cpp
<pre style='margin:0'><code style='color:black'>max_load_factor is 1

size is 0, bucket_count is 29, load_factor is 0, bucket_count * max_load_factor is 29

max_load_factor is 2

size is 0, bucket_count is 2, load_factor is 0, bucket_count * max_load_factor is 4

size is 3, bucket_count is 2, load_factor is 1.5, bucket_count * max_load_factor is 4

size is 4, bucket_count is 7, load_factor is 0.571429, bucket_count * max_load_factor is 14

max_load_factor is 0.285714

size is 4, bucket_count is 29, load_factor is 0.137931, bucket_count * max_load_factor is 8.28572

</pre>
```

libc++ の出力例（2012/12/19 現在）

<ol>

- <code style='color:black'>[load_factor](/reference/unordered_set/unordered_set/load_factor.md) > z</code> の場合に、<code style='color:red'>max_load_factor</code> を <code style='color:black'>[load_factor](/reference/unordered_set/unordered_set/load_factor.md)</code> の値を設定してリハッシュはされていない。

- <code style='color:black'>[size](/reference/unordered_set/unordered_set/size.md) = 0</code> の場合にもバケット数は減っていない。

- <code style='color:black'>[emplace](/reference/unordered_set/unordered_set/emplace.md)</code> では、<code style='color:black'>[load_factor](/reference/unordered_set/unordered_set/load_factor.md)</code> が <code style='color:black'>max_load_factor</code> を超えた際にバケット数が増加している。
</ol>
```cpp
<pre style='margin:0'><code style='color:black'>max_load_factor is 1

size is 0, bucket_count is 13, load_factor is 0, bucket_count * max_load_factor is 13

max_load_factor is 2

size is 0, bucket_count is 13, load_factor is 0, bucket_count * max_load_factor is 26

size is 25, bucket_count is 13, load_factor is 1.92308, bucket_count * max_load_factor is 26

size is 26, bucket_count is 13, load_factor is 2, bucket_count * max_load_factor is 26

size is 27, bucket_count is 29, load_factor is 0.931035, bucket_count * max_load_factor is 58

max_load_factor is 0.931035

size is 27, bucket_count is 29, load_factor is 0.931035, bucket_count * max_load_factor is 27

</pre>
```

##バージョン


###言語

- C++11

###処理系

- [Clang](/implementation#clang.md): -

- [Clang, C++0x mode](/implementation#clang.md): 3.1

- [GCC](/implementation#gcc.md): -

- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0

- [ICC](/implementation#icc.md): ?

- [Visual C++](/implementation#visual_cpp.md): ?

##参照

<table style='border-collapse:collapse;border-color:rgb(136,136,136);border-width:1px' cellspacing='0' bordercolor='#888' border='1'>
<tbody>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[operator=](/reference/unordered_set/unordered_set/op_assign.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>代入演算子</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[emplace](/reference/unordered_set/unordered_set/emplace.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>コンテナ内への要素の直接構築</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[emplace_hint](/reference/unordered_set/unordered_set/emplace_hint.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>挿入位置のヒントを使用したコンテナ内への要素の直接構築</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[insert](/reference/unordered_set/unordered_set/insert.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>要素の追加</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[size](/reference/unordered_set/unordered_set/size.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>要素数の取得</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[bucket_count](/reference/unordered_set/unordered_set/bucket_count.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>バケット数の取得</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[load_factor](./max_load_factor.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>現在の負荷率（バケットあたりの要素数の平均）を取得</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[rehash](/reference/unordered_set/unordered_set/rehash.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>最小バケット数指定によるバケット数の調整</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[reserve](/reference/unordered_set/unordered_set/reserve.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>最小要素数指定によるバケット数の調整</td>
</tr>
</tbody>
</table>