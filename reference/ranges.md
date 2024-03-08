# ranges
* ranges[meta header]
* cpp20[meta cpp]

`<ranges>` では、イテレータの組ではなく、コンテナや配列、部分的なコンテナなどの範囲(Range)を直接扱うライブラリを提供する。

C++17までは、標準アルゴリズム関数はイテレータの組を扱い、範囲を直接扱ってはいなかった。
このようなライブラリはBoost.Range、range-v3、cpplinqなどで実績があり、C++標準にも取り込まれることになった。

また、従来のイテレータの組は基本的に同じ型であることが期待されていたが、C++20のRangesでは`end`で得られるものは**番兵**(sentinel)と規定され、イテレータと同じ型でなくてもよくなった。

`<ranges>`で定義されるコンセプトはイテレータを用いて定義されるものが多い。イテレータや番兵に関するコンセプトなどは引き続き[`<iterator>`](iterator.md)で提供される。

また、Range対応版のアルゴリズム関数は引き続き[`<algorithm>`](algorithm.md)で提供される。

## 名前空間構造

`<ranges>`で定義されるものは全て`std::ranges`名前空間の下にある。また、各種`view`型を生成するRangeアダプタ/ファクトリオブジェクトは`std::ranges::views`名前空間の下で定義され、`std::views`からもアクセスする事ができる。

名前空間だけを見てみると次のようになっている。

```cpp
namespace std {
  // 通常のstd名前空間

  namespace ranges {
    // <ranges>のものはここに定義される

    namespace views {
      // Rangeアダプタ/ファクトリオブジェクトが定義される

    }
  }

  // この名前空間エイリアスによって、std::viewsとしてstd::ranges::viewsにアクセスできる
  namespace views = ranges::views;
}
```

## Rangeアクセス

これらの機能は従来[`<iterator>`](iterator.md)でフリー関数として提供されていた。
C++20では関数によるカスタマイゼーションポイントの問題点を解消するため、関数オブジェクトとして再実装されている。
互換性を維持するために従来の関数も残っているが、これらのカスタマイゼーションポイントオブジェクトを使用することが推奨される。

| 名前                           | 説明                                                                                              | 対応バージョン |
|--------------------------------|---------------------------------------------------------------------------------------------------|----------------|
| [`begin`](ranges/begin.md)     | Rangeの先頭を指すイテレータを取得する (customization point object)                                | C++20          |
| [`end`](ranges/end.md)         | Rangeの末尾の次を指すイテレータもしくは番兵を取得する (customization point object)                | C++20          |
| [`cbegin`](ranges/cbegin.md)   | Rangeの先頭を指す読み取り専用イテレータを取得する (customization point object)                    | C++20          |
| [`cend`](ranges/cend.md)       | Rangeの末尾の次を指す読み取り専用イテレータもしくは番兵を取得する (customization point object)    | C++20          |
| [`rbegin`](ranges/rbegin.md)   | Rangeの末尾を指す逆イテレータを取得する (customization point object)                              | C++20          |
| [`rend`](ranges/rend.md)       | Rangeの先頭の前を指す逆イテレータもしくは番兵を取得する (customization point object)              | C++20          |
| [`crbegin`](ranges/crbegin.md) | Rangeの末尾を指す読み取り専用逆イテレータを取得する (customization point object)                  | C++20          |
| [`crend`](ranges/crend.md)     | Rangeの先頭の前を指す読み取り専用逆イテレータもしくは番兵を取得する (customization point object)  | C++20          |
| [`size`](ranges/size.md)       | Rangeの要素数を取得する (customization point object)                                              | C++20          |
| [`ssize`](ranges/ssize.md)     | Rangeの要素数を、符号付き整数型で取得する (customization point object)                            | C++20          |
| [`empty`](ranges/empty.md)     | Rangeが空かどうかを判定する (customization point object)                                          | C++20          |
| [`data`](ranges/data.md)       | Rangeの要素配列へのポインタを取得する (customization point object)                                | C++20          |
| [`cdata`](ranges/cdata.md)     | Rangeの要素配列への読み取り専用ポインタを取得する (customization point object)                    | C++20          |

## Rangeに関連する型へのアクセス

| 名前                                                             | 説明                                           | 対応バージョン |
|------------------------------------------------------------------|------------------------------------------------|----------------|
| [`iterator_t`](ranges/iterator_t.md)                             | イテレータ型を取得する (alias template)        | C++20          |
| [`sentinel_t`](ranges/sentinel_t.md)                             | 番兵型を取得する (alias template)              | C++20          |
| [`const_iterator_t`](ranges/const_iterator_t.md)                 | 定数イテレータ型を取得する (alias template)        | C++23          |
| [`const_sentinel_t`](ranges/const_sentinel_t.md)                 | 定数番兵型を取得する (alias template)        | C++23          |
| [`range_difference_t`](ranges/range_difference_t.md)             | イテレータの差の型を取得する (alias template)  | C++20          |
| [`range_size_t`](ranges/range_size_t.md)                         | サイズの型を取得する(alias template)           | C++20          |
| [`range_value_t`](ranges/range_value_t.md)                       | 要素の型を取得する (alias template)            | C++20          |
| [`range_reference_t`](ranges/range_reference_t.md)               | 要素の参照型を取得する (alias template)        | C++20          |
| [`range_const_reference_t`](ranges/range_const_reference_t.md)   | 要素の定数参照型を取得する (alias template)    | C++23          |
| [`range_rvalue_reference_t`](ranges/range_rvalue_reference_t.md) | 要素の右辺値参照型を取得する (alias template)  | C++20          |

## Rangeコンセプト

| 名前                                                   | 説明                                                        | 対応バージョン |
|--------------------------------------------------------|-------------------------------------------------------------|----------------|
| [`range`](ranges/range.md)                             | Rangeを定義するコンセプト (concept)                         | C++20          |
| [`borrowed_range`](ranges/borrowed_range.md)           | 所有権を持たないRange (concept)                             | C++20          |
| [`sized_range`](ranges/sized_range.md)                 | サイズを償却定数時間で求められるRange (concept)             | C++20          |
| [`view`](ranges/view.md)                               | ビューであるRange (concept)                                 | C++20          |
| [`output_range`](ranges/output_range.md)               | イテレータが出力イテレータであるRange (concept)             | C++20          |
| [`input_range`](ranges/input_range.md)                 | イテレータが入力イテレータであるRange (concept)             | C++20          |
| [`forward_range`](ranges/forward_range.md)             | イテレータが前進イテレータであるRange (concept)             | C++20          |
| [`bidirectional_range`](ranges/bidirectional_range.md) | イテレータが双方向イテレータであるRange (concept)           | C++20          |
| [`random_access_range`](ranges/random_access_range.md) | イテレータがランダムアクセスイテレータであるRange (concept) | C++20          |
| [`contiguous_range`](ranges/contiguous_range.md)       | イテレータが隣接イテレータであるRange (concept)             | C++20          |
| [`common_range`](ranges/common_range.md)               | イテレータと番兵の型が等しいRange (concept)                 | C++20          |
| [`viewable_range`](ranges/viewable_range.md)           | ビューに変換できるRange (concept)                           | C++20          |
| [`constant_range`](ranges/constant_range.md)           | 要素が定数なRange (concept)                           | C++23          |

## カスタマイゼーションポイント

| 名前                                                       | 説明                                                         | 対応バージョン |
|------------------------------------------------------------|--------------------------------------------------------------|----------------|
| [`enable_borrowed_range`](ranges/enable_borrowed_range.md) | Rangeを`borrowed_range`にする (variable template)            | C++20          |
| [`enable_view`](ranges/enable_view.md)                     | Rangeを`view`にする (variable template)                      | C++20          |
| [`disable_sized_range`](ranges/disable_sized_range.md)     | Rangeを`sized_range`にならないようにする (variable template) | C++20          |

## ビューインターフェース

| 名前                                         | 説明                                                      | 対応バージョン |
|----------------------------------------------|-----------------------------------------------------------|----------------|
| [`view_base`](ranges/view_base.md)           | 基底クラスとすることで`view`となるタグ型 (class)          | C++20          |
| [`view_interface`](ranges/view_interface.md) | ビューの基底クラスとして推奨されるクラス (class template) | C++20          |

## 部分Range

| 名前                                         | 説明                                               | 対応バージョン |
|----------------------------------------------|----------------------------------------------------|----------------|
| [`subrange_kind`](ranges/subrange_kind.md)   | 部分Rangeの種類を表す列挙体 (enum class)           | C++20          |
| [`subrange`](ranges/subrange.md)             | イテレータペアをRangeとして扱う型 (class template) | C++20          |

## ダングリングイテレータハンドリング

| 名前                                                   | 説明                                                                           | 対応バージョン |
|--------------------------------------------------------|--------------------------------------------------------------------------------|----------------|
| [`dangling`](ranges/dangling.md)                       | ダングリングイテレータ、ダングリングRangeを表す型 (class)                      | C++20          |
| [`borrowed_iterator_t`](ranges/borrowed_iterator_t.md) | Rangeが`borrowed_range`ではないとき`dangling`となるイテレータ (alias template) | C++20          |
| [`borrowed_subrange_t`](ranges/borrowed_subrange_t.md) | Rangeが`borrowed_range`ではないとき`dangling`となる部分Range (alias template)  | C++20          |

## Rangeジェネレータ

| 名前                                   | 説明                                           | 対応バージョン |
|----------------------------------------|------------------------------------------------|-------|
| [`elements_of`](ranges/elements_of.md) | 子Range要素の生成を示すタグ型 (class template) | C++23 |

## Rangeファクトリ

Rangeファクトリは、Rangeではないオブジェクトから[`view`](ranges/view.md)を生成するものである。
その実体は、引数の無いものは変数テンプレート、引数のあるものは関数テンプレートやカスタマイゼーションポイントオブジェクトとなっている。

### empty view

| 名前                                        | 説明                                       | 対応バージョン |
|---------------------------------------------|--------------------------------------------|----------------|
| [`empty_view`](ranges/empty_view.md)        | 空のRange (class template)                 | C++20          |
| [`views::empty`](ranges/empty_view.md)      | `empty_view`を生成する (variable template) | C++20          |

### single view

| 名前                                          | 説明                                                  | 対応バージョン |
|-----------------------------------------------|-------------------------------------------------------|----------------|
| [`single_view`](ranges/single_view.md)        | 指定した値1つからなるRange (class template)           | C++20          |
| [`views::single`](ranges/single_view.md)      | `single_view`を生成する (customization point object)  | C++20          |

### iota view

| 名前                                      | 説明                                                | 対応バージョン |
|-------------------------------------------|-----------------------------------------------------|----------------|
| [`iota_view`](ranges/iota_view.md)        | 単調増加列であるRange (class template)              | C++20          |
| [`views::iota`](ranges/iota_view.md)      | `iota_view`を生成する (customization point object)  | C++20          |

### repeat view

| 名前                                          | 説明                                                  | 対応バージョン |
|-----------------------------------------------|-------------------------------------------------------|----------------|
| [`repeat_view`](ranges/repeat_view.md)        | 指定した値を指定回数繰り返すRange (class template)    | C++23          |
| [`views::repeat`](ranges/repeat_view.md)      | `repeat_view`を生成する (customization point object)  | C++23          |

### istream view

| 名前                                                   | 説明                                                         | 対応バージョン |
|--------------------------------------------------------|--------------------------------------------------------------|----------------|
| [`basic_istream_view`](ranges/basic_istream_view.md)   | 入力ストリームから値を読むRange (class template)             | C++20          |
| [`istream_view`](ranges/basic_istream_view.md)         | 入力ストリームから値を読むRange (alias template)             | C++20          |
| [`wistream_view`](ranges/basic_istream_view.md)        | 入力ストリームから値を読むRange (alias template)             | C++20          |
| [`views::istream`](ranges/basic_istream_view.md)       | `basic_istream_view`を生成する (customization point object)  | C++20          |

## Rangeアダプタ

Rangeアダプタは、既存のRangeに作用して新たな[`view`](ranges/view.md)を生成するものである。
その実体はカスタマイゼーションポイントオブジェクトとなっている。

RangeアダプタをRangeに作用させる方法には、一部の例外を除き、関数記法とパイプライン記法の2つがある。

`R`をRangeアダプタ、`r`を元になるRangeとする。このとき、以下の2つの式は同じ[`view`](ranges/view.md)を生成する。

```cpp
R(r)   // 関数記法
r | R  // パイプライン記法
```

Rangeアダプタを適用した結果は[`view`](ranges/view.md)、すなわちRangeであることから、Rangeアダプタを次々と繋いでいくことができる。

```cpp
R3(R2(R1(r)))     // 関数記法
r | R1 | R2 | R3  // パイプライン記法
```

Rangeアダプタの処理は遅延評価され、要素は必要になるまで生成されない。このような仕組みは実際の仕事の多くをイテレータが担うことで実現している。

```cpp
for (auto&& item : r | R) {
  // ループ一回ごとに、(r | R)の要素を1つ生成する。このとき、rの要素を必要なだけ取得する。
}
```

第1引数に[`viewable_range`](ranges/viewable_range.md)を受け取って[`view`](ranges/view.md)を返すカスタマイゼーションポイントオブジェクトを、**Rangeアダプタオブジェクト**という。とくに、1引数のものを**Rangeアダプタクロージャオブジェクト**という。

Rangeアダプタオブジェクト`adaptor`が2つ以上の引数をとる場合、以下の3つの式は等しい。

```cpp
adaptor(range, args...)
adaptor(args...)(range)
range | adaptor(args...)
```

このとき、`adaptor(args...)`はRangeアダプタクロージャオブジェクトになっている。

### all view

| 名前                                    | 説明                                                                     | 対応バージョン |
|-----------------------------------------|--------------------------------------------------------------------------|----------------|
| [`ref_view`](ranges/ref_view.md)        | Rangeへの参照として振る舞うビュー (class template)                       | C++20          |
| [`owning_view`](ranges/owning_view.md)  | Rangeの右辺値をムーブして所有するビュー (class template)                 | C++20          |
| [`views::all`](ranges/all.md)           | Rangeへの参照として振る舞うビューを生成する (customization point object) | C++20          |
| [`views::all_t`](ranges/all.md)         | `all`の戻り値型 (alias template)                                         | C++20          |

### as rvalue view

| 名前                                           | 説明                                                         | 対応バージョン |
|------------------------------------------------|--------------------------------------------------------------|----------------|
| [`as_rvalue_view`](ranges/as_rvalue_view.md)   | 各要素をrvalueにするビュー (class template)                  | C++23          |
| [`views::as_rvalue`](ranges/as_rvalue_view.md) | `as_rvalue_view`を生成する (customization point object)      | C++23          |

### filter view

| 名前                                          | 説明                                                        | 対応バージョン |
|-----------------------------------------------|-------------------------------------------------------------|----------------|
| [`filter_view`](ranges/filter_view.md)        | 指定した条件を満たす要素だけを集めるビュー (class template) | C++20          |
| [`views::filter`](ranges/filter_view.md)      | `filter_view`を生成する (customization point object)        | C++20          |

### transform view

| 名前                                                | 説明                                                     | 対応バージョン |
|-----------------------------------------------------|----------------------------------------------------------|----------------|
| [`transform_view`](ranges/transform_view.md)        | 指定した関数で各要素を変換するビュー (class template)    | C++20          |
| [`views::transform`](ranges/transform_view.md)      | `transform_view`を生成する (customization point object)  | C++20          |

### take view

| 名前                                      | 説明                                                                          | 対応バージョン |
|-------------------------------------------|-------------------------------------------------------------------------------|----------------|
| [`take_view`](ranges/take_view.md)        | 先頭から指定した個数だけ取り出すビュー (class template)                       | C++20          |
| [`views::take`](ranges/take_view.md)      | 先頭から指定した個数だけ取り出すビューを生成する (customization point object) | C++20          |

### take while view

| 名前                                                  | 説明                                                              | 対応バージョン |
|-------------------------------------------------------|-------------------------------------------------------------------|----------------|
| [`take_while_view`](ranges/take_while_view.md)        | 先頭から指定した条件を満たす範囲を取り出すビュー (class template) | C++20          |
| [`views::take_while`](ranges/take_while_view.md)      | `take_while_view`を生成する (customization point object)          | C++20          |

### drop view

| 名前                                      | 説明                                                                          | 対応バージョン |
|-------------------------------------------|-------------------------------------------------------------------------------|----------------|
| [`drop_view`](ranges/drop_view.md)        | 先頭から指定した個数だけ除外するビュー (class template)                       | C++20          |
| [`views::drop`](ranges/drop_view.md)      | 先頭から指定した個数だけ除外するビューを生成する (customization point object) | C++20          |

### drop while view

| 名前                                                  | 説明                                                              | 対応バージョン |
|-------------------------------------------------------|-------------------------------------------------------------------|----------------|
| [`drop_while_view`](ranges/drop_while_view.md)        | 先頭から指定した条件を満たす範囲を除外するビュー (class template) | C++20          |
| [`views::drop_while`](ranges/drop_while_view.md)      | `drop_while_view`を生成する (customization point object)          | C++20          |

### join view

| 名前                                                | 説明                                                                                              | 対応バージョン |
|-----------------------------------------------------|---------------------------------------------------------------------------------------------------|----------------|
| [`join_view`](ranges/join_view.md)                  | ネストされたRangeを平坦にするビュー (class template)                                              | C++20          |
| [`views::join`](ranges/join_view.md)                | ネストされたRangeを平坦にするビューを生成する (customization point object)                        | C++20          |

### join with view

| 名前                                                | 説明                                                                                              | 対応バージョン |
|-----------------------------------------------------|---------------------------------------------------------------------------------------------------|----------------|
| [`join_with_view`](ranges/join_with_view.md)        | ネストされたRangeをデリミタで区切りながら平坦にするビュー (class template)                        | C++23          |
| [`views::join_with`](ranges/join_with_view.md)      | ネストされたRangeをデリミタで区切りながら平坦にするビューを生成する (customization point object)  | C++23          |

### lazy split view

| 名前                                                  | 説明                                                         | 対応バージョン |
|-------------------------------------------------------|--------------------------------------------------------------|----------------|
| [`lazy_split_view`](ranges/lazy_split_view.md)        | Rangeを指定したデリミタで分割するビュー (class template)     | C++20          |
| [`views::lazy_split`](ranges/lazy_split_view.md)      | `lazy_split_view`を生成する (customization point object)     | C++20          |

### split view

| 名前                                                  | 説明                                                         | 対応バージョン |
|-------------------------------------------------------|--------------------------------------------------------------|----------------|
| [`split_view`](ranges/split_view.md)                  | 文字列分割に特化した`lazy_split_view` (class template)       | C++20          |
| [`views::split`](ranges/split_view.md)                | `split_view`を生成する (customization point object)          | C++20          |

### counted view

| 名前                                  | 説明                                                                                          | 対応バージョン |
|---------------------------------------|-----------------------------------------------------------------------------------------------|----------------|
| [`views::counted`](ranges/counted.md) | イテレータから指定した数の範囲をRangeとして扱うビューを生成する (customization point object)  | C++20          |

### common view

| 名前                                          | 説明                                                          | 対応バージョン |
|-----------------------------------------------|---------------------------------------------------------------|----------------|
| [`common_view`](ranges/common_view.md)        | `common_range`にしたビュー (class template)                   | C++20          |
| [`views::common`](ranges/common_view.md)      | `common_range`なビューを生成する (customization point object) | C++20          |

### reverse view

| 名前                                            | 説明                                                 | 対応バージョン |
|-------------------------------------------------|------------------------------------------------------|----------------|
| [`reverse_view`](ranges/reverse_view.md)        | 逆順のビュー (class template)                        | C++20          |
| [`views::reverse`](ranges/reverse_view.md)      | 逆順のビューを生成する (customization point object)  | C++20          |

### as const view

| 名前                                          | 説明                                                         | 対応バージョン |
|-----------------------------------------------|--------------------------------------------------------------|----------------|
| [`as_const_view`](ranges/as_const_view.md)    | 各要素をconstにするビュー (class template)                       | C++23          |
| [`views::as_const`](ranges/as_const_view.md)  | `as_const_view`を生成する (customization point object)         | C++23          |

### elements view

| 名前                                              | 説明                                                   | 対応バージョン |
|---------------------------------------------------|--------------------------------------------------------|----------------|
| [`elements_view`](ranges/elements_view.md)        | 第n要素を集めたビュー (class template)                 | C++20          |
| [`keys_view`](ranges/elements_view.md)            | 第0要素を集めたビュー (alias template)                 | C++20          |
| [`values_view`](ranges/elements_view.md)          | 第1要素を集めたビュー (alias template)                 | C++20          |
| [`views::elements`](ranges/elements_view.md)      | `elements_view`を生成する (customization point object) | C++20          |
| [`views::keys`](ranges/elements_view.md)          | `keys_view`を生成する (customization point object)     | C++20          |
| [`views::values`](ranges/elements_view.md)        | `values_view`を生成する (customization point object)   | C++20          |

### zip view

| 名前                                                   | 説明                                                                                | 対応バージョン |
|--------------------------------------------------------|-------------------------------------------------------------------------------------|----------------|
| [`zip_view`](ranges/zip_view.md)                       | 複数のシーケンスから値を1つずつ取り出した`tuple`のビュー (class template)            | C++23          |
| [`views::zip`](ranges/zip_view.md)                     | `zip_view`を生成する (customization point object)                                   | C++23          |

### zip transform view

| 名前                                                   | 説明                                                                                | 対応バージョン |
|--------------------------------------------------------|-------------------------------------------------------------------------------------|----------------|
| [`zip_transform_view`](ranges/zip_transform_view.md)   | 複数のシーケンスから値を1つずつ取り出し、関数を適用した結果のビュー (class template) | C++23          |
| [`views::zip_transform`](ranges/zip_transform_view.md) | `zip_transform_view`を生成する (customization point object)                         | C++23          |

### adjacent view

| 名前                                                             | 説明                                                                               | 対応バージョン |
|------------------------------------------------------------------|------------------------------------------------------------------------------------|----------------|
| [`adjacent_view`](ranges/adjacent_view.md)                       | 各要素とそれに隣接する要素を指定個数ずつ取り出した`tuple`のビュー (class template) | C++23          |
| [`views::adjacent`](ranges/adjacent_view.md)                     | `adjacent_view`を生成する (customization point object)                             | C++23          |

### adjacent transform view

| 名前                                                             | 説明                                                                               | 対応バージョン |
|------------------------------------------------------------------|------------------------------------------------------------------------------------|----------------|
| [`adjacent_transform_view`](ranges/adjacent_transform_view.md)   | `adjacent_view`と同様に取り出し、関数を適用した結果のビュー (class template)       | C++23          |
| [`views::adjacent_transform`](ranges/adjacent_transform_view.md) | `adjacent_transform_view`を生成する (customization point object)                   | C++23          |

### chunk view

| 名前                                         | 説明                                                               | 対応バージョン |
|----------------------------------------------|--------------------------------------------------------------------|----------------|
| [`chunk_view`](ranges/chunk_view.md)         | シーケンスを指定個数で区切った`view`のシーケンス (class template)  | C++23          |
| [`views::chunk`](ranges/chunk_view.md)       | `chunk_view`を生成する (customization point object)                | C++23          |

### chunk by view

| 名前                                         | 説明                                                               | 対応バージョン |
|----------------------------------------------|--------------------------------------------------------------------|----------------|
| [`chunk_by_view`](ranges/chunk_by_view.md)   | 2項述語が偽となる部分で区切った`view`のシーケンス (class template) | C++23          |
| [`views::chunk_by`](ranges/chunk_by_view.md) | `chunk_by_view`を生成する (customization point object)             | C++23          |

### slide view

| 名前                                   | 説明                                                                            | 対応バージョン |
|----------------------------------------|---------------------------------------------------------------------------------|----------------|
| [`slide_view`](ranges/slide_view.md)   | 各要素とそれに隣接する要素を指定個数ずつ見る`view`のシーケンス (class template) | C++23          |
| [`views::slide`](ranges/slide_view.md) | `slide_view`を生成する (customization point object)                             | C++23          |

### stride view

| 名前                                     | 説明                                                  | 対応バージョン |
|------------------------------------------|-------------------------------------------------------|----------------|
| [`stride_view`](ranges/stride_view.md)   | 要素を指定個数飛ばしに見るビュー (class template)     | C++23          |
| [`views::stride`](ranges/stride_view.md) | `stride_view`を生成する (customization point object)  | C++23          |

### cartesian product view

| 名前                                                          | 説明                                                             | 対応バージョン |
|---------------------------------------------------------------|------------------------------------------------------------------|----------------|
| [`cartesian_product_view`](ranges/cartesian_product_view.md)  | シーケンスの直積集合のビュー (class template)                    | C++23          |
| [`views::cartesian_product`](ranges/cartesian_product_view.md)     | `cartesian_product_view`を生成する (customization point object)  | C++23          |


## Range変換

| 名前                 | 説明                                                           | 対応バージョン |
|----------------------|----------------------------------------------------------------|----------------|
| [`to`](ranges/to.md) | パイプライン記法でRangeからコンテナを構築する (class template) | C++23          |
| [`from_range_t`](ranges/from_range_t.md) | Rangeからコンテナへの変換を示すタグ型 (class) | C++23          |
| [`from_range`](ranges/from_range_t.md) | Rangeからコンテナへの変換を示すタグ値 (variable) | C++23          |


## 実装例
- [libstdc++](https://github.com/gcc-mirror/gcc/blob/master/libstdc%2B%2B-v3/include/std/ranges)
- [libc++](https://github.com/llvm/llvm-project/blob/main/libcxx/include/ranges)
- [MSVC](https://github.com/microsoft/STL/blob/main/stl/inc/ranges)

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0
- [GCC](/implementation.md#gcc): 10.1.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10

## 関連項目
- [`<iterator>`](iterator.md)
- [`<concepts>`](concepts.md)
- [`<algorithm>`](algorithm.md)

## 参照
- [N4861 24 Ranges library](https://timsong-cpp.github.io/cppwp/n4861/ranges)
- [N4950 26 Ranges library](https://timsong-cpp.github.io/cppwp/n4950/ranges)
- [C++20 ranges](https://techbookfest.org/product/5134506308665344)
- [P2278R4 `cbegin` should always return a constant iterator](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2278r4.html)
