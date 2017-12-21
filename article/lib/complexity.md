# C++における時間計算量
* [mathjax enable]

標準ライブラリのコンテナとアルゴリズムの時間計算量について解説する。本記事で“計算量”と記述した場合、特に注釈のない限りは時間計算量を指す。


## 基本的な計算量と、C++における代表例

- 要素数に依存しない初期化： $O(1)$
- 要素数に依存した初期化（要素数が明らかな場合）: $O(n)$
- 要素数に依存した初期化（要素数を計算する必要がある場合）: $O(n \log n)$ （計算 $\log n$ + 構築 $n$）
- ソートを伴う初期化: $O(n \log n)$

| 計算量（少ない順） | 名称 | C++における代表例 |
|---|---|---|
| $O(1)$ | 定数時間<br>(*constant*) | デフォルトコンストラクタ<br>デフォルトデストラクタ<br>デストラクタ（子要素が無いもの）<br>ムーブコンストラクタ<br>`swap` 操作<br>生配列の添え字アクセス<br> *（時に規定がない場合の計算量とメモリ使用量として想定できるもの）* |
| - | 償却定数時間<br>(*amortized constant*) | [`std::vector::push_back`](/reference/vector/push_back.md) <br> *（たまに非常に長い時間がかかるが通常は短い時間で完了するために、平均的には定数時間とみなせるもの）* |
| $O(\log n)$ | 対数時間<br>(*logarithmic*) | 距離や範囲の再計算<br> *（前方向イテレータ要件を満たさないイテレータ範囲による初期化におけるメモリ再確保）* |
| $O(n)$ | 線形時間<br>(*linear*) | デストラクタ（全ての要素を破棄する必要があるもの）<br>コピーコンストラクタ<br>[`std::unordered_set` 同士の等値比較](/reference/unordered_set/unordered_set/op_equal.md) *（平均計算時間）* |
| $O(n \log n)$ | 線形対数時間<br>(*log-linear*) | [`std::sort`](/reference/algorithm/sort.md) <br> 一般的に **速い** とされるソート *（平均計算時間）* |
| $O({n^2})$ | 二乗時間<br>(*quadratic*) | 二重ループ<br>一般的に **遅い** とされるソート *（最悪計算時間）*<br>[`std::unordered_set` 同士の等値比較](/reference/unordered_set/unordered_set/op_equal.md) *（最悪計算時間）* |
| $O({n^c}), \exists c\ge 1$ | 多項式時間<br>(*polynomial*) | 多重ループ<br>行列計算 |
| $O({c^n}), \exists c\ge 1$ | 指数時間<br>(*exponential*) | *（遅すぎるため実用的でない）* |
| $O(n!)$ | 階乗時間<br>(*factorial*) | *（遅すぎるため実用的でない）* |


## コンテナの計算量

ここでは、以下に示すような通常の条件下での計算量を記載する。

- 処理系定義の最適化を考慮しない
- メモリ再確保が起こらない
- 要素自体はムーブ構築される

限定された条件下における厳密な計算量については、各メンバ関数のリファレンスを参照すること。


### 一般的なセマンティクスと計算量

本項ではセマンティクス全体の数学的な計算量を記載する。ただし内部実装による複数回の計算が明らかでかつ直感と反する場合は、これを併記する。


| セマンティクス | N要素の初期化 | コピー | 先頭 | 絶対位置 | 末尾 | 位置挿入 | 位置削除 |
|---|---|---|---|---|---|---|---|
| コンテナ **`C`** | <nobr>**`C c{first, last};`**</nobr> | <nobr>**`C c2{c1};`**</nobr><br><nobr>**`auto c2 = c1;`**</nobr> | <nobr>**`e = c.front();`**</nobr> | <nobr>**`e = c[i];`**</nobr><br><nobr>**`e = c.at(i);`**</nobr> | <nobr>**` e = c.back();`**</nobr> | <nobr>**`c.insert(pos, e);`**</nobr> | <nobr>**`c.erase(pos);`**</nobr> |
| **生配列**<br>[`array`](/reference/array.md) | O(n) | O(n) | O(1) | O(1) | O(1) | - | - |
| [`vector`](/reference/vector.md) | O(n) | O(n) | O(1) | O(1) | O(1) | O(n)<br>*（※数と位置に応じて）* | O(n)<br>*(※破棄コスト)* |
| [`deque`](/reference/deque.md) | O(n) | O(n) | O(1) | O(1) | O(1) | O(n)<br>*（※構築 n + 伸長 n）* | O(n)<br>*（※破棄 n + 収縮 n）*  |
| [`list`](/reference/list.md) | O(n) | O(n) | O(1) | - | O(1)| O(1) | O(1)<br>*(※破棄 n）* |
| [`forward_list`](/reference/forward_list.md) | O(n) | O(n) | O(1) | - | - | O(1) | O(1)<br>*(※破棄 n）* |
| [`set`](/reference/set.md) | *ソート済：* O(n)<br> *未ソート：* **O(n log n)** | O(n) | - | - | - | **ヒント付** | **ヒント付** |
| [`unordered_set`](/reference/unordered_set.md) | *平均：* O(n) <br> *最悪：* **O(n^2)** | *平均：* O(n) <br> *最悪：* **O(n^2)** | - | - | - | **ヒント付** | **ヒント付** |
| [`map`](/reference/map.md) | *ソート済：* O(n)<br> *未ソート：* **O(n log n)** | O(n) | - | O(log n) | - | **ヒント付** | **ヒント付** |
| [`unordered_map`](/reference/unordered_map.md) | *平均：* O(n) <br> *最悪：* **O(n^2)** | *平均：* O(n) <br> *最悪：* **O(n^2)** | - | *平均:* O(1)<br>*最悪:* **O(n)** | - | **ヒント付** | **ヒント付** |



### 特別なセマンティクスと計算量

| セマンティクス | 検索 | 一致範囲 | 指定挿入 | 指定削除 |
|---|---|---|---|---|
| （コンテナの種類） | <nobr>**`it = c.find(k);`**</nobr> | <nobr>**`b = c.equal_range(k);`**</nobr> | <nobr>**`c.insert(e);`**</nobr><br><nobr>**`c.insert({k, v});`**</nobr> | <nobr>**`c.erase(k);`**</nobr> |
| 連想コンテナ | <nobr>O(log n)</nobr> | <nobr>O(log n)</nobr>  | <nobr>O(log n)</nobr> | **O(log n)**, n = size() |
| ハッシュセット | *平均：* O(1) <br> *最悪：* **O(n)**  | <nobr>*平均：* **O(n)**, n = count(k)</nobr><br>*最悪：* O(n), n = size() | *平均：* O(1) <br> *最悪：* **O(n)** | <nobr>*平均：* **O(n)**, n = count(k)</nobr><br>*最悪：* O(n), n = size() |
| ハッシュマップ | （同上） | *平均：* O(1) <br> *最悪：* **O(n)** | （同上） | （同上） |
| その他のコンテナ | - | - | - | - |



### 凡例

- **`C`**  
  コンテナのクラス
- **`c`**, **`c1`**, **`c2`**  
  *`C`* クラスのオブジェクト
- **`e`**  
  要素（通常は *`C::value_type`*）
- **`first`**, **`last`**  
  `InputIterator` コンセプトを満たす [*first*, *last*) 範囲のイテレータ
- **`it`**  
  検索結果の要素の位置を示すイテレータ（通常は *`C::const_iterator`*）
- **`b`**  
  下境界と上境界のペア（通常は *`std::pair<C::const_iterator, C::const_iterator>`*）
- **`pos`**  
  挿入位置を示すイテレータ（通常は *`C::const_iterator`*）
- **`k`**  
  連想コンテナにおけるキー（通常は *`const C::key_type&`* ）
- **`i`**  
  添え字（通常は *`std::size_t`*）
- **`count(k)`**  
  操作の対象となった要素数
- **`size()`**  
  コンテナの全要素数
- *連想コンテナ*  
  C++に古くからあるコンテナ。  
  重複要素を許容するものと許容しないものがあり、格納順が規定されている。  
   [`set`](/reference/set/set.md) 、 [`multiset`](/reference/set/multiset.md) 、 [`map`](/reference/map/map.md) 、 [`multimap`](/reference/map/multimap.md)
- *ハッシュコンテナ、ハッシュセット、ハッシュマップ*  
  C++11から入った、内部実装にハッシュテーブルを用いるコンテナ。  
  重複要素は許容されず、格納順も規定されない。  
   [`unordered_set`](/reference/unordered_set.md) 、 [`unordered_map`](/reference/unordered_map.md)
- **「-」** （半角ハイフン）  
  そのセマンティクスが対象のコンテナに存在しないことを示す。
- **「ヒント付」**  
  限定された条件下の操作でヒントを正しく指定すると、計算量は大幅に減る。  
  詳細については、各メンバ関数のリファレンスを参照すること。



### 備考


- O(*size()*) と O(*N*) はどちらも $O(n)$ である。ここで、  
  *size()* はコンテナ自身の要素数、 *N* は操作の対象となった要素数。
- あるセマンティクスの全体の計算量が $O(n)$ でも、内部では線形時間未満の複数の操作が行われることがある。
- 操作対象の要素数より全要素数の方が、結果的にプログラムの実行時間に与える影響が大きいことがある。
- 先頭または末尾への１要素の挿入／削除が特別にサポートされているコンテナでは、その操作の計算量は基本的に O(1) である。  
  （例： [`std::deque::push_front`](/reference/deque/push_front.md) 、 [`std::deque::pop_back`](/reference/deque/pop_back.md) ）
- 前項の例外として、 [`std::vector::push_back`](/reference/vector/push_back.md) の計算量は、定数時間ではなく、 **償却定数時間** である。
-  [`std::array`](/reference/stack.md) 以外のコンテナにおける `swap` 操作の計算量は、 O(1) である。
-  [`std::stack`](/reference/stack.md) 、 [`std::queue`](/reference/queue/queue.md) 、 [`std::priority_queue`](/reference/queue/priority_queue.md) 等のコンテナアダプタの計算量は、内部実装の計算量に準じる。
-  重複要素を許容する連想コンテナの計算量は、重複要素を許容しない連想コンテナの計算量に準じる。
-  [`std::forward_list`](/reference/forward_list.md) はゼロオーバーヘッドを重視した設計のため、コンテナの要素数を O(1) で取得することはできない。
- [`std::valarray`](/reference/valarray.md) は専ら数値演算を目的として処理系定義の最適化が行われる可能性が高く、厳密な計算量の定義が難しいため、本記事では解説しない。


## アルゴリズムの計算量

この項では、標準ライブラリのアルゴリズムについて、本質的な処理自体の計算量を記述する。述語の内部の計算量などは考慮しない。

この項目は逆引きを目的としているため、原則として以下に当てはまる場合のみ解説する。

- 同じ問題を解決するための別の関数が用意されているもの
- プログラマの直感に反するような計算量があるもの
- 入門者がはまりやすい落とし穴があるもの
- その他、特筆性があるもの

---

> 🛈 この項目を加筆してください

---


### ソートアルゴリズム

ここでは、集合をソートするアルゴリズムをまとめる。

| 関数 | 一般的な実装 | 計算量の厳密さ | 処理回数と要素数との関係性 | 安定？ |
|---|---|---|---|---|
| [`sort`](/reference/algorithm/sort.md) | イントロソート | 正確 | N log N<br>(N == `last` - `first`) | 安定でない |
| [`stable_sort`](/reference/algorithm/stable_sort.md) | マージソート | 最大 | N log^2(N)<br>(N == `last` - `first`)<br> N log(N) ★<br>（メモリが十分のとき） | 安定 |


### 判定アルゴリズム

ここでは、集合の性質を取得するアルゴリズムをまとめる。


| 関数 | 一般的な実装 | 計算量の厳密さ | 処理回数と要素数との関係性 | 備考 |
|---|---|---|---|---|
| ? | ? | ? | ? | ? |


### 検索アルゴリズム

ここでは、集合から対象を探すアルゴリズムをまとめる。

| 関数 | 一般的な実装 | 計算量の厳密さ | 処理回数と要素数との関係性 | 備考 |
|---|---|---|---|---|
| `default_searcher` | ? | ? | ? | ? |
| `boyer_moore_searcher` | ? | ? | ? | ? |
| `boyer_moore_horspool_searcher` | ? | ? | ? | ? |



### 操作アルゴリズム

ここでは、集合に破壊的変更を加えるアルゴリズムをまとめる。

| 関数 | 一般的な実装 | 計算量の厳密さ | 処理回数と要素数との関係性 | 備考 |
|---|---|---|---|---|
| ? | ? | ? | ? | ? |


### 数値演算アルゴリズム

ここでは、数学的なアルゴリズムをまとめる。`<cmath>` に含まれる関数は、原則として解説しない。

| 関数 | 一般的な実装 | 計算量の厳密さ | 処理回数と要素数との関係性 | 備考 |
|---|---|---|---|---|
| `gcd` | 最大公約数 | ? | ? | ? |
| `lcm` | 最小公倍数 | ? | ? | ? |
| `accumulate` | 総和／集計 | ? | ? | ? |
| `inner_product` | 内積 | ? | ? | ? |
| `partial_sum` | ? | ? | ? | ? |
| `adjacent_difference` | ? | ? | ? | ? |

