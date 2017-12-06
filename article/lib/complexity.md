# C++における計算量のオーダー
* [mathjax enable]

この記事では主に、標準ライブラリのコンテナとアルゴリズムの計算量について解説する。

## 基本的な計算量と、C++における代表例

- 要素数に依存しない初期化： $O\left(1\right)$
- 要素数に依存した初期化（要素数が明らかな場合）: $O\left(n\right)$
- 要素数に依存した初期化（要素数を計算する必要がある場合）: $O\left(\log n\right)$
- ソートを伴う初期化: $O\left(n \log n\right)$

| 計算量（少ない順） | 名称 | C++における代表例 |
|---|---|---|
| $O\left(1\right)$ | 定数時間<br>(*constant*) | デフォルトコンストラクタ<br>デフォルトデストラクタ<br>デストラクタ（子要素が無いもの）<br>ムーブコンストラクタ<br>`swap` 操作<br>生配列の添え字アクセス<br> *（時に規定がない場合の計算量とメモリ使用量として想定できるもの）* |
| - | 償却定数時間<br>(*amortized constant*) | [`std::vector::push_back`](/reference/vector/push_back.md) <br> *（たまに非常に長い時間がかかるが通常は短い時間で完了するために、平均的には定数時間とみなせるもの）* |
| $O\left(\log n\right)$ | 対数時間<br>(*logarithmic*) | 距離や範囲の再計算<br> *（前方向イテレータ要件を満たさないイテレータ範囲による初期化におけるメモリ再確保）* |
| $O\left(n\right)$ | 線形時間<br>(*linear*) | デストラクタ（全ての要素を破棄する必要があるもの）<br>コピーコンストラクタ<br>[`std::unordered_set` 同士の等値比較](/reference/unordered_set/unordered_set/op_equal.md) *（平均計算時間）* |
| $O\left(n \log n\right)$ | 線形対数時間<br>(*log-linear*) | [`std::sort`](/reference/algorithm/sort.md) <br> 一般的に __速い__ とされるソート *（平均計算時間）* |
| $O\left({n^2}\right)$ | 二乗時間<br>(*quadratic*) | 二重ループ<br>一般的に __遅い__ とされるソート *（最悪計算時間）*<br>[`std::unordered_set` 同士の等値比較](/reference/unordered_set/unordered_set/op_equal.md) *（最悪計算時間）* |
| $O\left({n^c}\right), \exist c\ge 1$ | 多項式時間<br>(*polynomial*) | 多重ループ<br>行列計算 |
| ${2^O\left(n\right)}$ | 指数時間<br>(*exponential*) | *（遅すぎるため実用的でない）* |
| $O\left(n!\right)$ | 階乗時間<br>(*factorial*) | *（遅すぎるため実用的でない）* |


## コンテナの計算量

（執筆中）

ここでは、メモリ再確保が起こらない場合の通常の計算量を記載する。厳密な条件については、個別ページを参照すること。

`std::stack` 、 `std::queue` 、 `std::priority_queue` 等のコンテナアダプタの計算量は、内部実装の計算量に準じる。

| コンテナ | N要素の初期化 | コピー | 取得 | 先頭 | 中間 | 末尾 | 挿入 | 削除 | 
|---|---|---|---|---|---|---|---|---|
| [`array`](/reference/array.md) <a href="site-1">[^1]</a> | | | | | | | | |
| [`vector`](/reference/vector.md) | | | | | | | | |
| [`deque`](/reference/deque.md) | | | | | | | | |
| [`list`](/reference/list.md) | | | | | | | | |
| [`set`](/reference/set.md) | | | | | | | | |
| [`unordered_set`](/reference/unordered_set.md) | | | | | | | | |
| [`multiset`](/reference/multiset.md) | | | | | | | | |
| [`unordered_multiset`](/reference/unordered_multiset.md) | | | | | | | | |
| [`map`](/reference/map.md) | | | | | | | | |
| [`unordered_map`](/reference/unordered_map.md) | | | | | | | | |
| [`multimap`](/reference/multimap.md) | | | | | | | | |
| [`unordered_multimap`](/reference/unordered_multimap.md) | | | | | | | | |

- <a name="site-1"></a>[^1]: `std::array` は `swap` の計算量が定数時間でないため、コンテナの要件を満たさない（それ以外のコンテナは、全て定数時間である）。


## アルゴリズムの計算量

（執筆中）
