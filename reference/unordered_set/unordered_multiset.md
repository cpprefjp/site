#unordered_multiset
```cpp
<pre style='margin:0'><code style='color:black'>namespace std {
  template <class Key,
            class Hash = std::hash<Key>,
            class Pred = std::equal_to<Key>,
            class Allocator = std::allocator<Key> >
  class unordered_multiset;
}</pre>
```
* hash[link /reference/functional/hash.md]
* equal_to[link /reference/functional/comparisons.md]
* allocator[link /reference/memory/allocator.md]

##概要

<code style='color:black'>unordered_multiset</code> は、同一キーの要素を複数格納できる、格納順が規定されていないコンテナである。

一般的には <code style='color:black'>hash_multiset</code> と呼ばれるコンテナであるが、標準への採用が遅かったことから、既に存在する各種コンテナとの名前の衝突を避けるため、<code style='color:black'>unordered_multiset</code> と名付けられた。

<code style='color:black'>hash_multiset</code> の特徴は以下の通りである。

<dl>
<dt>連想</dt>
<dd>標準の配列や <code style='color:black'>std::[vector](/reference/vector.md)</code> と異なり、コンテナ内の要素へのアクセスは絶対的な位置（添え字）によるのではなく、キーによる。</dd>
<dt>非順序</dt>
<dd>コンテナ内の各要素は、キーのハッシュ値に基づきハッシュテーブルに格納されるため、決められた順序で並んでいるわけではない。</dd>
<dt>マルチセット（multiset）</dt>
<dd>キーそのものが要素でもあり、かつ、同一のキー値を複数格納することができる。</dd>
</dl>

テンプレート引数 <code style='color:black'>Hash</code> は、以下に示す Hash requirements を満たし、テンプレート引数 <code style='color:black'>Key</code> のハッシュ関数として振る舞わなければならない。


- 関数オブジェクト型である。

- CopyConstructible requirements と Destructible requirements の要件を満たす。
<li><code style='color:black'>h</code> を <code style='color:black'>Hash</code> 型のオブジェクト、<code style='color:black'>Key</code> を <code style='color:black'>Hash</code> 型のオブジェクトの引数の型、<code style='color:black'>u</code> を <code style='color:black'>Key</code> 型の lvalue、<code style='color:black'>k</code> を <code style='color:black'>Key</code> 型（あるいは <code style='color:black'>const Key</code> 型）に変換可能な値とすると、以下の要件を満たす。

  
- <code style='color:black'>h(k)</code> は戻り値の型が <code style='color:black'>std::size_t</code> で、戻り値は引数 <code style='color:black'>k</code> のみにしかよらない
  
- <code style='color:black'>h(u)</code> は <code style='color:black'>u</code> を変更しない

</li>

テンプレート引数 <code style='color:black'>Pred</code> は二項述語で、テンプレート引数 <code style='color:black'>Key</code> に対する同値関係でなければならない。

テンプレート引数 <code style='color:black'>Allocator</code> は、Allocator requirements を満たさなければならない。


##メンバ関数


###構築／コピー／破棄

<table style='border-collapse:collapse;border-color:rgb(136,136,136);border-width:1px' cellspacing='0' bordercolor='#888' border='1'>
<tbody>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[(constructor)](./unordered_multiset/unordered_multiset.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>コンストラクタ</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[(destructor)](./unordered_multiset/-unordered_multiset.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>デストラクタ</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[operator=](./unordered_multiset/op_assign.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>代入演算子</td>
</tr>
</tbody>
</table>

###領域

<table style='border-collapse:collapse;border-color:rgb(136,136,136);border-width:1px' cellspacing='0' bordercolor='#888' border='1'>
<tbody>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[empty](./unordered_multiset/empty.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>コンテナが空かどうかを判定</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[size](./unordered_multiset/size.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>要素数の取得</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[max_size](./unordered_multiset/max_size.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>格納可能な最大の要素数の取得</td>
</tr>
</tbody>
</table>

###イテレータ

<table style='border-collapse:collapse;border-color:rgb(136,136,136);border-width:1px' cellspacing='0' bordercolor='#888' border='1'>
<tbody>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[begin](./unordered_multiset/begin.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>先頭要素を指すイテレータの取得</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[end](./unordered_multiset/end.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>最終要素の次を指すイテレータの取得</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[cbegin](./unordered_multiset/cbegin.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>先頭要素を指す読み取り専用イテレータの取得</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[cend](./unordered_multiset/cend.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>最終要素の次を指す読み取り専用イテレータの取得</td>
</tr>
</tbody>
</table>

###アロケータ

<table style='border-collapse:collapse;border-color:rgb(136,136,136);border-width:1px' cellspacing='0' bordercolor='#888' border='1'>
<tbody>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[get_allocator](./unordered_multiset/get_allocator.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>アロケータオブジェクトの取得</td>
</tr>
</tbody>
</table>

###コンテナの変更

<table style='border-collapse:collapse;border-color:rgb(136,136,136);border-width:1px' cellspacing='0' bordercolor='#888' border='1'>
<tbody>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[emplace](./unordered_multiset/emplace.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>コンテナ内への要素の直接構築</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[emplace_hint](./unordered_multiset/emplace_hint.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>挿入位置のヒントを使用したコンテナ内への要素の直接構築</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[insert](./unordered_multiset/insert.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>要素の追加</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[erase](./unordered_multiset/erase.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>要素の削除</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[clear](./unordered_multiset/clear.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>全要素の削除</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[swap](./unordered_multiset/swap.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>内容の交換</td>
</tr>
</tbody>
</table>

###オブザーバー

<table style='border-collapse:collapse;border-color:rgb(136,136,136);border-width:1px' cellspacing='0' bordercolor='#888' border='1'>
<tbody>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[hash_function](./unordered_multiset/hash_function.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>ハッシュ関数オブジェクトの取得</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[key_eq](./unordered_multiset/key_eq.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>キー比較用関数オブジェクトの取得</td>
</tr>
</tbody>
</table>

###検索

<table style='border-collapse:collapse;border-color:rgb(136,136,136);border-width:1px' cellspacing='0' bordercolor='#888' border='1'>
<tbody>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[find](./unordered_multiset/find.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>指定したキーの位置を検索</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[count](./unordered_multiset/count.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>指定したキーの要素数を取得</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[equal_range](./unordered_multiset/equal_range.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>指定したキーの範囲を取得</td>
</tr>
</tbody>
</table>

###バケットインタフェース

<table style='border-collapse:collapse;border-color:rgb(136,136,136);border-width:1px' cellspacing='0' bordercolor='#888' border='1'>
<tbody>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[bucket_count](./unordered_multiset/bucket_count.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>バケット数の取得</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[max_bucket_count](./unordered_multiset/max_bucket_count.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>最大バケット数の取得</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[bucket_size](./unordered_multiset/bucket_size.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>インデックス（添え字）で指定したバケット内の要素数を取得</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[bucket](./unordered_multiset/bucket.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>キーで指定したバケットのインデックス（添え字）を取得</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[begin(size_type)](./unordered_multiset/begin-size_type.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>インデックス（添え字）で指定したバケット内の先頭要素を指すイテレータを取得</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[end(size_type)](./unordered_multiset/end-size_type.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>インデックス（添え字）で指定したバケット内の最終要素の次を指すイテレータを取得</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[cbegin(size_type)](./unordered_multiset/cbegin-size_type.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>インデックス（添え字）で指定したバケット内の先頭要素を指す読み取り専用イテレータを取得</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[cend(size_type)](./unordered_multiset/cend-size_type.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>インデックス（添え字）で指定したバケット内の最終要素の次を指す読み取り専用イテレータを取得</td>
</tr>
</tbody>
</table>

###ハッシュポリシー

<table style='border-collapse:collapse;border-color:rgb(136,136,136);border-width:1px' cellspacing='0' bordercolor='#888' border='1'>
<tbody>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[load_factor](./unordered_multiset/load_factor.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>現在の負荷率（バケットあたりの要素数の平均）を取得</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[max_load_factor](./unordered_multiset/max_load_factor.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>負荷率の最大値を取得、設定</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[rehash](./unordered_multiset/rehash.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>最小バケット数指定によるバケット数の調整</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[reserve](./unordered_multiset/reserve.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>最小要素数指定によるバケット数の調整</td>
</tr>
</tbody>
</table>

##メンバ型

<table style='border-collapse:collapse;border-color:rgb(136,136,136);border-width:1px' cellspacing='0' bordercolor='#888' border='1'>
<tbody>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>key_type</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>キーの型。テンプレート引数 <code style='color:black'>Key</code>。</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>value_type</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>要素の型。テンプレート引数 <code style='color:black'>Key</code>。</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>hasher</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>キーのハッシュ関数の型。テンプレート引数 <code style='color:black'>Hash</code>。</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>key_equal</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>キーが等値か否かを判断するための二項述語の型。テンプレート引数 <code style='color:black'>Pred</code>。</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>allocator_type</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>アロケータの型。テンプレート引数 <code style='color:black'>Allocator</code>。</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>pointer</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>要素 <code style='color:black'>value_type</code>（<code style='color:black'>= Key</code>） へのポインタ。スマートポインタも可であるが、通常は <code style='color:black'>value_type*</code>。
規格書上は、<code style='color:black'>allocator_type::pointer</code>。
しかし、本来は <code style='color:black'>allocator_traits<Allocator>::pointer</code> が正しいと思われる。
（さもないと、必須である <code style='color:black'>allocator_type::value_type</code> のみを定義したユーザ定義のアロケータを使用することができないため）</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>const_pointer</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>要素 <code style='color:black'>value_type</code>（<code style='color:black'>= Key</code>） へのコンストポインタ。スマートポインタも可であるが、通常は <code style='color:black'>const value_type*</code>。
規格書上は、<code style='color:black'>allocator_type::const_pointer</code>。
しかし、本来は <code style='color:black'>allocator_traits<Allocator>::const_pointer</code> が正しいと思われる。
（さもないと、必須である <code style='color:black'>allocator_type::value_type</code> のみを定義したユーザ定義のアロケータを使用することができないため）</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>reference</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>要素 <code style='color:black'>value_type</code>（<code style='color:black'>= Key</code>） への参照。
規格書上は、<code style='color:black'>allocator_type::reference</code>。
しかし、本来は <code style='color:black'>value_type&</code> が正しいと思われる。
（さもないと、必須である <code style='color:black'>allocator_type::value_type</code> のみを定義したユーザ定義のアロケータを使用することができないため）</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>const_reference</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>要素 <code style='color:black'>value_type</code>（<code style='color:black'>= Key</code>） へのコンスト参照。
規格書上は、<code style='color:black'>allocator_type::const_reference</code>。
しかし、本来は <code style='color:black'>const value_type&</code> が正しいと思われる。
（さもないと、必須である <code style='color:black'>allocator_type::value_type</code> のみを定義したユーザ定義のアロケータを使用することができないため）</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>size_type</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>要素数を表す符号なし整数型。<code style='color:black'>difference_type</code>で表現可能な非負整数（0以上の整数）を表すことが可能。(通常は<code style='color:black'>[size_t](/reference/cstddef/size_t.md)</code>)</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>difference_type</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>同一のコンテナを指す <code style='color:black'>iterator</code> の差を表す符号付き整数型(通常は<code style='color:black'>[ptrdiff_t](/reference/cstddef/ptrdiff_t.md)</code>) 
<code style='color:black'>iterator_traits<iterator>::difference_type</code>、および、<code style='color:black'>iterator_traits<const_iterator>::difference_type</code> と同じ。</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>iterator</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>"読み取り専用"前方向イテレータ（誤植ではない）
規格書に記載はないが、（連想コンテナがそうであるように）<code style='color:black'>const_iterator</code> と同じ型か否かは実装依存であるものと思われる。
従って、ODR（One Definition Rule）に違反しないようにするため、関数のパラメータ型には常に <code style='color:black'>const_iterator</code> を使用したほうが良いかもしれない。</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>const_iterator</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>読み取り専用前方向イテレータ</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>local_iterator</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>同一バケット内のみで有効なイテレータ。
規格書に記載はないが、（<code style='color:black'>iterator</code> と同様）<code style='color:black'>const_local_iterator</code> と同じ型か否かは実装依存であるものと思われる。
<code style='color:black'>iterator</code> と、<code style='color:black'>iterator_category</code>、<code style='color:black'>value_type</code>、<code style='color:black'>difference_type</code>、<code style='color:black'>pointer</code>、<code style='color:black'>reference</code> は同一である。</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>const_local_iterator</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>同一バケット内のみで有効な読み取り専用イテレータ。
<code style='color:black'>const_iterator</code> と、<code style='color:black'>iterator_category</code>、<code style='color:black'>value_type</code>、<code style='color:black'>difference_type</code>、<code style='color:black'>pointer</code>、<code style='color:black'>reference</code> は同一である。</td>
</tr>
</tbody>
</table>

##非メンバ関数

<table style='border-collapse:collapse;border-color:rgb(136,136,136);border-width:1px' cellspacing='0' bordercolor='#888' border='1'>
<tbody>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[swap](./unordered_multiset/swap_free.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>内容の交換</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[operator==](./unordered_multiset/op_equal.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>等値比較</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[operator=!](./unordered_multiset/op_not_equal.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>非等値比較</td>
</tr>
</tbody>
</table>

##例

```cpp
<pre style='margin:0'><code style='color:black'>#include <iostream>
#include <unordered_set>
#include <iterator>
#include <algorithm>
#include <string>

template <class C>
void print(const C& c, std::ostream& os = std::cout)
{
  std::copy(std::begin(c), std::end(c), std::ostream_iterator<typename C::value_type>(os, ", "));
  os << std::endl;
}

int main()
{
  std::unordered_multiset<std::string> um{ "1st element", "2nd element", "3rd element", };

  print(um);

  um.insert({"2nd element", "4th element"});

  print(um);

  um.erase("2nd element");

  print(um);
}</pre>
```
* iostream[link /site/cpprefjp/reference/iostream]
* unordered_set[link /reference/unordered_set.md]
* iterator[link /reference/iterator.md]
* algorithm[link /reference/algorithm.md]
* string[link /reference/string.md]
* ostream[link /site/cpprefjp/reference/ostream]
* copy[link /reference/algorithm/copy.md]
* begin[link /reference/iterator/begin.md]
* end[link /reference/iterator/end.md]
* ostream_iterator[link /reference/iterator/ostream_iterator.md]
* unordered_multiset[link ./unordered_multiset.md]
* insert[link ./unordered_multiset/insert.md]
* erase[link ./unordered_multiset/erase.md]

###出力

```cpp
<pre style='margin:0'><code style='color:black'>3rd element, 1st element, 2nd element,
4th element, 3rd element, 1st element, 2nd element, 2nd element,
4th element, 3rd element, 1st element,</pre>
```

##バージョン


###言語

<li>C++11:
</li>

###参照

[Unordered associative containers do not use allocator_traits to define member types](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2050) （上記の <code style='color:black'>pointer</code>、<code style='color:black'>const_pointer</code>、<code style='color:black'>reference</code>、<code style='color:black'>const_reference</code> の問題に対する修正案）

