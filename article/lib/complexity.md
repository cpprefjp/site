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
| $O(n \log n)$ | 線形対数時間<br>(*log-linear*) | [`std::sort`](/reference/algorithm/sort.md) <br> 一般的に __速い__ とされるソート *（平均計算時間）* |
| $O({n^2})$ | 二乗時間<br>(*quadratic*) | 二重ループ<br>一般的に __遅い__ とされるソート *（最悪計算時間）*<br>[`std::unordered_set` 同士の等値比較](/reference/unordered_set/unordered_set/op_equal.md) *（最悪計算時間）* |
| $O({n^c}), \exists c\ge 1$ | 多項式時間<br>(*polynomial*) | 多重ループ<br>行列計算 |
| $O({c^n}), \exists c\ge 1$ | 指数時間<br>(*exponential*) | *（遅すぎるため実用的でない）* |
| $O(n!)$ | 階乗時間<br>(*factorial*) | *（遅すぎるため実用的でない）* |


## コンテナの計算量

ここでは、以下に示すような通常の条件下での計算量を記載する。

- 処理系定義の最適化を考慮しない
- メモリ再確保が起こらない
- 要素自体はムーブ構築される

限定された条件下における厳密な計算量については、各メンバ関数のリファレンスを参照すること。


### 凡例

- __`C`__  
  コンテナのクラス
- __`c`__, __`c1`__, __`c2`__  
  *`C`* クラスのオブジェクト
- __`e`__  
  要素（通常は *`C::value_type`*）
- __`first`__, __`last`__  
  `InputIterator` コンセプトを満たす [*first*, *last*) 範囲のイテレータ
- __`it`__  
  検索結果の要素の位置を示すイテレータ（通常は *`C::const_iterator`*）
- __`pos`__  
  挿入位置を示すイテレータ（通常は *`C::const_iterator`*）
- __`k`__  
  連想コンテナにおけるキー（通常は *`C::key_type const&`* ）
- __`i`__  
  添え字（通常は *`std::size_t`*）
- __n__, __`count(k)`__  
  操作の対象となった要素数
- __`size()`__  
  コンテナの全要素数
- *連想コンテナ*  
  C++に古くからあるコンテナ。  
  重複要素を許容するものと許容しないものがあり、格納順が規定されている。  
   [`set`](/reference/set.md) 、 [`map`](/reference/map.md)
- *ハッシュコンテナ*  
  C++11から入った、内部実装にハッシュテーブルを用いるコンテナ。  
  重複要素は許容されず、格納順も規定されない。  
   [`unordered_set`](/reference/unordered_set.md) 、 [`unordered_map`](/reference/unordered_map.md)
- __「-」__ （半角ハイフン）  
  そのセマンティクスが対象のコンテナに存在しないことを示す。
- __「ヒント付」__  
  限定された条件下の操作でヒントを正しく指定すると、計算量は大幅に減る。  
  詳細については、各メンバ関数のリファレンスを参照すること。


### 注意

- O(*size()*) と O(*N*) はどちらも $O(n)$ である。ここで、  
  *size()* はコンテナ自身の要素数、 *N* は操作の対象となった要素数。
- あるセマンティクスの全体の計算量が $O(n)$ でも、内部では線形時間未満の複数の操作が行われることがある。
- 操作対象の要素数より全要素数の方が、結果的にプログラムの実行時間に与える影響が大きいことがある。


### 一般的なセマンティクスと計算量

本項ではセマンティクス全体の数学的な計算量を記載する。ただし内部実装による複数回の計算が明らかでかつ直感と反する場合は、これを併記する。


| セマンティクス | N要素の初期化 | コピー | 先頭 | 中間 | 末尾 | 位置挿入 | 位置削除 |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| コンテナ __`C`__ | <nobr>__`C c{first, last};`__</nobr> | <nobr>__`C c2{c1};`__</nobr><br><nobr>__`auto c2 = c1;`__</nobr> | <nobr>__`e = c.front();`__</nobr> | <nobr>__`e = c[i];`__</nobr><br><nobr>__`e = c.at(i);`__</nobr> | <nobr>__` e = c.back();`__</nobr> | <nobr>__`c.insert(pos, e);`__</nobr> | <nobr>__`c.erase(pos);`__</nobr> |
| __生配列__<br>[`array`](/reference/array.md) | O(n) | O(n) | O(1) | O(1) | O(1) | - | - |
| [`vector`](/reference/vector.md) | O(n) | O(n) | O(1) | O(1) | O(1) | O(n)<br>*（※数と位置に応じて）* | O(n)<br>*(※破棄コスト)* |
| [`deque`](/reference/deque.md) | O(n) | O(n) | O(1) | O(1) | O(1) | O(n)<br>*（※構築 n + 伸長 n）* | O(n)<br>*（※破棄 n + 収縮 n）*  |
| [`list`](/reference/list.md) | O(n) | O(n) | O(1) | - | O(1)| O(1) | O(1)<br>*(※破棄 n）* |
| [`forward_list`](/reference/forward_list.md) | O(n) | O(n) | O(1) | - | - | O(1) | O(1)<br>*(※破棄 n）* |
| [`set`](/reference/set.md) | *ソート済：* O(n)<br> *未ソート：* __O(n log n)__ | O(n) | - | - | - | __ヒント付__ | __ヒント付__ |
| [`unordered_set`](/reference/unordered_set.md) | *平均：* O(n) <br> *最悪：* __O(n^2)__ | *平均：* O(n) <br> *最悪：* __O(n^2)__ | - | - | - | __ヒント付__ | __ヒント付__ |
| [`map`](/reference/map.md) | *ソート済：* O(n)<br> *未ソート：* __O(n log n)__ | O(n) | - | - | - | __ヒント付__ | __ヒント付__ |
| [`unordered_map`](/reference/unordered_map.md) | *平均：* O(n) <br> *最悪：* __O(n^2)__ | *平均：* O(n) <br> *最悪：* __O(n^2)__ | - | - | - | __ヒント付__ | __ヒント付__ |



### 特別なセマンティクスと計算量

| セマンティクス | 検索 | 指定挿入 | 指定削除 |
|:---:|:---:|:---:|:---:|
| （コンテナの種類） | <nobr>__`it = c.find(k);`__</nobr> | <nobr>__`c.insert(e);`__</nobr><br><nobr>__`c.insert({k, v});`__</nobr> | <nobr>__`c.erase(k);`__</nobr> |
| 連想コンテナ | O(log n) | O(log n) | __O(log size())__ |
| ハッシュコンテナ | *平均：* O(1) <br> *最悪：* __O(size())__  | *平均：* O(1) <br> *最悪：* __O(size())__ | *平均：* __O(count(k))__<br>*最悪：* O(size()) |
| その他のコンテナ | - | - | - |



### 備考

- 先頭または末尾への１要素の挿入／削除が特別にサポートされているコンテナでは、その操作 （たとえば `push_front(e)`） の計算量は基本的に O(1) である。
- [`std::vector::push_back`](/reference/vector/push_back.md) の計算量は、定数時間ではなく、 __償却定数時間__ である。
-  [`std::array`](/reference/stack.md) 以外のコンテナにおける `swap` 操作の計算量は、 O(1) である。
-  [`std::stack`](/reference/stack.md) 、 [`std::queue`](/reference/queue/queue.md) 、 [`std::priority_queue`](/reference/queue/priority_queue.md) 等のコンテナアダプタの計算量は、内部実装の計算量に準じる。
-  重複要素を許容する連想コンテナの計算量は、重複要素を許容しない連想コンテナの計算量に準じる。
-  [`std::forward_list`](/reference/forward_list.md) はゼロオーバーヘッドを重視した設計のため、コンテナの要素数を O(1) で取得することはできない。
- [`std::valarray`](/reference/valarray.md) は専ら数値演算を目的として処理系定義の最適化が行われる可能性が高く、厳密な計算量の定義が難しいため、本記事では解説しない。


## アルゴリズムの計算量

ここでは、対象の操作における本質的な処理自体の計算量を記述する。述語の内部の計算量などは考慮しない。

（この項目を加筆してください）


| ソート／判定／検索／操作 | 関数名 | 一般的な内部実装の名称 | 計算量の厳密さ | 安定？ | 処理回数と要素数との関係性 |
|:---:|---|---|:---:|:---:|---|
| ソート | [`std::sort`](/reference/algorithm/sort.md) | イントロソート | 正確 | 安定でない | N log N<br>(N == `last` - `first`) |
| ソート | [`std::stable_sort`](/reference/algorithm/stable_sort.md) | マージソート | 最大 | 安定 | N log^2(N)<br>(N == `last` - `first`)<br> N log(N) ★<br>（メモリが十分のとき） |
