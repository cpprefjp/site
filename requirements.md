# 標準ライブラリ要件

ここでは、C++標準ライブラリの要件 (requirements) を解説する。

要件とは、ライブラリがユーザーの型に対して要求する性質のことである。たとえば[`std::vector`](/reference/vector/vector.md)の要素型には「コンテナから削除できること」が要求され、[`std::map`](/reference/map/map.md)のキー型には「比較できること」が要求される。

要件を知る必要があるのは、おもに以下の場合である。

- 標準ライブラリに渡す自作の型が、どの性質を満たす必要があるかを確認する
- 標準ライブラリと同じように使えるコンテナ・アロケータ・イテレータ・クロックなどを自作する

標準ライブラリの要件には、コンセプトとして定義されるものと、規格の文章と表によって定義されるものがある。コンセプトとして定義される要件は、[`<concepts>`](/reference/concepts.md)・[`<iterator>`](/reference/iterator.md)・[`<ranges>`](/reference/ranges.md)などが提供する機能であり、コンパイル時に検査できるため、各コンセプトのリファレンスページで解説する。ここでは、コンセプトとして定義されていない要件を解説する。これらの要件は、満たしていなくてもコンパイルエラーにならないことがあり、満たさない場合の動作は保証されない。

`Cpp17`で始まる名前の要件は、C++20で同名のコンセプトが追加されたことにともない、区別のために接頭辞が付けられたものである。要件そのものはC++17以前から存在する。名前が似ていても要求する内容は同一ではないため、コンセプトを満たす型がその要件を満たすとは限らない。


## 型とその式に対する要件
ライブラリ全体で使用される、基本的な要件である。

| 名前                        | 説明                                             |
|-----------------------------|--------------------------------------------------|
| [`Cpp17EqualityComparable`](requirements/Cpp17EqualityComparable.md)     | `==`による等値比較ができる                 |
| [`Cpp17LessThanComparable`](requirements/Cpp17LessThanComparable.md.nolink)     | `<`による大小比較ができる                  |
| [`Cpp17DefaultConstructible`](requirements/Cpp17DefaultConstructible.md.nolink) | デフォルト構築ができる                     |
| [`Cpp17MoveConstructible`](requirements/Cpp17MoveConstructible.md.nolink)       | ムーブ構築ができる                         |
| [`Cpp17CopyConstructible`](requirements/Cpp17CopyConstructible.md.nolink)       | コピー構築ができる                         |
| [`Cpp17MoveAssignable`](requirements/Cpp17MoveAssignable.md.nolink)             | ムーブ代入ができる                         |
| [`Cpp17CopyAssignable`](requirements/Cpp17CopyAssignable.md.nolink)             | コピー代入ができる                         |
| [`Cpp17Destructible`](requirements/Cpp17Destructible.md.nolink)                 | 破棄ができる                               |
| [`Cpp17Swappable`](requirements/Cpp17Swappable.md.nolink)                       | 2つのオブジェクトを交換できる              |
| [`Cpp17ValueSwappable`](requirements/Cpp17ValueSwappable.md.nolink)             | イテレータが指す先の値を交換できる         |
| [`Cpp17NullablePointer`](requirements/Cpp17NullablePointer.md.nolink)           | ヌル値をもつポインタのように扱える         |
| [`Cpp17Hash`](requirements/Cpp17Hash.md.nolink)                                 | ハッシュ値を求める関数オブジェクトである   |


## 型特性の要件
[`<type_traits>`](/reference/type_traits.md)の型特性が満たす要件である。自作の型特性を標準ライブラリと同じ形式で定義する場合にも使用する。

| 名前                        | 説明                                             |
|-----------------------------|--------------------------------------------------|
| [`Cpp17UnaryTypeTrait`](requirements/Cpp17UnaryTypeTrait.md.nolink)           | 1つの型の性質を表す型特性である     |
| [`Cpp17BinaryTypeTrait`](requirements/Cpp17BinaryTypeTrait.md.nolink)         | 2つの型の関係を表す型特性である     |
| [`Cpp17TransformationTrait`](requirements/Cpp17TransformationTrait.md.nolink) | 型を変換する型特性である            |


## 列挙型・ビットマスク型の要件
標準ライブラリが提供する型のうち、値の集合を表す型が満たす要件である。処理系がこれらの型をどう実装してよいかを規定するものであり、ユーザーがこの要件を満たす型を書くことは想定されていない。

| 名前                        | 説明                                             |
|-----------------------------|--------------------------------------------------|
| [`列挙型`](requirements/enumerated_type.md.nolink)  | 入出力・正規表現ライブラリで使用される、列挙型として実装できる型である |
| [`ビットマスク型`](requirements/bitmask_type.md.nolink) | ビット単位の論理演算によって値を組み合わせられる型である。列挙型・整数型・[`std::bitset`](/reference/bitset/bitset.md)のいずれでも実装できる |


## メモリ管理の要件
自作のアロケータを標準ライブラリのコンテナに渡す場合に必要な要件である。

| 名前                        | 説明                                             |
|-----------------------------|--------------------------------------------------|
| [`Cpp17Allocator`](requirements/Cpp17Allocator.md)                             | 記憶域の確保・解放を行うアロケータである |
| [`アロケータの完全性要件`](requirements/allocator_completeness.md.nolink)             | 不完全型に対してアロケータを使用できる   |


## イテレータの要件
コンセプトによるイテレータの分類 ([`std::input_iterator`](/reference/iterator/input_iterator.md)など) とは別に、C++17以前から存在するイテレータの分類である。イテレータを引数に取るアルゴリズムの多くは、いまもこの要件で規定されている。

| 名前                        | 説明                                             |
|-----------------------------|--------------------------------------------------|
| [`Cpp17Iterator`](requirements/Cpp17Iterator.md.nolink)                           | すべてのイテレータが満たす基本要件         |
| [`Cpp17InputIterator`](requirements/Cpp17InputIterator.md.nolink)                 | 読み取り方向に1回だけ走査できる            |
| [`Cpp17OutputIterator`](requirements/Cpp17OutputIterator.md.nolink)               | 書き込み方向に1回だけ走査できる            |
| [`Cpp17ForwardIterator`](requirements/Cpp17ForwardIterator.md.nolink)             | 前方に何度でも走査できる                   |
| [`Cpp17BidirectionalIterator`](requirements/Cpp17BidirectionalIterator.md.nolink) | 前方・後方に走査できる                     |
| [`Cpp17RandomAccessIterator`](requirements/Cpp17RandomAccessIterator.md.nolink)   | 任意の位置へ定数時間で移動できる           |


## コンテナの要件
自作のコンテナを標準ライブラリのアルゴリズムやコンテナアダプタから使えるようにする場合に必要な要件である。

| 名前                        | 説明                                             |
|-----------------------------|--------------------------------------------------|
| [`コンテナ要件`](requirements/container.md.nolink)                                     | すべてのコンテナが満たす基本要件                       |
| [`逆順可能コンテナ要件`](requirements/reversible_container.md.nolink)               | 逆順に走査できるコンテナの要件                         |
| [`オプショナルなコンテナ操作の要件`](requirements/optional_container_operations.md.nolink) | 提供する場合には定められた意味をもつ操作の要件         |
| [`アロケータ対応コンテナの要件`](requirements/allocator_aware_container.md.nolink)      | アロケータを受け取り、要素の構築・破棄に使うコンテナの要件 |
| [`シーケンスコンテナ要件`](requirements/sequence_container.md.nolink)                   | 要素を一列に保持するコンテナの要件                     |
| [`連想コンテナ要件`](requirements/associative_container.md.nolink)                      | キーの比較によって要素を保持するコンテナの要件         |
| [`非順序連想コンテナ要件`](requirements/unordered_associative_container.md.nolink)      | キーのハッシュ値によって要素を保持するコンテナの要件   |


### コンテナの要素に対する要件
コンテナが要素型に対して要求する要件である。どの操作を使用するかによって、要求される要件が異なる。

| 名前                        | 説明                                             |
|-----------------------------|--------------------------------------------------|
| [`Cpp17Erasable`](requirements/Cpp17Erasable.md.nolink)                         | コンテナから要素を破棄できる                 |
| [`Cpp17DefaultInsertable`](requirements/Cpp17DefaultInsertable.md.nolink)       | 値を指定せずに要素を挿入できる               |
| [`Cpp17MoveInsertable`](requirements/Cpp17MoveInsertable.md.nolink)             | ムーブによって要素を挿入できる               |
| [`Cpp17CopyInsertable`](requirements/Cpp17CopyInsertable.md.nolink)             | コピーによって要素を挿入できる               |
| [`Cpp17EmplaceConstructible`](requirements/Cpp17EmplaceConstructible.md.nolink) | 引数から要素を直接構築できる                 |


### 多次元配列ビューの要件
[`std::mdspan`](/reference/mdspan/mdspan.md)に渡す、レイアウトとアクセス方法をカスタマイズするための要件である。

| 名前                        | 説明                                             |
|-----------------------------|--------------------------------------------------|
| [`レイアウトマッピング要件`](requirements/layout_mapping.md.nolink)                       | 多次元のインデックスを1次元の位置へ対応付ける   |
| [`レイアウトマッピングポリシー要件`](requirements/layout_mapping_policy.md.nolink)         | 要素数からレイアウトマッピングを決定する        |
| [`アクセサポリシー要件`](requirements/accessor_policy.md.nolink)                          | 位置から要素を参照する方法を提供する            |
| [`スライス可能なレイアウトマッピング要件`](requirements/sliceable_layout_mapping.md.nolink) | 部分多次元配列を取り出せるレイアウトマッピングである |


## アルゴリズムの要件
アルゴリズムに渡す関数オブジェクトが満たすべき要件である。

| 名前                        | 説明                                             |
|-----------------------------|--------------------------------------------------|
| [`並列アルゴリズムに渡す関数オブジェクトの要件`](requirements/parallel_algorithm_user.md.nolink) | 並列に実行されるため、データ競合を起こしてはならない |
| [`安定なアルゴリズムの要件`](requirements/stable_algorithm.md.nolink)                            | 等価な要素の相対順序を保つ                           |


## 時間の要件
自作のクロックを[`<chrono>`](/reference/chrono.md)の機能に渡す場合に必要な要件である。

| 名前                        | 説明                                             |
|-----------------------------|--------------------------------------------------|
| [`Cpp17Clock`](requirements/Cpp17Clock.md.nolink)               | 現在時刻を取得できるクロックである                   |
| [`Cpp17TrivialClock`](requirements/Cpp17TrivialClock.md.nolink) | 時刻の型に対する操作が例外を投げないクロックである |


## 並行・並列の要件
自作のロック機構を[`std::lock_guard`](/reference/mutex/lock_guard.md)などに渡す場合に必要な要件である。

| 名前                        | 説明                                             |
|-----------------------------|--------------------------------------------------|
| [`Cpp17BasicLockable`](requirements/Cpp17BasicLockable.md.nolink)           | ロックとアンロックができる                         |
| [`Cpp17Lockable`](requirements/Cpp17Lockable.md.nolink)                     | ロックの試行ができる                               |
| [`Cpp17TimedLockable`](requirements/Cpp17TimedLockable.md.nolink)           | 時間制限付きでロックの試行ができる                 |
| [`Cpp17SharedLockable`](requirements/Cpp17SharedLockable.md.nolink)         | 共有ロックができる                                 |
| [`Cpp17SharedTimedLockable`](requirements/Cpp17SharedTimedLockable.md.nolink) | 時間制限付きで共有ロックができる                 |
| [`mutex型の要件`](requirements/mutex_type.md.nolink)                        | スレッド間で排他制御を行う                         |
| [`時間制限付きmutex型の要件`](requirements/timed_mutex_type.md.nolink)       | 時間制限付きのロックを提供するmutex型である        |
| [`共有mutex型の要件`](requirements/shared_mutex_type.md.nolink)             | 共有ロックを提供するmutex型である                  |
| [`共有時間制限付きmutex型の要件`](requirements/shared_timed_mutex_type.md.nolink) | 時間制限付きの共有ロックを提供するmutex型である |


## 数値・乱数の要件
自作の乱数エンジンや乱数分布を[`<random>`](/reference/random.md)の機能に渡す場合に必要な要件である。

| 名前                        | 説明                                             |
|-----------------------------|--------------------------------------------------|
| [`数値型の要件`](requirements/numeric_type.md.nolink)                             | [`std::complex`](/reference/complex/complex.md)と[`std::valarray`](/reference/valarray/valarray.md)の要素型が満たす要件 |
| [`シード列の要件`](requirements/seed_sequence.md.nolink)                          | 乱数エンジンの初期状態を生成する                     |
| [`一様乱数ビット生成器の要件`](requirements/uniform_random_bit_generator.md.nolink) | 一様分布する符号なし整数値を生成する                 |
| [`乱数エンジンの要件`](requirements/random_number_engine.md.nolink)               | 状態を持ち、擬似乱数列を生成する                     |
| [`乱数エンジンアダプタの要件`](requirements/random_number_engine_adaptor.md.nolink) | ほかの乱数エンジンの出力を加工する                   |
| [`乱数分布の要件`](requirements/random_number_distribution.md.nolink)             | 乱数ビット列を目的の確率分布に変換する               |
| [`線形代数の値型の要件`](requirements/linalg_value_type.md.nolink)                | [`<linalg>`](/reference/linalg.md)のアルゴリズムが扱う値型の要件 |


## 文字列・書式化・正規表現の要件
文字列・書式化・正規表現の各ライブラリの動作をカスタマイズするための要件である。

| 名前                        | 説明                                             |
|-----------------------------|--------------------------------------------------|
| [`文字特性の要件`](requirements/char_traits.md.nolink)         | 文字型に対する操作を提供する                          |
| [`BasicFormatter`](requirements/BasicFormatter.md.nolink)      | 型を書式化する方法を提供する                          |
| [`Formatter`](requirements/Formatter.md.nolink)                | 書式化の指定を解析し、型を書式化する方法を提供する    |
| [`正規表現traitsの要件`](requirements/regex_traits.md.nolink)  | 正規表現の文字の分類・変換を提供する                  |


## 入出力の要件
入出力ライブラリが使用する型が満たす要件である。

| 名前                        | 説明                                             |
|-----------------------------|--------------------------------------------------|
| [`fpos型の要件`](requirements/fpos_type.md.nolink) | ストリーム中の位置を表す型である |


## 運営方針
requirements階層にあるページは、以下の方針のもとに執筆している。

- 要件を満たす型を自作するための情報を提供する
    - 要件の内容を列挙するだけでなく、その要件を満たす型の最小限の実装例を示す
    - 標準ライブラリのどの機能がその要件を要求するかを記載する
