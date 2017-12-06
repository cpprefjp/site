# C++における計算量のオーダー
* [mathjax enable]

この記事では主に、標準ライブラリのコンテナとアルゴリズムの計算量について解説する。

## 基本的な計算量と、C++における代表例

- 要素数に依存しない初期化： $O(1)$
- 要素数に依存した初期化（要素数が明らかな場合）: $O(n)$
- 要素数に依存した初期化（要素数を計算する必要がある場合）: $O(\log n)$
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
| $2^{O(n)}$ | 指数時間<br>(*exponential*) | *（遅すぎるため実用的でない）* |
| $O(n!)$ | 階乗時間<br>(*factorial*) | *（遅すぎるため実用的でない）* |


## コンテナの計算量

ここでは、以下に示すような通常の条件下での計算量を記載する。

- メモリ再確保が起こらない
- 要素自体はムーブ構築される
- 挿入／削除する際の位置は、キーに応じて再計算するものとする
- 挿入／削除操作の場合、要素数は１つ
- 挿入／削除時のヒントは無し（※限定された条件下で正しく指定すると、計算量は減る）

特殊な条件下における厳密な計算量については、個別ページを参照すること。


| コンテナ | N要素の初期化 | コピー | 参照/検索 | 先頭 | 中間 | 末尾 | 挿入（１要素） | 削除（１要素） |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| [`vector`](/reference/vector.md) | O(n) | O(n) | - | O(1) | O(1) | O(1) | *数と位置に応じて* O(n) | O(n) *(破棄)* |
| [`deque`](/reference/deque.md) | O(n) | O(n) | - | O(1) | O(1) | O(1) | O(n) *(構築)* + O(n) *(内部伸長)* | O(n) *(破棄)* + O(n) *(内部収縮)*  |
| [`list`](/reference/list.md) | O(n) | O(n) | - | O(1) | __不可__  | O(1)| O(1) | O(1) |
| [`set`](/reference/set.md) | *ソート済：* O(n)<br> *未ソート：* __O(n log n)__ | O(n) | O(log n) | - | - | - | O(log n) | O(log n) |
| [`unordered_set`](/reference/unordered_set.md) | *平均：* O(n) <br> *最悪：* __O(n^2)__ | *平均：* O(n) <br> *最悪：* __O(n^2)__ |  *平均：* O(1) <br> *最悪：* __O(n)__ | - | - | - | *平均：* O(1) <br> *最悪：* O(n) | *平均：* O(1) <br> *最悪：* O(n) |
| [`map`](/reference/map.md) | *ソート済：* O(n)<br> *未ソート：* __O(n log n)__ | O(n) | O(log n) | - | - | - | O(log n)  | O(log n) |
| [`unordered_map`](/reference/unordered_map.md) | *平均：* O(n) <br> *最悪：* __O(n^2)__ | *平均：* O(n) <br> *最悪：* __O(n^2)__ |  *平均：* O(1) <br> *最悪：* __O(n)__ | - | - | - | *平均：* O(1) <br> *最悪：* O(n)  | *平均：* O(1) <br> *最悪：* O(n) |


### 備考

- 先頭または末尾への１要素の挿入／削除が特別にサポートされているコンテナでは、その操作の計算量は基本的に O(1) である。
- [`std::vector::push_back`](/reference/vector/push_back.md) の計算量は、 __償却定数時間__ である。
-  [`std::array`](/reference/stack.md) 以外のコンテナにおける `swap` 操作の計算量は、 O(1) である。
-  [`std::stack`](/reference/stack.md) 、 [`std::queue`](/reference/queue/queue.md) 、 [`std::priority_queue`](/reference/queue/priority_queue.md) 等のコンテナアダプタの計算量は、内部実装の計算量に準じる。
-  重複要素を許容する連想コンテナの計算量は、重複要素を許容しない連想コンテナの計算量に準じる。


## アルゴリズムの計算量

ここでは、対象の操作における本質的な処理自体の計算量を記述する。述語の内部の計算量などは考慮しない。

（この項目を加筆してください）


| ソート／判定／検索／操作 | 関数名 | 一般的な内部実装の名称 | 計算量の厳密さ | 安定？ | 処理回数と要素数との関係性 |
|:---:|---|---|:---:|:---:|---|
| ソート | [`std::sort`](/reference/algorithm/sort.md) | イントロソート | 正確 | 安定でない | N log N<br>(N == `last` - `first`) |
| ソート | [`std::stable_sort`](/reference/algorithm/stable_sort.md) | マージソート | 最大 | 安定 | N log^2(N)<br>(N == `last` - `first`)<br> N log(N) ★<br>（メモリが十分のとき） |
